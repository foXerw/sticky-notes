/**
 * 便签应用主逻辑
 * 负责视图切换、标签过滤、数据加载
 */

const App = {
    data: {
        notes: [],
        currentView: 'grid', // 'grid' or 'list'
        currentTag: 'all'
    },

    /**
     * 初始化应用
     */
    async init() {
        await this.loadNotes();
        this.bindEvents();
        this.render();
    },

    /**
     * 加载便签数据
     */
    async loadNotes() {
        try {
            const response = await fetch('data/notes.json');
            if (!response.ok) {
                throw new Error('Failed to load notes');
            }
            const data = await response.json();
            this.data.notes = data.notes || [];
        } catch (error) {
            console.error('Error loading notes:', error);
            this.data.notes = [];
        }
    },

    /**
     * 绑定事件
     */
    bindEvents() {
        // 视图切换
        const gridBtn = document.getElementById('gridViewBtn');
        const listBtn = document.getElementById('listViewBtn');

        gridBtn.addEventListener('click', () => this.setView('grid'));
        listBtn.addEventListener('click', () => this.setView('list'));

        // 标签过滤（委托事件）
        const tagsBar = document.querySelector('.tags-bar');
        tagsBar.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag-btn')) {
                const tag = e.target.dataset.tag;
                this.setTag(tag);
            }
            if (e.target.classList.contains('note-tag')) {
                const tag = e.target.dataset.tag;
                this.setTag(tag);
            }
        });
    },

    /**
     * 设置视图模式
     * @param {string} view - 'grid' or 'list'
     */
    setView(view) {
        this.data.currentView = view;

        const container = document.getElementById('notesContainer');
        const gridBtn = document.getElementById('gridViewBtn');
        const listBtn = document.getElementById('listViewBtn');

        if (view === 'grid') {
            container.classList.remove('notes-list');
            container.classList.add('notes-grid');
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
        } else {
            container.classList.remove('notes-grid');
            container.classList.add('notes-list');
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
        }
    },

    /**
     * 设置当前标签过滤
     * @param {string} tag - 标签名或'all'
     */
    setTag(tag) {
        this.data.currentTag = tag;

        // 更新按钮状态
        document.querySelectorAll('.tag-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tag === tag);
        });

        // 过滤便签
        this.filterNotes();
    },

    /**
     * 过滤便签
     */
    filterNotes() {
        const tag = this.data.currentTag;
        const cards = document.querySelectorAll('.note-card');

        cards.forEach(card => {
            if (tag === 'all') {
                card.classList.remove('hidden');
            } else {
                const noteTags = JSON.parse(card.dataset.tags || '[]');
                const isVisible = noteTags.includes(tag);
                card.classList.toggle('hidden', !isVisible);
            }
        });
    },

    /**
     * 渲染页面
     */
    render() {
        this.renderNotes();
        this.renderTags();
        this.setView(this.data.currentView);
        this.checkEmpty();
    },

    /**
     * 渲染便签列表
     */
    renderNotes() {
        const container = document.getElementById('notesContainer');
        container.innerHTML = Renderer.renderNotes(this.data.notes);
    },

    /**
     * 渲染标签列表
     */
    renderTags() {
        const container = document.getElementById('tagsContainer');
        const allBtn = document.querySelector('.tag-btn[data-tag="all"]');
        container.innerHTML = Renderer.renderTags(this.data.notes);

        // 重新绑定激活状态
        if (this.data.currentTag === 'all') {
            allBtn.classList.add('active');
        }
    },

    /**
     * 检查空状态
     */
    checkEmpty() {
        const container = document.getElementById('notesContainer');
        const emptyState = document.getElementById('emptyState');

        if (this.data.notes.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            container.style.display = '';
            emptyState.style.display = 'none';
        }
    }
};

// 启动应用
document.addEventListener('DOMContentLoaded', () => App.init());
