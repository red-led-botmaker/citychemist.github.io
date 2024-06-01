document.addEventListener('DOMContentLoaded', function () {
    // Fade in elements on scroll
    const fadeInElements = document.querySelectorAll('.service-item');

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
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for contact button
    const contactButton = document.querySelector('.hero button');
    contactButton.addEventListener('click', () => {
        document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
    });

    // Fade-in effect on scroll
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        observer.observe(element);
    });
});
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

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});
 document.getElementById('next').onclick = function(){
    let lists = document.querySelectorAll('.city');
    document.getElementById('yxz').appendChild(lists[0]);
}
document.getElementById('prev').onclick = function(){
    let lists = document.querySelectorAll('.city');
    document.getElementById('yxz').prepend(lists[lists.length - 1]);
}
  
document.addEventListener("DOMContentLoaded", function() {
    const reviewTexts = document.querySelectorAll(".review-text");

    reviewTexts.forEach(reviewText => {
        reviewText.addEventListener("click", function() {
            this.classList.toggle("expanded");
        });
    });
});
