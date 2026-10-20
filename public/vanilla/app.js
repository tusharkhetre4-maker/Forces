/**
 * FORCES COMMITTEE PORTAL - PURE VANILLA JAVASCRIPT
 * No dependencies, runs directly in any modern browser.
 */

// ==========================================
// 1. DATA MODELS & STATE
// ==========================================

const MOCK_EVENTS = [
  {
    id: 'evt-1',
    title: 'HackForces 2026: Agentic AI & Systems',
    category: 'Hackathon',
    date: 'Nov 12, 2026',
    venue: 'Main Campus Tech Auditorium',
    seats: 120,
    registered: 94,
    image: 'images/forces_hackathon_event_1790217556949.jpg',
    desc: '36-hour collegiate hackathon focused on autonomous LLM agent frameworks and distributed databases.'
  },
  {
    id: 'evt-2',
    title: 'Forces Tech Talks: Scalable Architectures',
    category: 'Symposium',
    date: 'Dec 02, 2026',
    venue: 'Central Auditorium',
    seats: 250,
    registered: 180,
    image: 'images/forces_tech_talks_1790867024001.jpg',
    desc: 'Keynote presentations by distributed systems architects on low-latency microservices.'
  },
  {
    id: 'evt-3',
    title: 'Robotics & Hardware IoT Sprint',
    category: 'Workshop',
    date: 'Nov 18, 2026',
    venue: 'Innovation Lab 4',
    seats: 45,
    registered: 42,
    image: 'images/forces_robotics_lab_1790867037986.jpg',
    desc: 'Hands-on assembly of autonomous rovers with live telemetry sensor nodes.'
  }
];

const MOCK_TEAM = [
  {
    id: 'mem-1',
    name: 'Samantha Vance',
    role: 'President',
    dept: 'Computer Science & Engineering',
    rating: 4.9,
    photo: 'images/president_portrait_1790217541259.jpg',
    bio: 'Oversees 45 council leads, campus hackathons, and committee transparency initiatives.'
  },
  {
    id: 'mem-2',
    name: 'Alex Rivera',
    role: 'Vice President & Tech Lead',
    dept: 'Information Technology',
    rating: 4.8,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Lead architect for campus competitive coding systems and open-source infrastructure.'
  },
  {
    id: 'mem-3',
    name: 'Elena Rostova',
    role: 'Robotics & Hardware Head',
    dept: 'Electronics & Communication',
    rating: 4.9,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Directs hardware hack sprints, drone racing events, and sensor micro-controller workshops.'
  },
  {
    id: 'mem-4',
    name: 'Marcus Chen',
    role: 'Operations & Grievance Officer',
    dept: 'Mechanical Engineering',
    rating: 4.7,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Administers the 100% anonymous student grievance shield and event safety logistics.'
  }
];

const MOCK_QUIZZES = [
  {
    id: 'quiz-1',
    title: 'Systems & Algorithmic Problem Solving',
    questionsCount: 3,
    timeMinutes: 5,
    questions: [
      {
        q: 'What is the average time complexity of searching an element in a balanced Hash Table?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
        answer: 0
      },
      {
        q: 'Which protocol is standard for real-time bidirectional browser-server communication?',
        options: ['HTTP/1.0', 'WebSockets', 'FTP', 'SMTP'],
        answer: 1
      },
      {
        q: 'In distributed systems, the CAP theorem states a database can guarantee at most two of which three properties?',
        options: [
          'Consistency, Availability, Partition Tolerance',
          'Concurrency, Agility, Performance',
          'Caching, Authentication, Persistence'
        ],
        answer: 0
      }
    ]
  }
];

// Local state for complaints
let complaints = JSON.parse(localStorage.getItem('forces_vanilla_complaints')) || [
  {
    id: 'GRV-84920',
    category: 'Event Organization',
    title: 'Auditorium AC during morning keynote session',
    desc: 'The central auditorium AC was non-functional during the distributed systems keynote.',
    status: 'In Review',
    date: '2026-10-18'
  }
];

let currentUser = {
  name: 'Samantha Vance',
  role: 'president',
  email: 'president@forces.edu'
};

// ==========================================
// 2. TAB NAVIGATION
// ==========================================

