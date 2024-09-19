document.addEventListener('DOMContentLoaded', function() {
    // Get the current page path
    var currentPath = window.location.pathname;

    // Remove leading slash and trailing slash (if any)
    currentPath = currentPath.replace(/^\/|\/$/g, '');

    // Split the path into segments
    var pathSegments = currentPath.split('/');

    // Get the last segment of the path (usually the page name)
    var currentPage = pathSegments[pathSegments.length - 1];

    // If the last segment is empty (e.g., "/admin/"), use the second-to-last segment
    if (currentPage === '') {
        currentPage = pathSegments[pathSegments.length - 2];
    }

    // Find the nav link that matches the current page and add the 'active' class
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    var carousel = new bootstrap.Carousel(document.getElementById('offerCarousel'), {
        interval: 5000,
        wrap: true
    });

    // Pause on hover
    document.getElementById('offerCarousel').addEventListener('mouseenter', function() {
        carousel.pause();
    });

    document.getElementById('offerCarousel').addEventListener('mouseleave', function() {
        carousel.cycle();
    });

    // Add fade-in effect on slide change
    document.getElementById('offerCarousel').addEventListener('slid.bs.carousel', function() {
        var activeCaption = document.querySelector('.carousel-item.active .carousel-caption');
        activeCaption.classList.remove('fade-in');
        void activeCaption.offsetWidth; // Trigger reflow
        activeCaption.classList.add('fade-in');
    });
});
