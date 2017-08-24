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
  // logoVivus = new Vivus('freehold-logo', { duration: 100 });
  // logoVivus.play();
  let logoTimeline = anime.timeline();

  logoTimeline
    .add({
      targets: '#freehold-outlines',
      duration: 10,
      opacity: 1,
      offset: 0
    })
    .add({
      targets: '#freehold-mark-outline path, #freehold-mark-outline polygon, #freehold-text-outline path, #freehold-text-outline polygon, #freehold-games-outline path, #freehold-games-outline polygon',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 900,
      delay: function (el, i) { return i * 100 },
      offset: 500
    })
    .add({
      targets: '#freehold-mark, #freehold-text, #freehold-games',
      easing: 'easeInOutSine',
      duration: 500,
      delay: function (el, i) {
        return i * 100;
      },
      opacity: [0, 1],
      offset: '-=500'
    })
    .add({
      targets: '#freehold-outlines',
      opacity: 0,
      duration: 1000
      // offset: '-=250'
    })
  ;

  // let lineDrawing = anime({
  //   targets: '#freehold-logo path, #freehold-logo polygon',
  //   strokeDashoffset: [anime.setDashoffset, 0],
  //   easing: 'easeInOutSine',
  //   duration: 1500,
  //   delay: function (el, i) { return i * 250 },
  //   // direction: 'alternate',
  //   // loop: true
  //   complete: function(anim) {
  //     console.log('animation completed');
      
  //     removeClass('freehold-logo', 'no-fill');
  //   }
  // });
}

function removeClass(elem, cl) {
  let id = document.getElementById(elem);id.classList.remove(cl);
};