function switchTab(tabId) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  
  // Show target tab
  const target = document.getElementById(`tab-${tabId}`);
  if (target) {
    target.classList.remove('hidden');
  }

  // Update navbar active state
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.className = 'nav-btn px-3.5 py-2 rounded-xl transition flex items-center gap-2 hover:text-blue-600 hover:bg-slate-100/70 text-slate-600';
  });

  const activeBtn = document.getElementById(`nav-${tabId}`);
  if (activeBtn) {
    if (tabId === 'feedback') {
      activeBtn.className = 'nav-btn px-3.5 py-2 rounded-xl transition flex items-center gap-2 bg-rose-50 text-rose-600 font-bold border border-rose-200 shadow-xs';
    } else {
      activeBtn.className = 'nav-btn px-3.5 py-2 rounded-xl transition flex items-center gap-2 bg-blue-50 text-blue-600 font-bold border border-blue-200/80 shadow-xs';
    }
  }

  // Render tab specific data
  if (tabId === 'team') renderTeam();
  if (tabId === 'events') renderEvents();
  if (tabId === 'quizzes') renderQuizzes();
  if (tabId === 'admin') renderAdmin();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 3. USER & ROLE MANAGEMENT
// ==========================================

function toggleUserDropdown() {
  const dd = document.getElementById('userDropdown');
  dd.classList.toggle('hidden');
}

function changeRole(role) {
  currentUser.role = role;
  const badge = document.getElementById('userRoleBadge');
  badge.textContent = role.toUpperCase();
  
  if (role === 'admin') {
    badge.className = 'text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase bg-purple-100 text-purple-700';
  } else if (role === 'president') {
    badge.className = 'text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase bg-amber-100 text-amber-700';
  } else {
    badge.className = 'text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase bg-blue-100 text-blue-700';
  }
  showToast(`Switched active test role to ${role.toUpperCase()}`);
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  const btn = document.getElementById('userMenuBtn');
  const dd = document.getElementById('userDropdown');
  if (btn && dd && !btn.contains(e.target) && !dd.contains(e.target)) {
    dd.classList.add('hidden');
  }
});

// ==========================================
// 4. SCROLLABLE EVENT PHOTOS REEL & LIGHTBOX
// ==========================================

function scrollPhotos(distance) {
  const reel = document.getElementById('photoCarousel');
  if (reel) {
    reel.scrollBy({ left: distance, behavior: 'smooth' });
  }
}

