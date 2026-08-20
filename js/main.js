import { appState } from './appState.js';
import { getPracticalById, allPracticals } from './data/practicalsData.js';
import { renderNavbar } from './components/navbar.js';
import { renderSidebar } from './components/sidebar.js';
import { renderTelemetryBar } from './components/telemetryBar.js';
import { renderCodeViewer } from './components/codeViewer.js';
import { renderDryRunVisualizer } from './components/dryRunVisualizer.js';
import { renderWinFormsEmulator } from './components/winformsEmulator.js';
import { renderVisualStudioGuide } from './components/visualStudioGuide.js';
import { renderVivaVoceSection } from './components/vivaVoceSection.js';
import { renderSyllabusBoard } from './components/syllabusBoard.js';
import { renderAiTutorDrawer } from './components/aiTutorDrawer.js';
import { renderModals } from './components/modals.js';

function initApp() {
  const appRoot = document.getElementById('app-root');
  if (!appRoot) return;

  // Subscribe main render function to AppState changes
  appState.subscribe(renderApp);

  // Initial render
  renderApp();
}

function renderApp() {
  const { themeConfig, currentLayout, activePracticalId, activeTab } = appState;
  const activePractical = getPracticalById(activePracticalId) || allPracticals[0];
  const appRoot = document.getElementById('app-root');

  // Update outer container background theme
  document.body.className = `${themeConfig.appBg} ${themeConfig.textColor} font-sans antialiased overflow-hidden h-screen w-screen flex flex-col`;

  if (currentLayout === 'syllabus-board') {
    appRoot.innerHTML = `
      <div class="flex flex-col h-screen w-screen overflow-hidden ${themeConfig.appBg}">
        <div id="navbar-container"></div>
        <div id="syllabus-board-container" class="flex-1 overflow-hidden"></div>
        <div id="aitutor-container"></div>
        <div id="modals-container"></div>
      </div>
    `;

    renderNavbar(document.getElementById('navbar-container'));
    renderSyllabusBoard(document.getElementById('syllabus-board-container'));
    renderAiTutorDrawer(document.getElementById('aitutor-container'));
    renderModals(document.getElementById('modals-container'));
    refreshIcons();
    return;
  }

  // Classic & Multi-Pane Layouts
  appRoot.innerHTML = `
    <div class="flex flex-col h-screen w-screen overflow-hidden ${themeConfig.appBg}">
      <!-- Top Navbar -->
      <div id="navbar-container"></div>

      <!-- Main Workspace -->
      <div class="flex-1 flex min-h-0 overflow-hidden">
        <!-- Left Sidebar Navigation -->
        ${currentLayout === 'zen-focus' ? '' : '<div id="sidebar-container"></div>'}

        <!-- Central Stage Area -->
        <div class="flex-1 flex flex-col min-w-0 overflow-hidden ${themeConfig.appBg}">
          <!-- Telemetry Ribbon -->
          <div id="telemetry-container"></div>

          <!-- Main Stage View Tabs & Canvas -->
          <div class="flex-1 flex flex-col min-h-0 overflow-hidden">
            <!-- Stage Tabs Ribbon -->
            <div class="h-9 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between px-3 select-none shrink-0">
              <div class="flex items-center gap-1 overflow-x-auto text-xs">
                <button
                  data-tab-id="emulator"
                  class="px-3 py-1 rounded-t-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'emulator' ? themeConfig.tabActiveBg : `${themeConfig.textColor} hover:text-white`
                  }"
                >
                  <i data-lucide="play" class="w-3.5 h-3.5"></i>
                  <span>WINFORMS EMULATOR</span>
                </button>

                <button
                  data-tab-id="code"
                  class="px-3 py-1 rounded-t-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'code' ? themeConfig.tabActiveBg : `${themeConfig.textColor} hover:text-white`
                  }"
                >
                  <i data-lucide="code-2" class="w-3.5 h-3.5"></i>
                  <span>SOURCE CODE</span>
                </button>

                <button
                  data-tab-id="dryrun"
                  class="px-3 py-1 rounded-t-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'dryrun' ? themeConfig.tabActiveBg : `${themeConfig.textColor} hover:text-white`
                  }"
                >
                  <i data-lucide="cpu" class="w-3.5 h-3.5"></i>
                  <span>DRY-RUN DEBUGGER</span>
                </button>

                <button
                  data-tab-id="vsguide"
                  class="px-3 py-1 rounded-t-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'vsguide' ? themeConfig.tabActiveBg : `${themeConfig.textColor} hover:text-white`
                  }"
                >
                  <i data-lucide="layout-template" class="w-3.5 h-3.5"></i>
                  <span>VS DESIGNER GUIDE</span>
                </button>

                <button
                  data-tab-id="viva"
                  class="px-3 py-1 rounded-t-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'viva' ? themeConfig.tabActiveBg : `${themeConfig.textColor} hover:text-white`
                  }"
                >
                  <i data-lucide="graduation-cap" class="w-3.5 h-3.5"></i>
                  <span>VIVA VOCE</span>
                </button>
              </div>
            </div>

            <!-- Stage Content Container -->
            <div id="stage-content-container" class="flex-1 overflow-y-auto p-3 md:p-4"></div>
          </div>
        </div>
      </div>

      <!-- AI Tutor Drawer -->
      <div id="aitutor-container"></div>

      <!-- Modals Container -->
      <div id="modals-container"></div>
    </div>
  `;

  // Render Navbar, Sidebar, TelemetryBar
  renderNavbar(document.getElementById('navbar-container'));
  if (currentLayout !== 'zen-focus') {
    renderSidebar(document.getElementById('sidebar-container'));
  }
  renderTelemetryBar(document.getElementById('telemetry-container'));

  // Wire Tab Change Events
  document.querySelectorAll('[data-tab-id]').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      const tabId = tabBtn.getAttribute('data-tab-id');
      appState.setActiveTab(tabId);
    });
  });

  // Render Central Stage Content
  const stageContent = document.getElementById('stage-content-container');
  if (stageContent) {
    if (currentLayout === 'dual-pane') {
      // Dual-Pane Live Studio Layout
      stageContent.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          <div id="dual-emulator-pane"></div>
          <div id="dual-code-pane"></div>
        </div>
      `;
      renderWinFormsEmulator(document.getElementById('dual-emulator-pane'), activePractical);
      renderCodeViewer(document.getElementById('dual-code-pane'), activePractical);
    } else if (currentLayout === 'viva-master') {
      // Viva Master Exam Prep Layout
      stageContent.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          <div id="viva-code-pane"></div>
          <div id="viva-qa-pane"></div>
        </div>
      `;
      renderCodeViewer(document.getElementById('viva-code-pane'), activePractical);
      renderVivaVoceSection(document.getElementById('viva-qa-pane'), activePractical);
    } else if (currentLayout === 'debugger-pro') {
      // Debugger Pro 3-Column Layout
      stageContent.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          <div id="pro-emulator-pane"></div>
          <div id="pro-dryrun-pane"></div>
        </div>
      `;
      renderWinFormsEmulator(document.getElementById('pro-emulator-pane'), activePractical);
      renderDryRunVisualizer(document.getElementById('pro-dryrun-pane'), activePractical);
    } else {
      // Standard Tab Layout
      if (activeTab === 'emulator') {
        renderWinFormsEmulator(stageContent, activePractical);
      } else if (activeTab === 'code') {
        renderCodeViewer(stageContent, activePractical);
      } else if (activeTab === 'dryrun') {
        renderDryRunVisualizer(stageContent, activePractical);
      } else if (activeTab === 'vsguide') {
        renderVisualStudioGuide(stageContent, activePractical);
      } else if (activeTab === 'viva') {
        renderVivaVoceSection(stageContent, activePractical);
      }
    }
  }

  // Render AI Tutor Drawer & Modals
  renderAiTutorDrawer(document.getElementById('aitutor-container'));
  renderModals(document.getElementById('modals-container'));

  refreshIcons();
}

function refreshIcons() {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
