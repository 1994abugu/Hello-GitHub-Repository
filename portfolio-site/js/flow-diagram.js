(function(){
  var fl=document.getElementById('flow');if(!fl)return;
  if(!('IntersectionObserver' in window)){fl.classList.add('in');return}
  var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){fl.classList.add('in');io.disconnect()}},{threshold:.15});
  io.observe(fl);
})();
