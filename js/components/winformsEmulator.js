import { appState } from '../appState.js';

export function renderWinFormsEmulator(container, practical) {
  const { themeConfig } = appState;
  if (!practical) return;

  const type = practical.emulatorType || 'console-io';

  container.innerHTML = `
    <div class="border ${themeConfig.borderColor} ${themeConfig.cardBg} rounded-sm overflow-hidden shadow-lg select-none">
      <!-- Windows Classic Title Bar Header -->
      <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/80 px-3 py-2 flex items-center justify-between text-white text-xs font-sans">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-blue-500 rounded-xs flex items-center justify-center font-bold text-[8px] text-white">#</div>
          <span class="font-bold tracking-tight text-slate-100">${practical.title} - [Form1.cs]</span>
        </div>
        <div class="flex items-center gap-1.5 opacity-80">
          <span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
        </div>
      </div>

      <!-- Emulated Window Client Area Canvas -->
      <div id="winforms-emulator-canvas" class="p-4 ${themeConfig.cardSubBg} min-h-[380px] font-sans text-xs">
        ${renderEmulatorMarkup(type, practical)}
      </div>
    </div>
  `;

  // Wire interactive listeners based on emulatorType
  wireEmulatorEvents(container, type, practical);
}

function renderEmulatorMarkup(type, practical) {
  switch (type) {
    case 'grid-calculator':
      return `
        <div class="max-w-sm mx-auto bg-slate-900 border border-slate-700 rounded-sm p-4 space-y-3 font-mono text-white shadow-2xl">
          <div class="text-right text-[10px] text-slate-400 h-4" id="calc-equation"></div>
          <input type="text" id="calc-display" value="0" readonly class="w-full bg-slate-950 border border-slate-800 text-right text-2xl p-2 font-bold text-cyan-400 rounded-sm" />
          <div class="grid grid-cols-4 gap-2 text-xs font-bold">
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm text-rose-400">C</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm text-cyan-400">√</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm text-cyan-400">%</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm text-cyan-400">÷</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">7</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">8</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">9</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm text-cyan-400">×</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">4</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">5</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">6</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm text-cyan-400">-</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">1</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">2</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">3</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm text-cyan-400">+</button>
            <button class="calc-btn col-span-2 p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">0</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">.</button>
            <button class="calc-btn p-3 bg-cyan-500 text-black hover:bg-cyan-400 rounded-sm font-black">=</button>
          </div>
        </div>
      `;

    case 'registration-form':
      return `
        <div class="max-w-md mx-auto bg-slate-900 border border-slate-700 rounded-sm p-4 space-y-3 text-slate-100">
          <h3 class="text-sm font-bold text-cyan-400 border-b border-slate-800 pb-2">Student Registration Form</h3>
          <div class="space-y-2">
            <div>
              <label class="block text-[10px] text-slate-400 font-bold mb-1">STUDENT NAME *</label>
              <input type="text" id="reg-name" placeholder="e.g. Kavya Patel" class="w-full bg-slate-950 border border-slate-800 p-1.5 rounded-sm text-xs text-white" />
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 font-bold mb-1">EMAIL ID *</label>
              <input type="email" id="reg-email" placeholder="e.g. kavya@college.edu" class="w-full bg-slate-950 border border-slate-800 p-1.5 rounded-sm text-xs text-white" />
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 font-bold mb-1">COURSE</label>
              <select id="reg-course" class="w-full bg-slate-950 border border-slate-800 p-1.5 rounded-sm text-xs text-white">
                <option value="">-- Select Course --</option>
                <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                <option value="B.Sc CS">B.Sc Computer Science</option>
                <option value="B.Tech">B.Tech IT</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 font-bold mb-1">GENDER</label>
              <div class="flex items-center gap-4 text-xs">
                <label class="flex items-center gap-1 cursor-pointer"><input type="radio" name="reg-gender" value="Male" checked /> Male</label>
                <label class="flex items-center gap-1 cursor-pointer"><input type="radio" name="reg-gender" value="Female" /> Female</label>
              </div>
            </div>
            <button id="btn-reg-submit" class="w-full py-2 bg-emerald-500 text-black font-bold rounded-sm hover:bg-emerald-400 transition-colors uppercase text-xs">
              Register Student (MessageBox.Show)
            </button>
          </div>
          <div id="reg-msgbox" class="hidden p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-sm text-emerald-300 text-xs font-mono whitespace-pre-line"></div>
        </div>
      `;

    case 'login-form':
      return `
        <div class="max-w-xs mx-auto bg-slate-900 border border-slate-700 rounded-sm p-4 space-y-3 text-slate-100">
          <div class="text-center space-y-1">
            <h3 class="text-sm font-bold text-cyan-400">Admin Login Portal</h3>
            <p class="text-[10px] text-slate-400">Enter credentials (admin / admin@123)</p>
          </div>
          <div class="space-y-2">
            <div>
              <label class="block text-[10px] text-slate-400 font-bold mb-1">USERNAME</label>
              <input type="text" id="login-user" value="admin" class="w-full bg-slate-950 border border-slate-800 p-1.5 rounded-sm text-xs text-white" />
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 font-bold mb-1">PASSWORD (PasswordChar: •)</label>
              <input type="password" id="login-pass" value="admin@123" class="w-full bg-slate-950 border border-slate-800 p-1.5 rounded-sm text-xs text-white" />
            </div>
            <label class="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
              <input type="checkbox" id="chk-show-pass" /> Show Password
            </label>
            <button id="btn-login-submit" class="w-full py-1.5 bg-cyan-500 text-black font-bold rounded-sm hover:bg-cyan-400 text-xs uppercase">
              Authenticate
            </button>
          </div>
          <div id="login-status" class="text-center text-xs font-bold text-slate-400 pt-2 border-t border-slate-800">
            Attempts Remaining: 3
          </div>
        </div>
      `;

    case 'stopwatch-timer':
      return `
        <div class="max-w-md mx-auto bg-slate-900 border border-slate-700 rounded-sm p-4 space-y-4 text-center text-slate-100">
          <h3 class="text-xs font-bold text-slate-400 uppercase">System.Windows.Forms.Timer Stopwatch</h3>
          <div id="stopwatch-display" class="text-4xl font-mono font-bold text-cyan-400 tracking-wider">
            00:00:00.00
          </div>
          <div class="flex justify-center gap-2">
            <button id="btn-sw-start" class="px-3 py-1.5 bg-emerald-500 text-black font-bold rounded-sm text-xs">START</button>
            <button id="btn-sw-pause" class="px-3 py-1.5 bg-amber-500 text-black font-bold rounded-sm text-xs">PAUSE</button>
            <button id="btn-sw-lap" class="px-3 py-1.5 bg-cyan-500 text-black font-bold rounded-sm text-xs">LAP</button>
            <button id="btn-sw-reset" class="px-3 py-1.5 bg-rose-500 text-white font-bold rounded-sm text-xs">RESET</button>
          </div>
          <div class="border-t border-slate-800 pt-2 text-left">
            <span class="text-[10px] text-slate-400 font-bold">LAP TIMESTAMPS:</span>
            <div id="sw-laps-list" class="h-28 overflow-y-auto bg-slate-950 p-2 font-mono text-xs text-slate-300 rounded-sm space-y-1 mt-1 border border-slate-800">
              <div class="text-slate-500 italic">No laps recorded yet.</div>
            </div>
          </div>
        </div>
      `;

    case 'todo-list':
      return `
        <div class="max-w-md mx-auto bg-slate-900 border border-slate-700 rounded-sm p-4 space-y-3 text-slate-100">
          <h3 class="text-xs font-bold text-cyan-400 uppercase">CheckedListBox Task Manager</h3>
          <div class="flex gap-2">
            <input type="text" id="todo-input" placeholder="Enter task..." class="flex-1 bg-slate-950 border border-slate-800 p-1.5 rounded-sm text-xs text-white" />
            <select id="todo-priority" class="bg-slate-950 border border-slate-800 p-1.5 rounded-sm text-xs text-white">
              <option value="High">🔴 High</option>
              <option value="Medium" selected>🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>
            <button id="btn-todo-add" class="px-3 py-1.5 bg-emerald-500 text-black font-bold rounded-sm text-xs">ADD</button>
          </div>
          <div id="todo-list-box" class="min-h-[140px] bg-slate-950 border border-slate-800 rounded-sm p-2 space-y-1 overflow-y-auto">
            <label class="flex items-center gap-2 p-1.5 hover:bg-slate-800 rounded-xs text-xs cursor-pointer">
              <input type="checkbox" class="todo-item-chk" /> 🔴 [HIGH] Complete ADO.NET Assignment
            </label>
            <label class="flex items-center gap-2 p-1.5 hover:bg-slate-800 rounded-xs text-xs cursor-pointer">
              <input type="checkbox" class="todo-item-chk" /> 🟡 [MED] Review Crystal Reports
            </label>
          </div>
          <div class="flex justify-between items-center text-xs text-slate-400">
            <span id="todo-stats">Completed: 0 / 2 Tasks</span>
            <button id="btn-todo-clear" class="text-rose-400 hover:underline">Remove Checked</button>
          </div>
        </div>
      `;

    default:
      // Generic Simulated WinForms Output Console View
      return `
        <div class="bg-slate-950 border border-slate-800 rounded-sm p-4 font-mono text-xs space-y-3">
          <div class="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-2">
            <span>WINFORMS RUNTIME CANVAS // SIMULATION</span>
            <span class="text-emerald-400 font-bold">● ACTIVE STDOUT</span>
          </div>

          <div class="space-y-1 text-slate-300 max-h-64 overflow-y-auto">
            ${(practical.simulatedOutput || ['Application launched successfully.']).map(line => `
              <div class="leading-relaxed text-cyan-300">&gt; ${escapeHtml(line)}</div>
            `).join('')}
          </div>

          <div class="p-3 bg-slate-900 border border-slate-800 rounded-sm text-slate-400 text-[11px] leading-relaxed">
            💡 <strong>Runtime Note</strong>: Practical #${practical.id} demonstrates <em>${escapeHtml(practical.aim)}</em>.
          </div>
        </div>
      `;
  }
}

