function startApp() {
  window.dataLayer = window.dataLayer || []

  // burger menu
  const buttonOpenMenu = document.querySelector(`[data-menu="open"]`)
  const buttonCloseMenu = document.querySelector(`[data-menu="close"]`)
  const menuLinks = document.querySelectorAll(`[data-menu-link]`)
  const navMenu = document.querySelector(`[data-menu="menu"]`)

  const openMenu = () => navMenu.classList.add('header__nav--active')
  const closeMenu = () => navMenu.classList.remove('header__nav--active')

  buttonOpenMenu.addEventListener('click', openMenu)
  buttonCloseMenu.addEventListener('click', closeMenu)
  menuLinks.forEach(link => link.addEventListener('click', closeMenu))

  // popup
  const body = document.querySelector('.body')
  const popup = document.querySelector('.popup')
  const popupBody = document.querySelector('.popup__body')
  const closePopupButton = document.querySelector('.popup__close')

  const openPopup = () => {
    popup.classList.add('popup--open')
    body.classList.add('body--lock')
    // popupBody.innerHTML = ``
  }
  const closePopup = () => {
    popup.classList.remove('popup--open')
    body.classList.remove('body--lock')
    popupBody.innerHTML = ``
  }

  closePopupButton.addEventListener('click', closePopup)

  // portfolio popup
  const getPortfolioData = async () => {
    const response = await fetch(`../js/portfolio.json`)
    return await response.json()
  }
  const createPortfolioCard = async () => {
    const portfolioBody = document.querySelector('.portfolio__content')
    const popupBody = document.querySelector('.popup__body')
    const closePopupButton = document.querySelector('.popup__close')
    const portfolioCards = await getPortfolioData()
    let popupSwiper = null

    const cardToHTML = (card) => {
      const { mark, price, description, images } = card
      return `
        <div class="portfolio-card">
          <div class="portfolio-card__top">
            <div class="portfolio-card__mark">
              <span class="portfolio-card__name">МАРКА:</span>
              <span class="portfolio-card__text">${mark}</span>
            </div>
            <div class="portfolio-card__price">
              <span class="portfolio-card__name">СТОИМОСТЬ РЕМОНТА:</span>
              <span class="portfolio-card__text">${price} рублей</span>
            </div>
          </div>
          <div class="portfolio-card__desc">
            <p class="portfolio-card__name">ЧТО БЫЛО СДЕЛАНО:</p>
            <p class="portfolio-card__text">${description}</p>
          </div>
          <div class="portfolio-card__slider">
            <div class="swiper popup-swiper">
              <div class="swiper-wrapper">
              ${images.map(image => {
        return `
                  <div class="swiper-slide">
                    <img src=${image} alt="">
                  </div>
                `}).join('')
        }
              </div>
              <div class="popup-swiper-pagination"></div>
            </div>
          </div>
        </div>
      `
    }
    const openPortfolioPopup = (e) => {
      if (e.target.dataset.portfolio) {
        const caseId = e.target.dataset.portfolio
        const card = portfolioCards.find(card => card.id === caseId)
        popupBody.insertAdjacentHTML('afterbegin', cardToHTML(card))

        popupSwiper = new Swiper('.popup-swiper', {
          slidesPerView: 1,
          freeMode: true,
          grabCursor: true,
          spaceBetween: 0,
          pagination: {
            el: '.popup-swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.popup-swiper-next',
            prevEl: '.popup-swiper-prev',
          },
          breakpoints: {
            541: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              freeMode: false,
            }
          }
        })
        openPopup()
      }
    }
    const cleanPopup = () => {
      if(popupSwiper) popupSwiper.destroy(true, true)
      popupBody.innerHTML = ``
    }

    portfolioBody.addEventListener('click', openPortfolioPopup)
    closePopupButton.addEventListener('click', cleanPopup)
  }
  createPortfolioCard()

  //main swiper slider
  const swiper = new Swiper('.mySwiper', {
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

  //mask input
  const headerTel = document.querySelector('#headerPhone')
  const sendTel = document.querySelector('#sendPhone')
  const telMask = new Inputmask('+7 999 999-99-99')

  telMask.mask(headerTel)
  telMask.mask(sendTel)

  //validate form
  const validationHeaderForm = new JustValidate('#headerForm')
  const validationSendForm = new JustValidate('#sendForm')

  validationHeaderForm
    .addField('#headerFullName', [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Введите имя'
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Имя дожно содержать минимум 2 символа'
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Не больше 30 символов'
      }
    ])
    .addField('#headerPhone', [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Телефон обязателен'
      },
      {
        rule: 'function',
        validator: function () {
          const phone = headerTel.inputmask.unmaskedvalue()
          return phone.length === 10
        },
        errorMessage: 'Введите корректный телефон'
      }
    ]).onSuccess((event) => {
      console.log('Validation passes and form submitted', event);

      let formData = new FormData(event.target);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
            window.dataLayer.push({ 'event': 'Lead' })
            openPopup()
            popupBody.insertAdjacentHTML('afterbegin', `
              <div class="success-message">
                <div class="success-massage__inner">
                  <div class="success-message__title">Спасибо за заявку!</div>
                  <div class="success-message__text">В ближайшее время с вами свяжется наш специалист</div>
                </div>
              </div>
            `)
          } else {
            console.log(xhr.status)
          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      event.target.reset();
    })

  validationSendForm
    .addField('#sendFullName', [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Введите имя'
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Имя дожно содержать минимум 2 символа'
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Не больше 30 символов'
      }
    ])
    .addField('#sendPhone', [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Телефон обязателен'
      },
      {
        rule: 'function',
        validator: function () {
          const phone = sendTel.inputmask.unmaskedvalue()
          return phone.length === 10
        },
        errorMessage: 'Введите корректный телефон'
      }
    ])
    .addField('#sendPicture', [
      {
        rule: 'minFilesCount',
        value: 1,
        errorMessage: 'Выберите файл'
      },
      {
        rule: 'files',
        value: {
          files: {
            extensions: ['jpg', 'jpeg', 'png', 'gif'],
            maxSize: 2 * 1024 * 1024,
            minSize: 1000,
          },
        },
      }
    ]).onSuccess((event) => {
      console.log('Validation passes and form submitted', event);

      let formData = new FormData(event.target);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено')
            window.dataLayer.push({ 'event': 'Lead' })
            openPopup()
            popupBody.insertAdjacentHTML('afterbegin', `
              <div class="success-message">
                <div class="success-massage__inner">
                  <div class="success-message__title">Спасибо за заявку!</div>
                  <div class="success-message__text">В ближайшее время с вами свяжется наш специалист</div>
                </div>
              </div>
            `)
          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      event.target.reset();
      const fileName = document.querySelector('.file-name')
      fileName.innerHTML = `Выберите файл`
    })

  const formFile = document.querySelector('#sendPicture')
  const fileName = document.querySelector('.file-name')
  formFile.addEventListener('change', () => {
    if (formFile.files[0]) {
      const file = formFile.files[0]
      fileName.innerHTML = `${file.name}`
    } else {
      fileName.innerHTML = `Выберите файл`
    }
  })
}

window.addEventListener('DOMContentLoaded', startApp)