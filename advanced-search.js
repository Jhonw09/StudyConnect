// ===========================
//   SISTEMA DE BUSCA AVANÇADA
// ===========================

class AdvancedSearch {
    constructor() {
        this.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        this.init();
    }

    init() {
        this.createSearchInterface();
        this.setupEventListeners();
    }

    createSearchInterface() {
        const coursesSection = document.getElementById('cursos');
        if (!coursesSection) return;

        const searchContainer = document.createElement('div');
        searchContainer.className = 'advanced-search-container';
        searchContainer.innerHTML = `
            <div class="search-header">
                <h3><i class="fas fa-search"></i> Busca Inteligente</h3>
                <button class="search-history-btn" id="searchHistoryBtn">
                    <i class="fas fa-history"></i> Histórico
                </button>
            </div>
            <div class="search-box">
                <input type="text" id="searchInput" placeholder="Digite o nome do curso, tecnologia ou assunto..." autocomplete="off">
                <button id="searchBtn"><i class="fas fa-search"></i></button>
                <div class="search-suggestions" id="searchSuggestions"></div>
            </div>
            <div class="search-filters">
                <select id="categoryFilter">
                    <option value="">Todas as categorias</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="portugues">Português</option>
                    <option value="matematica">Matemática</option>
                </select>
                <select id="levelFilter">
                    <option value="">Todos os níveis</option>
                    <option value="Iniciante">Iniciante</option>
                    <option value="Básico">Básico</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                </select>
                <select id="durationFilter">
                    <option value="">Qualquer duração</option>
                    <option value="short">Até 30h</option>
                    <option value="medium">30h - 50h</option>
                    <option value="long">Mais de 50h</option>
                </select>
            </div>
            <div class="search-results-info" id="searchResultsInfo" style="display: none;">
                <span id="resultsCount">0</span> cursos encontrados
                <button class="clear-search" id="clearSearch">
                    <i class="fas fa-times"></i> Limpar busca
                </button>
            </div>
        `;

        const coursesGrid = coursesSection.querySelector('.courses-grid');
        coursesSection.insertBefore(searchContainer, coursesGrid);
    }

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const filters = document.querySelectorAll('#categoryFilter, #levelFilter, #durationFilter');
        const historyBtn = document.getElementById('searchHistoryBtn');
        const clearBtn = document.getElementById('clearSearch');

        searchInput?.addEventListener('input', (e) => this.handleSearch(e.target.value));
        searchInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.performSearch();
            if (e.key === 'Escape') this.clearSearch();
        });
        searchBtn?.addEventListener('click', () => this.performSearch());
        historyBtn?.addEventListener('click', () => this.showSearchHistory());
        clearBtn?.addEventListener('click', () => this.clearSearch());

        filters.forEach(filter => {
            filter.addEventListener('change', () => this.applyFilters());
        });

        // Fechar sugestões ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box')) {
                this.hideSuggestions();
            }
        });
    }

    handleSearch(query) {
        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }
        this.showSuggestions(query);
    }

    showSuggestions(query) {
        const suggestions = this.generateSuggestions(query);
        const suggestionsEl = document.getElementById('searchSuggestions');
        
        if (suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }

        suggestionsEl.innerHTML = suggestions.map(suggestion => 
            `<div class="suggestion-item" data-query="${suggestion}">${suggestion}</div>`
        ).join('');

        suggestionsEl.style.display = 'block';

        // Event listeners para sugestões
        suggestionsEl.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                document.getElementById('searchInput').value = item.dataset.query;
                this.performSearch();
                this.hideSuggestions();
            });
        });
    }

    generateSuggestions(query) {
        const courseData = [
            'Front-End Moderno', 'Back-End Avançado', 'Português', 'Matemática',
            'HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Express',
            'Docker', 'Gramática', 'Redação', 'Literatura', 'Ortografia',
            'Álgebra', 'Geometria', 'Cálculo', 'Estatística', 'TypeScript', 'Vue.js'
        ];
        
        const suggestions = courseData.filter(item => 
            item.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6);
        
        // Adicionar histórico relevante
        const relevantHistory = this.searchHistory.filter(item => 
            item.toLowerCase().includes(query.toLowerCase()) && 
            !suggestions.includes(item)
        ).slice(0, 2);
        
        return [...suggestions, ...relevantHistory];
    }

    hideSuggestions() {
        const suggestionsEl = document.getElementById('searchSuggestions');
        if (suggestionsEl) suggestionsEl.style.display = 'none';
    }

    performSearch() {
        const query = document.getElementById('searchInput')?.value;
        if (!query) return;

        this.addToHistory(query);
        this.applyFilters();
        this.hideSuggestions();
    }

    applyFilters() {
        const query = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const category = document.getElementById('categoryFilter')?.value || '';
        const level = document.getElementById('levelFilter')?.value || '';
        const duration = document.getElementById('durationFilter')?.value || '';

        const courseCards = document.querySelectorAll('.course-card');
        let visibleCount = 0;
        
        courseCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const techTags = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
            const cardCategory = card.dataset.category || '';
            const cardLevel = card.querySelector('.course-level')?.textContent || '';
            const cardDuration = this.getDurationCategory(card.querySelector('.course-duration')?.textContent || '');

            const matchesQuery = !query || title.includes(query) || description.includes(query) || techTags.includes(query);
            const matchesCategory = !category || cardCategory === category;
            const matchesLevel = !level || cardLevel === level;
            const matchesDuration = !duration || cardDuration === duration;

            if (matchesQuery && matchesCategory && matchesLevel && matchesDuration) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        this.updateResultsInfo(visibleCount, query || category || level || duration);
    }
    
    getDurationCategory(durationText) {
        const hours = parseInt(durationText) || 0;
        if (hours <= 30) return 'short';
        if (hours <= 50) return 'medium';
        return 'long';
    }
    
    updateResultsInfo(count, hasFilters) {
        const resultsInfo = document.getElementById('searchResultsInfo');
        const resultsCount = document.getElementById('resultsCount');
        
        if (hasFilters) {
            resultsInfo.style.display = 'flex';
            resultsCount.textContent = count;
        } else {
            resultsInfo.style.display = 'none';
        }
    }
    
    clearSearch() {
        document.getElementById('searchInput').value = '';
        document.getElementById('categoryFilter').value = '';
        document.getElementById('levelFilter').value = '';
        document.getElementById('durationFilter').value = '';
        
        document.querySelectorAll('.course-card').forEach(card => {
            card.style.display = 'block';
        });
        
        this.updateResultsInfo(0, false);
        this.hideSuggestions();
    }
    
    showSearchHistory() {
        if (this.searchHistory.length === 0) {
            this.showSuggestions('', ['Nenhum histórico de busca']);
            return;
        }
        
        const suggestions = document.getElementById('searchSuggestions');
        suggestions.innerHTML = `
            <div class="history-header">
                <span>Buscas recentes</span>
                <button onclick="this.clearHistory()" class="clear-history">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            ${this.searchHistory.map(item => 
                `<div class="suggestion-item history-item" data-query="${item}">
                    <i class="fas fa-history"></i> ${item}
                </div>`
            ).join('')}
        `;
        
        suggestions.style.display = 'block';
        
        suggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                document.getElementById('searchInput').value = item.dataset.query;
                this.performSearch();
                this.hideSuggestions();
            });
        });
    }
    
    clearHistory() {
        this.searchHistory = [];
        localStorage.removeItem('searchHistory');
        this.hideSuggestions();
    }

    addToHistory(query) {
        if (!this.searchHistory.includes(query)) {
            this.searchHistory.unshift(query);
            this.searchHistory = this.searchHistory.slice(0, 10);
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        }
    }
}

