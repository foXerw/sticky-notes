# 便签应用

一个基于 GitHub Pages 的轻量级静态便签应用。

## 特点

- 🚀 **零成本托管** - 使用 GitHub Pages 免费托管
- 📝 **简易发布** - 通过提交代码发布新便签
- 🏷️ **标签管理** - 支持多标签分类和过滤
- 📱 **响应式设计** - 适配手机和电脑
- 🎨 **单色主题** - 简洁清爽的界面

## 快速开始

### 1. 部署到 GitHub

```bash
# 克隆或创建仓库后
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. 启用 GitHub Pages

1. 进入仓库 Settings → Pages
2. Source 选择 "GitHub Actions"
3. 等待部署完成

### 3. 访问便签

访问 `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## 添加便签

使用 Python 脚本添加便签：

```bash
# 基本用法
python scripts/add_note.py "这是便签内容"

# 带标签
python scripts/add_note.py "重要事项" --tags "工作，重要"

# 置顶便签
python scripts/add_note.py "置顶通知" --tags "公告" --pinned
```

### 发布便签到 GitHub

```bash
git add data/notes.json
git commit -m "添加便签：便签标题"
git push
```

GitHub Actions 会自动部署，几分钟后即可访问。

## 项目结构

```
.
├── .github/workflows/    # GitHub Actions 配置
├── assets/               # 静态资源
├── data/
│   └── notes.json        # 便签数据库
├── scripts/
│   └── add_note.py       # 便签添加脚本
├── src/
│   ├── index.html        # 主页面
│   ├── css/
│   │   └── main.css      # 样式
│   └── js/
│       ├── app.js        # 主逻辑
│       └── renderer.js   # 渲染器
├── README.md             # 本文件
└── NOTE_FORMAT.md        # 便签格式规范
```

## 本地预览

直接用浏览器打开 `src/index.html` 即可预览（需要 `data/notes.json` 中有数据）。

## 许可证

MIT
