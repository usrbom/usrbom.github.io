
function getDate(str){
	let date = str.substr(0,10)
	let arr = date.split("-")
	let temp = arr[0]
	arr[0] = arr[2];
	arr[2] = temp;
	return arr.join("/")  
}

var parallaxElements = $('.myImage'), parallaxQuantity = parallaxElements.length

$(window).on('scroll', function() {
  window.requestAnimationFrame(function() {
    for (var i = 0; i < parallaxQuantity; i++) {
      var currentElement = parallaxElements.eq(i)
      var scrolled = $(window).scrollTop()

      currentElement.css({
        transform: 'translate3d(0,' + scrolled * -0.3 + 'px, 0)',
      })
    }
  })
})

