
document.addEventListener("DOMContentLoaded", () => {
  const collapsibles = document.querySelectorAll(".collapsible");
  collapsibles.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      const content = btn.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });
});

const images = ["resourse/202309131compare_img_en.gif", "resourse/202309211checkbuy_img_en.gif", "resourse/20230913_fashion_pic_en.png"];
let currentIndex = 0;
const sliderImage = document.getElementById("slider-image");

function showSlide(index) {
    sliderImage.src = images[index];
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showSlide(currentIndex);
}

// setInterval(nextSlide, 6000); // Change image every 2 seconds





const container = document.getElementById("card-container");
const cards = document.querySelectorAll(".card");
let currentIndex2 = 0;

function showSlide2(index) {
    container.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide2() {
    currentIndex2 = (currentIndex2 + 1) % cards.length;
    showSlide2(currentIndex2);
}

function prevSlide2() {
    currentIndex2 = (currentIndex2 - 1 + cards.length) % cards.length;
    showSlide2(currentIndex2);
}

// Optional: Auto-slide every 3 seconds
setInterval(nextSlide2, 3000);




const images1 = ["resourse/20241116-modesens-Gilt-1140x400.jpg", "resourse/20241114-modesens-Harrods-1140x400.jpg", "resourse/20241107-modesens-Bernardelli-1140x400-M.jpg", "resourse/20241105-modesens-LNCC-1140x400-M.jpg"];
let currentIndex3 = 0;
const sliderImage2 = document.getElementById("slider-image2");

function showSlide3(index) {
    sliderImage2.src = images1[index];
}

function nextSlide3() {
    currentIndex3 = (currentIndex3 + 1) % images1.length;
    showSlide3(currentIndex3);
}

function prevSlide3() {
    currentIndex3 = (currentIndex3 - 1 + images1.length) % images1.length;
    showSlide3(currentIndex3);
}

setInterval(nextSlide3, 2000); // Change image every 2 seconds





