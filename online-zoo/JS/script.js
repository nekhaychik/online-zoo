// ANIMAL CAROUSEL
let animalCard = document.querySelectorAll(".animal-card");
const arrowLeft = document.querySelector(".animals__vector-left");
const arrowRight = document.querySelector(".animals__vector-right");
let currentAnimalCard = 6;
let isEnabled = true;

function changeCurrentAnimalCard(n) {
  currentAnimalCard = (n + animalCard.length) % animalCard.length;
}

function previousAnimalCard(n) {
  hideAnimalCard("to-right");
  changeCurrentAnimalCard(n - 6);
  showAnimalCard("from-left");
}

function nextAnimalCard(n) {
  hideAnimalCard("to-left");
  changeCurrentAnimalCard(n + 6);
  showAnimalCard("from-right");
}

arrowLeft.addEventListener("click", function () {
  if (isEnabled) {
    previousAnimalCard(currentAnimalCard);
  }
});

arrowRight.addEventListener("click", function () {
  if (isEnabled) {
    nextAnimalCard(currentAnimalCard);
  }
});

function hideAnimalCard(direction) {
  isEnabled = false;
  for (i = 0; i < 6; i++) {
    animalCard[currentAnimalCard + i].classList.add("new", direction);
    animalCard[currentAnimalCard + i].addEventListener(
      "animationend",
      function () {
        this.classList.remove("active", direction);
      }
    );
  }
}

function showAnimalCard(direction) {
  for (i = 0; i < 6; i++) {
    animalCard[currentAnimalCard + i].classList.add("next", "new", direction);
    animalCard[currentAnimalCard + i].addEventListener(
      "animationend",
      function () {
        this.classList.remove("next", "new", direction);
        this.classList.add("active");
        isEnabled = true;
      }
    );
  }
}

// TESTIMONIALS SLIDER
const testimonialsCards = document.querySelector(".testimonials__pic");
const testimonialWrapper = document.querySelector(".testimonials__item");
let slideIndex = 0;
let itemWidth = testimonialWrapper.offsetWidth;
const range = document.querySelector(".line-scroll");

window.addEventListener("resize", (e) => {
  itemWidth = document.querySelector(".testimonials__item").offsetWidth;
});

range.addEventListener("input", slideTo);

function slideTo() {
  slideIndex = range.value;
  changeSlide();
}

let changeSlide = () => {
  if (slideIndex >= 8) {
    slideIndex = 0;
  }
  testimonialsCards.scrollTo({
    left: (itemWidth + 28) * slideIndex,
    behavior: "smooth",
  });
  range.value = slideIndex;
  slideIndex++;
};

let autoSlide = setInterval(changeSlide, 10000);
let autoSlideTimeout = null;

const delayAutoSliding = () => {
  clearTimeout(autoSlideTimeout);
  clearInterval(autoSlide);
  autoSlide = null;
  autoSlideTimeout = setTimeout(() => {
    clearInterval(autoSlide);
    autoSlide = setInterval(changeSlide, 10000);
  }, 40000);
};

testimonialsCards.addEventListener("click", delayAutoSliding);
