const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

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

    // Helper to copy files/dirs
    const copy = (src, dest) => {
        try {
            const stat = fs.statSync(src);
            if (stat.isDirectory()) {
                fs.cpSync(src, dest, { recursive: true });
            } else {
                fs.copyFileSync(src, dest);
            }
        } catch (e) {
            console.warn(`Skipping ${src}: ${e.message}`);
        }
    };

    // Expand globs (simplified for this script, assuming direct paths or simple wildcards)
    // In a real scenario, use 'glob' package. Here we handle the specific patterns in release-config.yaml

    config.include.forEach(pattern => {
        let srcPattern = pattern;
        if (pattern.endsWith('/**')) {
            srcPattern = pattern.substring(0, pattern.length - 3);
        } else if (pattern.endsWith('/*')) {
            srcPattern = pattern.substring(0, pattern.length - 2);
        }

        const srcPath = path.join(rootDir, srcPattern);
        const destPath = path.join(distPath, srcPattern);

        if (fs.existsSync(srcPath)) {
            console.log(`Copying ${srcPattern}...`);
            // Ensure parent dir exists
            fs.mkdirSync(path.dirname(destPath), { recursive: true });

            // Special handling for README.md to fix encoding
            if (srcPattern === 'README.md') {
                let content = fs.readFileSync(srcPath, 'utf8');
                // Strip BOM if present
                if (content.charCodeAt(0) === 0xFEFF) {
                    content = content.slice(1);
                }
                fs.writeFileSync(destPath, content, 'utf8');
            }
            // Special handling for package.json - use OSS version without pnpm deps
            else if (srcPattern === 'package.json') {
                const ossPackageJsonPath = path.join(rootDir, 'scripts/release/oss-package.json');
                if (fs.existsSync(ossPackageJsonPath)) {
                    console.log('Using OSS-specific package.json (no pnpm deps)');
                    fs.copyFileSync(ossPackageJsonPath, destPath);
                } else {
                    copy(srcPath, destPath);
                }
            } else {
                copy(srcPath, destPath);
            }
        } else {
            // Try globbing if it's a wildcard (very basic)
            // For now, we assume the config lists directories or files explicitly enough
            console.warn(`Warning: Source path not found: ${srcPath}`);
        }
    });
}

function main() {
    try {
        console.log('Starting MPLP v1.1 Release Build...');
        const config = loadConfig();
        cleanDist();
        processIncludes(config);
        console.log('Release build completed successfully!');
        console.log(`Output directory: ${DIST_DIR}`);
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

main();
