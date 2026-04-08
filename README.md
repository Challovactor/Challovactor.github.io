# Breeze Ng Blog System

这个仓库现在已经从静态主页升级成了一个基于 **Jekyll + GitHub Pages** 的真正博客系统。

线上地址：

- `https://challovactor.github.io`
- 博客首页：`https://challovactor.github.io/blog/`
- 订阅源：`https://challovactor.github.io/feed.xml`

## 现在支持什么

- 首页自动展示最新文章
- `/blog/` 博客列表页
- `/categories/` 分类页
- `/search/` 站内搜索页
- Markdown 文章自动生成独立文章页
- 文章分类、分页、摘要、日期和阅读时长
- GitHub Issues 驱动的评论系统
- 站点访问统计
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
categories:
  - 智能体
reading_time: 4 min read
---
```

正文直接用 Markdown 写即可。

如果你想控制首页摘要，可以在正文里插入：

`<!--more-->`

## 评论系统

站点已经接入 `utterances`，评论会基于 GitHub Issues 工作。

当前配置仓库是：

`Challovactor/Challovactor.github.io`

如果评论区首次提示需要安装或授权 `utterances`，按页面提示完成一次即可。

## 访问统计

站点默认接入了 `Busuanzi` 的访客与访问量统计。

如果你后面想换成更完整的统计方案，也可以在 `_config.yml` 里填写：

- `analytics.goatcounter_site`
- `analytics.google_tag_id`

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
