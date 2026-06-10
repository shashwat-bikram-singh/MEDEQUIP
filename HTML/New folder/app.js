/* ============================================================
   StudyFlow — AI Study Planner & Focus Tracker
   app.js — Full application logic
   ============================================================ */

'use strict';

// ──────────────────────────────────────────────
//  STATE
// ──────────────────────────────────────────────
let state = {
  tasks: [],
  sessions: [],      // focus session log
  streak: 0,
  lastActiveDate: null,
  totalFocusMin: 0,
  heatmap: {},       // "YYYY-MM-DD" → minutes
};

// Load from localStorage
function loadState() {
  try {
    const raw = localStorage.getItem('studyflow_state');
    if (raw) state = { ...state, ...JSON.parse(raw) };
  } catch (e) { /* fresh start */ }
}

function saveState() {
  localStorage.setItem('studyflow_state', JSON.stringify(state));
}

// ──────────────────────────────────────────────
//  UTILITY
// ──────────────────────────────────────────────
function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function fmt(date) {
  return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

function fmtTime(date) {
  return new Date(date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function showToast(msg, duration = 2800) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), duration);
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// ──────────────────────────────────────────────
//  NAV / TAB SWITCHING
// ──────────────────────────────────────────────
function initNav() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + tab).classList.add('active');
      if (tab === 'stats') renderStats();
    });
  });
}

// ──────────────────────────────────────────────
//  AI TIPS
// ──────────────────────────────────────────────
const TIPS = [
  "Review difficult topics in the morning when cognitive load is lowest.",
  "The Feynman technique: explain what you learned as if teaching a 10-year-old.",
  "Spaced repetition beats marathon cramming by up to 200% retention rate.",
  "Take a 5-min walk between sessions — movement boosts neuroplasticity.",
  "Write summaries by hand. Motor memory reinforces learning pathways.",
  "High-priority tasks first — decision fatigue is real and builds by afternoon.",
  "Group similar subjects together to exploit context-switching efficiency.",
  "Sleep is non-negotiable. Memory consolidation happens during deep sleep.",
  "Practice retrieving information, not just reading it — tests build memory.",
  "Background instrumental music at 60–70 BPM can improve focus.",
  "Set specific goals per session, not vague 'study math' intentions.",
  "If stuck for 20 minutes, take a break. Incubation unlocks insight.",
  "Active recall every 24h after learning locks in 90%+ retention.",
  "Batch small tasks together to protect deep work blocks.",
  "Hydrate. Even mild dehydration drops cognitive performance by 10–15%.",
];

let tipIndex = Math.floor(Math.random() * TIPS.length);

function showTip() {
  const el = document.getElementById('aiTip');
  el.style.opacity = 0;
  setTimeout(() => {
    el.textContent = TIPS[tipIndex % TIPS.length];
    el.style.transition = 'opacity 0.4s';
    el.style.opacity = 1;
    tipIndex++;
  }, 200);
}

function initTips() {
  showTip();
  document.getElementById('refreshTip').addEventListener('click', showTip);
  setInterval(showTip, 60000);
}

// ──────────────────────────────────────────────
//  MOTIVATIONAL QUOTES
// ──────────────────────────────────────────────
const QUOTES = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
];

let quoteIndex = Math.floor(Math.random() * QUOTES.length);

function showQuote() {
  const q = QUOTES[quoteIndex % QUOTES.length];
  document.getElementById('quoteText').textContent = q.text;
  document.getElementById('quoteAuthor').textContent = '— ' + q.author;
  quoteIndex++;
}

function initQuotes() {
  showQuote();
  document.getElementById('newQuoteBtn').addEventListener('click', showQuote);
}

// ──────────────────────────────────────────────
//  STREAK
// ──────────────────────────────────────────────
function updateStreak(addActivity = false) {
  const today = todayStr();
  if (addActivity) {
    if (state.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().split('T')[0];
      state.streak = state.lastActiveDate === yStr ? (state.streak + 1) : 1;
      state.lastActiveDate = today;
    }
    saveState();
  }
  document.getElementById('streakCount').textContent = state.streak;
  document.getElementById('stat-streak').textContent = state.streak;
}

// ──────────────────────────────────────────────
//  TASK MANAGEMENT
// ──────────────────────────────────────────────
let currentFilter = 'all';

