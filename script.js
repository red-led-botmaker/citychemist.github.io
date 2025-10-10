console.log("Script loaded");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded");

  // ================= FAQ Toggle =================
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const answer = item.querySelector('.faq-answer');

    if (item.classList.contains('active')) {
      // Closing
      answer.style.height = answer.scrollHeight + "px"; // set to current height
      requestAnimationFrame(() => {
        answer.style.height = "0px"; // animate to 0
      });
      item.classList.remove('active');
    } else {
      // Opening
      item.classList.add('active');
      answer.style.height = answer.scrollHeight + "px"; // animate to content height
      answer.addEventListener('transitionend', () => {
        if (item.classList.contains('active')) {
          answer.style.height = "auto"; // reset to auto after animation
        }
      }, { once: true });
    }
  });
});
  // ================= Sidebar =================
  const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarItems = document.querySelectorAll('.sidebar-item');

if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    sidebar.classList.toggle('hidden');

    // 🔹 toggle button style
    sidebarToggle.classList.toggle('active', !sidebar.classList.contains('hidden'));
  });

  sidebarItems.forEach(item => {
    item.addEventListener('click', function () {
      const url = item.dataset.link;
      if (url) {
        window.location.href = url;
      }
      sidebar.classList.add('hidden');
      sidebarToggle.classList.remove('active'); // 🔹 reset button style
    });
  });
  
  document.addEventListener('click', function (e) {
    const clickedInsideSidebar = sidebar.contains(e.target);
    const clickedToggle = sidebarToggle.contains(e.target);
    sidebarToggle.classList.toggle('active', !sidebar.classList.contains('hidden'));
    if (!clickedInsideSidebar && !clickedToggle) {
      sidebar.classList.add('hidden');
      sidebarToggle.classList.remove('active'); // 🔹 reset when closed
    }
  });
}



  // ================= Filter Buttons (Gallery View) =================
  const filterButtons = document.querySelectorAll('.filter-button');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;
      galleryItems.forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.category === filter) ? 'flex' : 'none';
      });
    });
  });

  // ================= Weekly Chart =================
 

// ================= Business Hours Logic =================

// =============================
// 📅 Business Hours Configuration
// =============================
const weekdayHours = { open: 9, close: 22 };
const sundayHours = { open: 9, close: 14 };

// 🪔 Special Diwali timing (Set MM-DD correctly)
const diwaliDate = '10-10'; //Diwali 
const diwaliHours = { open: 9, close: 21 };

// 📅 Fixed Holidays (MM-DD)
const holidays = ['03-04']; //Holi

// =============================
// 🕒 Date & Time Setup
// =============================
const now = new Date();
const currentHour = now.getHours();
const currentMinutes = now.getMinutes();
const currentDay = now.getDay();
const currentDateString = now.toISOString().slice(5, 10);

// Tomorrow's date (for next opening info)
const tomorrow = new Date(now);
tomorrow.setDate(now.getDate() + 1);
const tomorrowDateString = tomorrow.toISOString().slice(5, 10);

// =============================
// 🕘 Determine Today's & Tomorrow's Hours
// Priority: Diwali > Sunday > Weekday
// =============================
let todayHours;
if (currentDateString === diwaliDate) {
  todayHours = diwaliHours;
} else if (currentDay === 0) {
  todayHours = sundayHours;
} else {
  todayHours = weekdayHours;
}

let tomorrowHours;
if (tomorrowDateString === diwaliDate) {
  tomorrowHours = diwaliHours;
} else if (currentDay === 6) {
  tomorrowHours = sundayHours;
} else {
  tomorrowHours = weekdayHours;
}

// =============================
// 🧠 Helper Functions
// =============================
function formatTime(hours, minutes = 0) {
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  return `${hours}${minutes ? ":" + String(minutes).padStart(2, "0") : ""}\u00A0${ampm}`;
}

