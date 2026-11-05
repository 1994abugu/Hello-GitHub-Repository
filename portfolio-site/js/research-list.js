(function(){
  var l=document.getElementById('ur-list');if(!l)return;
  if(!('IntersectionObserver' in window)){l.classList.add('in');return}
  var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){l.classList.add('in');io.disconnect()}},{threshold:.2});
  io.observe(l);
})();
