# 便签应用

一个轻量级的静态便签应用。

## 特点

- 📝 **简易发布** - 通过 Python 脚本添加便签
- 🏷️ **标签管理** - 支持多标签分类和过滤
- 📱 **响应式设计** - 适配手机和电脑
- 🎨 **简约主题** - 浅黄配色，清爽界面

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

### 提交便签

```bash
git add data/notes.json
git commit -m "添加便签：便签标题"
git push
```

## 项目结构

```
.
├── assets/               # 静态资源
├── css/
│   └── main.css          # 样式
├── data/
│   └── notes.json        # 便签数据库
├── js/
│   ├── app.js            # 主逻辑
│   └── renderer.js       # 渲染器
├── scripts/
│   └── add_note.py       # 便签添加脚本
├── index.html            # 主页面
├── README.md             # 本文件
└── NOTE_FORMAT.md        # 便签格式规范
```

## 本地预览

启动本地服务器：

```bash
python -m http.server 8000
```

访问 http://localhost:8000

## 许可证

MIT
