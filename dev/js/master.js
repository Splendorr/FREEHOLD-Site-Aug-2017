document.addEventListener('DOMContentLoaded', function () {
  initSwipebox();
  createMoveTo();
  touchDetect();
  blurLinks();
  setCurrentCopyrightYear();
  animateLogo();
  console.log('loaded');
}); // End DOMContentLoaded / onready

window.addEventListener("load", function (event) {
  
  console.log("All resources finished loading!");

});

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

  document.addEventListener('touchstart', addtouchclass, false); // this event only gets called when input type is touch
  document.addEventListener('mouseover', removetouchclass, false); // this event gets called when input type is everything from touch to mouse/ trackpad
};

// let logoVivus;

let logoTimeline; 

function animateLogo() {
  // logoVivus = new Vivus('freehold-logo', { duration: 100 });
  // logoVivus.play();
  logoTimeline = anime.timeline({
    // delay: 3000
  });

  logoTimeline
    // .add({
    //   targets: '#freehold-outlines',
    //   duration: 10,
    //   opacity: 1,
    //   offset: 0
    // })
    // .add({
    //   targets: '#freehold-mark-outline path, #freehold-mark-outline polygon, #freehold-text-outline path, #freehold-text-outline polygon, #freehold-games-outline path, #freehold-games-outline polygon',
    //   strokeDashoffset: [anime.setDashoffset, 0],
    //   // strokeDashoffset: function (el) {
    //   //   return [el.getAttribute('stroke-dasharray'), 0];
    //   // },
    //   easing: 'easeInOutSine',
    //   duration: 900,
    //   delay: function(el, i) {
    //     return i * 100;
    //   },
    //   offset: 500
    // })
    .add({
      targets: '#freehold-text',
      duration: 10,
      opacity: 1,
      // offset: '+=300'
      offset: 100
    })
    .add({
      targets: '#castle_1_',
      duration: 750,
      scale: [3, 1],
      // easing: 'easeInSine',
      elasticity: 200,
      offset: 1000
    })
    .add({
      targets: '#flame-bottom_1_, #flame-top_1_',
      duration: 500,
      // opacity: { value: 1, duration: 250 },
      delay: function(el, i) {
        return i * 150;
      },
      opacity: 1,
      scaleX: [0, 1],
      offset: '-=400'
      // loop: true
    })
    .add({
      targets: '#freehold-text path, #freehold-text polygon',
      // easing: 'easeInOutElastic',
      elasticity: 10,
      duration: 750,
      delay: function(el, i) {
        return i * 50;
      },
      // opacity: [0, 1],
      // translateY: [200, 0],
      scaleX: [0, 1],
      offset: '-=800'
      // offset: 700
    })
    .add({
      targets: '#freehold-games',
      // easing: 'easeInOutSine',
      elasticity: 10,
      opacity: {value: 1, duration: 10},
      // translateY: [200, 0],
      scaleX: [0, 1],
      duration: 700,
      offset: '-=750',
      complete: function (anim) {
        console.log(anim.completed);
        flameRepeat();
      }
    })
    // .add({
      //   targets: '#freehold-outlines',
      //   opacity: 0,
      //   duration: 1000
      //   // offset: '-=250'
      // })
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
    
function flameRepeat() {
  let flames = anime({
    targets: '#flame-bottom_1_, #flame-top_1_',
    duration: 1500,
    // opacity: { value: 1, duration: 250 },
    delay: function(el, i) {
      return i * 250;
    },
    easing: 'easeInOutSine',
    // elasticity: 500,
    scaleX: 1.15,
    scaleY: {value: 1.05, duration: 1000},
    direction: 'alternate',
    loop: true
  });
};

// function removeClass(elem, cl) {
//   let id = document.getElementById(elem);id.classList.remove(cl);
// };