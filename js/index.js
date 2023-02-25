function startApp() {
  const buttonOpenMenu = document.querySelector(`[data-menu="open"]`)
  const buttonCloseMenu = document.querySelector(`[data-menu="close"]`)
  const menuLinks = document.querySelectorAll(`[data-menu-link]`)
  const navMenu = document.querySelector(`[data-menu="menu"]`)

  const openMenu = () => navMenu.classList.add('header__nav--active')
  const closeMenu = () => navMenu.classList.remove('header__nav--active')

  buttonOpenMenu.addEventListener('click', openMenu)
  buttonCloseMenu.addEventListener('click', closeMenu)
  menuLinks.forEach(link => link.addEventListener('click', closeMenu))

  const swiper = new Swiper(".mySwiper", {
    direction: 'vertical',
    slidesPerView: 4,
    slidesPerGroup: 4,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: '.portfolio__slider-next',
      prevEl: '.portfolio__slider-prev',
    },

    breakpoints: {
      541: {
        slidesPerView: 9,
        slidesPerGroup: 9,
        pagination: {
          el: ".swiper-pagination",
        },
      },
      768: {
        slidesPerView: 12,
        slidesPerGroup: 4,
        pagination: {
          el: ".swiper-pagination",
        },
      },
      1001: {
        slidesPerView: 20,
        slidesPerGroup: 20,
        pagination: {
          el: ".swiper-pagination",
        },
      },
    }
  })
}

window.addEventListener('DOMContentLoaded', startApp)