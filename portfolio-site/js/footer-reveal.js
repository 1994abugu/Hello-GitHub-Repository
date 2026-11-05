(function(){
  var f=document.querySelector('.foot');if(!f)return;
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){f.classList.add('in');return}
  var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){f.classList.add('in');io.disconnect()}},{threshold:.1,rootMargin:'0px 0px -100px 0px'});
  io.observe(f);
})();
