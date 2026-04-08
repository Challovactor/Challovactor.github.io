# Breeze Ng Blog System

这个仓库现在已经从静态主页升级成了一个基于 **Jekyll + GitHub Pages** 的真正博客系统。

线上地址：

- `https://challovactor.github.io`
- 博客首页：`https://challovactor.github.io/blog/`
- 订阅源：`https://challovactor.github.io/feed.xml`

## 现在支持什么

- 首页自动展示最新文章
- `/blog/` 博客列表页
- Markdown 文章自动生成独立文章页
- 文章标签、摘要、日期和阅读时长
- GitHub Pages 原生托管，不需要额外服务器

## 怎么写新文章

把新文章放进 `_posts/` 目录，文件名格式：

`YYYY-MM-DD-your-title.md`

示例：

`2026-04-09-my-next-post.md`

文章头部使用 front matter：

```yaml
---
title: 文章标题
date: 2026-04-09 09:00:00 +0800
post_type: Build Log
summary: 一句话摘要
tags:
  - LLM
  - Agent
reading_time: 4 min read
---
```

正文直接用 Markdown 写即可。

如果你想控制首页摘要，可以在正文里插入：

`<!--more-->`

## 本地预览

如果本机装了 Ruby 和 Bundler，可以运行：

```bash
bundle install
bundle exec jekyll serve
```

然后打开：

`http://127.0.0.1:4000`

## 关键目录

- `_config.yml`：Jekyll 配置
- `_layouts/`：页面模板
- `_posts/`：博客文章
- `blog/index.html`：博客列表页
- `styles.css`：全站样式
- `script.js`：动效脚本
