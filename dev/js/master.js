document.addEventListener('DOMContentLoaded', function () {
  initSwipebox();
  createMoveTo();
  touchDetect();
  blurLinks();
  setCurrentCopyrightYear();
  animateLogo();
  console.log('loaded');
}); // End DOMContentLoaded / onready

// window.addEventListener("load", function (event) {

//   console.log("All resources finished loading!");

// });

let logoID = document.getElementById('freehold-logo');
console.log(logoID);
logoID.classList.add('no-fill');

function setCurrentCopyrightYear() {
  let currentDate = new Date().getFullYear().toString();
  let dateElement = document.getElementById('currentYear');
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
  const moveTo = new MoveTo({
    tolerance: 0,
    duration: 800,
    easing: 'easeOutQuart'
  });
  const triggers = document.getElementsByClassName('js-trigger');
  // console.log('triggers', triggers);
  
  for (var index = 0; index < triggers.length; index++) {
    var element = triggers[index];
    moveTo.registerTrigger(element);
    // console.log('registered', element);
    
  }
};

function blurLinks() {
  let links = document.getElementsByTagName("a");
  for (var index = 0; index < links.length; index++) {
    var element = links[index];
    element.addEventListener("click", function () { this.blur(); }, false);
    // element.addEventListener("touchend", function () { this.blur(); }, false);
    // console.log('registered', element);

  }
}

function touchDetect() {
  var isTouch = false //var to indicate current input type (is touch versus no touch) 
  var isTouchTimer
  var curRootClass = '' //var indicating current document root class ("can-touch" or "")

  function addtouchclass(e) {
    clearTimeout(isTouchTimer)
    isTouch = true
    if (curRootClass != 'can-touch') { //add "can-touch' class if it's not already present
      curRootClass = 'can-touch'
      document.documentElement.classList.add(curRootClass)
    }
    isTouchTimer = setTimeout(function () { isTouch = false }, 1000) //maintain "istouch" state for 500ms so removetouchclass doesn't get fired immediately following a touch event
  }

  function removetouchclass(e) {
    if (!isTouch && curRootClass == 'can-touch') { //remove 'can-touch' class if not triggered by a touch event and class is present
      isTouch = false
      curRootClass = ''
      document.documentElement.classList.remove('can-touch')
    }
  }

  document.addEventListener('touchstart', addtouchclass, false) //this event only gets called when input type is touch
  document.addEventListener('mouseover', removetouchclass, false) //this event gets called when input type is everything from touch to mouse/ trackpad
};

let logoVivus;

function animateLogo(params) {
  logoVivus = new Vivus('freehold-logo', { duration: 100 });
  logoVivus.play();
}

// function removeClass(elem, class) {
//   document.getElementById(elem).classList.remove(class);
// }