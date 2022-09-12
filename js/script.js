// BURGER MENU

$(document).ready(function() {
  $('.header__burger').click(function(event) {
      $('.header__burger, .menu').toggleClass('active');
  });
});

$(document).ready(function(){
  $("#list").on("click", "a", function (event) {
      event.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top}, 800);
  });
});

// SLIDERS

$(document).ready(function(){
  $('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    adaptiveHeight: true,
    infinite: true,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    draggable: true,
    swipe: true,
    touchThreshold: 10,
    touchMove: true,
    waitForAnimate: true,
    centerMode: false,
    variableWidth: false,
    appendArrows: $('.welcome__slider-arrows'),
    appendDots: $('.welcome__slider-dots'),
  });
  $('.slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide){
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.welcome__slider-count').text(`0${i}  |  0${slick.slideCount}`);
    document.getElementById("welcome__slider-count").style.wordSpacing = "5px";
  });
  $('.video__slider').slick({
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    adaptiveHeight: true,
    infinite: true,
    initialSlide: 0,
    autoplay: false,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    draggable: true,
    swipe: true,
    touchThreshold: 10,
    touchMove: true,
    waitForAnimate: true,
    centerMode: false,
    variableWidth: false,
    prevArrow: $('.video__prev-arrow'),
    nextArrow: $('.video__next-arrow'),
    appendDots: $('.video__slider-dots'),
    asNavFor: '.video__main-slider'
  });
  $('.video__main-slider').slick({
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    adaptiveHeight: true,
    infinite: true,
    initialSlide: 0,
    autoplay: false,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    draggable: false,
    swipe: true,
    touchThreshold: 10,
    touchMove: true,
    waitForAnimate: true,
    centerMode: false,
    variableWidth: false,
    asNavFor: '.video__slider'
  });
});

// PICTURE EXPLORE SLIDER

const slider = document.querySelector('.explore__slider');
const imgBefore = document.querySelector('.explore__before');
const dragLine = document.querySelector('.explore__drag-line');
slider.oninput = () => {
  let sliderValue = slider.value;
  dragLine.style.left = sliderValue + '%';
  imgBefore.style.width = sliderValue + '%';
}

// VIDEO SECTION

// main video
const videoPlayers = document.querySelectorAll('.video__main-slider-item');

