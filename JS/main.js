// Responsive NavBar START
let menu = document.querySelector(".menu");
let links = document.querySelector(".links");

menu.addEventListener("click", () => {
    links.classList.toggle("js-menu-toggle");
    if (links.classList.contains("js-menu-toggle")) {
        menu.innerHTML = `<i class="fa-solid fa-xmark"></i>`
    } else {
        menu.innerHTML = `<i class="fa-solid fa-bars"></i>`
    }
});
// Responsive NavBar END