function renderTasks() {
  const list = document.getElementById('taskList');
  const empty = document.getElementById('emptyState');
  let tasks = [...state.tasks];

  const today = todayStr();

  if (currentFilter === 'high') tasks = tasks.filter(t => t.priority === 'high' && !t.done);
  else if (currentFilter === 'today') tasks = tasks.filter(t => t.due === today && !t.done);
  else if (currentFilter === 'done') tasks = tasks.filter(t => t.done);
  else tasks = tasks.filter(t => !t.done).concat(tasks.filter(t => t.done));

  // Sort: priority high→low, then by due date
  const pOrd = { high: 0, medium: 1, low: 2, '': 3 };
  tasks.sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return (pOrd[a.priority] - pOrd[b.priority]) || (a.due || '').localeCompare(b.due || '');
  });

  // Clear old cards (preserve emptyState)
  Array.from(list.children).forEach(c => {
    if (c !== empty) c.remove();
  });

  if (tasks.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  tasks.forEach(task => {
    const card = buildTaskCard(task);
    list.appendChild(card);
  });

  // Update focus task selector
  syncFocusSelector();
}

function buildTaskCard(task) {
  const card = document.createElement('div');
  card.className = 'task-card' + (task.done ? ' done' : '');
  card.dataset.id = task.id;

  const isOverdue = task.due && task.due < todayStr() && !task.done;

  card.innerHTML = `
    <button class="task-check" title="Mark complete">
      <span class="task-check-inner">✓</span>
    </button>
    <div class="task-body">
      <div class="task-top">
        <span class="task-name">${escHtml(task.name)}</span>
        ${task.subject ? `<span class="task-subject">${escHtml(task.subject)}</span>` : ''}
        ${task.priority ? `<span class="priority-dot ${task.priority}" title="${task.priority} priority"></span>` : ''}
      </div>
      <div class="task-meta">
        ${task.due ? `<span class="task-meta-item" style="${isOverdue ? 'color:var(--danger)' : ''}">📅 ${fmt(task.due + 'T00:00:00')}${isOverdue ? ' (overdue)' : ''}</span>` : ''}
        ${task.duration ? `<span class="task-meta-item">⏱ ${task.duration}m</span>` : ''}
        ${task.notes ? `<span class="task-meta-item" title="${escHtml(task.notes)}">📝 Note</span>` : ''}
      </div>
    </div>
    <div class="task-actions">
      <button class="icon-btn focus-btn" title="Focus on this task">🎯</button>
      <button class="icon-btn delete" title="Delete">✕</button>
    </div>
  `;

  card.querySelector('.task-check').addEventListener('click', () => toggleTask(task.id));
  card.querySelector('.delete').addEventListener('click', () => deleteTask(task.id));
  card.querySelector('.focus-btn').addEventListener('click', () => startFocusOn(task));

  return card;
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function addTask() {
  const name = document.getElementById('taskName').value.trim();
  if (!name) { showToast('⚠ Please enter a task name'); return; }

  const task = {
    id: uid(),
    name,
    subject: document.getElementById('taskSubject').value,
    due: document.getElementById('taskDue').value,
    priority: document.getElementById('taskPriority').value,
    duration: parseInt(document.getElementById('taskDuration').value) || 0,
    notes: document.getElementById('taskNotes').value.trim(),
    done: false,
    createdAt: Date.now(),
  };

  state.tasks.unshift(task);
  saveState();
  renderTasks();
  showToast('✅ Task added!');

  // Reset form
  ['taskName','taskSubject','taskDue','taskPriority','taskDuration','taskNotes'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

function toggleTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;
  task.done = !task.done;
  if (task.done) {
    task.completedAt = Date.now();
    updateStreak(true);
    showToast('🎉 Task completed!');
  }
  saveState();
  renderTasks();
  if (document.getElementById('tab-stats').classList.contains('active')) renderStats();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter(t => t.id !== id);
  saveState();
  renderTasks();
  showToast('🗑 Task removed');
}

function startFocusOn(task) {
  // Switch to focus tab and pre-select task
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelector('[data-tab="focus"]').classList.add('active');
  document.getElementById('tab-focus').classList.add('active');

  setTimeout(() => {
    const sel = document.getElementById('focusTask');
    for (const opt of sel.options) {
      if (opt.value === task.id) { sel.value = task.id; break; }
    }
  }, 100);
}

function initTaskFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderTasks();
    });
  });
}

function syncFocusSelector() {
  const sel = document.getElementById('focusTask');
  const val = sel.value;
  sel.innerHTML = '<option value="">— Select a task —</option>';
  state.tasks.filter(t => !t.done).forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = `${t.name}${t.subject ? ' · ' + t.subject : ''}`;
    sel.appendChild(opt);
  });
  if (val) sel.value = val;
}

