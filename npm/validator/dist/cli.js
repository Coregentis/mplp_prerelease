"use strict";
/**
 * MPLP Validator CLI
 * 漏 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 *
 * This is a standalone validation tool for CI pipelines.
 * It is NOT part of the MPLP SDK.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const validate_1 = require("./commands/validate");
const version_1 = require("./commands/version");
const program = new commander_1.Command();
program
    .name('mplp')
    .description('MPLP Protocol Validator - Schema and Golden Flow validation for CI')
    .version('1.0.0');
program
    .command('validate')
    .description('Validate MPLP artifacts against protocol schemas')
    .requiredOption('--input <path>', 'Path to MPLP artifacts directory')
    .option('--schema <path>', 'Custom schema directory (default: built-in)')
    .option('--flow <id>', 'Golden Flow to validate (default: golden-flow-01)', 'golden-flow-01')
    .option('--json', 'Output results as JSON')
    .action(validate_1.validateCommand);
program
    .command('version')
    .description('Show validator and protocol version')
    .action(version_1.versionCommand);
program.parse();
