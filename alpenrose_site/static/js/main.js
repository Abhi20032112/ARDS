// Typing Animation
const typedText = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");

const words = ["Web Design", "Brand Identity", "UI/UX", "Business Strategy"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let erasingDelay = 50;
let newWordDelay = 1500; // pause before typing next word

function type() {
  if (typedText) {
    const currentWord = words[wordIndex];
    if (!isDeleting && charIndex <= currentWord.length) {
      typedText.textContent = currentWord.substring(0, charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else if (isDeleting && charIndex >= 0) {
      typedText.textContent = currentWord.substring(0, charIndex);
      charIndex--;
      setTimeout(type, erasingDelay);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(type, newWordDelay);
    }
  }
}
document.addEventListener("DOMContentLoaded", function () {
  if (typedText) {
    setTimeout(type, newWordDelay + 500);
  }
});

// Fade-In on Scroll
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("fade-in-active");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
