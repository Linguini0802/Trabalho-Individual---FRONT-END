class StorageManager {
  constructor() {
    // Chaves padrão para evitar erros de digitação
    this.KEYS = {
      THEME: 'pref_theme',
      SAVED_LIST: 'pref_list',
      USER_PREFS: 'pref_user_settings'
    };
  }

  // --- 1. GERENCIAMENTO DE TEMA ---
  setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') return;
    localStorage.setItem(this.KEYS.THEME, theme);
    this.applyTheme(theme);
  }

  getTheme() {
    // Retorna o tema salvo ou detecta a preferência do sistema operacional do usuário
    const savedTheme = localStorage.getItem(this.KEYS.THEME);
    if (savedTheme) return savedTheme;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  applyTheme(theme) {
    // Aplica a classe correspondente na tag <html> ou <body> para o CSS estilizar
    const currentTheme = theme || this.getTheme();
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(currentTheme);
  }

  // --- 2. GERENCIAMENTO DE LISTA SALVA ---
  getSavedList() {
    const list = localStorage.getItem(this.KEYS.SAVED_LIST);
    return list ? JSON.parse(list) : [];
  }

  saveList(listArray) {
    if (!Array.isArray(listArray)) return;
    localStorage.setItem(this.KEYS.SAVED_LIST, JSON.stringify(listArray));
  }

  addToList(item) {
    const currentList = this.getSavedList();
    currentList.push(item);
    this.saveList(currentList);
  }

  // --- 3. PREFERÊNCIAS DO VISITANTE (OBJETO) ---
  getUserPrefs() {
    const prefs = localStorage.getItem(this.KEYS.USER_PREFS);
    return prefs ? JSON.parse(prefs) : { language: 'pt-BR', notifications: true };
  }

  updateUserPrefs(newPrefs) {
    const currentPrefs = this.getUserPrefs();
    const updated = { ...currentPrefs, ...newPrefs };
    localStorage.setItem(this.KEYS.USER_PREFS, JSON.stringify(updated));
  }

  // --- LIMPAR TUDO ---
  clearAll() {
    Object.values(this.KEYS).forEach(key => localStorage.removeItem(key));
  }
}

// Exporta uma instância única (Singleton) para ser usada em todo o projeto
const storage = new StorageManager();
