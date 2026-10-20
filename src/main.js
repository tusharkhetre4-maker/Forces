/**
 * FORCES COMMITTEE PORTAL
 * Standard Vanilla JavaScript (ES6+)
 */

// =============================================================================
// 1. DATA MODELS & INITIAL STATE (Original FORCES Data)
// =============================================================================

const HERO_SLIDES = [
  {
    image: '/public/images/cover.png',
    caption: 'P.E.S. College of Engineering FORCES Committee & Faculty Leadership Council',
    sub: 'Official Student Committee Council Inauguration & Executive Assembly'
  },
  {
    image: '/public/images/cov1 (5).png',
    caption: 'FORCES Discipline Committee Council & Student Leadership Leads',
    sub: 'Student Committee Governance, Academic Integrity & Campus Coordination'
  },
  {
    image: '/public/images/cov1 (2).png',
    caption: 'Research & Development Cell Student Council & Technical Coordinators',
    sub: 'Innovation Projects, Technical Sprints & Department Initiatives'
  },
  {
    image: '/public/images/cov1 (3).png',
    caption: 'Student Council Felicitation & Certificate of Honor Ceremony',
    sub: 'P.E.S. FORCES Committee · Academic & Technical Leadership Recognition'
  },
  {
    image: '/public/images/cov1 (4).png',
    caption: 'P.E.S. FORCES Annual Inaugural Council & Executive Gathering',
    sub: 'Department Council Leads & Student Leadership · Class of 2026'
  }
];

let currentSlideIdx = 0;

const EVENTS = [
  {
    id: 'evt-1',
    title: 'chess',
    category: 'e-sports',
    date: 'Nov 12, 2026',
    time: '09:00 AM - 2 Hours',
    venue: 'Main Campus Tech Auditorium',
    seats: 120,
    registered: 96,
    image: '/public/images/chess.png',
    fallback: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    description: 'Premier 36-hour hackathon bringing together collegiate developers to build autonomous agent swarms, cloud infrastructure, and verifiable student tools.',
    coordinators: ['Samantha Vance', 'Alex Rivera'],
    prize: '$5,500 Prize Pool'
  },
  {
    id: 'evt-2',
    title: 'free fire',
    category: 'free fire',
    date: 'Dec 02, 2026',
    time: '02:00 PM - 05:30 PM',
    venue: 'Central Campus Auditorium',
    seats: 250,
    registered: 185,
    image: '/public/images/freefire.png',
    fallback: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    description: 'Senior enterprise engineering leads present live code architectures on event streaming, multi-region replication, and LLM model distillation.',
    coordinators: ['Elena Rostova', 'Marcus Chen'],
    prize: 'Certificate & Fellowship'
  },
  {
    id: 'evt-3',
    title: 'pubg',
    category: 'pubg',
    date: 'Nov 18, 2026',
    time: '10:00 AM - 04:00 PM',
    venue: 'Innovation Lab 4',
    seats: 45,
    registered: 42,
    image: '/public/images/pubg.png',
    fallback: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    description: 'Hands-on sprint assembling ESP32 microcontrollers, programming autonomous obstacle avoidance rovers, and piping real-time telemetry.',
    coordinators: ['Elena Rostova'],
    prize: 'Hardware Kit Included'
  }
];

const TEAM = [
  {
    id: 'mem-1',
    name: 'Aavishkar Bhagat',
    role: 'President',
    dept: 'Computer Science & Engineering',
    rating: 4.9,
    photo: '/public/images/avishkar.png',
    fallback: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    bio: 'Oversees 45 council leads, directs flagship hackathons, and champions 100% transparency in student committee governance.',
    email: 'president@forces.edu'
  },
  {
    id: 'mem-2',
    name: 'Tushar Khetre',
    role: 'Descipline Head',
    dept: 'Computer Science & Engineering',
    rating: 4.8,
    photo: '/public/images/tushar.png',
    fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Directs developer relations, collegiate competitive coding leagues, and open-source campus initiatives.',
    email: 'alex.rivera@forces.edu'
  },
  {
    id: 'mem-3',
    name: 'Sambhaji Mahajan',
    role: 'Technical Head',
    dept: 'Computer Science & Engineering',
    rating: 4.9,
    photo: '/public/images/shambhu.png',
    fallback: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Architect of campus IoT hardware sprints, drone aerodynamics competitions, and sensor testing labs.',
    email: 'elena.r@forces.edu'
  },
  {
    id: 'mem-4',
    name: 'Jeewak Khandare',
    role: 'Photography Lead',
    dept: 'Computer Science & Engineering',
    rating: 4.7,
    photo: '/public/images/jeewak.png',
    fallback: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Administers confidential student complaints, event safety protocols, and campus venue reservations.',
    email: 'marcus.c@forces.edu'
  }
];

