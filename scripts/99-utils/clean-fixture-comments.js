/**
 * Batch remove $comment from all fixture JSON files
 */
const fs = require('fs');
const path = require('path');

const FLOWS_DIR = path.join(__dirname, '../tests/golden/flows');

function processDir(dir) {
    const flows = fs.readdirSync(dir);
    let count = 0;

    for (const flow of flows) {
        const flowPath = path.join(dir, flow);
        if (!fs.statSync(flowPath).isDirectory()) continue;

        const inputDir = path.join(flowPath, 'input');
        if (!fs.existsSync(inputDir)) continue;

        const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.json'));

        for (const file of files) {
            const filePath = path.join(inputDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(content);

            if (data['$comment'] !== undefined) {
                delete data['$comment'];
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
                console.log(`Cleaned: ${flow}/input/${file}`);
                count++;
            }
        }

        // Also check expected dir
        const expectedDir = path.join(flowPath, 'expected');
        if (fs.existsSync(expectedDir)) {
            const expectedFiles = fs.readdirSync(expectedDir).filter(f => f.endsWith('.json'));
            for (const file of expectedFiles) {
                const filePath = path.join(expectedDir, file);
                const content = fs.readFileSync(filePath, 'utf8');
                const data = JSON.parse(content);

                if (data['$comment'] !== undefined) {
                    delete data['$comment'];
                    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
                    console.log(`Cleaned: ${flow}/expected/${file}`);
                    count++;
                }
            }
        }
    }

    console.log(`\nTotal files cleaned: ${count}`);
}

processDir(FLOWS_DIR);
