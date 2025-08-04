console.log("Script loaded");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded");

  // ================= FAQ Toggle =================
  const faqItems = document.getElementsByClassName('faq-item');
  for (let item of faqItems) {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      item.classList.toggle('active');
    });
  }

  // ================= Sidebar =================
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarItems = document.querySelectorAll('.sidebar-item');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      sidebar.classList.toggle('hidden');
    });

    sidebarItems.forEach(item => {
      item.addEventListener('click', function () {
        const url = item.dataset.link;
        if (url) {
          window.location.href = url;
        }
        sidebar.classList.add('hidden');
      });
    });

    document.addEventListener('click', function (e) {
      const clickedInsideSidebar = sidebar.contains(e.target);
      const clickedToggle = sidebarToggle.contains(e.target);
      if (!clickedInsideSidebar && !clickedToggle) {
        sidebar.classList.add('hidden');
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
  const dataByDay = {
    "Mondays": [7.5, 15, 22, 28, 26, 27, 28, 32, 47, 53, 56, 63, 40, 35],
    "Tuesdays": [7.5, 13, 20, 25, 24, 26, 27, 30, 43, 50, 53, 57, 38, 33],
    "Wednesdays": [6.2, 12, 19, 24, 22, 23, 25, 28, 40, 48, 50, 55, 37, 32],
    "Thursdays": [6.3, 13, 20, 24, 23, 24, 26, 29, 42, 51, 52, 56, 37, 33],
    "Fridays": [6.9, 14, 20, 25, 24, 25, 26, 28, 43, 50, 53, 60, 36, 32],
    "Saturdays": [7.5, 14.3, 21, 27, 25, 26, 29, 33, 46, 52, 55, 61, 40, 35],
    "Sundays": [7.3, 13, 17, 28, 32, 34, 0, 0, 0, 0, 0, 0, 0, 0]
  };

  const dropdown = document.querySelector(".dropdown");
  const bars = document.querySelectorAll(".bar");
  const days = ["Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"];
  const today = days[new Date().getDay()];
  if (dropdown) dropdown.value = today;

  function updateChart(day) {
    const values = dataByDay[day];
    bars.forEach((bar, i) => bar.style.height = values[i] + "%");
  }

  updateChart(today);
  dropdown?.addEventListener("change", () => updateChart(dropdown.value));

  // ================= Business Hours Logic =================
  const weekdayHours = { open: 9, close: 22 };
  const sundayHours = { open: 9, close: 14 };
  const holidays = ['03-14'];
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentDay = now.getDay();
  const currentDateString = now.toISOString().slice(5, 10);

  const todayHours = currentDay === 0 ? sundayHours : weekdayHours;
  const tomorrowHours = currentDay === 6 ? sundayHours : weekdayHours;

  function formatTime(hour) {
    const period = hour >= 12 ? 'pm' : 'am';
    const hour12 = hour % 12 || 12;
    return `${hour12} ${period}`;
  }

  let statusMessage, timeInfoMessage, statusClass, statusIcon;

  const opensSoon = (currentHour === todayHours.open - 1 && currentMinutes >= 40) ||
                    (currentHour === todayHours.open && currentMinutes <= 5);
  const closesSoon = (currentHour < todayHours.close) &&
                     ((todayHours.close - currentHour === 0 && currentMinutes <= 30) ||
                      (todayHours.close - currentHour === 1 && currentMinutes >= 30));
  const isHolidayToday = holidays.includes(currentDateString);

  if (isHolidayToday) {
    statusMessage = 'Closed today on occasion of Holi';
    timeInfoMessage = `Opens tomorrow at ${formatTime(tomorrowHours.open)}.`;
    statusClass = 'closed';
    statusIcon = '<div class="static-circle red"></div>';
  } else if (opensSoon) {
    statusMessage = 'Opens soon';
    timeInfoMessage = `Opens at ${formatTime(todayHours.open)}.`;
    statusClass = 'soon';
    statusIcon = '<div class="static-circle yellow beeping"></div>';
  } else if (closesSoon) {
    statusMessage = 'Closes soon';
    timeInfoMessage = `Closes at ${formatTime(todayHours.close)}.`;
    statusClass = 'soon';
    statusIcon = '<div class="static-circle yellow beeping"></div>';
  } else if (currentHour >= todayHours.open && currentHour < todayHours.close) {
    statusMessage = 'Open now';
    timeInfoMessage = `Open until ${formatTime(todayHours.close)}.`;
    statusClass = 'open';
    statusIcon = '<div class="static-circle green beeping"></div>';
  } else {
    statusMessage = 'Closed now';
    timeInfoMessage = `Opens at ${formatTime(todayHours.open)}.`;
    statusClass = 'closed';
    statusIcon = '<div class="static-circle red"></div>';
  }

  const statusElement = document.getElementById('status');
  const timeInfoElement = document.getElementById('time-info');
  const businessHoursElement = document.getElementById('business-hours');
  const weeklyHoursElement = document.getElementById('weekly-hours');
  const weeklyHoursList = document.getElementById('weekly-hours-list');
  const homeItemElement = document.querySelector('.home-item');

  if (statusElement && timeInfoElement) {
    statusElement.innerHTML = `${statusMessage} ${statusIcon}`;
    timeInfoElement.innerText = timeInfoMessage;
    statusElement.className = statusClass;
    timeInfoElement.className = 'time-info';
  }

  if (weeklyHoursList) {
    weeklyHoursList.innerHTML = `
      <li>Mon - Sat: ${formatTime(weekdayHours.open)} - ${formatTime(weekdayHours.close)}</li>
      <li>Sunday: ${formatTime(sundayHours.open)} - ${formatTime(sundayHours.close)}</li>
    `;
  }

  if (businessHoursElement && weeklyHoursElement) {
    businessHoursElement.addEventListener('click', () => {
      weeklyHoursElement.style.display = weeklyHoursElement.style.display === 'block' ? 'none' : 'block';
    });
  }

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
    carousel.style.display = 'flex';
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
    carousel.style.display = 'none';
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

