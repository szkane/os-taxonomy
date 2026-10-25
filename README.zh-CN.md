<div align="center">

# PYP Marble Courses

### AI 智能驱动 · 探究优先的 IB PYP 小学在线学习与练习平台（5–10 岁 / 幼儿园大班至小学五年级 K–G5）

[![在线试玩](https://img.shields.io/badge/演示-在线体验中心-brightgreen?style=for-the-badge&logo=googlechrome&logoColor=white)](https://szkane.github.io/os-taxonomy/)
[![课程数量](https://img.shields.io/badge/课程-304%20门独立单页-4ECDC4?style=for-the-badge)](https://szkane.github.io/os-taxonomy/)
[![对应学段](https://img.shields.io/badge/学段-K%20至%20G5%20(5--10岁)-FFE156?style=for-the-badge)](#课程体系与分级螺旋)
[![探究教学法](https://img.shields.io/badge/教学法-IB%20PYP%20探究循环-FF6584?style=for-the-badge)](#ib-pyp-探究教学架构)
[![互动引擎](https://img.shields.io/badge/引擎-18%20款互动引擎%20(6款3D)-B388FF?style=for-the-badge)](#互动仿真与游戏引擎矩阵)
[![开源许可](https://img.shields.io/badge/许可-ODbL%20%2F%20CC%20BY--SA%204.0-blue?style=for-the-badge)](#致谢与知识产权)

<p align="center">
  <a href="https://szkane.github.io/os-taxonomy/"><strong>立即体验在线演示 »</strong></a>
  <br />
  <br />
  <a href="#演示视频">演示视频</a>
  ·
  <a href="#界面截图">界面截图</a>
  ·
  <a href="#核心特色">核心特色</a>
  ·
  <a href="#互动仿真与游戏引擎矩阵">交互引擎</a>
  ·
  <a href="#ib-pyp-探究教学架构">教学体系</a>
  ·
  <a href="#课程体系与分级螺旋">课程体系</a>
  ·
  <a href="#快速上手">快速上手</a>
  ·
  <a href="README.md">English Version</a>
</p>

</div>

---

> [!NOTE]
> **项目定位与背景：** 本仓库是一个由 AI 智能体编排与生成的全开源小学探究学习平台。基于开源 [**Marble Skill Taxonomy**](https://github.com/withmarbleapp/os-taxonomy) 知识图谱（包含 1,838 个学习微主题、3,878 条前置依赖关系、9 大学科）、[`/marble-builder`](.agents/skills/marble-builder/SKILL.md) 体验设计规范，以及 [**ib-pyp-html5-generator**](https://github.com/szkane/ib-pyp-html5-generator) 技能，精准生成 **304 门纯静态、全离线可用的小学探究课程单页**，严格对应 **5–10 岁（幼儿园大班至小学五年级 / K–G5）**。

---

## 演示视频

<p align="center">
  <video src="docs/demo.mp4" width="100%" controls playsinline></video>
</p>

<p align="center">
  🌐 <strong>在线体验中心：</strong> <a href="https://szkane.github.io/os-taxonomy/"><strong>https://szkane.github.io/os-taxonomy/</strong></a>
</p>

---

## 界面截图

<p align="center">
  <img src="docs/Screenshot_1.png" alt="课程聚合主页与年级多维筛选" width="100%">
</p>

<p align="center">
  <img src="docs/Screenshot_2.png" alt="探究课程发现与 3D 微缩世界" width="100%">
</p>

<p align="center">
  <img src="docs/Screenshot_3.png" alt="2D 概念实验室操作实景" width="100%">
</p>

<p align="center">
  <img src="docs/Screenshot_4.png" alt="Three.js 3D 几何立体检视器" width="100%">
</p>

---

## 核心特色

- **100% 探索先行（Explore-First）探究导入**  
  全站 304 门课程无一例外均以视觉交互式仿真（`phase: 'explore'`）开篇，彻底摒弃生硬讲授或静态答题卡开场——包括 Canvas/Konva 2D 概念实验室、Three.js 3D 仿真世界，或带名师思维出声的绘本剧场。
- **全引擎标配两阶段 `🔭 探索 → 挑战` 流水线**  
  所有游戏引擎均把自由发现置于考查之前：
  - *概念实验室与 3D 世界*：开局处于无评判自由操作的 `[🔭 探索]` 标签页（提交按钮隐匿）；
  - *分类整理器*：提供 `[🔭 探索条目]` 聚焦卡片与朗读解释，再切入分类挑战；
  - *时间线与循环链*：提供逐级拆解的 `[🔭 探索阶段]`，再进入排序构建；
  - *句子诊所*：先通过 `[🔭 探索规则]` 演示止血贴如何治愈错词，再诊断病句；
  - *情境决策*：先在 `[🔭 探索仪表]` 沙盒体验选项如何影响数值，再启程多幕决策；
  - *记忆翻牌*：先在 `[🔭 认识配对]` 中明牌对照与听音，再进入翻牌消除；
  - *单词工坊*：先在 `[🔭 探索单词]` 预览自然拼读与词根积木，再敲击散落字母拼装。
- **探究好奇卡（Wonder Cards）与 POE 探究反思**  
  `flashcards` 升维为**探究好奇卡**（正面 `🤔 好奇引导` → 背面 `💡 探索发现` + `🔬 留心观察实践`）；`mission` 任务采用"预测-观察-解释"（POE）提问法，展示核心概念聚焦徽章与常见思维误区干扰项；任务通关后引入可交互的 **IB 学习者素养反思** 模块（`🔍 积极探究`、`🧠 勤于思考`、`🌱 及时反思`、`💬 善于交流`）。
- **跨年级零内容泄漏（Zero Cross-Grade Leakage）**  
  严格按单一年龄（5、6、7、8、9、10 岁）分级隔离。每门课程的学习目标、好奇卡片、认知误区陷阱和独立任务均严格源自该年级本身，杜绝低龄内容进入高年级、或高龄内容拔苗助长。
- **儿童优先、无障碍护眼架构**  
  孩子操作界面纯净无冗余，UOI 超学科单元与教学研究笔记默认收录在"👩‍🏫 家长与教师"折叠抽屉中；支持 TTS 语音跟读高亮朗读、专业词汇虚线下划线轻点释义、无答案泄露、深浅色模式严格对比度保障、无账号、无行为追踪、全离线本地运行。

---

## 互动仿真与游戏引擎矩阵

平台包含 **18 款互动游戏引擎**，由 **32 个 Canvas 2D 动态实验室场景** 与 **6 个 Three.js 3D 虚拟空间** 强力驱动：

### 18 款核心交互引擎

| 阶段 | 引擎名称 | 底层技术 | 主要教学应用场景 |
| :--- | :--- | :--- | :--- |
| **Explore** | `concept-lab` | HTML5 Canvas / Konva.js | 连续物理量旋钮仿真（涵盖 32 个专属科学与数学场景） |
| **Explore** | `storybook` | Rough.js + Konva (58 角色) | 纸偶剧场互动绘本，带猫头鹰导师出声思考与关键停顿点 |
| **Explore** | `spatial3d` | Three.js (WebGL) | 赛璐珞风格地球自转、太阳光照与昼夜晨昏线模拟 |
| **Explore** | `solar3d` | Three.js (WebGL) | 3D 太阳系轨道巡礼与各大行星特征检视 |
| **Explore** | `volcano3d` | Three.js (WebGL) | 地壳岩浆压力升降、板块俯冲构造与火山喷发机制 |
| **Explore** | `geometry3d` | Three.js (WebGL) | 3D 空间立体与多面体（正方体/棱柱/棱锥/圆柱/圆锥/球体）面棱顶点检视器 |
| **Explore** | `optics3d` | Three.js (WebGL) | 3D 光线投射、角度旋转、动态阴影投射与透明/半透明/镜面材质工作室 |
| **Explore** | `diorama3d` | Three.js (WebGL) | 3D 分层微缩世界（地壳地幔、海洋垂直光区、地球群落、化石岩层、地貌文明） |
| **Understand** | `sorter` | 原生 DOM + 新野兽派 | 两阶段概念分类整理，带聚焦卡片与随时撤回重选机制 |
| **Understand** | `sequence` | 原生 DOM + 补间动画 | 时间线年表、因果工艺流程与闭环生命周期排序器 |
| **Understand** | `decision` | 动态多维状态仪表 | 道德抉择、科学安全与生活技能情境沙盒与多幕决策任务 |
| **Understand** | `doctor` | 文本词法解析器 | 句子小诊所：诊断并治愈大小写、标点、时态与用词偏差 |
| **Cards** | `flashcards` | CSS 3D 翻转 + Web Speech | 探究好奇卡：好奇提问、发现翻转、现实线索与语音朗读 |
| **Practice** | `arcade` | Canvas 精灵动画循环 | 流畅度限时街机挑战，文字始终清晰，支持低龄点击发音 |
| **Practice** | `memory` | 双面卡牌逻辑引擎 | 先明牌听音认识配对关系，再进入趣味翻牌消除挑战 |
| **Practice** | `word-builder` | 语音与词素切分器 | 依据音节、音素字母组合与前后缀积木拼装散落字母 |
| **Practice** | `worksheet` | 专用打印引擎 (`@media print`)| 规范英文四线三格手写练习纸与竖式数学计算打印工作室 |
| **Consolidate**| `mission` | 评价与反思引擎 | POE 探究诊断、常见认知误区陷阱辨析与 IB 学习者素养自我反思 |

### 32 个 Canvas 2D 动态仿真场景（`scenes.js`）

- **数学领域**：`counters`（苹果加法）、`tenframe`（双十格阵凑十桥）、`numberline`（0–20, 0–100 数轴）、`numberlineXL`（0–1,000, 0–10,000 数轴）、`array`（乘法点阵）、`fractions`（披萨面积模型）、`fractionline`（分数数轴 ↔ 小数 ↔ 百分比）、`placevalue`（百十个积木）、`placevalue2`（千百十个积木）、`pvchart`（7 位大数位值表）、`counting`（饼干罐）、`shape`（多边形构造器）、`coordgrid`（平面直角坐标与量角器）、`measure`（30cm 刻度尺）、`balance`（天平）、`clock`（时钟与经过时间）、`capacity`（双量筒与 3D 体积积木）、`databar`（统计柱状图）、`pattern`（珠子规律机）、`spinner`（概率转盘）。
- **科学领域**：`sound`（振幅与音调）、`light`（光源距离与阴影）、`forces`（斜面高度与摩擦阻力）、`circuit`（串并联电路）、`states`（水的三态与粒子运动）、`humanbody`（心率呼吸与氧气输送）、`watercycle`（蒸发凝结降水）、`ecosystem`（阳光→生产者→消费者食物网）、`fairtest`（双盆对照公平实验台）。
- **计算与数字素养**：`codeturtle`（海龟走步与循环编程）、`binarylab`（4 位二进制开关与译码器）。
- **英语与人文学科**：`wordwave`（语流波形与音节拍手）、`timemachine`（五大历史纪元证据旋钮）。
- **生活技能与个人成长**：`marketlab`（收支预算与小猪储蓄罐）、`mindgarden`（正念呼吸光环与大脑成长花园）。

---

## IB PYP 探究教学架构

平台将 **IB 幼小项目（PYP）** 探究循环转化为儿童在每个课程舞台上清晰可见的五个探究阶段：

```
[ 🔭 自由探索 ] ──▶ [ 💡 理解建构 ] ──▶ [ 🗂️ 好奇卡片 ] ──▶ [ ⚡ 巩固练习 ] ──▶ [ 🎯 综合反思 ]
  物理与3D仿真        分类归纳与排序      词汇发现与现实线索      流畅度与词语建构      POE探究诊断与素养反思
```

1. **引入与发现（🔭 探索）**：让孩子在没有任何压力的情况下自由拨动旋钮、调整变量、旋转 3D 模型，观察世界如何反馈。
2. **整理与归纳（💡 理解）**：通过分类、生命周期排列、诊断错词、权衡决策，将感性观察升华为理性认知。
3. **语言与联结（🗂️ 好奇卡片）**：以好奇心为驱动（`你发现了什么？`），结合发音将概念转化为语言工具。
4. **深入探究（⚡ 练习）**：通过拼词、记忆配对、书写打印与限时街机，将认知巩固为娴熟能力。
5. **反思与行动（🎯 综合反思）**：通过 POE 任务检验独立解决问题的能力，并在完成时主动反思本次探究所展现的 **IB 学习者素养**（积极探究、勤于思考、及时反思、善于交流）。

---

## 课程体系与分级螺旋

全站 **304 门课程** 深度映射 **66 个学科领域**，涵盖 9 大核心方向：

```
幼儿园大班 (5岁)  ──▶  一年级 (6岁)  ──▶  二年级 (7岁)  ──▶  三年级 (8岁)  ──▶  四年级 (9岁)  ──▶  五年级 (10岁)
  具象实物感知          十格阵跨十进位       千以内数轴大跳       时钟与经过时间计算     7位大数位值表         3D立体几何与体积
  苹果框与10以内组合    十与一拆分积木       多位数进退位加减     等分阵列与乘法引入     平面直角坐标网格       小数与百分数转化
```

### 严格的年级螺旋递进准则

- **幼儿园大班（5岁）**：以具象实物为主，单变量旋钮，十格阵，饼干罐，短提示语（≤110字符）。
- **小学一年级（6岁）**：过渡至十格阵凑十法，百以内数，2/5/10 跳数，自然拼读字母组合拼词。
- **小学二至三年级（7–8岁）**：千以内数轴心算，百十个位值积木，指针与24小时制时钟计算，食物网生态链。
- **小学四至五年级（9–10岁）**：7 位大数位值调节，万以内数轴估算，二维直角坐标网格，3D 立方厘米体积计算，Three.js 3D 几何多面体与三维光学透镜实验室。

---

## 快速上手

### 环境要求

- Node.js (推荐 v18.0.0 或更高版本)
- 现代浏览器 (Chrome, Safari, Firefox 或 Edge)

### 本地安装与运行

```bash
# 克隆代码仓库
git clone https://github.com/szkane/os-taxonomy.git
cd os-taxonomy

# 安装开发与测试依赖（仅用于本地脚本运行）
npm install

# 重新生成全站 304 门课程并执行自动化检验门禁
npm run build:site

# 启动本地静态服务器
npm run serve:site
# 在浏览器中访问 http://localhost:4173
```

### 自动化质检门禁

项目内置严密的代码与内容质量审查工具：

```bash
# 审计全站 66 个领域在各学段的表征契合度与螺旋递进
node tools/audit/age-fit.mjs
# 预期输出: Flag counts: {} (全站零偏差、零违规)

# 运行基础知识图谱与 DAG 依赖测试
npm test && npm run validate
```

---

## 数据与构建流水线架构

```
data/
  ├── topics.json            (1,838 个带有掌握证据的微技能条目)
  ├── clusters.json          (176 份结构化课程聚类大纲)
  ├── dependencies.json      (3,878 条前置依赖 DAG 有向无环图边)
  └── teaching-research.json (1,049 条真实教学法与认知误区研究数据)
             │
             ▼
tools/
  ├── lib/mapping.mjs        (学科领域教学法映射与儿童语言释义表)
  ├── lib/band-modes.mjs     (分年龄段交互游戏内容配置)
  ├── lib/lab-cases.mjs      (分学段仿真实验挑战题库)
  ├── lib/age-curriculum.mjs (按单一年龄 5..10 解析仿真与引擎特化)
  ├── lib/derive.mjs         (课程派生核心逻辑：杜绝跨年级泄漏)
  └── lib/pages.mjs          (新野兽派 HTML 课程单页与聚合主页模板)
             │
             ▼
  [ tools/build-site.mjs ] ──▶ 在 src/courses/*.html 生成 304 个独立可玩单页
             │
             ▼
  [ tools/validate-content.mjs ] ──▶ 自动化质检：任何文案超长、旋钮越界均中断构建
```

---

## 项目初心：为你的孩子定制专属学习体系

任何通用型静态平台都无法替代针对孩子个体的因材施教。本项目的核心目标在于证明：**高品质定制化教学软件的全部原材料，现在已经可以放进一台普通家用电脑**：

1. **结构化认知图谱**：Marble 知识图谱把小学教育拆解为细致入微、带前置关联和清晰掌握标准（"我能够..."）的微技能单元，让抽象概念变得一清二楚。
2. **教学代码生成范式**：`ib-pyp-html5-generator` 与 `marble-builder` 规范沉淀了如何把教学目标转化为高质量互动仿真与探究挑战的标准化流程。
3. **智能体驱动编程**：从 32 个互动画布到 6 款 3D WebGL 引擎，全套体系皆通过 AI 结对编程落地。

### 推荐家长与教育者的实践路线

1. **从日常作业切入**：定位孩子当下最困惑、最常出错或最感兴趣的一个具体知识点。
2. **在图谱中追根溯源**：在 `data/topics.json` 中检索该技能，并沿着 `data/dependencies.json` 向上查找真正需要先巩固的前置认知基石。
3. **让 AI 生成专属课**：借助本仓库的 `tools/` 与 `src/assets/` 架构，为孩子定制一个纯粹聚焦该概念的探究网页：有自由探索的模拟器、有直观的动手操作、有现实线索与复盘反思。
4. **陪伴与持续迭代**：观察孩子的反应，根据他们的疑惑随时调整，让教育回归温暖而独特的个性化关怀。

---

## 仓库目录一览

```
├── data/                    # Marble Skill Taxonomy 知识图谱数据库
├── tools/                   # Node ESM 构建、分级特化与质检流水线
│   ├── lib/                 # 教学法映射、年级解析与 HTML 模板
│   ├── build-site.mjs       # 主静态站点生成脚本
│   ├── validate-content.mjs # 自动化质检构建门禁
│   └── audit/age-fit.mjs    # 常态化年级契合度与螺旋递进审计工具
├── src/                     # 可直接部署的纯静态站点（零外部依赖）
│   ├── index.html           # 带有即时筛选的多维聚合主页
│   ├── courses/             # 304 门独立的小学课程页面（5–10岁）
│   └── assets/              # 手工精心打磨的 CSS、核心运行时、引擎与仿真场景
├── docs/                    # 教学法审计报告、架构设计规范与媒体资源
└── .agents/                 # AI Agent 技能库与设计体系
```

---

## 致谢与知识产权

- **Marble Skill Taxonomy**  
  本项目 fork 自 [withmarbleapp/os-taxonomy](https://github.com/withmarbleapp/os-taxonomy)。图谱数据与原始文本版权归 © Generative Spark, Inc. (Marble) 所有，遵循 **ODbL 1.0**（数据库）与 **CC BY-SA 4.0**（内容）开源许可。必需署名：*"Marble Skill Taxonomy (v1) · © Generative Spark, Inc. (Marble) · https://withmarble.com"*。完整条款参见 [LICENSE](LICENSE)、[LICENSE-CONTENT](LICENSE-CONTENT) 与 [PROVENANCE.md](PROVENANCE.md)。
- **ib-pyp-html5-generator**  
  页面外壳框架、IB PYP 探究体系与游戏交互模式设计者为 [szkane](https://github.com/szkane/ib-pyp-html5-generator)。
- **字体与开源底层库**  
  Baloo 2 字体（SIL OFL 许可）；Three.js、Konva.js、Rough.js 与 lottie-web（MIT 许可，随仓库本地内置于 `src/assets/vendor/` 目录下）。

---

## AI 生成与优化声明

本仓库中的全部 `src/` 课程页面、18 款互动游戏引擎、32 个 Canvas 仿真场景、6 款 Three.js 3D 仿真环境以及自动化质检套件，均在智能体编程会话中由 **Gemini 4 Argon**、**Gemini 3.8 Flash** 与 **GLM 5.3** 等模型迭代打磨完成。
