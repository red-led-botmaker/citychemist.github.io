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
});

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

document.addEventListener("DOMContentLoaded", function() {
    const reviewTexts = document.querySelectorAll(".review-text");

    reviewTexts.forEach(reviewText => {
        reviewText.addEventListener("click", function() {
            this.classList.toggle("expanded");
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Define business hours
    const weekdayHours = { day: 'Mon-Sat', open: 9, close: 22 };
    const sundayHours = { day: 'Sunday', open: 9, close: 14 };

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

    const opensSoon = (currentHour === todayHours.open - 1 && currentMinutes >= 40) || (currentHour === todayHours.open && currentMinutes < 20);
    const closesSoon = (todayHours.close - currentHour === 0 && currentMinutes >= 30) || (todayHours.close - currentHour === 1 && currentMinutes >= 0);

    if (isHolidayToday) {
        statusMessage = 'Closed today on occasion of Holi';
        timeInfoMessage = `Opens tomorrow at ${formatTime(tomorrowHours.open)}.`;
        statusClass = 'closed';
        statusIcon = '<div class="static-circle red"></div>';
    } else if (opensSoon && currentHour < todayHours.open) {
        statusMessage = 'Opens soon';
        timeInfoMessage = `Opens at ${formatTime(todayHours.open)}.`;
        statusClass = 'soon';
        statusIcon = '<div class="static-circle yellow beeping"></div>';
    } else if (closesSoon && currentHour < todayHours.close) {
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
        homeItemElement.style.borderColor = 'green';
    } else if (statusClass === 'soon') {
        homeItemElement.style.borderColor = 'orange';
    } else {
        homeItemElement.style.borderColor = 'red';
    }
});
