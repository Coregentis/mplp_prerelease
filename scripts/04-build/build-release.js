const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const minimatch = require('minimatch');

const CONFIG_FILE = 'release-config.yaml';
const DIST_DIR = 'dist/mplp-v1.0';

// Ensure rootDir is correctly resolved to the project root
const rootDir = path.resolve(__dirname, '../..');
console.log(`Project Root: ${rootDir}`);

function loadConfig() {
    const configPath = path.join(rootDir, CONFIG_FILE);
    if (!fs.existsSync(configPath)) {
        throw new Error(`Configuration file not found: ${configPath}`);
    }
    const configFileContent = fs.readFileSync(configPath, 'utf8');
    return yaml.load(configFileContent);
}

function cleanDist() {
    // Clean ENTIRE dist folder, not just the release subfolder
    const parentDistPath = path.join(rootDir, 'dist');
    if (fs.existsSync(parentDistPath)) {
        console.log('Cleaning dist/ folder...');
        fs.rmSync(parentDistPath, { recursive: true, force: true });
    }

    // Create the specific release folder
    const distPath = path.join(rootDir, DIST_DIR);
    fs.mkdirSync(distPath, { recursive: true });
}

function processIncludes(config) {
    const distPath = path.join(rootDir, DIST_DIR);

    // Normalize exclude patterns for glob matching
    const excludePatterns = (config.exclude || []).map(p => {
        // Convert to glob pattern relative to root
        return p.replace(/^\.\//, '').replace(/\/$/, '/**');
    });

    // Check if a path should be excluded
    const isExcluded = (relativePath) => {
        // Normalize path separators
        const normalized = relativePath.replace(/\\/g, '/');

        return excludePatterns.some(pattern => {
            // Direct match
            if (minimatch(normalized, pattern, { dot: true })) {
                return true;
            }
            // Also check if any parent path matches
            const parts = normalized.split('/');
            for (let i = 0; i < parts.length; i++) {
                const partial = parts.slice(0, i + 1).join('/');
                if (minimatch(partial, pattern, { dot: true })) {
                    return true;
                }
            }
            return false;
        });
    };

    // Recursively copy with exclude filtering
    const copyWithExcludes = (src, dest, relativePath = '') => {
        const stat = fs.statSync(src);

        if (stat.isDirectory()) {
            // Check if directory itself should be excluded
            if (isExcluded(relativePath)) {
                console.log(`   Skipping excluded directory: ${relativePath}`);
                return;
            }

            fs.mkdirSync(dest, { recursive: true });
            const entries = fs.readdirSync(src);

            for (const entry of entries) {
                const srcPath = path.join(src, entry);
                const destPath = path.join(dest, entry);
                const entryRelPath = path.join(relativePath, entry);

                copyWithExcludes(srcPath, destPath, entryRelPath);
            }
        } else {
            // Check if file should be excluded
            if (isExcluded(relativePath)) {
                return; // Skip silently for files
            }

            // Special handling for README.md to fix encoding
            if (relativePath === 'README.md') {
                let content = fs.readFileSync(src, 'utf8');
                // Strip BOM if present
                if (content.charCodeAt(0) === 0xFEFF) {
                    content = content.slice(1);
                }
                fs.writeFileSync(dest, content, 'utf8');
            } else {
                fs.copyFileSync(src, dest);
            }
        }
    };

    console.log('Processing includes...');
    (config.include || []).forEach(pattern => {
        // Handle root-level files
        if (!pattern.includes('*') && !pattern.includes('/')) {
            const srcPath = path.join(rootDir, pattern);
            const destPath = path.join(distPath, pattern);

            if (fs.existsSync(srcPath)) {
                console.log(`Copying ${pattern}...`);
                const stat = fs.statSync(srcPath);
                if (stat.isDirectory()) {
                    copyWithExcludes(srcPath, destPath, pattern);
                } else {
                    copyWithExcludes(srcPath, destPath, pattern);
                }
            }
        }
        // Handle glob patterns like "docs/**"
        else if (pattern.endsWith('/**')) {
            const baseDir = pattern.replace('/**', '');
            const srcPath = path.join(rootDir, baseDir);
            const destPath = path.join(distPath, baseDir);

            if (fs.existsSync(srcPath)) {
                console.log(`Copying ${pattern}...`);
                copyWithExcludes(srcPath, destPath, baseDir);
            } else {
                console.warn(`Warning: Source path not found: ${srcPath}`);
            }
        }
        // Handle specific file patterns
        else {
            const srcPath = path.join(rootDir, pattern);

            if (fs.existsSync(srcPath)) {
                const relativePath = pattern;
                const destPath = path.join(distPath, pattern);

                if (!isExcluded(relativePath)) {
                    console.log(`Copying ${pattern}...`);
                    fs.mkdirSync(path.dirname(destPath), { recursive: true });

                    const stat = fs.statSync(srcPath);
                    if (stat.isDirectory()) {
                        copyWithExcludes(srcPath, destPath, relativePath);
                    } else {
                        copyWithExcludes(srcPath, destPath, relativePath);
                    }
                }
            } else {
                console.warn(`Warning:Source path not found: ${srcPath}`);
            }
        }
    });
}

function validateRelease(config) {
    const distPath = path.join(rootDir, DIST_DIR);

    console.log('\n=== Release Validation ===');

    // Check for forbidden directories that should have been excluded
    const forbiddenPaths = [
        'node_modules',
        'build',
        '.docusaurus',
        'dist'
    ];

    let violations = [];

    function checkDir(dir, relativePath = '') {
        if (!fs.existsSync(dir)) return;

        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            const relPath = path.join(relativePath, entry.name);

            if (entry.isDirectory()) {
                // Check if this is a forbidden directory
                if (forbiddenPaths.includes(entry.name)) {
                    violations.push(relPath);
                }
                // Recurse
                checkDir(fullPath, relPath);
            }
        }
    }

    checkDir(distPath);

    if (violations.length > 0) {
        console.error('❌ HARD FAIL: Forbidden directories found in release package:');
        violations.forEach(v => console.error(`   - ${v}`));
        console.error('\nThese directories should have been excluded by release-config.yaml');
        process.exit(1);
    }

    console.log('✓ No forbidden directories found');

    // Check that we actually packaged something
    const fileCount = countFiles(distPath);
    if (fileCount === 0) {
        console.error('❌ HARD FAIL: Release package is empty (0 files)');
        process.exit(1);
    }

    console.log(`✓ Package contains ${fileCount} files`);

    // Calculate total size
    const totalSize = calculateSize(distPath);
    const sizeMB = (totalSize / (1024 * 1024)).toFixed(2);
    console.log(`✓ Total package size: ${sizeMB} MB`);

    // Warn if size is unexpectedly large
    if (totalSize > 100 * 1024 * 1024) { // 100 MB
        console.warn(`⚠ WARNING: Package size (${sizeMB} MB) exceeds 100 MB`);
        console.warn('   This may indicate build artifacts were not properly excluded');
    }

    return { fileCount, totalSize };
}

