/**
 * 便签渲染器
 * 负责将便签数据渲染为 HTML 元素
 */

const Renderer = {
    /**
     * 渲染单个便签卡片
     * @param {Object} note - 便签数据
     * @returns {string} HTML 字符串
     */
    renderNote(note) {
        const pinnedHtml = note.pinned ? '<div class="note-pinned">📌 置顶</div>' : '';
        const tagsHtml = note.tags && note.tags.length > 0
            ? note.tags.map(tag => `<span class="note-tag" data-tag="${this.escapeHtml(tag)}">${this.escapeHtml(tag)}</span>`).join('')
            : '';

        return `
            <article class="note-card" data-id="${note.id}" data-tags='${JSON.stringify(note.tags || [])}' data-pinned="${note.pinned || false}">
                ${pinnedHtml}
                <h3 class="note-title">${this.escapeHtml(note.title)}</h3>
                <div class="note-content">${this.formatContent(note.content)}</div>
                <div class="note-meta">
                    <span class="note-date">${note.date}</span>
                    <div class="note-tags">${tagsHtml}</div>
                </div>
            </article>
        `;
    },

    /**
     * 渲染便签列表
     * @param {Array} notes - 便签数组
     * @returns {string} HTML 字符串
     */
    renderNotes(notes) {
        if (!notes || notes.length === 0) {
            return '';
        }

        // 置顶便签排在前面
        const sortedNotes = [...notes].sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return b.timestamp - a.timestamp;
        });

        return sortedNotes.map(note => this.renderNote(note)).join('');
    },

    /**
     * 渲染标签列表
     * @param {Array} notes - 便签数组
     * @returns {string} HTML 字符串
     */
    renderTags(notes) {
        const tagSet = new Set();
        notes.forEach(note => {
            if (note.tags) {
                note.tags.forEach(tag => tagSet.add(tag));
            }
        });

        const tags = Array.from(tagSet).sort();
        return tags.map(tag =>
            `<button class="tag-btn" data-tag="${this.escapeHtml(tag)}">${this.escapeHtml(tag)}</button>`
        ).join('');
    },

    /**
     * 格式化内容（支持简单 Markdown）
     * @param {string} content - 原始内容
     * @returns {string} 格式化后的 HTML
     */
    formatContent(content) {
        if (!content) return '';

        let html = this.escapeHtml(content);

        // 粗体 **text**
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

        // 斜体 *text*
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

        // 行内代码 `code`
        html = html.replace(/`(.+?)`/g, '<code>$1</code>');

        // 链接 [text](url)
        html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

        // 换行
        html = html.replace(/\n/g, '<br>');

        return html;
    },

    /**
     * HTML 转义
     * @param {string} text - 原始文本
     * @returns {string} 转义后的文本
     */
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};
