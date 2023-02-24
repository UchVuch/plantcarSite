const mainSwiper = new Swiper('.main-swiper', {
  direction: 'vertical',
  slidesPerView: 1,
  //     grid: {
  //       rows: 2,
  //     },
  spaceBetween: 10,

  navigation: {
    nextEl: '.portfolio__slider-next',
    prevEl: '.portfolio__slider-prev',
  },
  
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
})