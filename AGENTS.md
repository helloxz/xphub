# XPHub

## 项目概述

XPHub 产品官网，展示 xiaoz 的所有产品（私有部署、SaaS、开发者工具），支持中英文双语。

- **线上地址**：部署到根域名（如 xphub.com）
- **本地开发**：`pnpm dev` → http://localhost:5173

## 技术栈

| 项 | 选型 |
|---|------|
| 包管理 | pnpm |
| 构建 | Vite 8（多页面模式） |
| CSS | Tailwind CSS 4（`@tailwindcss/vite` 插件） |
| JS | Alpine.js 3（轻量数据驱动） |
| 图标 | Font Awesome 7（`@fortawesome/fontawesome-free`） |
| 统计 | `https://tj.rss.ink/custom.js`（Umami 自建统计） |
| 字体 | Google Fonts — Inter |

## 项目结构

```
xphub/
├── package.json
├── vite.config.js          # Vite + Tailwind 插件 + 多页面入口
├── index.html              # 英文版首页（/）
├── zh/
│   └── index.html          # 中文版首页（/zh/）
├── src/
│   ├── css/main.css        # @import "tailwindcss" + Font Awesome
│   ├── js/main.js          # Alpine.js 初始化 + 语言检测 + 微信二维码
│   └── i18n/
│       ├── zh.json         # 中文翻译 + 产品数据
│       └── en.json         # 英文翻译 + 产品数据
├── public/
│   └── favicon.svg         # 紫色 "X" 图标
└── dist/                   # 构建产物
```

## 中英文方案

- 路径前缀：`/` = 英文，`/zh/` = 中文
- 语言检测：`<html lang="en|zh-CN">` → `main.js` 根据 `lang` 属性加载对应 JSON
- 语言切换：Navbar 右上角按钮（英文版显示"中文" → `/zh/`，中文版显示"EN" → `/`）
- 两个 HTML 结构**完全相同**，仅 `<html lang>` 和 `<title>/<meta description>` 不同
- 所有文案和产品数据存于 `src/i18n/{zh,en}.json`，通过 `Alpine.data('app', { t: i18n })` 注入

## 产品线

### 私有部署（Self-Hosted）— indigo 配色
| 产品 | 描述 | 链接 |
|------|------|------|
| Zdir | 轻量级多功能文件分享程序 | https://www.zdir.pro/zh/ |
| ZMark | 现代化书签管理与网址导航（OneNav 重构版） | https://www.zmark.app/ |
| ZNote | 轻量级笔记应用 | https://znote.xphub.dev/ |
| OneNav | 经典 PHP 书签管理工具 | https://www.onenav.top/ |
| Zurl | 简洁易用的短链接系统 | https://github.com/helloxz/zurl |

### SaaS 服务 — emerald 配色
| 产品 | 描述 | 链接 |
|------|------|------|
| ImgURL | 免费图片托管服务 | https://www.imgurl.org/ |
| 图链 PicLink | 图片转链接服务 | https://go.piclink.cc/ |
| TCP.mk | 网络工具箱 | https://tcp.mk/ |

### 开发者工具 — amber 配色
| 产品 | 描述 | 链接 |
|------|------|------|
| ZOCR | 基于 PP-OCRv6 的 OCR 识别 API | https://github.com/helloxz/zocr |
| ZNSFW | 色情图像识别 API | https://github.com/helloxz/znsfw |

## 页面结构（单页锚点导航）

```
Navbar     — 粘性毛玻璃，Logo 左、菜单右（私有部署 / SaaS / 开发者工具 / 关于）+ 语言切换
Hero       — 渐变背景，品牌 Slogan + CTA 按钮
Products   — 三个分类区，每区标题 + 描述 + 响应式卡片网格
About      — 灰底区，介绍作者和产品理念
Contact    — 4 个圆形图标按钮：微信（弹出二维码）、X、Telegram、QQ
Footer     — 深色底，「其它链接」+ 友情链接 + JS 动态年份
```

## 卡片布局约定

- 整体 `block`，等高等宽（`flex flex-col h-full`）
- 图标居中 `w-12 h-12` + 标题居中 `text-center`
- 描述 `text-left`，底部链接 `mt-auto flex justify-center`
- **无** tag 标签，无 hover 位移（`-translate-y-1` 已移除）
- 三种分类独立配色：indigo / emerald / amber
- 鼠标悬浮：`hover:shadow-xl` + 对应色 border

## 联系区约定

- 仅圆形图标按钮，不展示文字（避免高度不一致）
- 微信点击弹出二维码浮层（`absolute bottom-16` 居中定位，`@click.outside` 关闭）
- 二维码图片 URL 和提示文案在 i18n JSON 的 `contact` 字段中

## 设计约定

- Navbar 不包含"首页"和"产品"链接（用户要求移除）
- "关于"在 Navbar 中定位到 #about，而非 #contact
- `scroll-mt-20` 用于所有跳转目标，防止固定菜单遮挡
- 所有可点击元素需有 `cursor-pointer`
- Footer 年份用 `new Date().getFullYear()` 动态生成
- i18n JSON 中 `products.*.tags` 字段保留但卡片中不渲染（以备后用）

## 命令

```bash
pnpm dev      # 开发服务器 → http://localhost:5173
pnpm build    # 生产构建 → dist/
pnpm preview  # 预览构建产物
```

## 部署

- `vite.config.js` 中 `base` 默认为 `/`
- 如部署到子路径（如 `example.com/xphub/`），需设 `base: '/xphub/'`
- 产物 `dist/` 可直接部署到任意静态托管（Nginx、GitHub Pages、Vercel 等）

## 联系人 / 社交链接

- 微信：xiaozme（二维码：`https://img.rss.ink/imgs/2024/03/29/66eff523c3907130.png`）
- X：https://x.com/xiaozblog
- Telegram：https://t.me/xiaozme
- QQ：337003006
- 博客：https://blog.xiaoz.org/
- 商城：https://shop.xiuping.net/