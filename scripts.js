document.addEventListener('DOMContentLoaded', function () {
    // Fade in elements on scroll
    const fadeInElements = document.querySelectorAll('.service-item, .review-item, .about-us, .reviews');

    function handleScroll() {
        fadeInElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                element.classList.add('fade-in');
            }

        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger scroll event on page load to show elements already in view

}

);

const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
});

menu_item.forEach((item) => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
    });
});

document.getElementById('next').onclick = function() {
    let lists = document.querySelectorAll('.city');
    document.getElementById('yxz').appendChild(lists[0]);
};

document.getElementById('prev').onclick = function() {
    let lists = document.querySelectorAll('.city');
    document.getElementById('yxz').prepend(lists[lists.length - 1]);
};


document.addEventListener('DOMContentLoaded', function() {
    // Define business hours
    const weekdayHours = { day: 'Mon-Sat', open: 9, close: 22 };
    const sundayHours = { day: 'Sunday', open: 9, close: 14.25 };


    // Define holidays (format: 'MM-DD')
    const holidays = ['03-14']; // Example: Holi on March 14th

    // Get current time and day
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentDay = now.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
    const currentDateString = now.toISOString().slice(5, 10); // Format: 'MM-DD'

    // Get today's and tomorrow's hours
    const todayHours = currentDay === 0 ? sundayHours : weekdayHours;
    const tomorrowHours = currentDay === 6 ? sundayHours : weekdayHours;

    // Function to convert 24-hour format to 12-hour format with AM/PM
    function formatTime(hour) {
        const period = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12} ${period}`;
    }

    // Determine if the business is open or closed
    let statusMessage;
    let timeInfoMessage;
    let statusClass;
    let statusIcon;

    // Check if today is a holiday
    const isHolidayToday = holidays.includes(currentDateString);

  const opensSoon = (currentHour === todayHours.open - 1 && currentMinutes >= 40) || 
                  (currentHour === todayHours.open && currentMinutes <= 5);

  const closesSoon = (currentHour < todayHours.close) &&
                   ((todayHours.close - currentHour === 0 && currentMinutes <= 30) || 
                    (todayHours.close - currentHour === 1 && currentMinutes >= 30));



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

    // Display the business hours message
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

    // Populate weekly hours list dynamically
    const daysOfWeek = [
        { day: 'Monday to Saturday', hours: weekdayHours },
        { day: 'Sunday', hours: sundayHours }
    ];

    daysOfWeek.forEach(day => {
        const listItem = document.createElement('li');
        listItem.textContent = `${day.day}: ${formatTime(day.hours.open)} - ${formatTime(day.hours.close)}`;
        weeklyHoursList.appendChild(listItem);
    });

    // Toggle weekly hours visibility when clicking anywhere in the #business-hours box
    businessHoursElement.addEventListener('click', function() {
        if (weeklyHoursElement.style.display === 'none' || weeklyHoursElement.style.display === '') {
            weeklyHoursElement.style.display = 'block';
        } else {
            weeklyHoursElement.style.display = 'none';
        }
    });

    // Change border color based on status
    if (statusClass === 'open') {
        homeItemElement.style.borderColor = '#1db280';
    } else if (statusClass === 'soon') {
        homeItemElement.style.borderColor = 'orange';
    } else {
        homeItemElement.style.borderColor = 'red';
    }
});
document.addEventListener("DOMContentLoaded", function () {
  const reviews = document.querySelectorAll(".review-content");
  const maxVisibleChars = 150; // Characters to display initially

  reviews.forEach((review) => {
    const fullText = review.innerText.trim(); // Get the full review text

    if (fullText.length > maxVisibleChars) {
      const truncatedText = fullText.slice(0, maxVisibleChars); // Truncate the text

      // Create a new span for the truncated text
      const truncatedSpan = document.createElement("span");
      truncatedSpan.className = "truncated-text";
      truncatedSpan.innerText = truncatedText + "... "; // Append ellipsis

      // Create the "Read More" button
      const readMoreBtn = document.createElement("span");
      readMoreBtn.className = "read-more";
      readMoreBtn.innerText = "Show More";

      // Insert truncated text and button into the review
      review.innerHTML = ""; // Clear the existing content
      review.appendChild(truncatedSpan);
      review.appendChild(readMoreBtn);

      // Toggle between full text and truncated text on button click
      readMoreBtn.addEventListener("click", function () {
        if (readMoreBtn.innerText === "Show More") {
          // Show full text
          truncatedSpan.innerText = fullText + " "; // Set full text
          readMoreBtn.innerText = "Show Less"; // Change button text
        } else {
          // Show truncated text
          truncatedSpan.innerText = truncatedText + "... "; // Set truncated text
          readMoreBtn.innerText = "Show More"; // Change button text
        }
      });
    }
  });
});
