
document.addEventListener("DOMContentLoaded", function () {
    // Отримання посилань меню
    const menuLinks = document.querySelectorAll(".menu__item");

    // Отримання чекбоксу гамбургерного меню
    const menuToggle = document.getElementById("menu__toggle");

    // Додавання обробника подій для кожного посилання меню
    menuLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            // Закриття меню, якщо воно відкрите
            if (menuToggle.checked) {
                menuToggle.checked = false;
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu__toggle");
    const menuOverlay = document.getElementById("menu__overlay");
    const menuLinks = document.querySelectorAll(".menu__item");

    // Додавання обробника подій для чекбоксу гамбургерного меню
    menuToggle.addEventListener("change", function () {
        document.body.classList.toggle("menu-open", menuToggle.checked);
    });

    // Додавання обробника подій для оверлею меню
    menuOverlay.addEventListener("click", function () {
        menuToggle.checked = false;
        document.body.classList.remove("menu-open");
    });

    // Додавання обробника подій для кожного посилання меню
    menuLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            menuToggle.checked = false;
            document.body.classList.remove("menu-open");
        });
    });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});