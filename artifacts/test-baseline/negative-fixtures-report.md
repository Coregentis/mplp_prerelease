# E+2 Negative Fixtures Expected-Fail Report

**Date**: 2026-01-01T17:21:10.729Z  
**Status**: ✅ **PASS**

---

## Summary

| Metric | Value |
|--------|-------|
| Total Negative Fixtures | 6 |
| Correctly Failed | 6 |
| Incorrectly Passed/Wrong Keyword | 0 |

---

## Gate Criteria

> **Negative fixtures must FAIL schema validation with expected AJV keyword.**

| Condition | Required | Actual | Status |
|-----------|----------|--------|--------|
| All fixtures FAIL with expected keyword | 100% | 6/6 | ✅ |

**Gate Result**: **PASS**

---

## Validation Results

### ✅ context_invalid_uuid.json

**Schema**: `mplp-context.schema.json`

**Expected Keyword**: `pattern`

**Actual Keywords**: `[pattern]`

**Result**: Correctly failed with expected keyword: pattern

**AJV Errors**:
- `/context_id` [pattern]: must match pattern "^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"

---

### ✅ context_missing_required.json

**Schema**: `mplp-context.schema.json`

**Expected Keyword**: `required`

**Actual Keywords**: `[required]`

**Result**: Correctly failed with expected keyword: required

**AJV Errors**:
- `(root)` [required]: must have required property 'context_id'

---

### ✅ context_extra_forbidden.json

**Schema**: `mplp-context.schema.json`

**Expected Keyword**: `additionalProperties`

**Actual Keywords**: `[additionalProperties, pattern]`

**Result**: Correctly failed with expected keyword: additionalProperties

**AJV Errors**:
- `/meta` [additionalProperties]: must NOT have additional properties
- `/context_id` [pattern]: must match pattern "^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"

---

### ✅ context_invalid_datetime.json

**Schema**: `mplp-context.schema.json`

**Expected Keyword**: `format`

**Actual Keywords**: `[format, pattern]`

**Result**: Correctly failed with expected keyword: format

**AJV Errors**:
- `/meta/created_at` [format]: must match format "date-time"
- `/context_id` [pattern]: must match pattern "^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"

---

### ✅ confirm_invalid_enum.json

**Schema**: `mplp-confirm.schema.json`

**Expected Keyword**: `enum`

**Actual Keywords**: `[pattern, pattern, enum]`

**Result**: Correctly failed with expected keyword: enum

**AJV Errors**:
- `/confirm_id` [pattern]: must match pattern "^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"
- `/target_id` [pattern]: must match pattern "^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"
- `/status` [enum]: must be equal to one of the allowed values

---

### ✅ plan_step_missing_id.json

**Schema**: `mplp-plan.schema.json`

**Expected Keyword**: `required`

**Actual Keywords**: `[required, pattern, pattern, required]`

**Result**: Correctly failed with expected keyword: required

**AJV Errors**:
- `(root)` [required]: must have required property 'objective'
- `/plan_id` [pattern]: must match pattern "^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"
- `/context_id` [pattern]: must match pattern "^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"

---

## Verification Independence

> This validation uses **AJV only** against `schemas/v2`.
> It is independent of TS/Python SDK runtime implementations.
> TS runtime-compat failures do not affect this gate.
