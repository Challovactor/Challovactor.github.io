---
title: 用 WSL2 + CUDA + PyTorch 搭一套稳定的开发环境
date: 2026-01-30 09:00:00 +0800
post_type: Tutorial
categories:
  - 环境搭建
reading_time: 7 min read
summary: "如果你在 Windows 上做 AI 开发，WSL2 往往是更稳的方案，关键是把驱动、CUDA 与 Python 版本协同好。"
---

对于很多需要兼顾办公软件和 AI 开发的人来说，`Windows + WSL2` 仍然是性价比很高的组合。

<!--more-->

## 1. 为什么我推荐 WSL2

它的优势主要有三点：

- Linux 工具链更完整
- 与 VS Code 远程开发配合顺手
- 比双系统更容易维护

如果你的主要工作是训练、推理、脚本和服务联调，WSL2 足够好用。

## 2. 先确认宿主机驱动

很多人会误以为要在 WSL2 里单独装完整显卡驱动，其实更关键的是宿主机的 NVIDIA 驱动版本要正确。

检查顺序建议是：

1. Windows 驱动正常
2. WSL2 能看到 GPU
3. 框架再去匹配 CUDA

## 3. PyTorch 不要盲目追新

我更建议按“项目兼容性”选版本，而不是按“最新版本”选版本。

优先确认：

- 你要用的 PyTorch 版本
- 对应 CUDA 轮子是否存在
- 依赖的视觉库是否兼容

## 4. 开发层和训练层分开

我通常会准备两个环境：

- `dev`：偏轻量，用于脚本、验证、接口开发
- `train`：偏完整，用于训练和重依赖实验

这样能减少“为了跑一个训练环境，把所有本地项目都绑死”的问题。

## 5. 最后做一次基线测试

至少跑通：

```python
import torch
print(torch.cuda.is_available())
print(torch.cuda.get_device_name(0))
```

只有这一步稳定通过，后面的框架安装才有意义。
