'use strict';

document.addEventListener('DOMContentLoaded', function () {
  initSwipebox();
  // initScrollLinks();
  createMoveTo();
  touchDetect();
  blurLinks();
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
  // const trigger = document.getElementsByClassName('js-trigger')[0];
  // moveTo.registerTrigger(trigger);
  var triggers = document.getElementsByClassName('js-trigger');
  // console.log('triggers', triggers);

  for (var index = 0; index < triggers.length; index++) {
    var element = triggers[index];
    moveTo.registerTrigger(element);
    // console.log('registered', element);
  }

  // triggers.forEach(function(e) {
  //   moveTo.registerTrigger(e);
  //   console.log('registered', this);

  // }, this);
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

function blurLinks() {
  var links = document.getElementsByTagName("a");
  for (var index = 0; index < links.length; index++) {
    var element = links[index];
    element.addEventListener("click", function () {
      this.blur();
    }, false);
    // element.addEventListener("touchend", function () { this.blur(); }, false);
    // console.log('registered', element);
  }
}

function touchDetect() {
  var isTouch = false; //var to indicate current input type (is touch versus no touch) 
  var isTouchTimer;
  var curRootClass = ''; //var indicating current document root class ("can-touch" or "")

  function addtouchclass(e) {
    clearTimeout(isTouchTimer);
    isTouch = true;
    if (curRootClass != 'can-touch') {
      //add "can-touch' class if it's not already present
      curRootClass = 'can-touch';
      document.documentElement.classList.add(curRootClass);
    }
    isTouchTimer = setTimeout(function () {
      isTouch = false;
    }, 1000); //maintain "istouch" state for 500ms so removetouchclass doesn't get fired immediately following a touch event
  }

  function removetouchclass(e) {
    if (!isTouch && curRootClass == 'can-touch') {
      //remove 'can-touch' class if not triggered by a touch event and class is present
      isTouch = false;
      curRootClass = '';
      document.documentElement.classList.remove('can-touch');
    }
  }

  document.addEventListener('touchstart', addtouchclass, false); //this event only gets called when input type is touch
  document.addEventListener('mouseover', removetouchclass, false); //this event gets called when input type is everything from touch to mouse/ trackpad
};