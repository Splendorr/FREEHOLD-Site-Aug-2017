'use strict';

document.addEventListener('DOMContentLoaded', function () {
  initSwipebox();
  // initScrollLinks();
  createMoveTo();
  setCurrentCopyrightYear();

  // var anchorLinks = document.getElementsByTagName("nav")[0];
  // console.log(anchorLinks);

  // if (window.scrollTo) {
  //   console.log('yes window.scrollTo');

  //   anchorLinks.addEventListener("click",
  //     function (e) {
  //       let dest = document.getElementById(e.target.href.split("#")[1]);
  //       // window.scroll({ top: dest.offsetTop, behavior: 'smooth' });
  //       window.scroll(0, dest.offsetTop);

  //     });
  // }

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

function createMoveTo() {
  var moveTo = new MoveTo({
    tolerance: 0,
    duration: 800,
    easing: 'easeOutQuart'
  });
  var trigger = document.getElementsByClassName('js-trigger')[0];

  moveTo.registerTrigger(trigger);
};

// function initScrollLinks() {
//   var anchorLinks = document.getElementsByTagName("nav")[0];
//   if (window.scrollTo) {
//     anchorLinks.addEventListener("click",
//       function (e) {
//         dest = document.getElementById(e.target.href.split("#")[1]);
//         window.scroll({ top: dest.offsetTop, behavior: 'smooth' });
//       });
//   }
// }