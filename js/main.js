document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                menuToggle.classList.contains('active')
            );
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && 
                !navLinks.contains(e.target) && 
                navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Handle keyboard navigation in menu
        const menuItems = navLinks.querySelectorAll('a');
        menuItems.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                const isLastItem = index === menuItems.length - 1;
                const isFirstItem = index === 0;

                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextItem = isLastItem ? menuItems[0] : menuItems[index + 1];
                    nextItem.focus();
                }

                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevItem = isFirstItem ? menuItems[menuItems.length - 1] : menuItems[index - 1];
                    prevItem.focus();
                }
            });
        });
    }
}));