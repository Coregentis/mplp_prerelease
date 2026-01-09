# MPLP 官网视觉系统 v1.0

颜色 / 排版 / 组件规范（适配 Next.js + Tailwind）

目标：让 MPLP 的整体观感达到「协议级、基础设施级」，而不是普通 SaaS 网站。

---

## 1. 设计原则（Design Principles）

1. **Protocol-first**：优先强调「协议、结构、稳定性」，避免过度花哨。
2. **High-contrast, dark-first**：主场景为深色模式，营造「控制室 / 控制面板」气质。
3. **Structured geometry**：大量采用几何结构、网格、分层面板，呼应 4 层架构与 PSG。
4. **Calm, not noisy**：少量纯色 + 渐变，用来强调信息层级，而不是堆砌效果。
5. **Readable density**：信息密度较高，但行距、字号和留白要保证阅读舒适。

---

## 2. 色彩系统（Color System）

### 2.1 品牌主色（Brand Palette）

| Token            | Hex       | 用途说明                      |
| ---------------- | --------- | ------------------------- |
| `mplp-blue`      | `#1A73E8` | 核心品牌色、链接、主按钮背景            |
| `mplp-blue-soft` | `#3B82F6` | 辅助蓝色、渐变中间色                |
| `mplp-cyan`      | `#5ADEFF` | 高亮、流向箭头、AEL/VSL 相关元素      |
| `mplp-indigo`    | `#6366F1` | 二级突出、Flow 标题              |
| `mplp-emerald`   | `#10B981` | 成功 / 安全 / Governance 相关状态 |

### 2.2 中性色（Neutrals）

深色主题基于 slate：

* 背景主色：`#020617`（`slate-950`）
* 次级背景：`#020617` ~ `#0F172A`（`slate-900`）
* 面板背景：`#020617` ~ `#020617CC` 叠加边框
* 文本：`slate-100` / `slate-300` / `slate-400`
* 边框：`slate-800`

推荐统一：

* **主背景**：`bg-slate-950`
* **面板背景**：`bg-slate-950/80` + `border-slate-800`
* **分隔线**：`border-slate-800`

### 2.3 语义色（Semantic Colors）

| 类型      | 颜色                      | 用途             |
| ------- | ----------------------- | -------------- |
| Success | `#10B981` (emerald-500) | 流程通过、状态 OK     |
| Warning | `#EAB308` (yellow-500)  | 配置警告、兼容性风险     |
| Error   | `#F97373` (red-400)     | 违反协议、断言失败、治理拒绝 |
| Info    | `#38BDF8` (sky-400)     | 提示、信息徽标        |

### 2.4 渐变（Gradients）

推荐渐变：

```css
background-image: linear-gradient(
  90deg,
  #3B82F6 0%,
  #5ADEFF 40%,
  #6366F1 100%
);
```

Tailwind 表示（示意）：

```tsx
className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400"
```

---

## 3. 排版系统（Typography）

### 3.1 字体

* UI / 正文：`Inter`, system-ui, -apple-system, sans-serif
* 代码 / Schema：`IBM Plex Mono` 或 `JetBrains Mono`

Tailwind 配置：

* `font-sans`: Inter
* `font-mono`: IBM Plex Mono / JetBrains Mono

### 3.2 字号与层级

| 用途         | Tailwind 类              | 示例                             |
| ---------- | ----------------------- | ------------------------------ |
| Hero 标题    | `text-4xl md:text-5xl`  | “MPLP — The Agent OS Protocol” |
| Section 标题 | `text-2xl`              | “Why MPLP”                     |
| 小标题        | `text-lg` / `text-base` | 卡片标题                           |
| 正文正文       | `text-sm` / `text-base` | 主内容、介绍                         |
| 次级说明       | `text-xs`               | 标签、辅助说明                        |
| 代码         | `text-xs font-mono`     | JSON、YAML、Schema 片段            |

### 3.3 Eyebrow（章节眉标题）

用于区分大段内容，如 “WHY MPLP”、“GOLDEN FLOWS”。

样式：

```tsx
<p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
  Why MPLP
</p>
```

---

## 4. 布局与间距（Layout & Spacing）

### 4.1 容器宽度

* 最大宽度：`max-w-6xl`（页面主内容）
* Hero 区域：两列布局 `grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]`
* 最外层居中：`mx-auto px-4 sm:px-6 lg:px-8`

### 4.2 间距基础

使用 Tailwind 标准 4px 系列即可：

* Section 竖向间距：`mt-20`、`space-y-24`
* 卡片内部 padding：`p-4` 或 `p-5`
* Section 内顶部 margin：`mt-8` / `mt-6`

### 4.3 圆角与阴影

**圆角标准：**

* 卡片 / 面板：`rounded-2xl`（16px）
* 按钮 / 标签：`rounded-full` / `rounded-xl`
* 大面积容器（Hero 卡）：`rounded-3xl`

**阴影：**

* 面板阴影：`shadow-xl shadow-blue-500/20`（只在少数重要卡片，用于强调）
* 按钮阴影仅主要 CTA 使用，避免视觉噪音。

---

## 5. 背景与装饰（Background & Chrome）

### 5.1 全局背景

推荐结构：

* 基础：`bg-slate-950`
* 上层叠加：
  * 顶部蓝色圆形光晕
  * 右下角青色光晕
  * 中央径向渐变（模拟控制室）

### 5.2 面板与卡片

* 背景：`bg-slate-950/80`
* 边框：`border border-slate-800`
* 内部再用 `bg-slate-900/60` 做小层级

---

## 6. 组件规范（Component System）

### 6.1 Header / Navigation

* 左侧：Logo + 项目名 + Subtitle
* 中间：主导航
* 右侧：主 CTA

### 6.2 按钮（Buttons）

1. **Primary / Filled**: `bg-blue-500 text-white`
2. **Secondary / Outline**: `border border-slate-700 bg-slate-900/70`
3. **Tertiary / Text**: `text-slate-400 hover:text-slate-100`

### 6.3 Section Header

* Eyebrow（蓝小标题）
* Title（白色主标题）
* Description（灰色说明）

### 6.4 卡片（Cards）

* **ProblemCard**
* **LayerCard**
* **FlowCard**

核心风格：`rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs`

### 6.5 标签 / Badge

用于状态（Frozen / Experimental / Draft）。

### 6.6 图示（Diagram Blocks）

* 块级容器：`rounded-3xl border border-slate-800 bg-slate-950/90 p-5`

---

## 7. 交互与动效（Interaction & Motion）

### 7.1 Hover / Focus

* Hover: 颜色略微变亮, `transition-colors duration-150`
* Focus: `outline-none ring-2 ring-blue-500/60 ring-offset-2 ring-offset-slate-950`

### 7.2 动画（可选）

* Section 入口可以使用轻微的 fade-up 效果。
* 禁止大范围、频繁晃动的动效。

---

## 8. 深浅主题（Dark / Light Mode）建议

当前 v1.0 可以只提供 **Dark-only**。

---

## 9. 文档站对齐（与 Docusaurus / docs 站）

* 使用相同的品牌蓝：`#1A73E8`
* 标题字体保持 Inter + 相同粗细
* 代码块背景统一：`#020617` 或接近的深色
* 链接颜色尽量统一（hover 变浅）