// CSS para busca avançada
const searchStyles = `
<style>
.advanced-search-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    animation: slideInDown 0.6s ease;
}

.search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.search-header h3 {
    color: white;
    margin: 0;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.search-history-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.search-history-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

.search-box {
    position: relative;
    margin-bottom: 1rem;
}

#searchInput {
    width: 100%;
    padding: 1rem 3rem 1rem 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
}

#searchInput::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

#searchInput:focus {
    outline: none;
    border-color: #43e97b;
    box-shadow: 0 0 20px rgba(67, 233, 123, 0.3);
}

#searchBtn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: #43e97b;
    border: none;
    padding: 0.5rem;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

#searchBtn:hover {
    background: #38f9d7;
    transform: translateY(-50%) scale(1.1);
}

.search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(26, 26, 46, 0.95);
    border-radius: 10px;
    margin-top: 5px;
    display: none;
    z-index: 1000;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.suggestion-item {
    padding: 0.8rem 1rem;
    cursor: pointer;
    color: white;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.suggestion-item:hover {
    background: rgba(67, 233, 123, 0.2);
    transform: translateX(5px);
}

.history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
}

.clear-history {
    background: none;
    border: none;
    color: rgba(255, 107, 107, 0.8);
    cursor: pointer;
    padding: 0.3rem;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.clear-history:hover {
    background: rgba(255, 107, 107, 0.1);
    color: #ff6b6b;
}

.history-item {
    opacity: 0.8;
}

.history-item i {
    color: rgba(255, 255, 255, 0.5);
}

@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.search-filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
}

.search-results-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: rgba(67, 233, 123, 0.1);
    border: 1px solid rgba(67, 233, 123, 0.3);
    border-radius: 10px;
    color: white;
    font-weight: 600;
}

.clear-search {
    background: rgba(255, 107, 107, 0.2);
    border: 1px solid rgba(255, 107, 107, 0.3);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.clear-search:hover {
    background: rgba(255, 107, 107, 0.3);
}

.search-filters select {
    padding: 0.8rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.search-filters select:focus {
    outline: none;
    border-color: #43e97b;
}

.search-filters option {
    background: #1a1a2e;
    color: white;
}

@media (max-width: 768px) {
    .advanced-search-container {
        padding: 1rem;
    }
    
    .search-filters {
        grid-template-columns: 1fr;
        gap: 0.8rem;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', searchStyles);

// Inicializar busca avançada
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedSearch();
});