function wireEmulatorEvents(container, type, practical) {
  if (type === 'grid-calculator') {
    let display = container.querySelector('#calc-display');
    let eq = container.querySelector('#calc-equation');
    let operand1 = null;
    let op = null;
    let isOpClicked = false;

    container.querySelectorAll('.calc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.textContent.trim();
        if ('0123456789.'.includes(text)) {
          if (display.value === '0' || isOpClicked) display.value = '';
          isOpClicked = false;
          if (text === '.' && display.value.includes('.')) return;
          display.value += text;
        } else if ('+-×÷%'.includes(text)) {
          operand1 = parseFloat(display.value);
          op = text;
          isOpClicked = true;
          eq.textContent = `${operand1} ${op}`;
        } else if (text === '=') {
          if (operand1 !== null && op) {
            let operand2 = parseFloat(display.value);
            let res = 0;
            if (op === '+') res = operand1 + operand2;
            else if (op === '-') res = operand1 - operand2;
            else if (op === '×') res = operand1 * operand2;
            else if (op === '÷') res = operand2 !== 0 ? operand1 / operand2 : 'Error';
            else if (op === '%') res = operand1 % operand2;
            display.value = res;
            eq.textContent = '';
            operand1 = null;
            op = null;
          }
        } else if (text === 'C') {
          display.value = '0';
          eq.textContent = '';
          operand1 = null;
          op = null;
        } else if (text === '√') {
          let val = parseFloat(display.value);
          display.value = val >= 0 ? Math.sqrt(val) : 'Error';
        }
      });
    });
  } else if (type === 'registration-form') {
    const btnSubmit = container.querySelector('#btn-reg-submit');
    const msgbox = container.querySelector('#reg-msgbox');
    if (btnSubmit && msgbox) {
      btnSubmit.addEventListener('click', () => {
        const name = container.querySelector('#reg-name').value.trim();
        const email = container.querySelector('#reg-email').value.trim();
        const course = container.querySelector('#reg-course').value;
        const gender = container.querySelector('input[name="reg-gender"]:checked').value;

        if (!name || !email || !course) {
          msgbox.className = 'p-3 bg-rose-500/10 border border-rose-500/40 rounded-sm text-rose-300 text-xs font-mono';
          msgbox.textContent = '[MessageBox.Show] Validation Error: Please fill in Name, Email, and select a Course!';
        } else {
          msgbox.className = 'p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-sm text-emerald-300 text-xs font-mono';
          msgbox.textContent = `[MessageBox.Show] REGISTRATION CONFIRMED!\n\nName: ${name}\nEmail: ${email}\nCourse: ${course}\nGender: ${gender}\nStatus: Saved to Lab Database`;
        }
        msgbox.classList.remove('hidden');
      });
    }
  } else if (type === 'login-form') {
    const btnLogin = container.querySelector('#btn-login-submit');
    const chkShow = container.querySelector('#chk-show-pass');
    const passInput = container.querySelector('#login-pass');
    const statusDiv = container.querySelector('#login-status');
    let attempts = 3;

    if (chkShow && passInput) {
      chkShow.addEventListener('change', () => {
        passInput.type = chkShow.checked ? 'text' : 'password';
      });
    }

    if (btnLogin) {
      btnLogin.addEventListener('click', () => {
        const user = container.querySelector('#login-user').value.trim();
        const pass = passInput.value;

        if (user === 'admin' && pass === 'admin@123') {
          statusDiv.innerHTML = `<span class="text-emerald-400">✔ Authenticated! Access Granted.</span>`;
          attempts = 3;
        } else {
          attempts--;
          if (attempts > 0) {
            statusDiv.innerHTML = `<span class="text-rose-400">Invalid Credentials! ${attempts} attempts left.</span>`;
          } else {
            statusDiv.innerHTML = `<span class="text-rose-500 font-bold">⛔ Account Locked! Max attempts exceeded.</span>`;
            btnLogin.disabled = true;
          }
        }
      });
    }
  } else if (type === 'stopwatch-timer') {
    let swDisplay = container.querySelector('#stopwatch-display');
    let lapsList = container.querySelector('#sw-laps-list');
    let seconds = 0;
    let timer = null;

    const formatTime = (totalSec) => {
      let hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
      let mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
      let secs = String(totalSec % 60).padStart(2, '0');
      return `${hrs}:${mins}:${secs}.00`;
    };

    container.querySelector('#btn-sw-start')?.addEventListener('click', () => {
      if (!timer) {
        timer = setInterval(() => {
          seconds++;
          swDisplay.textContent = formatTime(seconds);
        }, 1000);
      }
    });

    container.querySelector('#btn-sw-pause')?.addEventListener('click', () => {
      clearInterval(timer);
      timer = null;
    });

    container.querySelector('#btn-sw-reset')?.addEventListener('click', () => {
      clearInterval(timer);
      timer = null;
      seconds = 0;
      swDisplay.textContent = '00:00:00.00';
      lapsList.innerHTML = '<div class="text-slate-500 italic">No laps recorded yet.</div>';
    });

    container.querySelector('#btn-sw-lap')?.addEventListener('click', () => {
      if (seconds > 0) {
        if (lapsList.querySelector('.italic')) lapsList.innerHTML = '';
        let lapNum = lapsList.children.length + 1;
        let div = document.createElement('div');
        div.className = 'text-cyan-300';
        div.textContent = `Lap #${String(lapNum).padStart(2, '0')} - ${formatTime(seconds)}`;
        lapsList.insertBefore(div, lapsList.firstChild);
      }
    });
  } else if (type === 'todo-list') {
    const btnAdd = container.querySelector('#btn-todo-add');
    const input = container.querySelector('#todo-input');
    const prio = container.querySelector('#todo-priority');
    const listBox = container.querySelector('#todo-list-box');
    const stats = container.querySelector('#todo-stats');
    const btnClear = container.querySelector('#btn-todo-clear');

    const updateStats = () => {
      let total = listBox.querySelectorAll('label').length;
      let checked = listBox.querySelectorAll('input:checked').length;
      stats.textContent = `Completed: ${checked} / ${total} Tasks`;
    };

    btnAdd?.addEventListener('click', () => {
      let val = input.value.trim();
      if (!val) return;
      let badge = prio.value === 'High' ? '🔴 [HIGH]' : (prio.value === 'Medium' ? '🟡 [MED]' : '🟢 [LOW]');
      let label = document.createElement('label');
      label.className = 'flex items-center gap-2 p-1.5 hover:bg-slate-800 rounded-xs text-xs cursor-pointer';
      label.innerHTML = `<input type="checkbox" class="todo-item-chk" /> ${badge} ${escapeHtml(val)}`;
      listBox.appendChild(label);
      input.value = '';
      updateStats();
    });

    listBox?.addEventListener('change', updateStats);

    btnClear?.addEventListener('click', () => {
      listBox.querySelectorAll('label').forEach(lbl => {
        if (lbl.querySelector('input').checked) {
          lbl.remove();
        }
      });
      updateStats();
    });
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
