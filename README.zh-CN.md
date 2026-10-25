# PYP Marble Courses —— AI 生成的 IB PYP 在线课程练习 DEMO

> **这只是一个 DEMO，不是一套课程体系。** [`src/`](src/) 目录是一个面向
> 4–10 岁儿童、完全可玩的在线练习站点，由 AI 编程基于
> [Marble Skill Taxonomy](https://github.com/withmarbleapp/os-taxonomy) 和
> [ib-pyp-html5-generator](https://github.com/szkane/ib-pyp-html5-generator)
> 技能生成。它的意义在于展示"现在什么是可以做到的"，并邀请家长和老师
> 为自己的孩子构建**专属的个性化版本**。
>
> 🇬🇧 English: [README.md](README.md)

> **关于这个 fork：** 上游仓库
> （[withmarbleapp/os-taxonomy](https://github.com/withmarbleapp/os-taxonomy)）
> 是开放的 **Marble Skill Taxonomy**——一张描述"儿童学什么"的开放知识图谱：
> 1,838 个微主题、3,878 条前置依赖边、9 个学科，附课标对齐与教学研究数据。
> 本 fork 未改动任何数据；[`src/`](src/) 与 [`tools/`](tools/) 中的内容全部为新增。

## 你看到的是什么

一个静态站点（`src/`），包含 **317 个可玩课程页**——覆盖 taxonomy 中每一个
小学段（4–10 岁）"学科 × 主题域 × 年龄"组合（176 个策展簇 + 141 个自动派生
草稿课）。每门课程用 IB PYP 探究式框架包装真实的互动练习：

- **探究周期结构** —— 每门课程陈述中心思想与探究线索；活动按
  🔍 探索 → 💡 理解 → 🗂️ 词卡 → ⚡ 练习 → 🎯 学以致用 分阶段组织，
  随着孩子游玩，探究旅程徽章逐一点亮。
- **15 个游戏引擎 × 17 个动画画布场景** —— 带物理旋钮的概念实验室
  （分数披萨、位值积木、数轴、电路、概率转盘）、分类、时间线与生命周期
  排序、句子诊所、速算街机、带数值条的决策任务、记忆配对、单词拼装、
  可打印书写练习页，以及一个示范阅读策略的绘本引擎。
- **三个 3D 世界**（Three.js）—— 拖动地球模拟昼夜、太阳系巡游、
  压力驱动的火山实验室，均配有分年龄梯度的挑战案例。
- **按年龄带螺旋递进的课程内容** —— 低阶（4–6）/ 中阶（7–8）/ 高阶（9–10）
  玩的是**同样的游戏类型**，但内容永远取自**该年龄段自己的主题**：
  5 岁孩子把动物按"家庭"分类，9 岁孩子按"生态角色"分类；
  7 岁孩子在数轴上跳到 1,000，10 岁孩子在 10,000 的数轴上"先取整再调整"。
- **儿童优先的交互** —— 孩子只看到舞台；所有成人向内容收进
  "Grown-ups"面板。带"跟读高亮"的朗读 TTS、虚线下划线的词汇弹出解释、
  不泄露答案、无账号、无追踪、首次加载后完全离线可用。

## 试用

```bash
npm run build:site   # 从 data/ 重新生成 src/ 并校验全部内容
npm run serve:site   # 在 http://127.0.0.1:4173 提供 src/ 服务
```

打开首页，选学科和年龄，直接玩。构建是自校验的：
`tools/validate-content.mjs` 会对孩子能看到的一切做机器检查——每句文案、
每个题库、每个实验案例（不允许"开局即正确"的案例、不允许旋钮够不着的
目标、不允许不同年龄看到相同内容）——违规即构建失败。

`src/` 是纯静态文件，可部署到任何地方：仓库内置 GitHub Pages 工作流
（`.github/workflows/deploy-pages.yml`）与 Cloudflare Pages 配置
（`wrangler.toml`）。

## 内容从哪里来

```
data/topics.json            1,838 个微主题（年龄、领域、掌握证据、教学研究）
data/clusters.json          176 份面向家长的课程摘要
data/teaching-research.json 1,049 条教学研究记录
        │
        ▼
tools/lib/mapping.mjs        每个主题域手工编写的教学法：规范表征、
                             儿童语言释义、游戏配置（内容源头）
tools/lib/band-modes.mjs     按年龄带的互动内容（螺旋式课程）
tools/lib/lab-cases.mjs      按年龄带的实验挑战案例
        ▼
tools/build-site.mjs         派生 317 个静态课程页：探究框架、各引擎、
                             取自各年龄自有主题的词卡、独立的检测任务
        ▼
tools/validate-content.mjs   机器校验所有儿童可见内容
        ▼
src/                         DEMO 本体：静态、离线优先、零账号
```

底层的知识图谱——**1,838 个微主题、3,878 条前置依赖边、9 个学科**——来自
**[withmarbleapp/os-taxonomy](https://github.com/withmarbleapp/os-taxonomy)**，
本仓库是它的 fork。页面外壳、IB PYP 框架与交互模式来自
**[szkane/ib-pyp-html5-generator](https://github.com/szkane/ib-pyp-html5-generator)**。

## 真正的意义：为你的孩子构建专属版本

每个孩子的薄弱点都不一样，任何静态 DEMO 都无法针对性地解决——这从来
不是本项目的目标。项目的目标 是展示：个性化辅导所需的全部原料，现在已经
可以装进一台电脑：

1. **学习图谱。** taxonomy 把小学阶段拆解为带前置关系、年龄范围和掌握
   证据的细粒度微主题——"分数"不再是一个模糊的焦虑，而是一张具体、
   可检验的技能清单，以及每项技能赖以建立的前置知识。
2. **生成器。** ib-pyp-html5-generator 技能编码了"如何把一个学习目标
   变成一个精致、自包含的互动课程"——本仓库证明了它可以扩展到整站规模。
3. **AI 编程。** 这个 DEMO 由 AI 智能体完成，而不是工程团队。

我们建议家长和老师的工作流：

- 从孩子的**真实在校证据**出发——成绩单、批改过的作业、反复出错的那个
  知识点。
- 在 `data/topics.json` 里找到对应主题（纯 JSON——直接让 AI 帮你检索），
  沿着前置依赖边确定要先巩固什么。
- 让你的 AI 编程助手参照 ib-pyp-html5-generator 技能和本仓库的 `tools/`
  模式，针对这些主题生成定向课程：一节课只讲那个薄弱概念，使用适合你
  孩子的表征方式和难度。
- 从真实使用中迭代——哪里让孩子困惑、他们主动要求什么。
  这个循环（证据 → 主题 → 生成练习 → 观察）才是任何成品化产品都给不了的
  个性化。

这个 DEMO 是可行性证明。你的个性化版本不应该长得像这个仓库，
而应该长得像**你的孩子**。

## 仓库结构

```
data/                 Marble Skill Taxonomy（主题、簇、教学研究）
tools/                构建 + 校验流水线（纯 Node，无框架）
  lib/mapping.mjs         每主题域的教学法与游戏内容（内容源头）
  lib/band-modes.mjs      按年龄带的互动内容（螺旋式课程）
  lib/lab-cases.mjs       按年龄带的实验挑战案例
  build-site.mjs          数据 → 317 个静态课程页
  validate-content.mjs    儿童可见内容的机器校验（构建门禁）
src/                  生成的 DEMO 站点（只有 assets/ 是手工维护）
docs/                 设计文档、教学法审计、部署说明
.agents/…/marble-builder             课程设计技能（本仓库内）
~/.agents/skills/ib-pyp-html5-generator   页面外壳技能
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
- **字体与库** —— Baloo 2（SIL OFL）；Three.js、Konva、Rough.js、
  lottie-web（MIT，随仓库内置于 `src/assets/vendor/`，附许可文件）。
- 每个生成的课程页脚都同时致谢这两个项目。

## AI 生成说明

本 DEMO 的全部 `src/` 页面、引擎与分年龄内容——包括校验工具链和本
README——均由 **GLM 5.3-Flash** 与 **GLM 5.3**（Z.ai）通过 AI 编程会话
生成。taxonomy 数据本身归 Marble 所有。
