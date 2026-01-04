# Changelog

## [1.0.6] - 2025-12-29
### Added
- **SA Profile Implementation**: Added `validateSAProfile` and updated `ExecutionEngine` to enforce 9 normative invariants and emit full event lifecycle.
- **MAP Profile Implementation**: Added `validateMAPProfile` and `CoordinationEngine` to support multi-agent sessions, turn-taking, and invariant enforcement.
- **Type Definitions**: Comprehensive types for `SAContext`, `SAPlan`, `MAPSession`, `MAPParticipant`, and related events.



This package follows the global MPLP Protocol changelog.

See: https://github.com/coregentis/MPLP-Protocol/blob/main/CHANGELOG.md

### 1.0.3 – 2025-12-05

- Changed: Applied MPLP v1.0.x governance headers across all TS source files and docs.
- Changed: Cleaned npm package contents (removed debug/internal files).
- Note: No protocol or API changes; packaging and governance metadata only.