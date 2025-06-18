document.addEventListener('DOMContentLoaded', function() {
  // Sidebar Toggle Logic
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');

  sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('hidden');
  });

  // Close sidebar when a sidebar link is clicked
  const sidebarLinks = sidebar.getElementsByClassName('sidebar-link');
  for (let link of sidebarLinks) {
    link.addEventListener('click', function() {
      sidebar.classList.add('hidden');
    });
  }

 const faqItems = document.getElementsByClassName('faq-item');
  for (let item of faqItems) {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', function() {
      item.classList.toggle('active');
    });
  }

  // Timings Logic
  const weekdayHours = { day: 'Monday to Saturday', open: 9, close: 22 };
  const sundayHours = { day: 'Sun', open: 9, close: 14 };
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
    const decimal = hour % 1;
    const minutes = decimal > 0 ? Math.round(decimal * 60) : '';
    return `${hour12}${minutes ? ':' + (minutes < 10 ? '0' + minutes : minutes) : ''} ${period}`;
  }

  let statusMessage;
  let timeInfoMessage;
  let statusClass;
  let statusIcon;

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
  } else if (currentHour >= todayHours.open && (currentHour < Math.floor(todayHours.close) || (currentHour === Math.floor(todayHours.close) && currentMinutes < (todayHours.close % 1) * 60))) {
    statusMessage = 'Open now';
    timeInfoMessage = `Open until ${formatTime(todayHours.close)}.`;
    statusClass = 'open';
    statusIcon = '<div class="static-circle green beeping"></div>';
  } else {
    statusMessage = 'Closed now';
    if (currentHour >= todayHours.close) {
      timeInfoMessage = `Opens tomorrow at ${formatTime(tomorrowHours.open)}.`;
    } else {
      timeInfoMessage = `Opens at ${formatTime(todayHours.open)}.`;
    }
    statusClass = 'closed';
    statusIcon = '<div class="static-circle red"></div>';
  }

  const statusElement = document.getElementById('status');
  const timeInfoElement = document.getElementById('time-info');
  const businessHoursElement = document.getElementById('business-hours');
  const weeklyHoursElement = document.getElementById('weekly-hours');
  const weeklyHoursList = document.getElementById('weekly-hours-list');
  const homeItemElement = document.querySelector('.home-item');

  statusElement.innerHTML = `${statusMessage} ${statusIcon}`;
  timeInfoElement.innerText = timeInfoMessage;

  statusElement.className = statusClass;
  timeInfoElement.className = 'time-info';

  const daysOfWeek = [
    { day: 'Monday - Saturday', hours: weekdayHours },
    { day: 'Sunday', hours: sundayHours }
  ];

  daysOfWeek.forEach(day => {
    const listItem = document.createElement('li');
    listItem.textContent = `${day.day}: ${formatTime(day.hours.open)} - ${formatTime(day.hours.close)}`;
    weeklyHoursList.appendChild(listItem);
  });

  businessHoursElement.addEventListener('click', function() {
    if (weeklyHoursElement.style.display === 'none' || weeklyHoursElement.style.display === '') {
      weeklyHoursElement.style.display = 'block';
    } else {
      weeklyHoursElement.style.display = 'none';
    }
  });

  if (statusClass === 'open') {
    homeItemElement.style.borderColor = '#1db280';
  } else if (statusClass === 'soon') {
    homeItemElement.style.borderColor = '#ffa500';
  } else {
    homeItemElement.style.borderColor = '#ff0000';
  }
const faqQuestions = document.getElementsByClassName('faq-question');
  for (let question of faqQuestions) {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      faqItem.classList.toggle('active');
    });
  }
});
