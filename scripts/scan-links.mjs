import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { promisify } from 'util';

const globPromise = promisify(glob);

// Configuration
const DOCS_ROOT = path.resolve('docs/docs');
const EXTENSIONS = ['.md', '.mdx'];

// Helper to check if file exists
function resolveLink(sourceFile, link) {
    // Remove anchors
    const cleanLink = link.split('#')[0];
    if (!cleanLink) return true; // Just anchor

    let targetPath;
    if (cleanLink.startsWith('/docs/')) {
        // Absolute path from site root
        // /docs/foo/bar -> docs/docs/foo/bar.md
        const relPath = cleanLink.replace('/docs/', '');
        targetPath = path.join(DOCS_ROOT, relPath);
    } else if (cleanLink.startsWith('/')) {
        // Other absolute paths (images etc), ignore for now or warn
        return true;
    } else if (cleanLink.startsWith('http')) {
        return true; // External
    } else {
        // Relative path
        const dir = path.dirname(sourceFile);
        targetPath = path.resolve(dir, cleanLink);
    }

    // Check extensions
    if (fs.existsSync(targetPath)) return true; // Directory or exact file
    for (const ext of EXTENSIONS) {
        if (fs.existsSync(targetPath + ext)) return true;
        if (fs.existsSync(path.join(targetPath, 'index' + ext))) return true;
    }

    // Check if it matches a category directory
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) return true;

    return false;
}

async function scan() {
    const files = await globPromise('docs/docs/**/*.{md,mdx}');
    let brokenCount = 0;

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        const absFile = path.resolve(file);

        // Regex for markdown links [text](url)
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let match;
        while ((match = linkRegex.exec(content)) !== null) {
            const text = match[1];
            const link = match[2];

            if (!resolveLink(absFile, link)) {
                console.error(`BROKEN LINK in ${file}:`);
                console.error(`  Link: ${link}`);
                console.error(`  Text: ${text}`);
                brokenCount++;
            }
        }
    }

    console.log(`Scan complete. ${brokenCount} broken links found.`);
    if (brokenCount > 0) process.exit(1);
}

scan().catch(console.error);