// =============================
// 🪔 Status Logic
// =============================
const isHolidayToday = holidays.includes(currentDateString);
const isDiwaliToday = currentDateString === diwaliDate;

const opensSoon = (currentHour === todayHours.open - 1 && currentMinutes >= 40) ||
                  (currentHour === todayHours.open && currentMinutes <= 5);

const closesSoon = (currentHour < todayHours.close) &&
                   ((todayHours.close - currentHour === 0 && currentMinutes <= 30) ||
                    (todayHours.close - currentHour === 1 && currentMinutes >= 30));

let statusMessage, timeInfoMessage, statusClass, statusIcon, festiveNote;

if (isHolidayToday) {
  statusMessage = 'Closed today on occasion of Holi';
  timeInfoMessage = `Opens tomorrow at ${formatTime(tomorrowHours.open)}.`;
  statusClass = 'closed';
  statusIcon = '<div class="static-circle red"></div>';
  festiveNote = '';

} else if (isDiwaliToday) {
  if (currentHour >= todayHours.open && currentHour < todayHours.close) {
    statusMessage = 'Open now';
    timeInfoMessage = `Open until ${formatTime(todayHours.close)}.`;
    statusClass = 'open';
    statusIcon = '<div class="static-circle green beeping"></div>';
  } else if (opensSoon) {
    statusMessage = 'Opens soon';
    timeInfoMessage = `Opens at ${formatTime(todayHours.open)}.`;
    statusClass = 'soon';
    statusIcon = '<div class="static-circle yellow beeping"></div>';
  } else {
    statusMessage = 'Closed now';
    timeInfoMessage = `Opens tomorrow at ${formatTime(tomorrowHours.open)}.`;
    statusClass = 'closed';
    statusIcon = '<div class="static-circle red"></div>';
  }
  festiveNote = '🪔 Karwachauth Timings : 9 am – 9 pm';

} else if (opensSoon) {
  statusMessage = 'Opens soon';
  timeInfoMessage = `Opens at ${formatTime(todayHours.open)}.`;
  statusClass = 'soon';
  statusIcon = '<div class="static-circle yellow beeping"></div>';
  festiveNote = '';

} else if (closesSoon) {
  statusMessage = 'Closes soon';
  timeInfoMessage = `Closes at ${formatTime(todayHours.close)}.`;
  statusClass = 'soon';
  statusIcon = '<div class="static-circle yellow beeping"></div>';
  festiveNote = '';

} else if (currentHour >= todayHours.open && currentHour < todayHours.close) {
  statusMessage = 'Open now';
  timeInfoMessage = `Open until ${formatTime(todayHours.close)}.`;
  statusClass = 'open';
  statusIcon = '<div class="static-circle green beeping"></div>';
  festiveNote = '';

} else {
  statusMessage = 'Closed now';
  if (currentHour < todayHours.open) {
    timeInfoMessage = `Opens at ${formatTime(todayHours.open)}.`;
  } else {
    timeInfoMessage = `Opens tomorrow at ${formatTime(tomorrowHours.open)}.`;
  }
  statusClass = 'closed';
  statusIcon = '<div class="static-circle red"></div>';
  festiveNote = '';
}

// =============================
// 🧱 DOM Elements & Updates
// =============================
const statusElement = document.getElementById('status');
const timeInfoElement = document.getElementById('time-info');
const businessHoursElement = document.getElementById('business-hours');
const weeklyHoursElement = document.getElementById('weekly-hours');
const weeklyHoursList = document.getElementById('weekly-hours-list');
const toggleIcon = document.getElementById('toggle-hours');
const homeItemElement = document.querySelector('.home-item');

