(function(){
  var vs=[].slice.call(document.querySelectorAll('.media:not(.seq) video'));if(!vs.length||!('IntersectionObserver' in window))return;
  var calm=matchMedia('(prefers-reduced-motion: reduce)').matches,vis=new Map();
  vs.forEach(function(v){v.muted=true;vis.set(v,false)});
  function sync(){vs.forEach(function(v){var on=vis.get(v)&&!document.hidden&&!calm;if(on){var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){vis.set(e.target,e.isIntersecting)});sync()},{threshold:.25});
  vs.forEach(function(v){io.observe(v)});
  document.addEventListener('visibilitychange',sync);
})();
