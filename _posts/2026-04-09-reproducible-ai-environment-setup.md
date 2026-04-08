---
title: 一套可复用的 AI 开发环境搭建方案
date: 2026-04-09 09:30:00 +0800
post_type: Tutorial
categories:
  - 环境搭建
tags:
  - Python
  - uv
  - Conda
  - CUDA
reading_time: 7 min read
summary: "从 Python 版本、依赖管理到 CUDA 环境，整理一套适合 AI 项目的可复用开发环境搭建方法。"
---

做 AI 项目时，很多问题不是出在模型本身，而是出在环境不稳定、依赖不可复现、不同机器结果不一致。

<!--more-->

这篇文章分享一套我自己更推荐的环境搭建方式，目标很明确：

1. 新机器能快速拉起。
2. 团队成员尽量少踩环境坑。
3. 训练、推理、实验和部署尽可能复现。

## 1. 先分层，不要把所有事情都交给一个工具

我一般把环境拆成四层：

1. 操作系统层：Windows / Linux / WSL2。
2. Python 运行时层：例如 `3.10` 或 `3.11`。
3. 依赖管理层：例如 `uv`、`pip`、`poetry`。
4. 加速与驱动层：CUDA、cuDNN、显卡驱动。

一个常见错误是把这些混成一团，最后一旦升级某个包，就不知道到底是哪一层出了问题。

## 2. 我的基础建议

如果你现在主要做 AI 应用和研究，我推荐：

- Python 用 `3.10` 或 `3.11`
- 虚拟环境用 `uv venv` 或 `conda`
- 包安装优先通过 `uv pip` 或 `pip`
- 项目根目录一定保留 `requirements.txt` 或锁文件

我自己的偏好是：

- 纯 Python 应用项目：优先 `uv`
- 依赖较重、涉及 CUDA 的训练环境：优先 `conda`

## 3. 一个比较稳的目录结构

```text
project/
  app/
  notebooks/
  scripts/
  data/
  requirements.txt
  README.md
  .python-version
```

这里有两个关键点：

1. 依赖文件不要缺。
2. README 一开始就写清 Python 版本、启动方式和 CUDA 要求。

## 4. 推荐的初始化步骤

### 方案 A：应用型项目用 uv

```bash
uv venv
.venv\Scripts\activate
uv pip install -r requirements.txt
```

如果是 Linux / macOS：

```bash
source .venv/bin/activate
```

### 方案 B：训练型项目用 conda

```bash
conda create -n ai310 python=3.10 -y
conda activate ai310
pip install -r requirements.txt
```

训练项目不要一上来装太多东西，先验证这三步：

1. `python -V`
2. `pip list`
3. `torch.cuda.is_available()`

## 5. CUDA 环境最容易踩的坑

在深度学习项目里，我最常见到的问题有三个：

1. 驱动版本够了，但 CUDA Toolkit 版本不匹配。
2. PyTorch 装成了 CPU 版。
3. 一台机器能跑，换另一台机器就不行。

建议做法：

- 先看官方支持矩阵，再决定安装哪个版本的 PyTorch
- 项目里写清楚 `torch`、`cuda`、`python` 的组合
- 别靠记忆装环境，命令直接写进 README

例如：

```python
import torch
print(torch.__version__)
print(torch.cuda.is_available())
print(torch.version.cuda)
```

## 6. 项目启动前一定做的检查

每次开始新项目，我会先确认：

- Python 版本是否一致
- 依赖是否能一键安装
- GPU 是否可用
- 数据路径是否固定
- 是否写好了最小启动脚本

如果这些还没有准备好，就不要急着开始训练或开发主逻辑。

## 7. 一个更实用的原则

环境搭建不是“装完就结束”，而是你整个工程体系的一部分。

如果一个项目不能让你在新机器上 30 分钟内重新跑起来，那它就还不够成熟。

我自己更喜欢把环境搭建看作第一篇技术文档。它写得越清楚，项目后面越省时间。
