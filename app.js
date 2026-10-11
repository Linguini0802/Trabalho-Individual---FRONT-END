document.addEventListener('DOMContentLoaded', () => {
    // 1. Aplica imediatamente o tema salvo nas preferências ao abrir o site
    storage.applyTheme();

    // 2. Controla o evento de clique do botão de alternar tema
    const toggleThemeBtn = document.querySelector('#toggle-theme');
    
    if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener('click', () => {
            const currentTheme = storage.getTheme();
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            storage.setTheme(nextTheme);
        });
    }
});
