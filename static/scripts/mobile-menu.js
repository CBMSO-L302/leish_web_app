// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle main mobile menu
    mobileMenuToggle.addEventListener('click', function (event) {
        event.stopPropagation();
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close the menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('header')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');

            // Close all dropdown contents
            const dropdownContents = document.querySelectorAll('.mobile-dropdown-content');
            dropdownContents.forEach(content => {
                content.style.display = 'none';
            });
        }
    });

    // Toggle mobile dropdown menus
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown > a');
    mobileDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            const dropdownContent = this.nextElementSibling;

            // Close all other dropdown contents
            const allDropdownContents = document.querySelectorAll('.mobile-dropdown-content');
            allDropdownContents.forEach(content => {
                if (content !== dropdownContent) {
                    content.style.display = 'none';
                }
            });

            // Toggle this dropdown content
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Close the menu when clicking on a final menu item (not parent items)
    const finalMenuLinks = document.querySelectorAll('.mobile-dropdown-content a');
    finalMenuLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
});
