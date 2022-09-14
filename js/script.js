// BURGER MENU

$(document).ready(function () {
  $(".header__burger").click(function (event) {
    $(".header__burger, .menu").toggleClass("active");
  });
});

$(document).ready(function () {
  $("#list").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 800);
  });
});

// SLIDERS

$(document).ready(function () {
  $(".slider").slick({
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
    appendArrows: $(".welcome__slider-arrows"),
    appendDots: $(".welcome__slider-dots"),
  });
  $(".slider").on(
    "init reInit afterChange",
    function (event, slick, currentSlide, nextSlide) {
      var i = (currentSlide ? currentSlide : 0) + 1;
      $(".welcome__slider-count").text(`0${i}  |  0${slick.slideCount}`);
      document.getElementById("welcome__slider-count").style.wordSpacing =
        "5px";
    }
  );
  $(".video__main-slider").slick({
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
  });
});

// PICTURE EXPLORE SLIDER

const slider = document.querySelector(".explore__slider");
const imgBefore = document.querySelector(".explore__before");
const dragLine = document.querySelector(".explore__drag-line");
slider.oninput = () => {
  let sliderValue = slider.value;
  dragLine.style.left = sliderValue + "%";
  imgBefore.style.width = sliderValue + "%";
};

// VIDEO SECTION

// main video
const videoPlayers = document.querySelectorAll(".video__main-slider-item");

