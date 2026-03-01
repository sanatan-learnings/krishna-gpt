// Krishna GPT Search Functionality

let searchData = null;
let currentLanguage = 'en';
const BASE_URL = window.BASE_URL || '';

function withBaseUrl(path) {
    if (!BASE_URL) return path;
    if (path.startsWith(BASE_URL)) return path;
    if (path.startsWith('/')) return `${BASE_URL}${path}`;
    return `${BASE_URL}/${path}`;
}

// Initialize search on page load
async function initSearch() {
    currentLanguage = getCurrentLanguage();

    // Load search data
    try {
        const response = await fetch(`${BASE_URL}/data/search.json`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        searchData = await response.json();
        console.log(`Loaded search index: ${searchData.length} verses`);

        // Set up event listeners
        setupSearchListeners();

        // Update placeholders
        updatePlaceholders();
    } catch (error) {
        console.error('Error loading search data:', error);
        showError('Error loading search data. Please refresh the page.');
    }
}

function getCurrentLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const storedLang = localStorage.getItem('preferredLanguage');
    return urlLang || storedLang || 'en';
}

function updatePlaceholders() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const placeholder = searchInput.getAttribute(`data-placeholder-${currentLanguage}`);
        if (placeholder) searchInput.placeholder = placeholder;
    }
}

function setupSearchListeners() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');

    if (searchInput) {
        // Real-time search
        searchInput.addEventListener('input', debounce(performSearch, 300));

        // Clear button
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                searchInput.value = '';
                clearButton.style.display = 'none';
                clearResults();
            });
        }

        // Show/hide clear button
        searchInput.addEventListener('input', () => {
            if (clearButton) {
                clearButton.style.display = searchInput.value ? 'block' : 'none';
            }
        });
    }

    // Filter checkboxes
    ['searchDevanagari', 'searchTransliteration', 'searchTranslation', 'searchMeanings'].forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener('change', performSearch);
        }
    });
}

// Debounce function to limit search frequency
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    if (!query) {
        clearResults();
        return;
    }

    if (!searchData) {
        showError('Search data not loaded yet');
        return;
    }

    // Get filter settings
    const filters = {
        devanagari: document.getElementById('searchDevanagari')?.checked ?? true,
        transliteration: document.getElementById('searchTransliteration')?.checked ?? true,
        translation: document.getElementById('searchTranslation')?.checked ?? true,
        meanings: document.getElementById('searchMeanings')?.checked ?? true,
    };

    // Search through verses
    const results = searchData.filter(verse => {
        return searchInVerse(verse, query, filters);
    });

    displayResults(results, query);
}

function searchInVerse(verse, query, filters) {
    const lang = currentLanguage;
    const fields = [];

    // Add fields based on filters and language
    if (filters.devanagari && verse.devanagari) {
        fields.push(verse.devanagari.toLowerCase());
    }

    if (filters.transliteration && verse.transliteration) {
        fields.push(verse.transliteration.toLowerCase());
    }

    if (filters.translation) {
        const translationField = lang === 'hi' ? verse.translation_hi : verse.translation_en;
        if (translationField) {
            fields.push(translationField.toLowerCase());
        }
    }

    if (filters.meanings) {
        const meaningField = lang === 'hi' ?
            (verse.meaning_hi || verse.commentary_hi || verse.word_meanings_hi) :
            (verse.meaning_en || verse.commentary_en || verse.word_meanings_en);
        if (meaningField) {
            fields.push(meaningField.toLowerCase());
        }
    }

    // Check if query matches any field
    return fields.some(field => field.includes(query));
}

function displayResults(results, query) {
    const resultsContainer = document.getElementById('searchResults');
    const statsContainer = document.getElementById('searchStats');

    if (!resultsContainer) return;

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Update stats
    if (statsContainer) {
        const lang = currentLanguage;
        const resultsText = lang === 'hi' ? 'परिणाम' : 'results';
        statsContainer.textContent = `${results.length} ${resultsText}`;
    }

    if (results.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        const lang = currentLanguage;
        noResults.textContent = lang === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No results found';
        resultsContainer.appendChild(noResults);
        return;
    }

    // Display results
    results.forEach(verse => {
        const resultItem = createResultItem(verse, query);
        resultsContainer.appendChild(resultItem);
    });
}

function createResultItem(verse, query) {
    const lang = currentLanguage;
    const div = document.createElement('div');
    div.className = 'search-result-item';

    // Title
    const title = document.createElement('h3');
    const titleLink = document.createElement('a');
    const resolvedUrl = withBaseUrl(verse.url);
    titleLink.href = `${resolvedUrl}?lang=${lang}`;
    titleLink.textContent = lang === 'hi' ? verse.title_hi : verse.title_en;
    title.appendChild(titleLink);
    div.appendChild(title);

    // Sanskrit
    if (verse.devanagari) {
        const sanskrit = document.createElement('div');
        sanskrit.className = 'result-sanskrit';
        sanskrit.textContent = verse.devanagari;
        div.appendChild(sanskrit);
    }

    // Translation
    const translation = lang === 'hi' ? verse.translation_hi : verse.translation_en;
    if (translation) {
        const transDiv = document.createElement('div');
        transDiv.className = 'result-translation';
        transDiv.textContent = highlightMatch(translation, query);
        div.appendChild(transDiv);
    }

    return div;
}

function highlightMatch(text, query) {
    if (!text || !query) return text;

    // Simple highlighting - case insensitive
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function clearResults() {
    const resultsContainer = document.getElementById('searchResults');
    const statsContainer = document.getElementById('searchStats');

    if (statsContainer) {
        statsContainer.textContent = '';
    }

    if (resultsContainer) {
        const lang = currentLanguage;
        const promptText = lang === 'hi' ?
            'खोजने के लिए एक शब्द या वाक्यांश दर्ज करें' :
            'Enter a keyword or phrase to search';

        resultsContainer.innerHTML = `<p class="search-prompt">${promptText}</p>`;
    }
}

function showError(message) {
    const resultsContainer = document.getElementById('searchResults');
    if (resultsContainer) {
        resultsContainer.innerHTML = `<div class="no-results" style="color: red;">${message}</div>`;
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
} else {
    initSearch();
}

// Handle language changes
window.addEventListener('storage', (e) => {
    if (e.key === 'preferredLanguage') {
        currentLanguage = getCurrentLanguage();
        updatePlaceholders();
        performSearch(); // Re-search with new language
    }
});