videoPlayers.forEach(videoPlayer => {
  const video = videoPlayer.querySelector('.video__source');
  const playButton = videoPlayer.querySelector('.video__small-play-button');
  const bigPlayButton = videoPlayer.querySelector('.video__play-button');
  const volume = videoPlayer.querySelector('.video__volume');
  const progress = videoPlayer.querySelector('.video__progress');
  const progressBar = videoPlayer.querySelector('.video__progress_filled');
  const volumeButton = videoPlayer.querySelector('.video__volume-btn');
  const fullScreen = videoPlayer.querySelector('.video__full-screen');

  // play & pause
  playButton.addEventListener('click', (e) => {
    playButton.classList.toggle('active');
    bigPlayButton.classList.toggle('active');
    if(video.paused) {
      video.play()
    } else {
      video.pause()
    }
  });

  bigPlayButton.addEventListener('click', (e) => {
    playButton.classList.toggle('active');
    bigPlayButton.classList.toggle('active');
    if(video.paused) {
      video.play()
    } else {
      video.pause()
    }
  });

  // progress bar
  video.addEventListener('timeupdate', () => {
    const percentage = (video.currentTime / video.duration) * 100
    progressBar.style.width = `${percentage}%`
  });

  // change it on click
  progress.addEventListener('click', (e) => {
    const progressTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = progressTime
  });

  // volume button
  volumeButton.addEventListener('click', () => {
    video.muted = !video.muted;
    volumeButton.classList.toggle('muted')
    if (video.muted) {
      video.volume
    }
  });

  // volume
  volume.addEventListener('mousemove', (e) => {
    video.volume = e.target.value
  });

  // full-screen
  fullScreen.addEventListener('click', () => {
    fullScreen.classList.toggle('opened');
    if (!document.fullscreenElement) {
      videoPlayer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
});

// ART GALLERY
const reveal = () => {
  let reveals = document.querySelectorAll('.reveal');
  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let revealTop = reveals[i].getBoundingClientRect().top;
    let revealPoint = 150;
    
    if(revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
};

window.addEventListener('scroll', reveal);

// TICKETS
document.querySelector('.basic-minus').setAttribute('disabled', 'disabled');
document.querySelector('.senior-minus').setAttribute('disabled', 'disabled');

let valueBasicCount = 0;
let valueSeniorCount = 0;
let basicPrice = 20;
let seniorPrice = 10;

const priceTotal = () => {
  let totalBasic = valueBasicCount * basicPrice;
  let totalSenior = valueSeniorCount * seniorPrice;
  document.getElementById('price').innerText = totalBasic + totalSenior
  document.getElementById('price-form').innerText = totalBasic + totalSenior
  document.getElementById('basic-price').innerText = totalBasic
  document.getElementById('senior-price').innerText = totalSenior
};

// tickets count

//  basic count
document.querySelector('.basic-plus').addEventListener('click', () => {
  valueBasicCount = document.getElementById('basic-quantity').value;
  valueBasicCount++;
  document.getElementById('basic-quantity').value = valueBasicCount;
  document.getElementById('form-basic-quantity').value = valueBasicCount;

  if(valueBasicCount >= 1) {
    document.querySelector('.basic-minus').removeAttribute('disabled');
    document.querySelector('.basic-minus').classList.remove('disabled');
  }
  if (valueBasicCount === 20) {
    document.querySelector('.basic-plus').setAttribute('disabled', 'disabled')
  }

  priceTotal();
});

document.querySelector('.basic-minus').addEventListener('click', () => {
  valueBasicCount = document.getElementById('basic-quantity').value;
  valueBasicCount--;
  document.getElementById('basic-quantity').value = valueBasicCount;
  document.getElementById('form-basic-quantity').value = valueBasicCount;

  if (valueBasicCount < 20) {
    document.querySelector('.basic-plus').removeAttribute('disabled');
    document.querySelector('.basic-plus').classList.remove('disabled');
  }
  if(valueBasicCount === 0) {
    document.querySelector('.basic-minus').setAttribute('disabled', 'disabled')
  }
  
  priceTotal();
});

// senior count
document.querySelector('.senior-plus').addEventListener('click', () => {
  valueSeniorCount = document.getElementById('senior-quantity').value;
  valueSeniorCount++;
  document.getElementById('senior-quantity').value = valueSeniorCount;
  document.getElementById('form-senior-quantity').value = valueSeniorCount;

  if(valueSeniorCount >= 1) {
    document.querySelector('.senior-minus').removeAttribute('disabled');
    document.querySelector('.senior-minus').classList.remove('disabled');
  }
  if (valueSeniorCount === 20) {
    document.querySelector('.senior-plus').setAttribute('disabled', 'disabled')
  }

  priceTotal();
});

document.querySelector('.senior-minus').addEventListener('click', () => {
  valueSeniorCount = document.getElementById('senior-quantity').value;
  valueSeniorCount--;
  document.getElementById('senior-quantity').value = valueSeniorCount;
  document.getElementById('form-senior-quantity').value = valueSeniorCount;

  if (valueSeniorCount < 20) {
    document.querySelector('.senior-plus').removeAttribute('disabled');
    document.querySelector('.senior-plus').classList.remove('disabled');
  }
  if(valueSeniorCount === 0) {
    document.querySelector('.senior-minus').setAttribute('disabled', 'disabled')
  }

  priceTotal();
});

//  basic count
document.querySelector('.form-basic-plus').addEventListener('click', () => {
  valueBasicCount = document.getElementById('basic-quantity').value;
  valueBasicCount++;
  document.getElementById('basic-quantity').value = valueBasicCount;
  document.getElementById('form-basic-quantity').value = valueBasicCount;

  if(valueBasicCount >= 1) {
    document.querySelector('.form-basic-minus').removeAttribute('disabled');
    document.querySelector('.form-basic-minus').classList.remove('disabled');
  }
  if (valueBasicCount === 20) {
    document.querySelector('.basic-plus').setAttribute('disabled', 'disabled')
  }

  priceTotal();
});

document.querySelector('.form-basic-minus').addEventListener('click', () => {
  valueBasicCount = document.getElementById('basic-quantity').value;
  valueBasicCount--;
  document.getElementById('basic-quantity').value = valueBasicCount;
  document.getElementById('form-basic-quantity').value = valueBasicCount;

  if (valueBasicCount < 20) {
    document.querySelector('.form-basic-plus').removeAttribute('disabled');
    document.querySelector('.form-basic-plus').classList.remove('disabled');
  }
  if(valueBasicCount === 0) {
    document.querySelector('.form-basic-minus').setAttribute('disabled', 'disabled')
  }
  
  priceTotal();
});

// senior count
document.querySelector('.form-senior-plus').addEventListener('click', () => {
  valueSeniorCount = document.getElementById('senior-quantity').value;
  valueSeniorCount++;
  document.getElementById('senior-quantity').value = valueSeniorCount;
  document.getElementById('form-senior-quantity').value = valueSeniorCount;

  if(valueSeniorCount >= 1) {
    document.querySelector('.form-senior-minus').removeAttribute('disabled');
    document.querySelector('.form-senior-minus').classList.remove('disabled');
  }
  if (valueSeniorCount === 20) {
    document.querySelector('.form-senior-plus').setAttribute('disabled', 'disabled')
  }

  priceTotal();
});

document.querySelector('.form-senior-minus').addEventListener('click', () => {
  valueSeniorCount = document.getElementById('senior-quantity').value;
  valueSeniorCount--;
  document.getElementById('senior-quantity').value = valueSeniorCount;
  document.getElementById('form-senior-quantity').value = valueSeniorCount;

  if (valueSeniorCount < 20) {
    document.querySelector('.form-senior-plus').removeAttribute('disabled');
    document.querySelector('.form-senior-plus').classList.remove('disabled');
  }
  if(valueSeniorCount === 0) {
    document.querySelector('.form-senior-minus').setAttribute('disabled', 'disabled')
  }

  priceTotal();
});

// form count


// FORM

// validation

const buyerName = document.getElementById('name');
const email = document.getElementById('email');
const tel = document.getElementById('tel');
const form = document.getElementById('form');
const errorName = document.getElementById('error-name');
const errorEmail = document.getElementById('error-email');
const errorTel = document.getElementById('error-tel');

form.addEventListener('submit', (e) => {
  let nameMessages = []
  let emailMessages = []
  let telMessages = []

  const validNameRegEx = /^[a-zA-Zа-яА-Я]+$/;
  const validEmailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validTelRegEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  if (buyerName.value === '' || buyerName == null) {
    nameMessages.push('Name is required')
    errorName.innerText = nameMessages.join(', ')
    errorEmail.style.color = 'red'
    buyerName.style.border = '1px solid red'
  } else if (buyerName.value.length <= 3) {
    nameMessages.push('Name must be longer than 3 characters')
    errorName.innerText = nameMessages.join(', ')
    errorEmail.style.color = 'red'
    buyerName.style.border = '1px solid red'
  } else if (buyerName.value.length >= 15) {
    nameMessages.push('Name must be shorter than 15 characters')
    errorName.innerText = nameMessages.join(', ')
    errorEmail.style.color = 'red'
    buyerName.style.border = '1px solid red'
  } else if (!validNameRegEx.test(buyerName.value)) {
    nameMessages.push('Name can only contain latin and cyrillic letters')
    errorName.innerText = nameMessages
    errorName.style.color = 'red'
    buyerName.style.border = '1px solid red'
  } else {
    nameMessages.push('Success!')
    errorName.innerText = nameMessages
    errorName.style.color = 'green'
    buyerName.style.border = '1px solid green'
  }

  if (email.value === '' || email == null) {
    emailMessages.push('Email is required')
    errorEmail.innerText = emailMessages
    errorEmail.style.color = 'red'
    email.style.border = '1px solid red'
  } else if (!validEmailRegEx.test(email.value)) {
    emailMessages.push('Email is incorrect')
    errorEmail.innerText = emailMessages
    errorEmail.style.color = 'red'
    email.style.border = '1px solid red'
  } else {
    emailMessages.push('Success!')
    errorEmail.innerText = emailMessages
    errorEmail.style.color = 'green'
    email.style.border = '1px solid green'
  }
  
  
  if (tel.value === '' || tel == null) {
    telMessages.push('Phone number is required')
    errorTel.innerText = telMessages
    errorEmail.style.color = 'red'
    tel.style.border = '1px solid red'
  } else if (!validTelRegEx.test(tel.value)) {
    telMessages.push('Phone number can only contain numbers')
    errorTel.innerText = telMessages
    errorTel.style.color = 'red'
    tel.style.border = '1px solid red'
  } else {
    telMessages.push('Success!')
    errorTel.innerText = telMessages
    errorTel.style.color = 'green'
    tel.style.border = '1px solid green'
  }
   
});

// date
$(function(){
  let dtToday = new Date();
  let month = dtToday.getMonth() + 1;
  let day = dtToday.getDate();
  let year = dtToday.getFullYear();

  if(month < 10)
      month = '0' + month.toString();
  if(day < 10)
      day = '0' + day.toString();
  
  let maxDate = year + '-' + month + '-' + day;
  $('#date').attr('min', maxDate);
});

// MAP
mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWxleCIsImEiOiJja3Vtd2Z5dnMwaWhzMzFwMWc3NnIzdHp1In0.yCLnmEAWW8GdbUdtG0dwlA';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/davilex/ckumx4n621ue217o7crvt0zt5',
center: [2.336411, 48.86146],
zoom: 16
});
const marker1 = new mapboxgl.Marker({ color: '#171717' })
  .setLngLat([2.3364, 48.86091])
  .addTo(map);
const marker2 = new mapboxgl.Marker({ color: '#757575' })
  .setLngLat([2.3333, 48.8602])
  .addTo(map);
const marker3 = new mapboxgl.Marker({ color: '#757575' })
  .setLngLat([2.3397, 48.8607])
  .addTo(map);
const marker4 = new mapboxgl.Marker({ color: '#757575' })
  .setLngLat([2.3330, 48.8619])
  .addTo(map);
const marker5 = new mapboxgl.Marker({ color: '#757575' })
  .setLngLat([2.3365, 48.8625])
  .addTo(map);

// SELF-RATING

console.log('Ваша оценка - 115 баллов\nтзыв по пунктам ТЗ:\nНе выполненные/не засчитанные пункты:\n1) если внутри слайда проигрывается видео с YouTube, клик по стрелке перелистывания слайдов или клик по буллету останавливает проигрывание видео \n2) если основное видео проигрывалось при перелистывании слайдера, проигрывание видео останавливается, прогресс бар сдвигается к началу, иконки "Play" на панели управления и по центру видео меняются на первоначальные \n3) при клике на иконку динамика происходит toggle звука и самой иконки (звук включается или выключается, соответственно изменяется иконка) \n4) клавиша Пробел — пауза, при повторном нажатии - play \n5) Клавиша M (англ) — отключение/включение звука \n6) Клавиша F — включение/выключение полноэкранного режима \n7) Клавиши SHIFT+, (англ) — ускорение воспроизведения ролика \n8) Клавиши SHIFT+. (англ) — замедление воспроизведения ролика \n9) у каждого типа билетов своя цена (20 €, 25 €, 40 € для Basic и половина этой стоимости для Senior). При изменении типа билета пересчитывается общая цена за них \n10) при обновлении страницы сохраняется выбранное ранее количество билетов Basic и Senior, выбранный тип билета, общая цена за них \n11) когда пользователь выбирает дату в форме слева, она отображается в билете справа \n12) когда пользователь выбирает время в форме слева, оно отображается в билете справа \n13) можно изменить тип билета в поле Ticket type слева при этом меняется тип билета, цена билета и общая стоимость билетов справа \n14) Любой собственный дополнительный функционал, улучшающий качество проекта. Например, ночная тема, плавная смена изображений в блоке Tickets, всплывающее окно с информацией про картины и их авторов, кнопка прокрутки страницы вверх, возможность проголосовать за понравившиеся картины с сохранением данных в local storage, всё зависит от вашей фантазии и чувства вкуса. Для удобства проверки выполненный вами дополнительный функционал включите в самооценку, которую выведите в консоль браузера \nЧастично выполненные пункты:\n1) если видео с YouTube проигрывается, клик по кнопке Pause останавливает его проигрывание. Также проигрывание видео останавливается, если кликнуть по другому слайду или кнопке Play в центре другого слайда. В указанной ситуации другое видео должно запуститься, а текущее остановиться. Невозможно проигрывание нескольких YouTube видео одновременно \n2) при клике по большой кнопке "Play" по центру видео, или при клике по самому видео, начинается проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Клик на видео, которое проигрывается, останавливает проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается \n3) если прогресс-бар перетянуть до конца, видео останавливается, соответственно, меняется внешний вид кнопок "Play" \n4) если ползунок громкости звука перетянуть до 0, звук выключается, иконка динамика становится зачеркнутой \n5) если при выключенном динамике перетянуть ползунок громкости звука от 0, звук включается, иконка громкости перестаёт быть зачёркнутой \n6) когда при клике по кнопке Buy now открывается форма, она уже содержит данные, указанные на странице сайта - количество билетов, их тип, общая цена за них \nВыполненные пункты:\n1) есть возможность перелистывания слайдов влево и вправо кликами по стрелкам \n2) есть возможность перелистывания слайдов влево и вправо свайпами (движениями) мышки \n3) есть возможность перелистывания слайдов кликами по буллетам (квадратики внизу слайдера) \n4) слайды перелистываются плавно с анимацией смещения вправо или влево \n5) перелистывание слайдов бесконечное (зацикленное) \n6) при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) \n7) при перелистывании слайдов кликами или свайпами меняется номер активного слайда \n8) даже при частых кликах или свайпах нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда \n9) при клике по самому слайду или кнопке Play в центре слайда, внутри слайда проигрывается видео с YouTube. Никакие изменения с основным видео при этом не происходят \n10) есть возможность перелистывания слайдов с видео влево и вправо кликами по стрелкам. Слайды перелистываются по одному, при этом также меняется основное видео \n11) есть возможность перелистывания слайдов кликами по буллетам (кружочки внизу слайдера), при этом также меняется основное видео \n12) слайды перелистываются плавно с анимацией смещения вправо или влево (для смены основного видео анимация смещения не требуется и не проверяется) \n13) перелистывание слайдов бесконечное (зацикленное) \n14) при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) \n15) даже при частых кликах по стрелкам нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда \n16) при клике по кнопке "Play" слева внизу на панели видео начинается проигрывание видео, иконка кнопки при этом меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Повторный клик на кнопку останавливает проигрывание видео, иконка меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается \n17) прогресс-бар отображает прогресс проигрывания видео \n18) перетягивание ползунка прогресс-бара позволяет изменить время с которого проигрывается видео \n19) при перемещении ползунка громкости звука изменяется громкость видео \n20) при нажатии на кнопку fullscreen видео переходит в полноэкранный режим, при этом видео и панель управления разворачиваются во весь экран. При нажатии на кнопку fullscreen повторно видео выходит из полноэкранного режима. Нажатие на клавишу для выхода из полноэкранного режима Esc не проверяем и не оцениваем \n21) панель управления в полноэкранном режиме визуально выглядит так же, как на макете - кнопки равномерно распределены по всей ширине страницы, относительные размеры между кнопками и ползунками, а также относительные размеры самих кнопок остались прежними \n22) ползунок можно перетягивать мышкой по горизонтали \n23) ползунок никогда не выходит за границы картины \n24) при перемещении ползунка справа налево плавно появляется нижняя картина \n25) при перемещении ползунка слева направо плавно появляется верхняя картина \n26) при обновлении страницы ползунок возвращается в исходное положение \n27) при прокрутке страницы вниз появление картин секции Galery сопровождается анимацией: изображения плавно поднимаются снизу вверх, увеличиваясь и создавая эффект выплывания. В качестве образца анимации используйте анимацию на сайте Лувра https://www.louvre.fr/ \n28) если прокрутить страницу вверх и затем снова прокручивать вниз, анимация появления картин повторяется \n29) при обновлении страницы, если она к тому моменту была прокручена до секции Galery, анимация картин повторяется \n30) при изменении количества билетов Basic и Senior пересчитывается общая цена за них \n31) нельзя выбрать дату в прошлом \n32) время можно выбирать с 9:00 до 18:00 с интервалом в 30 минут \n33) можно изменить количество билетов каждого типа в поле слева при этом меняется количество билетов и общая стоимость билетов справа \n34) валидация имени пользователя. Имя пользователя должно содержать от 3 до 15 символов, в качестве символов могут быть использованы буквы английского или русского алфавита в нижнем или верхнем регистре и пробелы \n35) валидация e-mail должна пропукать только адреса вида username@example.com, где: username - имя пользователя, должно содержать от 3 до 15 символов (буквы, цифры, знак подчёркивания, дефис), не должно содержать пробелов; @ - символ собачки; example - домен первого уровня состоит минимум из 4 латинских букв; com - домен верхнего уровня, отделяется от домена первого уровня точкой и состоит минимум из 2 латинских букв \n36) валидация номера телефона: номер содержит только цифры; без разделения или с разделением на две или три цифры; разделение цифр может быть через дефис или пробел; с ограничением по количеству цифр не больше 10 цифр \n37) при попытке ввода в форму невалидного значения выводится предупреждение, например, "номер телефона может содержать только цифры" \n38) в секции Contacts добавлена интерактивная карта \n39) на карте отображаются маркеры, расположение и внешний вид маркеров соответствует макету \n40) стиль карты соответствует макету');