videoPlayers.forEach((videoPlayer) => {
  const video = videoPlayer.querySelector(".video__source");
  const playButton = videoPlayer.querySelector(".video__small-play-button");
  const bigPlayButton = videoPlayer.querySelector(".video__play-button");
  const volume = videoPlayer.querySelector(".video__volume");
  const progress = videoPlayer.querySelector(".video__progress");
  const progressBar = videoPlayer.querySelector(".video__progress_filled");
  const volumeButton = videoPlayer.querySelector(".video__volume-btn");
  const fullScreen = videoPlayer.querySelector(".video__full-screen");

  // play & pause
  playButton.addEventListener("click", (e) => {
    playButton.classList.toggle("active");
    bigPlayButton.classList.toggle("active");
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  bigPlayButton.addEventListener("click", (e) => {
    playButton.classList.toggle("active");
    bigPlayButton.classList.toggle("active");
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  // progress bar
  video.addEventListener("timeupdate", () => {
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percentage}%`;
  });

  // change it on click
  progress.addEventListener("click", (e) => {
    const progressTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = progressTime;
  });

  // volume button
  volumeButton.addEventListener("click", () => {
    video.muted = !video.muted;
    volumeButton.classList.toggle("muted");
    if (video.muted) {
      video.volume;
    }
  });

  // volume
  volume.addEventListener("mousemove", (e) => {
    video.volume = e.target.value;
  });

  // full-screen
  fullScreen.addEventListener("click", () => {
    fullScreen.classList.toggle("opened");
    if (!document.fullscreenElement) {
      videoPlayer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
});

// ART GALLERY
const reveal = () => {
  let reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let revealTop = reveals[i].getBoundingClientRect().top;
    let revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
};

window.addEventListener("scroll", reveal);

// TICKETS
document.querySelector(".basic-minus").setAttribute("disabled", "disabled");
document.querySelector(".senior-minus").setAttribute("disabled", "disabled");

let valueBasicCount = 0;
let valueSeniorCount = 0;
let basicPrice = 20;
let seniorPrice = 10;

const priceTotal = () => {
  let totalBasic = valueBasicCount * basicPrice;
  let totalSenior = valueSeniorCount * seniorPrice;
  document.getElementById("price").innerText = totalBasic + totalSenior;
  document.getElementById("price-form").innerText = totalBasic + totalSenior;
  document.getElementById("basic-price").innerText = totalBasic;
  document.getElementById("senior-price").innerText = totalSenior;
};

// tickets count

//  basic count
document.querySelector(".basic-plus").addEventListener("click", () => {
  valueBasicCount = document.getElementById("basic-quantity").value;
  valueBasicCount++;
  document.getElementById("basic-quantity").value = valueBasicCount;
  document.getElementById("form-basic-quantity").value = valueBasicCount;

  if (valueBasicCount >= 1) {
    document.querySelector(".basic-minus").removeAttribute("disabled");
    document.querySelector(".basic-minus").classList.remove("disabled");
  }
  if (valueBasicCount === 20) {
    document.querySelector(".basic-plus").setAttribute("disabled", "disabled");
  }

  priceTotal();
});

document.querySelector(".basic-minus").addEventListener("click", () => {
  valueBasicCount = document.getElementById("basic-quantity").value;
  valueBasicCount--;
  document.getElementById("basic-quantity").value = valueBasicCount;
  document.getElementById("form-basic-quantity").value = valueBasicCount;

  if (valueBasicCount < 20) {
    document.querySelector(".basic-plus").removeAttribute("disabled");
    document.querySelector(".basic-plus").classList.remove("disabled");
  }
  if (valueBasicCount === 0) {
    document.querySelector(".basic-minus").setAttribute("disabled", "disabled");
  }

  priceTotal();
});

// senior count
document.querySelector(".senior-plus").addEventListener("click", () => {
  valueSeniorCount = document.getElementById("senior-quantity").value;
  valueSeniorCount++;
  document.getElementById("senior-quantity").value = valueSeniorCount;
  document.getElementById("form-senior-quantity").value = valueSeniorCount;

  if (valueSeniorCount >= 1) {
    document.querySelector(".senior-minus").removeAttribute("disabled");
    document.querySelector(".senior-minus").classList.remove("disabled");
  }
  if (valueSeniorCount === 20) {
    document.querySelector(".senior-plus").setAttribute("disabled", "disabled");
  }

  priceTotal();
});

document.querySelector(".senior-minus").addEventListener("click", () => {
  valueSeniorCount = document.getElementById("senior-quantity").value;
  valueSeniorCount--;
  document.getElementById("senior-quantity").value = valueSeniorCount;
  document.getElementById("form-senior-quantity").value = valueSeniorCount;

  if (valueSeniorCount < 20) {
    document.querySelector(".senior-plus").removeAttribute("disabled");
    document.querySelector(".senior-plus").classList.remove("disabled");
  }
  if (valueSeniorCount === 0) {
    document
      .querySelector(".senior-minus")
      .setAttribute("disabled", "disabled");
  }

  priceTotal();
});

//  basic count
document.querySelector(".form-basic-plus").addEventListener("click", () => {
  valueBasicCount = document.getElementById("basic-quantity").value;
  valueBasicCount++;
  document.getElementById("basic-quantity").value = valueBasicCount;
  document.getElementById("form-basic-quantity").value = valueBasicCount;

  if (valueBasicCount >= 1) {
    document.querySelector(".form-basic-minus").removeAttribute("disabled");
    document.querySelector(".form-basic-minus").classList.remove("disabled");
  }
  if (valueBasicCount === 20) {
    document.querySelector(".basic-plus").setAttribute("disabled", "disabled");
  }

  priceTotal();
});

document.querySelector(".form-basic-minus").addEventListener("click", () => {
  valueBasicCount = document.getElementById("basic-quantity").value;
  valueBasicCount--;
  document.getElementById("basic-quantity").value = valueBasicCount;
  document.getElementById("form-basic-quantity").value = valueBasicCount;

  if (valueBasicCount < 20) {
    document.querySelector(".form-basic-plus").removeAttribute("disabled");
    document.querySelector(".form-basic-plus").classList.remove("disabled");
  }
  if (valueBasicCount === 0) {
    document
      .querySelector(".form-basic-minus")
      .setAttribute("disabled", "disabled");
  }

  priceTotal();
});

// senior count
document.querySelector(".form-senior-plus").addEventListener("click", () => {
  valueSeniorCount = document.getElementById("senior-quantity").value;
  valueSeniorCount++;
  document.getElementById("senior-quantity").value = valueSeniorCount;
  document.getElementById("form-senior-quantity").value = valueSeniorCount;

  if (valueSeniorCount >= 1) {
    document.querySelector(".form-senior-minus").removeAttribute("disabled");
    document.querySelector(".form-senior-minus").classList.remove("disabled");
  }
  if (valueSeniorCount === 20) {
    document
      .querySelector(".form-senior-plus")
      .setAttribute("disabled", "disabled");
  }

  priceTotal();
});

document.querySelector(".form-senior-minus").addEventListener("click", () => {
  valueSeniorCount = document.getElementById("senior-quantity").value;
  valueSeniorCount--;
  document.getElementById("senior-quantity").value = valueSeniorCount;
  document.getElementById("form-senior-quantity").value = valueSeniorCount;

  if (valueSeniorCount < 20) {
    document.querySelector(".form-senior-plus").removeAttribute("disabled");
    document.querySelector(".form-senior-plus").classList.remove("disabled");
  }
  if (valueSeniorCount === 0) {
    document
      .querySelector(".form-senior-minus")
      .setAttribute("disabled", "disabled");
  }

  priceTotal();
});

// form count

// FORM

// validation

const buyerName = document.getElementById("name");
const email = document.getElementById("email");
const tel = document.getElementById("tel");
const form = document.getElementById("form");
const errorName = document.getElementById("error-name");
const errorEmail = document.getElementById("error-email");
const errorTel = document.getElementById("error-tel");

form.addEventListener("submit", (e) => {
  let nameMessages = [];
  let emailMessages = [];
  let telMessages = [];

  const validNameRegEx = /^[a-zA-Zа-яА-Я]+$/;
  const validEmailRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validTelRegEx =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  if (buyerName.value === "" || buyerName == null) {
    nameMessages.push("Name is required");
    errorName.innerText = nameMessages.join(", ");
    errorEmail.style.color = "red";
    buyerName.style.border = "1px solid red";
  } else if (buyerName.value.length <= 3) {
    nameMessages.push("Name must be longer than 3 characters");
    errorName.innerText = nameMessages.join(", ");
    errorEmail.style.color = "red";
    buyerName.style.border = "1px solid red";
  } else if (buyerName.value.length >= 15) {
    nameMessages.push("Name must be shorter than 15 characters");
    errorName.innerText = nameMessages.join(", ");
    errorEmail.style.color = "red";
    buyerName.style.border = "1px solid red";
  } else if (!validNameRegEx.test(buyerName.value)) {
    nameMessages.push("Name can only contain latin and cyrillic letters");
    errorName.innerText = nameMessages;
    errorName.style.color = "red";
    buyerName.style.border = "1px solid red";
  } else {
    nameMessages.push("Success!");
    errorName.innerText = nameMessages;
    errorName.style.color = "green";
    buyerName.style.border = "1px solid green";
  }

  if (email.value === "" || email == null) {
    emailMessages.push("Email is required");
    errorEmail.innerText = emailMessages;
    errorEmail.style.color = "red";
    email.style.border = "1px solid red";
  } else if (!validEmailRegEx.test(email.value)) {
    emailMessages.push("Email is incorrect");
    errorEmail.innerText = emailMessages;
    errorEmail.style.color = "red";
    email.style.border = "1px solid red";
  } else {
    emailMessages.push("Success!");
    errorEmail.innerText = emailMessages;
    errorEmail.style.color = "green";
    email.style.border = "1px solid green";
  }

  if (tel.value === "" || tel == null) {
    telMessages.push("Phone number is required");
    errorTel.innerText = telMessages;
    errorEmail.style.color = "red";
    tel.style.border = "1px solid red";
  } else if (!validTelRegEx.test(tel.value)) {
    telMessages.push("Phone number can only contain numbers");
    errorTel.innerText = telMessages;
    errorTel.style.color = "red";
    tel.style.border = "1px solid red";
  } else {
    telMessages.push("Success!");
    errorTel.innerText = telMessages;
    errorTel.style.color = "green";
    tel.style.border = "1px solid green";
  }
});

// date
$(function () {
  let dtToday = new Date();
  let month = dtToday.getMonth() + 1;
  let day = dtToday.getDate();
  let year = dtToday.getFullYear();

  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();

  let maxDate = year + "-" + month + "-" + day;
  $("#date").attr("min", maxDate);
});

// MAP
mapboxgl.accessToken =
  "pk.eyJ1IjoiZGF2aWxleCIsImEiOiJja3Vtd2Z5dnMwaWhzMzFwMWc3NnIzdHp1In0.yCLnmEAWW8GdbUdtG0dwlA";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/davilex/ckumx4n621ue217o7crvt0zt5",
  center: [2.336411, 48.86146],
  zoom: 16,
});
const marker1 = new mapboxgl.Marker({ color: "#171717" })
  .setLngLat([2.3364, 48.86091])
  .addTo(map);
const marker2 = new mapboxgl.Marker({ color: "#757575" })
  .setLngLat([2.3333, 48.8602])
  .addTo(map);
const marker3 = new mapboxgl.Marker({ color: "#757575" })
  .setLngLat([2.3397, 48.8607])
  .addTo(map);
const marker4 = new mapboxgl.Marker({ color: "#757575" })
  .setLngLat([2.333, 48.8619])
  .addTo(map);
const marker5 = new mapboxgl.Marker({ color: "#757575" })
  .setLngLat([2.3365, 48.8625])
  .addTo(map);
