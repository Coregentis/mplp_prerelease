import { MplpEvent } from '../observability/types';
import { LearningSample } from './types';
import { collectLearningSample } from './hooks';
import { validateLearningSample } from './validator';

export interface LearningCollectorConfig {
    enabled: boolean;
    maxBuffer?: number;
}

export class LearningCollector {
    private enabled: boolean;
    private maxBuffer: number;
    private buffer: LearningSample[] = [];

    constructor(config: LearningCollectorConfig) {
        this.enabled = config.enabled;
        this.maxBuffer = config.maxBuffer || 1000;
    }

    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    public onEvent(event: MplpEvent): void {
        if (!this.enabled) return;

        const sample = collectLearningSample(event);
        if (sample) {
            // Validate immediately (Fail-Fast / Drop Invalid)
            // Per Route B requirements: "validator PASS"
            const validation = validateLearningSample(sample);
            if (validation.valid) {
                if (this.buffer.length < this.maxBuffer) {
                    this.buffer.push(sample);
                } else {
                    // Drop policy: simple drop for now, or rotate?
                    // "drop_policy" was mentioned in user request.
                    // We'll just drop new ones to prevent OOM in this minimal implementation.
                    console.warn("[LearningCollector] Buffer full, dropping sample.");
                }
            } else {
                console.warn(`[LearningCollector] Generated invalid sample: ${validation.errors.map(e => e.message).join(', ')}`);
            }
        }
    }

    public flush(): LearningSample[] {
        const samples = [...this.buffer];
        this.buffer = [];
        return samples;
    }

    public clear(): void {
        this.buffer = [];
    }
}