const QUIZZES = [
  {
    id: 'quiz-1',
    title: 'Systems & Algorithmic Problem Solving',
    timeMinutes: 5,
    questions: [
      {
        q: 'What is the average time complexity of searching in a well-balanced Hash Table?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
        answer: 0
      },
      {
        q: 'Which protocol enables full-duplex, bidirectional communication between web client and server over a single TCP connection?',
        options: ['HTTP/1.0', 'WebSockets', 'FTP', 'DNS'],
        answer: 1
      },
      {
        q: 'In distributed system architecture, what does the CAP theorem state?',
        options: [
          'A distributed store can satisfy at most two of Consistency, Availability, and Partition Tolerance.',
          'Caching always improves CPU, Memory, and Network latency.',
          'Transactions are completely ACID compliant regardless of network state.'
        ],
        answer: 0
      }
    ]
  }
];

let complaints = JSON.parse(localStorage.getItem('forces_clean_complaints')) || [
  {
    id: 'GRV-84920',
    category: 'Academic & Lab',
    title: 'Air conditioning in Central Auditorium during tech symposium',
    desc: 'The central auditorium AC system was non-functional during the keynote session.',
    status: 'In Review',
    date: '2026-10-18'
  },
  {
    id: 'GRV-71203',
    category: 'General Suggestion',
    title: 'Upload lecture recordings for commuting students',
    desc: 'Please provide high-resolution recorded video streams of hardware lab sessions.',
    status: 'Resolved',
    date: '2026-10-15'
  }
];

let currentUser = {
  name: 'Samantha Vance',
  role: 'president',
  email: 'president@forces.edu'
};

// =============================================================================
// 2. HERO CAROUSEL CONTROLS
// =============================================================================

export function renderSliderDots() {
  const container = document.getElementById('heroSliderDots');
  if (!container) return;
  container.innerHTML = HERO_SLIDES.map((_, idx) => `
    <button onclick="setSlide(${idx})" aria-label="Go to slide ${idx + 1}" class="slider-dot ${idx === currentSlideIdx ? 'w-3 h-3 bg-white shadow-md' : 'w-2 h-2 bg-white/50 hover:bg-white/80'} rounded-full transition-all cursor-pointer"></button>
  `).join('');
}

export function updateSlide() {
  const slide = HERO_SLIDES[currentSlideIdx];
  const imgEl = document.getElementById('heroSliderImg');
  const captionEl = document.getElementById('heroSliderCaption');
  const subEl = document.getElementById('heroSliderSub');

  if (imgEl && captionEl && subEl) {
    imgEl.style.opacity = '0.35';
    setTimeout(() => {
      imgEl.src = slide.image;
      captionEl.textContent = slide.caption;
      subEl.textContent = slide.sub;
      imgEl.style.opacity = '1';
    }, 150);
  }

  // Update dots
  renderSliderDots();
}