// ──────────────────────────────────────────────
//  FOCUS TIMER
// ──────────────────────────────────────────────
const CIRCUMFERENCE = 616; // 2 * PI * 98
let timer = {
  totalSeconds: 25 * 60,
  secondsLeft: 25 * 60,
  interval: null,
  running: false,
  phase: 'work',  // 'work' | 'break'
  sessionMinutes: 25,
  breakMinutes: 5,
  todaySessions: 0,
  todayFocusMin: 0,
  todayBreakMin: 0,
};

function initTimer() {
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (timer.running) return;
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.mode;
      const customRow = document.getElementById('customTimeRow');
      if (mode === 'custom') {
        customRow.classList.remove('hidden');
      } else {
        customRow.classList.add('hidden');
        const mins = parseInt(mode);
        timer.sessionMinutes = mins;
        timer.breakMinutes = mins <= 25 ? 5 : mins <= 45 ? 10 : 15;
        setTimerDisplay(mins * 60);
      }
    });
  });

  document.getElementById('customMinutes').addEventListener('change', (e) => {
    const mins = Math.max(1, Math.min(240, parseInt(e.target.value) || 25));
    timer.sessionMinutes = mins;
    timer.breakMinutes = 5;
    setTimerDisplay(mins * 60);
  });

  document.getElementById('startBtn').addEventListener('click', startTimer);
  document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
  document.getElementById('resetBtn').addEventListener('click', resetTimer);
}

function setTimerDisplay(seconds) {
  timer.totalSeconds = seconds;
  timer.secondsLeft = seconds;
  updateTimerUI();
}

function updateTimerUI() {
  const m = Math.floor(timer.secondsLeft / 60).toString().padStart(2, '0');
  const s = (timer.secondsLeft % 60).toString().padStart(2, '0');
  document.getElementById('timerDisplay').textContent = `${m}:${s}`;

  const progress = timer.secondsLeft / timer.totalSeconds;
  const offset = CIRCUMFERENCE * (1 - progress);
  const ring = document.getElementById('ringProgress');
  ring.style.strokeDashoffset = offset;
  ring.className = 'ring-progress' + (timer.running ? (timer.phase === 'work' ? ' running' : ' break') : '');

  document.getElementById('timerPhase').textContent =
    timer.running ? (timer.phase === 'work' ? 'Focusing…' : '☕ Break') : 'Ready';
}

function startTimer() {
  if (timer.running) return;
  timer.running = true;
  document.getElementById('startBtn').disabled = true;
  document.getElementById('pauseBtn').disabled = false;

  timer.interval = setInterval(() => {
    timer.secondsLeft--;

    if (timer.phase === 'work') timer.todayFocusMin += 1/60;
    else timer.todayBreakMin += 1/60;

    if (timer.secondsLeft <= 0) {
      if (timer.phase === 'work') {
        // Session complete
        timer.todaySessions++;
        logSession();
        updateStreak(true);
        showToast('🎯 Focus session complete! Take a break.');
        playBeep();

        timer.phase = 'break';
        timer.totalSeconds = timer.breakMinutes * 60;
        timer.secondsLeft = timer.totalSeconds;
      } else {
        // Break complete
        showToast('⚡ Break over! Ready to focus?');
        playBeep();
        timer.phase = 'work';
        timer.totalSeconds = timer.sessionMinutes * 60;
        timer.secondsLeft = timer.totalSeconds;
      }
    }

    updateTimerUI();
    updateSessionChips();
  }, 1000);

  updateTimerUI();
}

function pauseTimer() {
  clearInterval(timer.interval);
  timer.running = false;
  document.getElementById('startBtn').disabled = false;
  document.getElementById('pauseBtn').disabled = true;
  document.getElementById('timerPhase').textContent = 'Paused';
  const ring = document.getElementById('ringProgress');
  ring.className = 'ring-progress';
}

function resetTimer() {
  pauseTimer();
  timer.phase = 'work';
  timer.secondsLeft = timer.sessionMinutes * 60;
  timer.totalSeconds = timer.sessionMinutes * 60;
  document.getElementById('timerPhase').textContent = 'Ready';
  updateTimerUI();
}

function updateSessionChips() {
  document.getElementById('sessionsToday').textContent = timer.todaySessions;
  document.getElementById('focusTimeToday').textContent = Math.round(timer.todayFocusMin) + 'm';
  document.getElementById('breakTimeToday').textContent = Math.round(timer.todayBreakMin) + 'm';
}

