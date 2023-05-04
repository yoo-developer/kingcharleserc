let reveals = document.querySelectorAll('.animate_typing')
let vintage_bg = document.querySelectorAll('.card')
let phases = document.querySelectorAll('.phase')
let scripts = document.querySelectorAll('script')
let scroll_image = document.getElementById('scroll_image')
var scroll = 0
function Utils() {

}
Utils.prototype = {
    constructor: Utils,
    isElementInView: function (element, fullyInView) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
};
var Utils = new Utils();

function reveal() {
    for (var i = 0; i < reveals.length; i++) {
        var isElementInView = Utils.isElementInView($(reveals[i]),true);
        if (isElementInView) {
            reveals[i].style.opacity = 1
            reveals[i].style.transform = 'Translate(0%)'
            reveals[i].style.filter = 'none'
        }
      } 
    }


window.addEventListener("scroll",  reveal)
   
for ( let i = 0 ; i < vintage_bg.length ; i++ ){
    vintage_bg[i].style.backgroundPositionX = (i * 25).toString() + '%'
}
let zoom =0;
const ZOOM_SPEED = 0.2;
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
document.getElementById("scroll_image_container").addEventListener("wheel", function (e) {
  if (e.deltaY > 0) {
    zoom = clamp(zoom , 0 , 3)
    zoom += ZOOM_SPEED
    if(zoom > 1){console.log("wow")}
   scroll_image.style.transform = `scale(${clamp(zoom , 0 , 3)})`;
  } else {
    zoom = clamp(zoom , 0 , 3)
    zoom -= ZOOM_SPEED
    scroll_image.style.transform = `scale(${clamp(zoom , 0 , 3)})`;
  }
});