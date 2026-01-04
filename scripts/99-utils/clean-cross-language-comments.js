/**
 * Clean $comment from all JSON files in tests/cross-language
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../tests/cross-language');

function cleanDir(dir) {
    if (!fs.existsSync(dir)) return 0;

    let count = 0;
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);

        if (fs.statSync(fullPath).isDirectory()) {
            count += cleanDir(fullPath);
        } else if (item.endsWith('.json')) {
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                const data = JSON.parse(content);

                if (data['$comment'] !== undefined) {
                    delete data['$comment'];
                    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + '\n');
                    console.log('Cleaned:', path.relative(ROOT, fullPath));
                    count++;
                }
            } catch (e) {
                console.error('Error:', fullPath, e.message);
            }
        }
    }

    return count;
}

console.log('Cleaning $comment from tests/cross-language...\n');
const total = cleanDir(ROOT);
console.log(`\nTotal files cleaned: ${total}`);
