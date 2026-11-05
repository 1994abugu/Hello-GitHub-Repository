(function(){
  var h=document.querySelector('h2'),r=h&&h.querySelector('.rotor');
  if(!r||!r.animate||!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var seq=['Selected Work','Shipped Products','Case Studies','Things I\u2019ve Built','Recent Projects'],i=0,timer=null,busy=false,seen=false;
  var OUT=[{opacity:1,transform:'none',filter:'blur(0)'},{opacity:0,transform:'translateY(-70%)',filter:'blur(3px)'}];
  var IN=[{opacity:0,transform:'translateY(70%)',filter:'blur(3px)'},{opacity:1,transform:'none',filter:'blur(0)'}];
  function next(){
    if(busy)return;busy=true;i=(i+1)%seq.length;
    r.animate(OUT,{duration:170,easing:'ease-in',fill:'forwards'}).onfinish=function(){
      r.textContent=seq[i];
      r.animate(IN,{duration:280,easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'}).onfinish=function(){r.getAnimations().forEach(function(a){a.cancel()});busy=false};
    };
  }
  function sync(){var on=seen&&!document.hidden;if(on&&!timer)timer=setInterval(next,3000);if(!on&&timer){clearInterval(timer);timer=null}}
  new IntersectionObserver(function(es){seen=es[0].isIntersecting;sync()},{threshold:.5}).observe(h);
  document.addEventListener('visibilitychange',sync);
})();