function countFiles(dir) {
    let count = 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            count += countFiles(fullPath);
        } else {
            count++;
        }
    }

    return count;
}

function calculateSize(dir) {
    let size = 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            size += calculateSize(fullPath);
        } else {
            const stat = fs.statSync(fullPath);
            size += stat.size;
        }
    }

    return size;
}

function generateManifest(config, stats) {
    const manifest = {
        version: config.version || '1.0.0',
        generated: new Date().toISOString(),
        fileCount: stats.fileCount,
        totalSizeBytes: stats.totalSize,
        totalSizeMB: (stats.totalSize / (1024 * 1024)).toFixed(2),
        buildInfo: {
            node: process.version,
            platform: process.platform,
            arch: process.arch
        }
    };

    const manifestPath = path.join(rootDir, DIST_DIR, 'RELEASE_MANIFEST.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('\n✓ Generated RELEASE_MANIFEST.json');

    return manifest;
}

function main() {
    try {
        console.log('Starting MPLP v1.0 Release Build...');
        const config = loadConfig();
        cleanDist();
        processIncludes(config);

        // Validate and generate manifest
        const stats = validateRelease(config);
        generateManifest(config, stats);

        console.log('\n=== Release Build Complete ===');
        console.log(`Output directory: ${DIST_DIR}`);
        console.log(`Files: ${stats.fileCount}`);
        console.log(`Size: ${(stats.totalSize / (1024 * 1024)).toFixed(2)} MB`);
    } catch (error) {
        console.error('\n❌ Build failed:', error.message);
        process.exit(1);
    }
}

main();
