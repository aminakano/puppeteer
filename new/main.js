function smoothScroll(target, duration){
  var target = document.querySelector(target);
  var targetPosition = target.getBoundingClientRect().top;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation (currentTime){
    if(startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if(timeElapsed < duration) requestAnimationFrame(animation);
  }
  function ease (t, b, c, d) {
  	t /= d/2;
  	if (t < 1) return c/2*t*t + b;
  	t--;
  	return -c/2 * (t*(t-2) - 1) + b;
  };
  requestAnimationFrame(animation);
}

function clickEvent(param, jumpTo){
  param.addEventListener('click', function(){
    smoothScroll(jumpTo,1000)
  })
}
var scrollToAbout = document.getElementById('scrollToAbout');
var scrollToSkills = document.getElementById('scrollToSkills');
var scrollToWork = document.getElementById('scrollToWork');
var scrollToContact = document.getElementById('scrollToContact');
var scrollUp = document.getElementById('scroll-up');
var scrollDown = document.getElementById('scroll-down');
clickEvent(scrollToAbout, '.top-text')
clickEvent(scrollToSkills, '.skills');
clickEvent(scrollToWork, '.work');
clickEvent(scrollToContact, '.contact');
clickEvent(scrollUp, '.top');
clickEvent(scrollDown, '.top-text');
