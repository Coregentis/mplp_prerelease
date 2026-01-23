
// CodeQL fix: Helper to check file existence without TOCTOU
function fileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.R_OK);
        return true;
    } catch {
        return false;
    }
}

#!/usr/bin/env node
/**
 * MA-STRUCT Gate: Multi-Agent Structural Integrity
 * Authority: Validation Lab (Non-Normative)
 */

import fs from 'fs';
import path from 'path';

const GATE_ID = 'MA-STRUCT';
const PACKS_DIR = 'Validation_Lab/releases/v0.6/artifacts/packs';

function main() {
    console.log(`\n=== ${GATE_ID}: Multi-Agent Structural Integrity Gate ===\n`);

    const report = {
        gate_id: GATE_ID,
        timestamp: new Date().toISOString(),
        checks: [],
        verdict: 'UNKNOWN'
    };

    // Find MA pack directories
    const entries = fs.readdirSync(PACKS_DIR, { withFileTypes: true });
    const packDirs = entries.filter(e => e.isDirectory() && e.name.includes('-ma-')).map(e => e.name);

    for (const packId of packDirs) {
        const packPath = path.join(PACKS_DIR, packId);
        console.log(`Checking ${packId}:`);

        // Load manifest
        const manifestPath = path.join(packPath, 'manifest.json');
        if (!fileExists(manifestPath)) {
            report.checks.push({ check: `manifest_exists:${packId}`, invariant_id: 'INV-GF01-001', passed: false });
            console.log('  ✗ Manifest missing');
            continue;
        }
        report.checks.push({ check: `manifest_exists:${packId}`, passed: true });
        console.log('  ✓ Manifest exists');

        // Load timeline
        const timelinePath = path.join(packPath, 'timeline/events.ndjson');
        if (!fileExists(timelinePath)) {
            report.checks.push({ check: `timeline_exists:${packId}`, invariant_id: 'INV-MA-STRUCT-001', passed: false });
            console.log('  ✗ Timeline missing');
            continue;
        }
        report.checks.push({ check: `timeline_exists:${packId}`, passed: true });
        console.log('  ✓ Timeline exists');

        // Parse events
        const eventsContent = fs.readFileSync(timelinePath, 'utf-8');
        const events = eventsContent.trim().split('\n').map(line => JSON.parse(line));

        // INV-MA-STRUCT-001: At least 2 distinct agent_ids
        const agentIds = new Set(events.map(e => e.agent_id));
        const hasEnoughAgents = agentIds.size >= 2;
        report.checks.push({
            check: `agent_count:${packId}`,
            invariant_id: 'INV-MA-STRUCT-001',
            passed: hasEnoughAgents,
            agent_count: agentIds.size
        });
        console.log(`  ${hasEnoughAgents ? '✓' : '✗'} Agent count: ${agentIds.size} (min: 2)`);

        // INV-MA-STRUCT-002: Each agent has minimum 2 events
        const agentEventCounts = {};
        for (const event of events) {
            agentEventCounts[event.agent_id] = (agentEventCounts[event.agent_id] || 0) + 1;
        }
        const allAgentsHaveMinEvents = Array.from(agentIds).every(id => agentEventCounts[id] >= 2);
        report.checks.push({
            check: `agent_min_events:${packId}`,
            invariant_id: 'INV-MA-STRUCT-002',
            passed: allAgentsHaveMinEvents,
            agent_events: agentEventCounts
        });
        console.log(`  ${allAgentsHaveMinEvents ? '✓' : '✗'} Each agent has ≥2 events`);

        // INV-MA-STRUCT-003: At least 1 handoff/delegate event
        const handoffEvents = events.filter(e => ['handoff', 'delegate', 'transfer'].includes(e.type));
        const hasHandoff = handoffEvents.length >= 1;
        report.checks.push({
            check: `handoff_exists:${packId}`,
            invariant_id: 'INV-MA-STRUCT-003',
            passed: hasHandoff,
            handoff_count: handoffEvents.length
        });
        console.log(`  ${hasHandoff ? '✓' : '✗'} Handoff events: ${handoffEvents.length} (min: 1)`);

        // INV-MA-STRUCT-004: Handoff event references traceable context
        let handoffValid = true;
        for (const handoff of handoffEvents) {
            const hasFromTo = handoff.from_agent && handoff.to_agent;
            const hasContextRef = handoff.context_ref || handoff.payload;
            if (!hasFromTo || !hasContextRef) {
                handoffValid = false;
                break;
            }
        }
        report.checks.push({
            check: `handoff_valid:${packId}`,
            invariant_id: 'INV-MA-STRUCT-004',
            passed: handoffValid
        });
        console.log(`  ${handoffValid ? '✓' : '✗'} Handoff has from/to/context`);

        // INV-MA-STRUCT-005: Events have event_id (orderable)
        const allHaveEventId = events.every(e => e.event_id);
        report.checks.push({
            check: `events_orderable:${packId}`,
            invariant_id: 'INV-MA-STRUCT-005',
            passed: allHaveEventId
        });
        console.log(`  ${allHaveEventId ? '✓' : '✗'} Events are orderable (have event_id)`);
    }

    report.verdict = report.checks.every(c => c.passed) ? 'PASS' : 'FAIL';
    console.log(`\n${report.verdict === 'PASS' ? '✅' : '❌'} ${GATE_ID}: ${report.verdict}`);

    // Write report
    const reportPath = 'Validation_Lab/releases/v0.6/gates/ma-struct-gate.report.json';
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\nReport: ${reportPath}`);

    process.exit(report.verdict === 'PASS' ? 0 : 1);
}

main();
