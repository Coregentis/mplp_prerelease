/**
 * © 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 */

import { MplpEvent } from './types';

/**
 * Exports events to NDJSON format string.
 * One JSON object per line.
 */
export function exportNDJSON(events: MplpEvent[]): string {
    return events.map(event => JSON.stringify(event)).join('\n');
}
