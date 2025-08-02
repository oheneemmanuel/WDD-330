

let current = 0;
let intervalId;

function showImage(index, images) {
  images.forEach((img, i) => {
    img.style.display = i === index ? "flex" : "none";
  });
}

function nextImage(images) {
  current = (current + 1) % images.length;
  showImage(current, images);
}

function startAutoSlide(images) {
  intervalId = setInterval(() => nextImage(images), 5000);
}

export function initSlider() {
  const images = document.querySelectorAll(".slider-item");
  if (images.length === 0) {
    console.warn("No slider items found. Slider won’t start.");
    return;
  }

  showImage(current, images);
  startAutoSlide(images);
}
