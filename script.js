// ELEMENTE REUTILIZATE
const backToTopBtn = document.getElementById("backToTopBtn");
const navLinks = document.getElementById("navLinks");
const hamburgerBtn = document.getElementById("hamburgerBtn");

// 1. Meniu hamburger
hamburgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Închide meniul dacă utilizatorul face click în afara lui
document.addEventListener("click", (e) => {
  if (!hamburgerBtn.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("show");
  }
});

// 2. Buton Înapoi sus
window.addEventListener("scroll", function() {
  if (window.scrollY > 200) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// 3. Slider principal (index.html)
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

if (slides.length > 0 && dots.length > 0) {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      dots[i].classList.remove("active");
    });
    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);
  }
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentSlide = i;
      showSlide(currentSlide);
    });
  });

  // Auto-play (opțional)
  let slideInterval = setInterval(nextSlide, 5000); // slide la fiecare 5 secunde
  showSlide(currentSlide);
}

// 4. Testimoniale (index.html)
const testimonialItems = document.querySelectorAll(".testimonial");
const testimonialsPrev = document.getElementById("testimonialsPrev");
const testimonialsNext = document.getElementById("testimonialsNext");
let currentTestimonial = 0;

if (testimonialItems.length > 0) {
  function showTestimonial(index) {
    testimonialItems.forEach((item) => {
      item.classList.remove("active");
    });
    testimonialItems[index].classList.add("active");
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
    showTestimonial(currentTestimonial);
  }
  function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
    showTestimonial(currentTestimonial);
  }

  if (testimonialsPrev && testimonialsNext) {
    testimonialsPrev.addEventListener("click", prevTestimonial);
    testimonialsNext.addEventListener("click", nextTestimonial);
  }
  showTestimonial(currentTestimonial);
}

// 5. Animații on-scroll (secțiunile cu clasa "animated-section")
const animatedSections = document.querySelectorAll(".animated-section");

function checkScroll() {
  const triggerBottom = window.innerHeight * 0.8;
  animatedSections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add("show");
    }
  });
}
window.addEventListener("scroll", checkScroll);
checkScroll(); // apel inițial

// 6. Filtrare atracții (attractions.html)
const filterBtns = document.querySelectorAll(".filter-btn");
const attractionItems = document.querySelectorAll(".attraction-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Schimbă starea butoanelor
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    let category = btn.getAttribute("data-category");
    attractionItems.forEach(item => {
      if (category === "all" || item.getAttribute("data-category") === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// 7. Mini-carusel pentru fiecare atracție (attractions.html)
document.querySelectorAll(".attraction-carousel").forEach((carousel) => {
  const imagesContainer = carousel.querySelector(".carousel-images");
  const prevButton = carousel.querySelector(".carousel-prev");
  const nextButton = carousel.querySelector(".carousel-next");
  let currentIndex = 0;
  const images = imagesContainer.querySelectorAll("img");
  
  function updateCarousel() {
    imagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  });
  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  });
});
