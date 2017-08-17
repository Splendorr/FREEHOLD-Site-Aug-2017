'use strict';

document.addEventListener('DOMContentLoaded', function () {
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