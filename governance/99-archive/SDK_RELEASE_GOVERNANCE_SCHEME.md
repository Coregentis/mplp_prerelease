# MPLP SDK Release Governance

## Method-Driven Documentation & Verification Scheme

> **Status**: Authoritative Blueprint
> **Purpose**: Define *what documents exist*, *what each must prove*, and *how each is verified*
> **Audience**: Governance authors (Claude), reviewers (you), auditors (later)

---

## 总体定位（必须写在总 README）

SDK Release Governance 是：

* 一个 **后验证阶段（Post-Evidence）治理体系**
* 一个 **派生可信源（Derived Trusted Source）分发规范**
* 一个 **面向用户真实安装与使用的完整闭环**

它 **不是**：

* Protocol Spec
* Schema 定义
* Validation Lab
* SDK 教程

---

## 一、治理目录结构（必须固定）

```
governance/
└── sdk-release/
    ├── README.md
    ├── METHOD-SDKR-01_RELEASE_PIPELINE.md
    ├── METHOD-SDKR-02_DERIVATION_RULES.md
    ├── METHOD-SDKR-03_VERSIONING_LAW.md
    ├── METHOD-SDKR-04_PACKAGE_CONTENT_SPEC.md
    ├── METHOD-SDKR-05_RELEASE_MANIFEST.md
    ├── METHOD-SDKR-06_POST_INSTALL_VERIFICATION.md
    ├── METHOD-SDKR-07_INCIDENT_AND_ROLLBACK.md
    └── CHECKLIST-SDK-RELEASE.md
```

**少一个 = 不完整**
**多一个 = 必须说明必要性**

---

## 二、每份文档必须解决的问题

### 1️⃣ README.md — 治理入口锚点（非执行）

**必须回答的问题**：

* SDK Release Governance 解决什么治理问题？
* 它在 MPLP 整体治理体系中的位置？
* 与 Evidence Baseline、Validation Lab 的关系？
* 谁可以启动 SDK Release？

**验证点**：

* 是否明确写出：> "SDK 发布只能发生在 Evidence Baseline 冻结之后"
* 是否明确 SDK **不是协议权威**

---

### 2️⃣ METHOD-SDKR-01 — Release Pipeline Method

**Pipeline Stages（顺序不可变）**：

1. Precondition Check
2. Derivation Build
3. Package Assembly
4. Manifest Binding
5. Registry Publish
6. Post-Install Verification
7. Release Seal

**每阶段必须说明**：

* 输入是什么（来自哪些 Truth / Derived Sources）
* 产出是什么
* 失败条件是什么
* 是否允许跳过（99% 情况下不允许）

**验证点**：

* 是否明确"未通过前置 Gate 不得进入下一阶段"
* 是否把 Phase 0–7 作为硬性前提引用

---

### 3️⃣ METHOD-SDKR-02 — Derivation Rules（派生法则）

**必须明确**：

* 哪些内容 **必须从 schema 派生**
* 哪些内容 **可以代码生成**
* 哪些内容 **绝对禁止人工定义**

| SDK 内容 | 来源 | 是否允许人工 |
|:---|:---|:---:|
| Enum | schema enum | ❌ |
| 字段类型 | schema | ❌ |
| 校验规则 | schema | ❌ |
| Builder API | schema + mapping | ⚠️（需声明） |

**验证点**：

* 是否存在 "for convenience" / "developer friendly" 这种模糊措辞（❌）
* 是否强制要求 derivation traceability

---

### 4️⃣ METHOD-SDKR-03 — Versioning Law

**必须定义**：

* SDK 版本号与哪些事实绑定（protocol version / evidence-baseline tag）
* SDK 是否允许独立 Major / Minor
* 什么情况必须 bump version
* 什么情况 **禁止发布**

**验证点**：

* 是否禁止 SDK 擅自推进协议语义
* 是否明确 SDK 版本 ≤ Protocol Version（逻辑上）

---

### 5️⃣ METHOD-SDKR-04 — Package Content Specification

**TypeScript SDK 包必须包含**：

* 哪些目录
* 哪些文件类型
* 哪些文件必须存在
* 哪些文件绝对禁止出现

**Python SDK 同理**

**必须明确**：

* governance / manifests / schemas 原文是否允许打包
* README 是否必须存在，写什么

**验证点**：

* 内容是否全部可溯源
* 是否存在"隐藏规则"或"经验约定"

---

### 6️⃣ METHOD-SDKR-05 — Release Manifest

**必须定义**：

* Manifest 是 **强制**
* Manifest 缺失 = 发布非法
* Manifest 字段列表

**Manifest 最小字段**：

* protocol_version
* evidence_baseline_tag
* truth_source_bundle_hash
* sdk_package_version
* generation timestamp

**验证点**：

* 是否绑定 evidence-baseline hash
* 是否明确 manifest 不参与协议语义

---

### 7️⃣ METHOD-SDKR-06 — Post-Install Verification

**必须定义**：

* 使用 `npm install` / `pip install`
* 用户视角验证哪些能力
* 哪些失败属于 **发布事故**

**验证点**：

* 是否明确"不是本地仓库验证"
* 是否要求真实 registry 下载

---

### 8️⃣ METHOD-SDKR-07 — Incident & Rollback

**必须说明**：

* SDK 发布失败属于什么级别事件
* 是否必须创建 Incident Record
* 是否允许 Yank / Deprecate / Rollback
* 是否影响 Evidence Baseline（通常不影响）

---

### 9️⃣ CHECKLIST — Release 审计清单

* 给 **人 + CI + 审计** 用
* 必须是 **Yes / No** 项
* 不得有解释性语言

---

## 三、给 Claude 的唯一指令

```
请严格按照以下治理方案生成文档：

* 每一个 METHOD 文件独立成文
* 不合并、不简化、不省略
* 使用 MUST / MUST NOT / SHALL
* 不写实现代码
* 不引入新概念

这是治理工件，不是技术博客。
```

---

## 四、工作顺序

1. 把 **这份 Scheme** 给 Claude
2. Claude 先生成 **README + METHOD-SDKR-01**
3. 拿回来做 **Method-级审计**
4. 逐步放行后续 METHOD

---

**Document Status**: Authoritative Blueprint (Method-Level)
**Authority**: MPGC
**Usage**: Writing instruction for SDK Release governance documents
