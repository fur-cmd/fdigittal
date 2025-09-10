// ================== CAROUSEL ==================
const track = document.getElementById('carousel-track');
const dots = document.querySelectorAll('.carousel-dot');
let idx = 0;
const total = dots.length;

function showSlide(i) {
  idx = i;
  const carousel = document.getElementById('carousel');
  if (!carousel || !track) return; // <-- Tambahkan pengecekan ini
  const width = carousel.offsetWidth;
  track.style.transform = `translateX(-${i * width}px)`;
  dots.forEach((dot, j) => {
    dot.classList.toggle('opacity-70', j === i);
    dot.classList.toggle('opacity-50', j !== i);
  });
}

if (track && dots.length) {
  window.addEventListener('resize', () => showSlide(idx));
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      clearInterval(autoSlide);
      autoSlide = setInterval(nextSlide, 3500);
    });
  });
  function nextSlide() {
    showSlide((idx + 1) % total);
  }
  let autoSlide = setInterval(nextSlide, 3500);
  showSlide(0);
}

// ================== SCROLL REVEAL ==================
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ================== RESPONSIVE NAVBAR ==================
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("close-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("opacity-0", "pointer-events-none", "scale-95");
    mobileMenu.classList.add("opacity-100", "pointer-events-auto", "scale-100");
  });
}
if (closeMenu && mobileMenu) {
  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.add("opacity-0", "pointer-events-none", "scale-95");
    mobileMenu.classList.remove("opacity-100", "pointer-events-auto", "scale-100");
  });
}
