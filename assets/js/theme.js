// Theme switching functionality for image themes

// Get available themes from the theme selector
function getAvailableThemes() {
    const themeSelect = document.getElementById('themeSelect');
    if (!themeSelect) return ['modern-minimalist'];

    const themes = [];
    for (let option of themeSelect.options) {
        themes.push(option.value);
    }
    return themes;
}

// Get current theme from localStorage or use default
function getCurrentTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    const availableThemes = getAvailableThemes();

    // If saved theme exists in available themes, use it
    if (savedTheme && availableThemes.includes(savedTheme)) {
        return savedTheme;
    }

    // Otherwise, use the first available theme (default)
    return availableThemes[0] || 'modern-minimalist';
}

// Set theme in localStorage
function setCurrentTheme(theme) {
    localStorage.setItem('selectedTheme', theme);
}

// Switch to a new theme
function switchTheme(theme) {
    setCurrentTheme(theme);
    applyTheme(theme);
}

// Apply theme by updating all image sources
function applyTheme(theme) {
    // Update all images that have src containing /images/
    const images = document.querySelectorAll('img[src*="/images/"]');

    images.forEach(img => {
        const currentSrc = img.getAttribute('src');
        // Replace the theme folder in the path
        // Pattern: /images/{collection}/{old-theme}/ -> /images/{collection}/{new-theme}/
        // This handles the new collection-based structure: /images/bhagavad-gita/modern-minimalist/
        // Keep replacement root-relative to avoid duplicating baseurl prefixes.
        const newSrc = currentSrc.replace(/\/images\/([^\/]+)\/[^\/]+\//, `/images/$1/${theme}/`);
        img.setAttribute('src', newSrc);
    });
}

// Initialize theme on page load
function initializeTheme() {
    const theme = getCurrentTheme();
    const themeSelect = document.getElementById('themeSelect');

    if (themeSelect) {
        themeSelect.value = theme;
    }

    // Apply the current theme to all images
    applyTheme(theme);
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
    initializeTheme();
}
