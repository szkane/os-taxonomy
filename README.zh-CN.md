# PYP Marble Courses —— AI 生成的 IB PYP 在线探究学习站点 DEMO

> **这只是一个 DEMO，不是一套封闭的固定课程体系。** [`src/`](src/) 目录是一个面向
> **小学学段（5–10 岁 / 幼儿园大班至小学五年级，K–G5）**、完全可玩的在线探究与练习站点，由 AI 编程基于
> [Marble Skill Taxonomy](https://github.com/withmarbleapp/os-taxonomy)、
> [`/marble-builder`](.agents/skills/marble-builder/SKILL.md) 技能以及
> [ib-pyp-html5-generator](https://github.com/szkane/ib-pyp-html5-generator)
> 技能共同生成。它的意义在于展示"现在什么是可以做到的"，并邀请家长和老师
> 为自己的孩子构建**专属的个性化学习版本**。
>
> 🇬🇧 English: [README.md](README.md)

> **关于这个 fork：** 上游仓库
> （[withmarbleapp/os-taxonomy](https://github.com/withmarbleapp/os-taxonomy)）
> 是开放的 **Marble Skill Taxonomy**——一张描述"儿童学什么"的结构化知识图谱：
> 1,838 个微主题、3,878 条前置依赖边、9 个学科，附带官方课标对齐与教学研究数据。
> 本 fork 完整保留并尊重底层图谱数据；[`src/`](src/) 与 [`tools/`](tools/) 的全部交互与生成体系为全新构建。

## 你看到的是什么

一个纯静态站点（`src/`），包含 **304 个完全可玩的小学课程页面**，涵盖
**66 个核心知识领域**——严格对应小学学段（5–10 岁 / K–G5），实现
**跨年级零内容泄漏（Zero Cross-Grade Leakage）**。每门课程将高互动性操作深度融入 IB PYP 超学科探究框架：

- **100% 探索先行（Explore-First）探究导入** —— 304 门课程无一例外均以视觉交互式仿真（`phase: 'explore'`）开篇，彻底摒弃知识点生灌与静态卡片开局：包括 Canvas/Konva 2D 概念实验室、Three.js 3D 仿真世界，或带名师思维出声（Think-Aloud）的绘本剧场。
- **全游戏引擎标配双阶段 `🔭 探索 → 挑战` 流水线** —— 每一个互动引擎内部都严格先探索后答题：
  - *概念实验室与 3D 仿真*：默认停留在自由操作的 `[🔭 探索]` 标签页（提交按钮隐匿），让孩子自由拨动旋钮、旋转 3D 模型；
  - *分类整理器*：提供 `[🔭 探索条目]` 聚焦卡片与朗读解释，再切入 `[🧺 分类挑战]`；
  - *时间线与周期链*：提供逐级拆解的 `[🔭 探索阶段]`，再切入 `[🧩 排序挑战]`；
  - *句子诊所*：先通过 `[🔭 探索规则]` 试验止血贴如何修复标点/大小写，再问诊病例；
  - *情境决策*：先在 `[🔭 探索仪表]` 沙盒体验选项如何影响身心数值，再启程多幕探究；
  - *记忆翻牌*：先在 `[🔭 认识配对]` 中明牌对照与听音，再进入翻牌消除；
  - *单词工坊*：先在 `[🔭 探索单词]` 预览自然拼读与词根积木，再敲击散落字母拼装。
- **探究好奇卡（Inquiry Wonder Cards）与 POE 探究任务反思**：
  - `flashcards` 升维为**探究好奇卡**（正面 `🤔 好奇引导` → 背面 `💡 探索发现` + `🔬 留心观察实践`）；
  - `mission` 独立任务采用"预测-观察-解释"（POE）提问法，展示核心概念聚焦徽章与常见思维误区干扰项；任务通关后引入可交互的 **IB 学习者素养反思** 模块（`🔍 积极探究`、`🧠 勤于思考`、`🌱 及时反思`、`💬 善于交流`）。
- **18 个游戏交互引擎 × 32 个动态仿真场景**：
  - **12 个 2D 互动引擎**：`concept-lab`（带缓动插值旋钮与环境粒子层）、`sorter`、`sequence`、`decision`、`doctor`、`flashcards`、`arcade`、`memory`、`word-builder`、`worksheet`、`storybook`（带 Rough.js 与 58 个纯手绘矢量舞台角色），以及 `mission`。
  - **6 个 Three.js 3D 仿真引擎**：赛璐珞风格地球自转昼夜实验室（`spatial3d`）、3D 太阳系轨道巡礼（`solar3d`）、岩浆压力火山断层模拟器（`volcano3d`）、3D 几何立体与多面体检视器（`geometry3d`）、3D 光线阴影与材质透光工作室（`optics3d`），以及 3D 分层微缩世界（`diorama3d`，覆盖地壳地幔、海洋垂直光区、地球群落、化石岩层、地貌与人类文明演进）。
  - **32 个 Canvas 2D 动态实验室场景（`scenes.js`）**：双十格阵（Ten-frame）、多跨度数轴（0–100 / 1,000 / 10,000）、分数数轴（连通小数与百分比）、多列位值积木（百/十/个 与 千/百/十/个）、7位大数位值表、二维坐标网格与量角器、指针与24小时双显时钟（附经过时间扇区）、双容量量筒与 3D 立方厘米积木、水分蒸发凝结循环、生态食物网动态平衡、心率呼吸与氧气输送、双盆对照公平实验台、海龟走步与循环编程、4位二进制灯泡开关、历史纪元证据旋钮、收支储蓄天平与正念呼吸花园。
- **严密按单一年龄（5、6、7、8、9、10 岁）螺旋递进** —— 各年级拥有**完全独立、量身定制的学习内容与案例，严禁跨年级借用**：
  5 岁孩子在十格阵与苹果框中探究 10 以内的数与合成；7 岁孩子在千以内数轴上整百大跳；10 岁孩子在万以内位值与 3D 容积中进行多步代数运算。
- **儿童优先、无障碍护眼设计** —— 孩子操作界面纯净无冗余，UOI 超学科单元与教学研究笔记默认收录在"👩‍🏫 家长与教师"折叠抽屉中；支持 TTS 语音跟读高亮朗读、专业词汇虚线下划线轻点释义、无答案泄露、深浅色模式严格对比度保障、无账号、无行为追踪、全离线本地运行。

## 试用

```bash
npm run build:site             # 从 data/ 重新生成全部 304 门课程页面并运行机器质检门禁
node tools/audit/age-fit.mjs   # 审计全站 66 个领域在各年龄段的表征契合度与螺旋递进
npm run serve:site             # 在本地 http://127.0.0.1:4173 启动纯静态预览
```

打开索引主页（`src/index.html`），可按学科或年级（`K, G1, G2, G3, G4, G5`）即时筛选试玩。构建过程实现完全自校验：

- `tools/validate-content.mjs` 自动检验每一个儿童可见文本、题库选项、旋钮极值与可解性，杜绝"开局即答对"或不同年级内容重复的缺陷；
- `tools/audit/age-fit.mjs` 实时复核 66 个领域在各学段的表征是否过载或过时（目前报告为 `Flag counts: {}`，零偏差）。

`src/` 均为零外部依赖的纯静态网页：自带开箱即用的 GitHub Pages 工作流（`.github/workflows/deploy-pages.yml`）与 Cloudflare Pages 配置（`wrangler.toml`）。

## 内容从哪里来

```
data/topics.json            1,838 个微主题（对应年龄、领域、掌握证据、教学研究）
data/clusters.json          176 份结构化课程摘要
data/teaching-research.json 1,049 条真实教学研究与常见思维误区数据
        │
        ▼
tools/lib/mapping.mjs        各主题域教学法：规范数学/科学表征、儿童语言释义表
tools/lib/band-modes.mjs     分年龄带游戏数据配置
tools/lib/lab-cases.mjs      分年龄带实验挑战题库
tools/lib/age-curriculum.mjs 逐岁（5..10）仿真映射与细化特化层
        ▼
tools/build-site.mjs         精准生成 304 个静态小学课程页面：
                             涵盖探究框架、18 个引擎、32 个场景、探究好奇卡与 POE 任务
        ▼
tools/validate-content.mjs   自动化严密校验全站儿童可见文本与逻辑（构建门禁）
        ▼
src/                         生成物：静态、零网络依赖、全离线可用站点
```

底层的知识图谱——**1,838 个微主题、3,878 条前置依赖边、9 个学科**——来自
**[withmarbleapp/os-taxonomy](https://github.com/withmarbleapp/os-taxonomy)**。
页面外壳、IB PYP 框架与交互模式来自
**[szkane/ib-pyp-html5-generator](https://github.com/szkane/ib-pyp-html5-generator)**
与 **marble-builder** 技能。

## 真正的意义：为你的孩子构建专属版本

每个孩子的知识结构与卡点都截然不同，任何静态制作的内容库都无法做到真正的个性化。本项目的真正使命在于证明：**高水准定制化教学软件的全部原材料，现在已经可以放进一台普通电脑**：

1. **结构化图谱。** taxonomy 将小学知识全部分解为带有明确依赖关系、年龄阶段和可观察掌握证据（"我能够..."）的微技能——"几何"或"分数"不再是宽泛的焦虑，而是一张脉络清晰、一步一脚印的探索路线图。
2. **教学代码生成器。** ib-pyp-html5-generator 与 marble-builder 技能固化了"如何将抽象教学目标转化为高质量视觉互动仿真、3D 空间探究与任务挑战"的专业方法论。
3. **AI 智能编程。** 从 32 个手绘级仿真画布到 6 个三维引擎，再到自动化审计测试系统，皆由 Agent 级 AI 辅助构建与打磨。

推荐家长和教育者的实践路线：

- 从孩子在学校的**真实反馈**出发——比如作业本上反复出现的概念模糊、或者孩子自己好奇提问的话题。
- 在 `data/topics.json` 与 `data/dependencies.json` 中检索对应的微技能条目，逆向追溯底层依赖，找出真正需要巩固的先验积木。
- 让 AI 智能助手参考本仓库的 `tools/` 流程与 `src/assets/` 引擎架构，为孩子量身定制一个专属探究页面：从探索模拟开篇，配合趣味练习、好奇卡片与自我反思。
- 陪伴孩子游玩并持续观察反馈——在这个闭环中，个性化教育不再是昂贵的壁垒。

## 仓库结构

```
data/                     Marble Skill Taxonomy（主题、簇、教学研究、依赖边）
tools/                    构建、分级细化与质检流水线（Node ESM）
  lib/mapping.mjs             领域教学法与核心配置（规范表征源头）
  lib/band-modes.mjs          分年龄带交互题库
  lib/lab-cases.mjs           分年龄带实验挑战设计
  lib/age-curriculum.mjs      逐岁仿真解析与模式定制
  lib/derive.mjs              课程派生逻辑（杜绝跨年级借用）
  lib/pages.mjs               HTML 页面渲染模板（课程页与导航聚合页）
  build-site.mjs              生成 304 个静态小学课程页面
  validate-content.mjs        全站内容自动化校验器（构建门禁）
  audit/age-fit.mjs           常态化年级契合度与螺旋递进审计工具
src/                      生成的静态站点（仅 assets/ 为手工编写源文件）
  courses/*.html              304 个独立课程单页
  assets/js/scenes.js         32 个 Canvas/Konva 2D 仿真场景
  assets/js/engines/*.js      18 个互动游戏引擎（12 个 2D + 6 个 Three.js 3D）
docs/                     架构设计、课程映射表、IB对齐说明、教学法审计报告
.agents/…/marble-builder  课程设计技能
```

## 致谢与许可

- **Marble Skill Taxonomy** —— 本仓库 fork 自
  [withmarbleapp/os-taxonomy](https://github.com/withmarbleapp/os-taxonomy)；
  taxonomy 数据及其文本内容 © Generative Spark, Inc. (Marble)，
  采用 **ODbL 1.0**（数据库）与 **CC BY-SA 4.0**（内容）许可。
  必需署名：*"Marble Skill Taxonomy (v1) · © Generative Spark, Inc. (Marble)
  · https://withmarble.com"*。完整条款见 [LICENSE](LICENSE)、
  [LICENSE-CONTENT](LICENSE-CONTENT)、[PROVENANCE.md](PROVENANCE.md)。
- **ib-pyp-html5-generator** —— 页面外壳、IB PYP 框架与交互模式，
  作者 [szkane](https://github.com/szkane/ib-pyp-html5-generator)。
- **字体与底层库** —— Baloo 2（SIL OFL）；Three.js、Konva、Rough.js、
  lottie-web（MIT 许可，随仓库内置于 `src/assets/vendor/`）。
- 生成的每一个独立课程页面页脚均明确致谢以上开源项目。

## AI 生成与优化说明

本 DEMO 的全部 `src/` 页面、18 个互动引擎、32 个 Canvas 仿真场景、Three.js 3D 仿真以及自动化测试套件，均在智能体编程会话中由 **Gemini 4 Argon**、**Gemini 3.8 Flash** 与 **GLM 5.3** 等模型迭代打磨生成。taxonomy 知识体系数据本身归 Marble 所有。
