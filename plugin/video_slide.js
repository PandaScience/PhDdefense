// video slide handling fns
function findVideo(cslide, tstart) {
	if(cslide.classList.contains("manim-slide")){
		vidobj=cslide.slideBackgroundElement.getElementsByTagName('video')[0]
	}
	else if(cslide.classList.contains("manim-video")) {
		// search backwards for latest video
		vdiv = event.fragment.previousElementSibling
		while (! vdiv.classList.contains("videoblock")) {
			vdiv = vdiv.previousElementSibling
		}
		vidobj = vdiv.getElementsByTagName('video')[0]
	}
	return vidobj
}


Reveal.addEventListener( 'fragmentshown', function( event ) {
  // event.fragment = the fragment DOM element
  if(event.fragment.getAttribute('type')=='video'){
      var time_start = event.fragment.getAttribute('time_start');
      var time_end = event.fragment.getAttribute('time_end');

      cslide=Reveal.getCurrentSlide();
      vidobj = findVideo(cslide, time_start)
      vidobj.ontimeupdate = function(){}
      vidobj.currentTime = time_start
      vidobj.play()
      vidobj.ontimeupdate = function(){

            if(vidobj.currentTime-time_end>0){
              console.log(vidobj.currentTime-time_end)
              //while(vidobj.currentTime<time_end);
              vidobj.pause();
              vidobj.currentTime = time_end
              vidobj.ontimeupdate = function(){};
            }
          }

      console.log(time_start+"->"+time_end);
  }

} );


Reveal.addEventListener( 'fragmenthidden', function( event ) {
  if(event.fragment.getAttribute('type')=='video'){
      var time_start = event.fragment.getAttribute('time_start');
      var time_end = event.fragment.getAttribute('time_end');

      cslide=Reveal.getCurrentSlide();
      // vidobj=cslide.slideBackgroundElement.getElementsByTagName('video')[0]
      vidobj = findVideo(cslide)
      vidobj.currentTime = time_start
      vidobj.pause()
      console.log(time_start);
  }

} );


Reveal.addEventListener( 'slidechanged', function( event ) {
      // if(event.currentSlide.getAttribute("type") == "videoslide"){
      // if(event.currentSlide.hasAttribute("data-background-video")){
      if(event.currentSlide.classList.contains("manim-slide")){
        console.log("videoslide");
        vidobj=event.currentSlide.slideBackgroundContentElement.getElementsByTagName('video')[0]
        Reveal.navigateFragment( -1, 0 )
        Reveal.next()
        console.log(event)
      }
} );
