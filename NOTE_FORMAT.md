# 便签格式规范

本文档说明如何编写和提交便签。

## 添加便签

使用提供的 Python 脚本添加便签，**不要直接编辑 `data/notes.json`**。

### 脚本位置

```
scripts/add_note.py
```

### 基本用法

```bash
python scripts/add_note.py "便签内容"
```

### 完整参数

```bash
python scripts/add_note.py "内容" [--tags "标签 1，标签 2"] [--pinned]
```

| 参数 | 说明 | 是否必需 |
|------|------|----------|
| `content` (位置参数) | 便签正文内容 | 是 |
| `--tags`, `-t` | 标签列表，用逗号或空格分隔 | 否 |
| `--pinned`, `-p` | 是否置顶 | 否 |

### 示例

```bash
# 简单便签
python scripts/add_note.py "今天天气不错"

# 带标签
python scripts/add_note.py "完成项目报告" --tags "工作，待办"

# 多标签（空格分隔）
python scripts/add_note.py "学习计划" -t "学习 自我提升"

# 置顶便签
python scripts/add_note.py "重要通知：明天开会" -t "公告" -p
```

## 便签数据结构

脚本会自动生成以下字段：

```json
{
  "id": "20260330120000000",      // 唯一 ID（时间戳 + 微秒）
  "title": "便签标题",              // 自动提取内容第一行
  "date": "2026-03-30",           // 日期（自动生成）
  "timestamp": 1743321600,        // Unix 时间戳（自动生成）
  "tags": ["工作", "重要"],        // 标签列表（可选）
  "content": "便签正文内容",        // 完整内容
  "pinned": false                 // 是否置顶（可选）
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 唯一标识符，基于时间戳生成 |
| `title` | string | 标题，自动取自内容第一行（最长 50 字） |
| `date` | string | 创建日期，格式 `YYYY-MM-DD` |
| `timestamp` | number | Unix 时间戳，用于排序 |
| `tags` | array | 标签字符串数组 |
| `content` | string | 便签完整内容 |
| `pinned` | boolean | 是否置顶，置顶便签排在前面 |

## 内容格式

便签内容支持简单的 Markdown 语法：

| 语法 | 效果 | 示例 |
|------|------|------|
| `**文本**` | 粗体 | `**重要**` → **重要** |
| `*文本*` | 斜体 | `*注意*` → *注意* |
| `` `代码` `` | 行内代码 | `` `print()` `` → `print()` |
| `[文本](URL)` | 链接 | `[Google](https://google.com)` |

### 内容示例

```bash
python scripts/add_note.py "今天完成了 **重要项目** 的第一阶段！

下一步计划：
- 进行测试
- 编写文档
- 部署上线

参考链接：[项目文档](https://example.com)" --tags "工作，进度"
```

## 标签命名规范

- 使用简短的中文或英文
- 避免特殊字符
- 推荐标签：
  - 工作相关：`工作`, `项目`, `会议`, `待办`
  - 个人相关：`生活`, `学习`, `健康`, `财务`
  - 重要性：`重要`, `紧急`, `参考`

## 发布流程

1. **本地添加便签**
   ```bash
   python scripts/add_note.py "内容" --tags "标签"
   ```

2. **验证数据**（可选）
   ```bash
   cat data/notes.json
   ```

3. **提交到 Git**
   ```bash
   git add data/notes.json
   git commit -m "添加便签：标题"
   git push
   ```

4. **等待部署**
   - GitHub Actions 会自动构建
   - 通常 1-2 分钟内完成
   - 访问 GitHub Pages 查看新便签

## 注意事项

1. **不要直接编辑 `notes.json`** - 使用脚本确保格式正确
2. **内容不要过长** - 建议每条便签不超过 500 字
3. **标签数量适中** - 建议每条便签 2-5 个标签
4. **谨慎使用置顶** - 置顶便签会一直显示在顶部

## 常见问题

### Q: 脚本报错怎么办？

确保 Python 3 已安装：
```bash
python --version
```

### Q: 如何修改便签？

目前不支持在线编辑。需要：
1. 本地修改 `data/notes.json`
2. 提交并推送

### Q: 如何删除便签？

手动编辑 `data/notes.json`，删除对应条目后提交。
