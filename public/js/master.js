'use strict';

// let activeTargetFrame = false;
// let startTimeElapsed = false;
// let movedYet = false;
var shouldParticles = true;
var shouldRipples = true;

var target = document.querySelector('#targetFrame');
var parallaxWrapInner = document.querySelector('.parallax-wrap-inner');
var scene = document.getElementById('scene');
var grainDiv = document.getElementById('shc-grain');

document.addEventListener('DOMContentLoaded', function () {

  // RESIZE iOS Safari window height
  var flexContainer = document.querySelector('.flexContainer');
  (function () {
    var setViewportHeight = function () {
      function debounced() {
        flexContainer.style.height = window.innerHeight + "px";
        if (document.body.scrollTop !== 0) {
          window.scrollTo(0, 0);
        }
      }
      var cancelable = null;

      return function () {
        cancelable && clearTimeout(cancelable);
        cancelable = setTimeout(debounced, 100);
      };
    }();

    // ipad safari
    // if (/iPad|iPhone/.test(navigator.platform) && /Safari/i.test(navigator.userAgent)) {

    if (/iPad|iPhone|Android/.test(navigator.platform)) {
      window.addEventListener("resize", setViewportHeight, false);
      window.addEventListener("scroll", setViewportHeight, false);
      window.addEventListener("orientationchange", setViewportHeight, false);
      setViewportHeight();
    }
  })();

  function addEvent(obj, evt, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(evt, fn, false);
    } else if (obj.attachEvent) {
      obj.attachEvent("on" + evt, fn);
    }
  }

  addEvent(document, "mouseout", function (e) {
    e = e ? e : window.event;
    var from = e.relatedTarget || e.toElement;
    if (!from || from.nodeName == "HTML") {
      // console.log('out of the window');
      anime({
        autoplay: true,
        loop: false,
        targets: parallax,
        inputX: 0,
        inputY: 0,
        duration: 750,
        easing: 'easeOutQuad',
        elasticity: 0
      });
    }
  });

  // console.log(navigator.appVersion);


  // !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i)
  // if (!navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
  if (!navigator.userAgent.match(/(iPad|Firefox|Windows NT)/i)) {
    // console.log('matched: not ipad or firefox');
    shouldParticles = true;

    // grainDiv.classList.add('doGrain');
    var parallax = new Parallax(scene, {
      calibrateX: true,
      calibrateY: true,
      invertX: true,
      invertY: true,
      scalarX: 100,
      scalarY: 100,
      pointerEvents: true
    });
    if (parallax.desktop) {
      parallax.invert(true, true);
    } else {
      parallax.invert(false, false);
    }
  } else {
    console.log('matched: ipad|firefox|windows nt');
    scene.classList.add('parallax-off');
    parallaxWrapInner.classList.add('firefoxPerspective');

    var trailerLinkDiv = document.querySelector('.trailerLink');
    var trailerPlayerDiv = document.querySelector('#myvideo');
    var trailerYT = trailerPlayerDiv.getAttribute('data-youtube-id');
    // console.log(trailerYT);
    trailerLinkDiv.addEventListener('click', function (event) {
      // console.log('tapped frameLauncher touchend');
      event.preventDefault();
      // this.click();
      window.location = "https://www.youtube.com/watch?v=" + trailerYT;
    });
  };

  // if (navigator.userAgent.match(/(Firefox)/i)) {
  //   console.log('matched: firefox');
  //   parallaxWrapInner.classList.add('firefoxPerspective');
  // };

  // function iOSversion() {
  //   if (window.MSStream) {
  //     // There is some iOS in Windows Phone...
  //     // https://msdn.microsoft.com/en-us/library/hh869301(v=vs.85).aspx
  //     return false;
  //   }
  //   var match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
  //     version;

  //   console.log('match:', match);


  //   if (match !== undefined && match !== null) {
  //     version = [
  //       parseInt(match[1], 10),
  //       parseInt(match[2], 10),
  //       parseInt(match[3] || 0, 10)
  //     ];
  //     return parseFloat(version.join('.'));
  //   }
  //   return false;
  // }


  if (navigator.userAgent.match(/(iPad)/i)) {
    console.log('matched: iPad');
    // let ver = iOSversion();
    // if (ver < 10) {
    //   console.log('ver', ver, 'is < iOS 9.');
    //   shouldParticles = false;
    // }
    grainDiv.classList.remove('doGrain');
    shouldParticles = false;
    shouldRipples = false;

    // trailerLinkDiv.classList.remove('afterglow');
    // trailerLinkDiv.setAttribute("href", "https://www.youtube.com/watch?v=" + trailerYT);
    // trailerLinkDiv.setAttribute("target", "_blank");
    // trailerLinkDiv.onclick = '';
  };

  var frameLauncher = document.querySelector('.titleArt');
  if (!navigator.userAgent.match(/(Firefox)/i)) {

    frameLauncher.addEventListener('click', function (event) {
      // console.log('tapped frameLauncher');
      tapLaunch();
    });
    frameLauncher.addEventListener('touchend', function (event) {
      // console.log('tapped frameLauncher touchend');
      event.preventDefault();
      this.click();
    });
  };

  function tapLaunch() {
    // addRipple();
    anime({
      autoplay: true,
      loop: false,
      targets: frameLauncher,
      scale: [{ value: 1, duration: 1 }, { value: .95, duration: 1 }, { value: 1, duration: 220 }],
      duration: 220,
      easing: 'easeInQuad',
      elasticity: 100
    });
  }
}); // End DOMContentLoaded / onready

