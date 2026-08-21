import { themes, layoutOptions } from './themeEngine.js';

class AppState {
  constructor() {
    this.activePracticalId = 1;
    this.activeTab = 'emulator'; // 'emulator' | 'code' | 'dryrun' | 'vsguide' | 'viva'

    // Theme & Layout
    const savedTheme = localStorage.getItem('bca_csharp_theme');
    this.currentTheme = savedTheme && themes[savedTheme] ? savedTheme : 'cyan-dark';

    const savedLayout = localStorage.getItem('bca_csharp_layout');
    this.currentLayout = savedLayout || 'classic';

    // Completed & Starred Lists
    try {
      const savedCompleted = localStorage.getItem('bca_csharp_completed');
      this.completedIds = savedCompleted ? JSON.parse(savedCompleted) : [1, 2];
    } catch {
      this.completedIds = [1, 2];
    }

    try {
      const savedStarred = localStorage.getItem('bca_csharp_starred');
      this.starredIds = savedStarred ? JSON.parse(savedStarred) : [11, 24, 33];
    } catch {
      this.starredIds = [11, 24, 33];
    }

    // Modal Visibility
    this.isAiTutorOpen = false;
    this.isQuizOpen = false;
    this.isCheatsheetOpen = false;
    this.isLabRecordOpen = false;
    this.isThemeModalOpen = false;
    this.isResetConfirmOpen = false;
    this.isSidebarOpenMobile = false;

    // Custom API Key for Gemini Live Mode
    this.geminiApiKey = localStorage.getItem('bca_csharp_gemini_key') || '';

    // Event Subscribers
    this.listeners = [];
  }

  get themeConfig() {
    return themes[this.currentTheme] || themes['cyan-dark'];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this));
  }

  setActivePractical(id) {
    if (this.activePracticalId !== id) {
      this.activePracticalId = id;
      this.notify();
    }
  }

  setActiveTab(tab) {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
      this.notify();
    }
  }

  setTheme(themeId) {
    if (themes[themeId]) {
      this.currentTheme = themeId;
      localStorage.setItem('bca_csharp_theme', themeId);
      this.notify();
    }
  }

  setLayout(layoutId) {
    this.currentLayout = layoutId;
    localStorage.setItem('bca_csharp_layout', layoutId);
    this.notify();
  }

  toggleComplete(id) {
    if (this.completedIds.includes(id)) {
      this.completedIds = this.completedIds.filter(x => x !== id);
    } else {
      this.completedIds = [...this.completedIds, id];
    }
    localStorage.setItem('bca_csharp_completed', JSON.stringify(this.completedIds));
    this.notify();
  }

  toggleStar(id) {
    if (this.starredIds.includes(id)) {
      this.starredIds = this.starredIds.filter(x => x !== id);
    } else {
      this.starredIds = [...this.starredIds, id];
    }
    localStorage.setItem('bca_csharp_starred', JSON.stringify(this.starredIds));
    this.notify();
  }

  toggleAiTutor() {
    this.isAiTutorOpen = !this.isAiTutorOpen;
    this.notify();
  }

  setQuizOpen(open) {
    this.isQuizOpen = open;
    this.notify();
  }

  setCheatsheetOpen(open) {
    this.isCheatsheetOpen = open;
    this.notify();
  }

  setLabRecordOpen(open) {
    this.isLabRecordOpen = open;
    this.notify();
  }

  setThemeModalOpen(open) {
    this.isThemeModalOpen = open;
    this.notify();
  }

  setResetConfirmOpen(open) {
    this.isResetConfirmOpen = open;
    this.notify();
  }

  resetProgress() {
    this.completedIds = [];
    this.starredIds = [];
    localStorage.removeItem('bca_csharp_completed');
    localStorage.removeItem('bca_csharp_starred');
    this.isResetConfirmOpen = false;
    this.notify();
  }

  setSidebarOpenMobile(open) {
    this.isSidebarOpenMobile = open;
    this.notify();
  }

  setGeminiApiKey(key) {
    this.geminiApiKey = key.trim();
    localStorage.setItem('bca_csharp_gemini_key', this.geminiApiKey);
    this.notify();
  }
}

export const appState = new AppState();