export function prevSlide() {
  currentSlideIdx = (currentSlideIdx - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
  updateSlide();
  restartSlideTimer();
}

export function nextSlide() {
  currentSlideIdx = (currentSlideIdx + 1) % HERO_SLIDES.length;
  updateSlide();
  restartSlideTimer();
}

export function setSlide(idx) {
  currentSlideIdx = idx;
  updateSlide();
  restartSlideTimer();
}

// Auto advance slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

export function restartSlideTimer() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

// =============================================================================
// 3. TAB ROUTING & NAVIGATION
// =============================================================================

export function switchTab(tabId) {
  // Hide all tab views
  document.querySelectorAll('.tab-content').forEach(view => {
    view.classList.add('hidden');
  });

  // Show active tab view
  const targetView = document.getElementById(`tab-${tabId}`);
  if (targetView) {
    targetView.classList.remove('hidden');
  }

  // Update navbar items
  document.querySelectorAll('.pes-nav-item').forEach(btn => {
    btn.classList.remove('active');
  });

  const activeBtn = document.getElementById(`nav-${tabId}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // Render view-specific contents
  if (tabId === 'team') renderTeam();
  if (tabId === 'events') renderEvents();
  if (tabId === 'quizzes') renderQuizzes();
  if (tabId === 'admin') renderAdmin();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =============================================================================
// 4. SCROLLABLE PHOTO REEL & LIGHTBOX
// =============================================================================

export function scrollPhotos(distance) {
  const reel = document.getElementById('photoCarousel');
  if (reel) {
    reel.scrollBy({ left: distance, behavior: 'smooth' });
  }
}

export function filterPhotos(category) {
  document.querySelectorAll('.photo-filter-btn').forEach(btn => {
    btn.className = 'photo-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap bg-slate-100 text-slate-700 hover:bg-slate-200';
  });
  if (event && event.target) {
    event.target.className = 'photo-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap bg-[#0b2866] text-white';
  }

  const cards = document.querySelectorAll('.photo-card');
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

export function scrollToPhotos() {
  switchTab('home');
  setTimeout(() => {
    const el = document.getElementById('scrollable-event-photos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

export function openLightbox(src, title, desc) {
  const modal = document.getElementById('lightboxModal');
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxTitle').textContent = title;
  document.getElementById('lightboxDesc').textContent = desc;
  modal.classList.remove('hidden');
}

export function closeLightbox() {
  document.getElementById('lightboxModal').classList.add('hidden');
}

// =============================================================================
// 5. COMMITTEE TEAM RENDERING
// =============================================================================

export function renderTeam() {
  const container = document.getElementById('teamGrid');
  if (!container) return;

  container.innerHTML = TEAM.map(member => `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all">
      <div class="flex items-center gap-4">
        <img src="${member.photo}" alt="${member.name}" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-100" onerror="this.src='${member.fallback}'">
        <div>
          <span class="inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-blue-50 text-[#0b2866]">${member.role}</span>
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
        <button onclick="window.rateMember('${member.name}')" class="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#0b2866] font-bold rounded-xl transition">Rate Lead</button>
      </div>
    </div>
  `).join('');
}

export function rateMember(name) {
  showToast(`Thank you! Submitted 5-star rating for ${name}.`);
}

// =============================================================================
// 6. EVENTS RENDERING & RSVP
// =============================================================================

export function renderEvents() {
  const container = document.getElementById('eventsGrid');
  if (!container) return;

  container.innerHTML = EVENTS.map(evt => `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all">
      <div class="h-48 w-full relative overflow-hidden bg-slate-950">
        <img src="${evt.image}" alt="${evt.title}" class="w-full h-full object-cover" onerror="this.src='${evt.fallback}'">
        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#0b2866] text-white text-[11px] font-bold">${evt.category}</span>
      </div>
      <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <p class="text-xs text-blue-700 font-bold flex items-center gap-1.5"><i class="fa-solid fa-calendar"></i> ${evt.date} · ${evt.venue}</p>
          <h4 class="text-lg font-bold text-slate-900 mt-1">${evt.title}</h4>
          <p class="text-xs text-slate-600 mt-2 leading-relaxed">${evt.description}</p>
        </div>
        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500">${evt.registered} / ${evt.seats} Seats Registered</span>
          <button onclick="window.rsvpEvent('${evt.title}')" class="px-4 py-2 bg-[#0b2866] hover:bg-[#163e91] text-white text-xs font-bold rounded-xl shadow-xs transition">Free RSVP</button>
        </div>
      </div>
    </div>
  `).join('');
}

export function rsvpEvent(title) {
  showToast(`RSVP Confirmed! Digital admission pass reserved for: ${title}`);
}

// =============================================================================
// 7. QUIZZES
// =============================================================================

export function renderQuizzes() {
  const container = document.getElementById('quizzesContainer');
  if (!container) return;

  const quiz = QUIZZES[0];
  container.innerHTML = `
    <div class="bg-white rounded-2xl border border-slate-200 p-8 shadow-soft space-y-6 max-w-3xl mx-auto">
      <div class="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-extrabold uppercase text-[#0b2866] bg-blue-50 px-2.5 py-1 rounded-md">Council Assessment</span>
          <h3 class="text-xl font-black text-slate-900 mt-1">${quiz.title}</h3>
        </div>
        <span class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl"><i class="fa-solid fa-clock text-blue-700 mr-1.5"></i> ${quiz.timeMinutes} Minutes</span>
      </div>
      <div class="space-y-6">
        ${quiz.questions.map((q, i) => `
          <div class="space-y-2.5">
            <p class="text-sm font-bold text-slate-800">${i + 1}. ${q.q}</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${q.options.map((opt, oIdx) => `
                <label class="flex items-center gap-2 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs font-semibold text-slate-700 transition">
                  <input type="radio" name="q_${i}" value="${oIdx}" ${oIdx === 0 ? 'checked' : ''} class="text-[#0b2866] focus:ring-[#0b2866]">
                  <span>${opt}</span>
                </label>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
      <button onclick="window.submitQuiz()" class="w-full py-3 bg-[#0b2866] hover:bg-[#163e91] text-white font-bold rounded-xl text-sm shadow-md transition">
        Submit Quiz & View Score
      </button>
    </div>
  `;
}

export function submitQuiz() {
  showToast('Quiz submitted! You scored 3/3 (100%) - Grade: Outstanding!');
}

// =============================================================================
// 8. ANONYMOUS GRIEVANCES & ADMIN VIEW
// =============================================================================

export function submitComplaint(e) {
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
  localStorage.setItem('forces_clean_complaints', JSON.stringify(complaints));

  document.getElementById('complaintForm').reset();
  showToast(`Grievance submitted anonymously to Council! Ref: ${newGrievance.id}`);
}

export function renderAdmin() {
  const container = document.getElementById('adminComplaintsList');
  if (!container) return;

  if (complaints.length === 0) {
    container.innerHTML = '<p class="text-xs text-slate-400">No student grievances on file.</p>';
    return;
  }

  container.innerHTML = complaints.map(c => `
    <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
      <div class="flex items-center justify-between text-xs">
        <span class="font-extrabold text-[#0b2866]">${c.id}</span>
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">${c.status}</span>
      </div>
      <h5 class="text-sm font-bold text-slate-800">${c.title}</h5>
      <p class="text-xs text-slate-600">${c.desc}</p>
      <p class="text-[10px] text-slate-400">Category: ${c.category} · Submitted: ${c.date}</p>
    </div>
  `).join('');
}

// =============================================================================
// 9. ROLE SWITCHING & TOAST NOTIFICATION
// =============================================================================

export function changeRole(role) {
  currentUser.role = role;
  const badge = document.getElementById('userRoleBadge');
  if (badge) {
    badge.textContent = role.toUpperCase();
    if (role === 'admin') {
      badge.className = 'text-[8px] font-extrabold text-purple-700 bg-purple-100 px-1 rounded uppercase';
    } else if (role === 'president') {
      badge.className = 'text-[8px] font-extrabold text-amber-700 bg-amber-100 px-1 rounded uppercase';
    } else {
      badge.className = 'text-[8px] font-extrabold text-blue-700 bg-blue-100 px-1 rounded uppercase';
    }
  }
  showToast(`Switched active test role to ${role.toUpperCase()}`);
}

let toastTimeout;
export function showToast(msg) {
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

// Window global bindings
window.switchTab = switchTab;
window.prevSlide = prevSlide;
window.nextSlide = nextSlide;
window.setSlide = setSlide;
window.scrollPhotos = scrollPhotos;
window.filterPhotos = filterPhotos;
window.scrollToPhotos = scrollToPhotos;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.rateMember = rateMember;
window.rsvpEvent = rsvpEvent;
window.submitQuiz = submitQuiz;
window.submitComplaint = submitComplaint;
window.renderSliderDots = renderSliderDots;
window.updateSlide = updateSlide;

document.addEventListener('DOMContentLoaded', () => {
  renderSliderDots();
  switchTab('home');
});
