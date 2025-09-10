
// ================== SCROLL REVEAL ANIMATION ==================
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

// Add event listeners
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
  document.querySelector('.btn-primary').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#acara').scrollIntoView({ 
      behavior: 'smooth' 
    });
  });