// Add festive note element dynamically
// 🪔 Create or select the festive note element ABOVE status
let festiveNoteElement = document.getElementById('festive-note');
if (!festiveNoteElement) {
  festiveNoteElement = document.createElement('div');
  festiveNoteElement.id = 'festive-note';

  // 🎨 Styling for festive note
  festiveNoteElement.style.display = 'none';
  festiveNoteElement.style.marginBottom = '20px';
  festiveNoteElement.style.padding = '6px 12px';
  festiveNoteElement.style.borderRadius = '8px';
  festiveNoteElement.style.fontSize = '0.8rem';
  festiveNoteElement.style.fontWeight = '600';
  festiveNoteElement.style.textAlign = 'center';
  festiveNoteElement.style.background = 'linear-gradient(90deg, #ffda8a, #ffd35c, #ffda8a)';
  festiveNoteElement.style.color = '#7a4e00';
  festiveNoteElement.style.boxShadow = '0 0 10px rgba(255, 215, 100, 0.5)';
  festiveNoteElement.style.animation = 'festiveGlow 2.5s ease-in-out infinite';
  festiveNoteElement.style.maxWidth = '90%';
  festiveNoteElement.style.marginLeft = 'auto';
  festiveNoteElement.style.marginRight = 'auto';

  statusElement?.parentNode?.insertBefore(festiveNoteElement, statusElement);
}

// Inject CSS for glowing animation if not already added
if (!document.getElementById('festive-note-style')) {
  const styleTag = document.createElement('style');
  styleTag.id = 'festive-note-style';
  styleTag.innerHTML = `
    @keyframes festiveGlow {
      0% {
        box-shadow: 0 0 8px rgba(255, 215, 100, 0.4);
        
      }
      50% {
        box-shadow: 0 0 16px rgba(255, 200, 50, 0.8);
        
      }
      100% {
        box-shadow: 0 0 8px rgba(255, 215, 100, 0.4);
        
      }
    }
  `;
  document.head.appendChild(styleTag);
}

// 📝 Update festive note content and visibility
festiveNoteElement.innerText = festiveNote;
festiveNoteElement.style.display = festiveNote ? 'block' : 'none';


if (statusElement && timeInfoElement) {
  statusElement.innerHTML = `${statusMessage} ${statusIcon}`;
  timeInfoElement.innerText = timeInfoMessage;
  statusElement.className = statusClass;
  timeInfoElement.className = 'time-info';
  festiveNoteElement.innerText = festiveNote;
  festiveNoteElement.style.display = festiveNote ? 'block' : 'none';
}


// =============================
// 📅 Weekly Hours Dropdown Animation
// =============================
if (weeklyHoursList) {
  // Base weekly hours
  weeklyHoursList.innerHTML = `
    <li>Mon - Sat : 9 am - 10 pm</li>
    <li>Sunday : 9 am - 2 pm</li>
    <li>🪔 Diwali (20 Oct) : 9 am – 6 pm</li>
  `
}


if (businessHoursElement && weeklyHoursElement) {
  businessHoursElement.addEventListener('click', () => {
    const answer = weeklyHoursElement;

    if (answer.classList.contains('show')) {
      // Closing
      answer.style.height = answer.scrollHeight + "px";
      requestAnimationFrame(() => {
        answer.style.height = "0px";
        answer.style.opacity = "0";
        answer.style.paddingBottom = "0px";
        answer.style.marginTop = "0px";
      });
      answer.addEventListener('transitionend', () => {
        answer.classList.remove('show');
        answer.style.height = "";
      }, { once: true });

    } else {
      // Opening
      answer.classList.add('show');
      answer.style.height = "0px";
      answer.style.opacity = "0";
      answer.style.paddingBottom = "0px";
      answer.style.marginTop = "0px";

      requestAnimationFrame(() => {
        answer.style.height = answer.scrollHeight + "px";
        answer.style.opacity = "1";
        answer.style.paddingBottom = "16px";
        answer.style.marginTop = "12px";
      });

      answer.addEventListener('transitionend', () => {
        if (answer.classList.contains('show')) {
          answer.style.height = "auto";
        }
      }, { once: true });
    }

    businessHoursElement.classList.toggle('active');
    if (toggleIcon) toggleIcon.classList.toggle('rotated');
  });
}

