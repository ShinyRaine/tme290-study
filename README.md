# TME290 备考站

TME290 / FIM764 Autonomous Robots（Chalmers）2026 年 8 月补考备考网站。纯静态站点，无构建步骤。

## 页面

- `index.html` — 复习计划：摸底诊断、考点权重、学习方法、日程、钓鱼题清单、考场策略
- `handbook.html` — 原理复习手册：术语表、判断方法、8 个知识块（原理 + 三年真题演练）
- `exam.html` — 交互式模拟卷：60 题判断题，计时、本地保存进度、交卷判分 + 逐题解析
- `wrongbook.html` — 错题本：交卷时自动收错题/留空，支持跨端同步（见下）
- `api/errors.js` — Vercel Serverless Function，错题本云端读写（无 Next.js / 无依赖）
- `sync.js` — 前端错题本存储 + 同步逻辑

## 本地预览

直接用浏览器打开 `index.html`，或：

```sh
python3 -m http.server 8000
```

## 部署

静态文件，可直接部署到 Vercel / GitHub Pages / 任何静态托管。

> 错题本的跨端同步依赖 `api/errors.js`，只有 **Vercel**（会把 `api/` 识别为
> Serverless Function）才生效；GitHub Pages 等纯静态托管上错题本仍可用，但只本机保存。

## 错题本跨端同步（一次性配置，免费）

1. Vercel 项目 → **Storage** → Marketplace 里接入 **Upstash Redis**（或 Vercel KV），
   绑定到本项目。Upstash 免费额度（256MB / 每月约 50 万次命令）远够单人使用。
2. 接入后 Vercel 会自动注入环境变量（`KV_REST_API_URL/…TOKEN` 或
   `UPSTASH_REDIS_REST_URL/…TOKEN`），`api/errors.js` 会自动读取，无需手填。
3. 重新部署一次。之后在「错题本」页填一个只有你知道的**同步口令**，换设备输同样口令即可看到同一份错题本。

未配置时错题本不会报错，只是退化为“仅本机保存”。
