document.addEventListener('DOMContentLoaded', function() {
    const navigation = document.getElementById("js-btp-navigation");
    const mobileMenuToggle = document.getElementById("js-btp-navigation__offcanvas-toggle");
    const BODY = document.querySelector("body");
    const closeOffcanvasText = mobileMenuToggle.getAttribute("data-close-text");
    const openOffcanvasText = mobileMenuToggle.getAttribute("data-open-text");
    mobileMenuToggle.addEventListener("click", function() {
        let offcanvasIsOpen = navigation.classList.contains("offcanvas-is-open");
        if (offcanvasIsOpen) {
            navigation.classList.remove("offcanvas-is-open");
            BODY.style.overflow = "auto";
            mobileMenuToggle.setAttribute("aria-expanded", "false");
            mobileMenuToggle.setAttribute("aria-label", openOffcanvasText);
        } else {
            navigation.classList.add("offcanvas-is-open");
            BODY.style.overflow = "hidden";
            mobileMenuToggle.setAttribute("aria-expanded", "true");
            mobileMenuToggle.setAttribute("aria-label", closeOffcanvasText);
        }
    })
});