function filterPhotos(category) {
  // Update buttons
  document.querySelectorAll('.photo-filter-btn').forEach(btn => {
    btn.className = 'photo-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80';
  });
  event.target.className = 'photo-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap bg-blue-600 text-white shadow-xs';

  // Filter cards
  const cards = document.querySelectorAll('.photo-card');
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

function openLightbox(photoSrc, title, desc) {
  document.getElementById('lightboxImg').src = photoSrc;
  document.getElementById('lightboxTitle').textContent = title;
  document.getElementById('lightboxDesc').textContent = desc;
  document.getElementById('lightboxModal').classList.remove('hidden');
}

function closeLightbox() {
  document.getElementById('lightboxModal').classList.add('hidden');
}

function scrollToPhotos() {
  const el = document.getElementById('scrollable-event-photos');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// 5. TEAM RENDERING
// ==========================================

function renderTeam() {
  const container = document.getElementById('teamGrid');
  if (!container) return;

  container.innerHTML = MOCK_TEAM.map(member => `
    <div class="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all">
      <div class="flex items-center gap-4">
        <img src="${member.photo}" alt="${member.name}" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-100" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'">
        <div>
          <span class="inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-blue-50 text-blue-700">${member.role}</span>
          <h4 class="text-base font-bold text-slate-900 mt-0.5">${member.name}</h4>
          <p class="text-xs text-slate-500">${member.dept}</p>
        </div>
      </div>
      <p class="text-xs text-slate-600 leading-relaxed">${member.bio}</p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div class="flex items-center gap-1 text-amber-500 font-bold">
          <i class="fa-solid fa-star"></i>
          <span>${member.rating}</span>
          <span class="text-slate-400 font-normal">/ 5.0</span>
        </div>
        <button onclick="rateMember('${member.name}')" class="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl transition">Rate Lead</button>
      </div>
    </div>
  `).join('');
}

function rateMember(name) {
  showToast(`Thank you! Submitted 5-star rating for ${name}.`);
}

// ==========================================
// 6. EVENTS RENDERING & RSVP
// ==========================================

function renderEvents() {
  const container = document.getElementById('eventsGrid');
  if (!container) return;

  container.innerHTML = MOCK_EVENTS.map(evt => `
    <div class="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all">
      <div class="h-48 w-full relative overflow-hidden bg-slate-950">
        <img src="${evt.image}" alt="${evt.title}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'">
        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold">${evt.category}</span>
      </div>
      <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <p class="text-xs text-blue-600 font-bold flex items-center gap-1.5"><i class="fa-solid fa-calendar"></i> ${evt.date} · ${evt.venue}</p>
          <h4 class="text-lg font-bold text-slate-900 mt-1">${evt.title}</h4>
          <p class="text-xs text-slate-600 mt-2 leading-relaxed">${evt.desc}</p>
        </div>
        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500">${evt.registered} / ${evt.seats} Seats Registered</span>
          <button onclick="rsvpEvent('${evt.title}')" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition">Free RSVP</button>
        </div>
      </div>
    </div>
  `).join('');
}

function rsvpEvent(title) {
  showToast(`Confirmed! Digital admission ticket booked for: ${title}`);
}

// ==========================================
// 7. QUIZZES
// ==========================================

function renderQuizzes() {
  const container = document.getElementById('quizzesContainer');
  if (!container) return;

  const quiz = MOCK_QUIZZES[0];
  container.innerHTML = `
    <div class="bg-white rounded-3xl border border-slate-200 p-8 shadow-soft space-y-6 max-w-3xl mx-auto">
      <div class="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-extrabold uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Live Assessment</span>
          <h3 class="text-xl font-black text-slate-900 mt-1">${quiz.title}</h3>
        </div>
        <span class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl"><i class="fa-solid fa-clock text-blue-600 mr-1.5"></i> ${quiz.timeMinutes} Minutes</span>
      </div>
      <div class="space-y-6">
        ${quiz.questions.map((q, i) => `
          <div class="space-y-2.5">
            <p class="text-sm font-bold text-slate-800">${i + 1}. ${q.q}</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${q.options.map((opt, oIdx) => `
                <label class="flex items-center gap-2 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs font-semibold text-slate-700 transition">
                  <input type="radio" name="q_${i}" value="${oIdx}" class="text-blue-600 focus:ring-blue-500">
                  <span>${opt}</span>
                </label>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
      <button onclick="submitQuiz()" class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition">
        Submit Quiz & View Score
      </button>
    </div>
  `;
}

function submitQuiz() {
  showToast('Quiz submitted! You scored 3/3 (100%) - Excellent Performance!');
}

// ==========================================
// 8. FEEDBACK & COMPLAINTS
// ==========================================

function submitComplaint(e) {
  e.preventDefault();
  const category = document.getElementById('complaintCategory').value;
  const title = document.getElementById('complaintTitle').value;
  const desc = document.getElementById('complaintDesc').value;

  const newGrievance = {
    id: 'GRV-' + Math.floor(10000 + Math.random() * 90000),
    category,
    title,
    desc,
    status: 'In Review',
    date: new Date().toISOString().split('T')[0]
  };

  complaints.unshift(newGrievance);
  localStorage.setItem('forces_vanilla_complaints', JSON.stringify(complaints));

  document.getElementById('complaintForm').reset();
  showToast(`Grievance submitted anonymously! Tracking Ref: ${newGrievance.id}`);
}

function renderAdmin() {
  const container = document.getElementById('adminComplaintsList');
  if (!container) return;

  if (complaints.length === 0) {
    container.innerHTML = '<p class="text-xs text-slate-400">No student complaints on file.</p>';
    return;
  }

  container.innerHTML = complaints.map(c => `
    <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
      <div class="flex items-center justify-between text-xs">
        <span class="font-extrabold text-blue-700">${c.id}</span>
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">${c.status}</span>
      </div>
      <h5 class="text-sm font-bold text-slate-800">${c.title}</h5>
      <p class="text-xs text-slate-600">${c.desc}</p>
      <p class="text-[10px] text-slate-400">Category: ${c.category} · Submitted: ${c.date}</p>
    </div>
  `).join('');
}

// ==========================================
// 9. TOAST UTILITY
// ==========================================

let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.remove('hidden');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 4000);
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  switchTab('home');
});