function logSession() {
  const taskId = document.getElementById('focusTask').value;
  const task = state.tasks.find(t => t.id === taskId);
  const entry = {
    id: uid(),
    taskName: task ? task.name : 'Free Study',
    duration: timer.sessionMinutes,
    timestamp: Date.now(),
    date: todayStr(),
  };
  state.sessions.unshift(entry);

  // Update heatmap
  const d = todayStr();
  state.heatmap[d] = (state.heatmap[d] || 0) + timer.sessionMinutes;

  // Update total focus time
  state.totalFocusMin = (state.totalFocusMin || 0) + timer.sessionMinutes;

  saveState();
  renderFocusLog();
}

function renderFocusLog() {
  const log = document.getElementById('focusLog');
  const todaySessions = state.sessions.filter(s => s.date === todayStr());
  if (todaySessions.length === 0) {
    log.innerHTML = '<p class="log-empty">No sessions yet. Start your first focus session!</p>';
    return;
  }
  log.innerHTML = todaySessions.map(s => `
    <div class="log-entry">
      <span class="log-icon">🎯</span>
      <div class="log-info">
        <div class="log-task">${escHtml(s.taskName)}</div>
        <div class="log-time">${fmtTime(s.timestamp)}</div>
      </div>
      <span class="log-duration">${s.duration}m</span>
    </div>
  `).join('');
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);
  } catch (e) { /* audio not supported */ }
}

// ──────────────────────────────────────────────
//  STATS
// ──────────────────────────────────────────────
function renderStats() {
  // Cards
  const done = state.tasks.filter(t => t.done).length;
  document.getElementById('stat-tasks-done').textContent = done;

  const totalMin = state.totalFocusMin || 0;
  const h = Math.floor(totalMin / 60);
  const m = Math.round(totalMin % 60);
  document.getElementById('stat-focus-total').textContent = `${h}h ${m}m`;
  document.getElementById('stat-sessions').textContent = state.sessions.length;

  updateStreak();

  // Heatmap
  renderHeatmap();

  // Subject breakdown
  renderSubjectBreakdown();
}

function renderHeatmap() {
  const wrap = document.getElementById('weeklyHeatmap');
  wrap.innerHTML = '';
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const today = new Date();
  const dayOfWeek = (today.getDay() + 6) % 7; // Mon=0

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - dayOfWeek + i);
    const key = d.toISOString().split('T')[0];
    const mins = state.heatmap[key] || 0;

    let level = 0;
    if (mins > 0) level = 1;
    if (mins >= 30) level = 2;
    if (mins >= 60) level = 3;
    if (mins >= 120) level = 4;

    const col = document.createElement('div');
    col.className = 'heatmap-day';
    col.innerHTML = `
      <div class="heatmap-label">${days[i]}</div>
      <div class="heatmap-cell l${level}" title="${mins}m focused"></div>
    `;
    wrap.appendChild(col);
  }
}

function renderSubjectBreakdown() {
  const wrap = document.getElementById('subjectBreakdown');
  const doneTasks = state.tasks.filter(t => t.done && t.subject);
  if (doneTasks.length === 0) {
    wrap.innerHTML = '<p class="log-empty">Complete tasks to see subject stats.</p>';
    return;
  }

  const counts = {};
  doneTasks.forEach(t => {
    counts[t.subject] = (counts[t.subject] || 0) + 1;
  });
  const max = Math.max(...Object.values(counts));
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  wrap.innerHTML = sorted.map(([sub, cnt]) => `
    <div class="subject-row">
      <span class="subject-name">${escHtml(sub)}</span>
      <div class="subject-bar-wrap">
        <div class="subject-bar" style="width: ${(cnt/max*100).toFixed(1)}%"></div>
      </div>
      <span class="subject-count">${cnt} task${cnt > 1 ? 's' : ''}</span>
    </div>
  `).join('');
}

// ──────────────────────────────────────────────
//  INIT
// ──────────────────────────────────────────────
function init() {
  loadState();
  initNav();
  initTips();
  initQuotes();
  initTaskFilters();
  initTimer();

  document.getElementById('addTaskBtn').addEventListener('click', addTask);
  document.getElementById('taskName').addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
  });

  renderTasks();
  renderFocusLog();
  updateStreak();

  // Set default date to today
  document.getElementById('taskDue').value = todayStr();
}

document.addEventListener('DOMContentLoaded', init);
