#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
便签添加脚本
用法：
    python add_note.py "便签内容" [--tags "标签 1，标签 2"] [--pinned]
"""

import json
import os
import sys
import argparse
from datetime import datetime
import re


def get_note_id():
    """生成唯一 ID（基于时间戳）"""
    now = datetime.now()
    return now.strftime("%Y%m%d%H%M%S") + f"{now.microsecond:03d}"


def extract_title(content, max_length=50):
    """从内容中提取标题（取第一行）"""
    first_line = content.split('\n')[0].strip()
    if len(first_line) > max_length:
        return first_line[:max_length] + '...'
    return first_line if first_line else '无标题'


def parse_tags(tags_str):
    """解析标签字符串为列表"""
    if not tags_str:
        return []
    # 支持中文逗号、英文逗号、空格分隔
    tags = re.split(r'[,,\s]+', tags_str.strip())
    return [tag.strip() for tag in tags if tag.strip()]


def load_notes(data_file):
    """加载便签数据"""
    if not os.path.exists(data_file):
        return {"notes": []}
    try:
        with open(data_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError):
        return {"notes": []}


def save_notes(data_file, data):
    """保存便签数据"""
    # 确保目录存在
    os.makedirs(os.path.dirname(data_file), exist_ok=True)
    with open(data_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def add_note(content, tags_str=None, pinned=False):
    """添加新便签"""
    # 确定数据文件路径（支持从 scripts/ 目录调用）
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    data_file = os.path.join(project_root, 'data', 'notes.json')

    # 加载现有数据
    data = load_notes(data_file)

    # 创建新便签
    now = datetime.now()
    note = {
        "id": get_note_id(),
        "title": extract_title(content),
        "date": now.strftime("%Y-%m-%d"),
        "timestamp": int(now.timestamp()),
        "tags": parse_tags(tags_str),
        "content": content.strip(),
        "pinned": pinned
    }

    # 追加便签
    data["notes"].append(note)

    # 保存数据
    save_notes(data_file, data)

    return note


def main():
    parser = argparse.ArgumentParser(
        description='添加便签',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
示例:
    python add_note.py "这是便签内容"
    python add_note.py "重要事项" --tags "工作，重要"
    python add_note.py "置顶通知" --tags "公告" --pinned
        '''
    )
    parser.add_argument('content', help='便签内容')
    parser.add_argument('--tags', '-t', help='标签列表，用逗号或空格分隔')
    parser.add_argument('--pinned', '-p', action='store_true', help='是否置顶')

    args = parser.parse_args()

    if not args.content.strip():
        print("错误：便签内容不能为空")
        sys.exit(1)

    note = add_note(args.content, args.tags, args.pinned)

    # 设置 stdout 为 UTF-8 编码
    if sys.platform == 'win32':
        import io
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    print("[OK] 便签已添加!")
    print(f"  ID: {note['id']}")
    print(f"  标题：{note['title']}")
    print(f"  日期：{note['date']}")
    if note['tags']:
        print(f"  标签：{', '.join(note['tags'])}")
    if note['pinned']:
        print(f"  状态：已置顶")
    print(f"\n请提交 changes 到 GitHub 以发布便签:")
    print(f"  git add data/notes.json")
    print(f"  git commit -m '添加便签：{note['title']}'")
    print(f"  git push")


if __name__ == '__main__':
    main()
