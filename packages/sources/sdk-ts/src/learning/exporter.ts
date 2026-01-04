import { LearningSample } from './types';
import { validateLearningSample } from './validator';
import { createHash } from 'crypto';

// Derived from Truth Sources
// schemas/v2/learning/mplp-learning-sample-core.schema.json
// schemas/v2/taxonomy/learning-taxonomy.yaml
const PROTOCOL_VERSION = "1.0.0";
const GOVERNANCE = "MPGC";
const FROZEN = true;
const FREEZE_DATE = "2025-12-03";
const LEARNING_TAXONOMY_SHA256 = "6dbc28bb2dd1fa3a5e1ec51c20a0cc94885cce22989c0f9eb550914482442464e";

export type ExportMode = "fail_fast" | "skip_invalid";

export interface ExportOptions {
    mode?: ExportMode;
}

export interface LearningManifestLite {
    protocol_version: string;
    governance: string;
    frozen: boolean;
    freeze_date: string;
    exported_at: string;
    count: number;
    invalid_count: number;
    ndjson_sha256: string;
    learning_taxonomy_sha256: string;
    schema_bundle_sha256: string | null;
    schema_bundle_hash_method: "sha256" | "none";
    notes?: string[];
}

export function readTruthMeta() {
    return {
        protocol_version: PROTOCOL_VERSION,
        governance: GOVERNANCE,
        frozen: FROZEN,
        freeze_date: FREEZE_DATE,
        schema_bundle_sha256: null,
        schema_bundle_hash_method: "none" as const,
        learning_taxonomy_sha256: LEARNING_TAXONOMY_SHA256,
    };
}

export function canonicalJsonLine(obj: unknown): string {
    // Recursive sort keys
    const sortKeys = (o: any): any => {
        if (Array.isArray(o)) {
            return o.map(sortKeys);
        } else if (o !== null && typeof o === 'object') {
            return Object.keys(o).sort().reduce((acc, key) => {
                acc[key] = sortKeys(o[key]);
                return acc;
            }, {} as any);
        }
        return o;
    };
    return JSON.stringify(sortKeys(obj));
}

export function sha256Hex(input: Uint8Array | string): string {
    const hash = createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

export function validateExportSamples(samples: LearningSample[], options?: ExportOptions): { valid: LearningSample[]; invalid: Array<{ index: number; error: unknown }>; } {
    const valid: LearningSample[] = [];
    const invalid: Array<{ index: number; error: unknown }> = [];
    const mode = options?.mode || "fail_fast";

    for (let i = 0; i < samples.length; i++) {
        const sample = samples[i];
        const result = validateLearningSample(sample);
        if (result.valid) {
            valid.push(sample);
        } else {
            invalid.push({ index: i, error: result.errors });
            if (mode === "fail_fast") {
                // Stop immediately
                break;
            }
        }
    }
    return { valid, invalid };
}

export function exportLearningNdjson(samples: LearningSample[], options?: ExportOptions): string {
    const { valid, invalid } = validateExportSamples(samples, options);
    const mode = options?.mode || "fail_fast";

    if (mode === "fail_fast" && invalid.length > 0) {
        const firstError = invalid[0];
        const error: any = new Error(`Validation failed for sample at index ${firstError.index}`);
        error.code = "LEARNING_EXPORT_VALIDATION_FAILED";
        error.invalid_count = invalid.length;
        error.first_error_index = firstError.index;
        error.details = firstError.error;
        throw error;
    }

    if (valid.length === 0) {
        return "";
    }

    return valid.map(s => canonicalJsonLine(s)).join('\n') + '\n';
}

export function generateLearningManifestLite(args: { samples: LearningSample[]; ndjson: string; options?: ExportOptions }): LearningManifestLite {
    const { samples, ndjson, options } = args;
    const validation = validateExportSamples(samples, options);

    return {
        ...readTruthMeta(),
        exported_at: new Date().toISOString(),
        count: validation.valid.length,
        invalid_count: validation.invalid.length,
        ndjson_sha256: sha256Hex(ndjson),
        notes: []
    };
}