window.addEventListener("load", function (event) {

  // console.log("All resources finished loading!");

  setTimeout(function () {
    lightUpPopAndFlicker.play();
    // startRipples();
    if (shouldParticles) {
      dustToAnimate.forEach(animateDust);
    }
  }, 2000);
});

var lightUpPopAndFlicker = anime.timeline({
  loop: false,
  autoplay: false
});
lightUpPopAndFlicker.add({
  targets: '.inner.lightUpFrame > .shc-frame',
  scaleY: [{ value: 1.04, duration: 100 }, { value: 1, duration: 1 }],
  scaleX: [{ value: 1.04, duration: 100, delay: 75 }, { value: 1, duration: 1 }],
  easing: 'easeOutQuad',
  // offset: 0,
  elasticity: 100
}).add({
  targets: '.inner.lightUpFrame > .shc-frame',
  opacity: [{ value: 0, duration: 1 }, { value: 0, duration: 100 }, { value: 1, duration: 1 }, { value: 1, duration: 100 }, { value: 0, duration: 1 }, { value: 0, duration: 100 }, { value: 1, duration: 1 }, { value: 1, duration: 50 }],
  offset: '+=100',
  complete: function complete() {
    target.classList.add('centeredTarget');
    if (shouldRipples) {
      startRipples();
    }
  }
});

function startRipples() {

  animRipple1.seek(0);
  animRipple1.pause();
  animRipple2.seek(0);
  animRipple2.pause();
  animRipple3.seek(0);
  animRipple3.pause();

  animRipple1.play();
}

// function stopRipples() {
//   animRipple1.seek(0);
//   animRipple1.pause();
//   animRipple2.seek(0);
//   animRipple2.pause();
//   animRipple3.seek(0);
//   animRipple3.pause();
// }

var rippleDepthBase = '-833px';
var rippleDepthMax = '-2000px';
// let ripplesEl = document.querySelector('.ripples');
// let baseRipple = document.querySelector('.ripple.z1');
// let maxRipples = 4;
// let ripplesLaunched = 0;
// let rippleDuration = 3000;

var animRipple1 = anime({
  loop: false,
  autoplay: false,
  targets: '.ripple.z1',
  translateZ: [rippleDepthBase, rippleDepthMax],
  opacity: [{ value: 0, duration: 100 }, { value: 1, duration: 200 }, { value: 1, duration: 2000 }, { value: 0, duration: 700 }],
  duration: 3000,
  // delay: 0,
  easing: 'linear',
  begin: function begin() {
    setTimeout(function () {
      animRipple2.restart();
      animRipple2.play();
    }, 1050);
  }
});

var animRipple2 = anime({
  loop: false,
  autoplay: false,
  targets: '.ripple.z2',
  translateZ: [rippleDepthBase, rippleDepthMax],
  opacity: [{ value: 0, duration: 100 }, { value: 1, duration: 200 }, { value: 1, duration: 2000 }, { value: 0, duration: 700 }],
  duration: 3000,
  // delay: 750,
  easing: 'linear',
  begin: function begin() {
    setTimeout(function () {
      animRipple3.restart();
      animRipple3.play();
    }, 1050);
  }
});
var animRipple3 = anime({
  loop: false,
  autoplay: false,
  targets: '.ripple.z3',
  translateZ: [rippleDepthBase, rippleDepthMax],
  opacity: [{ value: 0, duration: 100 }, { value: 1, duration: 200 }, { value: 1, duration: 2000 }, { value: 0, duration: 700 }],
  duration: 3000,
  // delay: 1500,
  easing: 'linear',
  begin: function begin() {
    setTimeout(function () {
      animRipple1.restart();
      animRipple1.play();
    }, 1050);
  }
});

var dustTarget = document.querySelector('.dust');
var maxDustElements = 50;
var dustDuration = 8000;
var dustToAnimate = [];
var radius = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
// var distance = radius / 4 <= 150 ? 150 : radius / 4;
// var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

var createElements = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < maxDustElements; i++) {
    var el = document.createElement('div');
    el.classList.add('dustParticule');
    var size = anime.random(1, 4);

    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.top = anime.random(0, 100) + '%';
    el.style.left = anime.random(0, 100) + '%';
    dustToAnimate.push(el);
    fragment.appendChild(el);
  }
  dustTarget.appendChild(fragment);
}();

var animateDust = function animateDust(el, i) {
  var thisDuration = anime.random(dustDuration, dustDuration * 1.4);
  anime({
    targets: el,
    translateZ: ['-5000px', '5000px'],
    offset: dustDuration / maxDustElements * i,
    opacity: [{ value: 0, duration: thisDuration * .10 }, { value: 1, duration: thisDuration * .15 }, { value: 1, duration: thisDuration * .50 }, { value: 0, duration: thisDuration * .05 }, { value: 0, duration: thisDuration * .20 }],
    duration: thisDuration,
    easing: 'easeInQuad',
    loop: true
  });
};