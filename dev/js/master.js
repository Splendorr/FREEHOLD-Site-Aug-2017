document.addEventListener('DOMContentLoaded', function () {
  setCurrentCopyrightYear();
  console.log('loaded');
  
}); // End DOMContentLoaded / onready

// window.addEventListener("load", function (event) {

//   console.log("All resources finished loading!");

// });

function setCurrentCopyrightYear() {
  let currentDate = new Date().getFullYear().toString();
  let dateElement = document.getElementById('currentYear');
  console.log('currentDate:', currentDate, 'dateElement:', dateElement);
  
  dateElement.textContent = currentDate;
}
