const swiper = new Swiper(".mySwiper", {
  direction: 'vertical',
  slidesPerView: 20,
  slidesPerGroup: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: '.portfolio__slider-next',
    prevEl: '.portfolio__slider-prev',
  },
});