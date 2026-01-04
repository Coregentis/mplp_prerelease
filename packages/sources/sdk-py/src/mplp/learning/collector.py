from typing import List, Optional
from ..observability.types import MplpEvent
from .types import LearningSample
from .hooks import collect_learning_sample
from .validator import validate_learning_sample

class LearningCollector:
    def __init__(self, enabled: bool = False, max_buffer: int = 1000):
        self.enabled = enabled
        self.max_buffer = max_buffer
        self.buffer: List[LearningSample] = []

    def set_enabled(self, enabled: bool):
        self.enabled = enabled

    def on_event(self, event: MplpEvent):
        if not self.enabled:
            return

        sample = collect_learning_sample(event)
        if sample:
            # Validate immediately (Fail-Fast / Drop Invalid)
            validation = validate_learning_sample(sample)
            if validation.valid:
                if len(self.buffer) < self.max_buffer:
                    self.buffer.append(sample)
                else:
                    print("[LearningCollector] Buffer full, dropping sample.")
            else:
                print(f"[LearningCollector] Generated invalid sample: {validation.errors}")

    def flush(self) -> List[LearningSample]:
        samples = list(self.buffer)
        self.buffer = []
        return samples

    def clear(self):
        self.buffer = []