// =============================
// 🏠 Border Color on Home Item
// =============================
if (homeItemElement) {
  homeItemElement.style.borderColor = statusClass === 'open' ? '#1db280' :
                                      statusClass === 'soon' ? '#ffa500' : '#ff0000';
}


  // ================= FULLSCREEN GALLERY =================
  const galleryImages = document.querySelectorAll('.gallery-image');
  const carousel = document.querySelector('.fullscreen-carousel');
  const carouselContainer = document.querySelector('.carousel-container');
  const carouselTag = document.querySelector('.carousel-tag');
  const carouselIndex = document.querySelector('.carousel-index');
  const exitBtn = document.querySelector('.carousel-exit');
  const filterButtonsCarousel = document.querySelectorAll('.carousel-filter');

  let slides = [], slidesFiltered = [], currentIndex = 0;
let startX = 0, isDragging = false, wasSwipe = false;
let swipeSuppressClick = false;

const prevArrow = document.querySelector('.carousel-prev');
const nextArrow = document.querySelector('.carousel-next');

prevArrow?.addEventListener('click', prevSlide);
nextArrow?.addEventListener('click', nextSlide);

  function buildSlides() {
    slides = [];
    galleryImages.forEach((img) => {
      const src = img.style.backgroundImage.slice(5, -2);
      const tag = img.closest('.gallery-item')?.dataset.category || "All";
      slides.push({ src, tag });
    });
    slidesFiltered = slides;
  }

  function renderSlides() {
    carouselContainer.innerHTML = slidesFiltered.map(slide =>
      `<div class="carousel-slide"><img src="${slide.src}" alt="Slide" /></div>`
    ).join('');
    updateCarouselPosition();
    updateCarouselUI();
  }

  function openCarousel(index) {
    currentIndex = index;
    renderSlides();
    carousel.classList.add('visible');
    document.body.style.overflow = 'hidden';

  }

  function updateCarouselPosition() {
    carouselContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
  }

  function updateCarouselUI() {
    const current = slidesFiltered[currentIndex];
    carouselTag.textContent = current?.tag || "";
    carouselIndex.textContent = `${currentIndex + 1} / ${slidesFiltered.length}`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slidesFiltered.length;
    updateCarouselPosition();
    updateCarouselUI();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slidesFiltered.length) % slidesFiltered.length;
    updateCarouselPosition();
    updateCarouselUI();
  }

  buildSlides();

  galleryImages.forEach((img, i) => {
   img.addEventListener('click', () => {
  if (swipeSuppressClick) return;
  openCarousel(i);
});

  });

  exitBtn?.addEventListener('click', () => {
   carousel.classList.remove('visible');
setTimeout(() => {
  document.body.style.overflow = 'auto';
}, 350); // match CSS transition time


    document.body.style.overflow = 'auto';
  });

  document.addEventListener('keydown', (e) => {
    if (carousel.style.display !== 'flex') return;
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'Escape') exitBtn.click();
  });

  carouselContainer.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
    wasSwipe = false;
  });

  carouselContainer.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const moveX = e.touches[0].clientX - startX;
   if (Math.abs(moveX) > 10) {
  wasSwipe = true;
  swipeSuppressClick = true;
}

    carouselContainer.style.transform = `translateX(calc(-${currentIndex * 100}vw + ${moveX}px))`;
  });

  carouselContainer.addEventListener('touchend', e => {
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;
    if (deltaX > 50) prevSlide();
    else if (deltaX < -50) nextSlide();
    else updateCarouselPosition();
    setTimeout(() => swipeSuppressClick = false, 200);

  });

  filterButtonsCarousel.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedFilter = btn.dataset.filter;
      filterButtonsCarousel.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      slidesFiltered = selectedFilter === "all" ? slides : slides.filter(s => s.tag === selectedFilter);
      currentIndex = 0;
      renderSlides();
    });
  });

});
