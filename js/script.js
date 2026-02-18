window.addEventListener('DOMContentLoaded', event => {
    // funcion de estreitamento do navbar || navbar shrink function

    let navbarShrink = function () {
        const navbarColapse = document.body.querySelector('#mainNav');
        if (!navbarColapse) {
            return;
        } if (window.scrollY === 0) {
            navbarColapse.classList.remove('navbar-shrink');
        } else {
            navbarColapse.classList.add('navbar-shrink');
        }
    };

    // chamamos á funcion
    navbarShrink();
    // ... cando facemos scroll na paxina
    document.addEventListener('scroll', navbarShrink)

    // activar scrollspy
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.scrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // colapsar responsive navbar cando o navbartoggle sea visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            };
        });
    });
});