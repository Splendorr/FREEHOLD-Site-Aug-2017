'use strict';

document.addEventListener('DOMContentLoaded', function () {
  initSwipebox();
  setCurrentCopyrightYear();
  console.log('loaded');
}); // End DOMContentLoaded / onready

// window.addEventListener("load", function (event) {

//   console.log("All resources finished loading!");

// });

function setCurrentCopyrightYear() {
  var currentDate = new Date().getFullYear().toString();
  var dateElement = document.getElementById('currentYear');
  console.log('currentDate:', currentDate, 'dateElement:', dateElement);

  dateElement.textContent = currentDate;
}

// Swipebox Lightbox

function initSwipebox() {
  if ($('.swipebox').length) {
    $('.swipebox').swipebox({
      videoMaxWidth: 1920,
      loopAtEnd: true
    });
    // console.log('loaded .swipebox swipebox');
  }
}