(function(){
  if(!('IntersectionObserver' in window))return;
  var calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  [].slice.call(document.querySelectorAll('.media.seq,.c-media.seq')).forEach(function(m){
    var vs=[].slice.call(m.querySelectorAll('video')),i=0,vis=false;
    vs.forEach(function(v){v.muted=true});
    function show(k){vs.forEach(function(v,j){v.classList.toggle('on',j===k)})}
    function sync(){var v=vs[i];if(vis&&!document.hidden&&!calm){var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()}
    vs.forEach(function(v,k){v.addEventListener('ended',function(){var n=(k+1)%vs.length;vs[n].currentTime=0;i=n;show(n);sync()})});
    new IntersectionObserver(function(es){vis=es[0].isIntersecting;sync()},{threshold:.25}).observe(m);
    document.addEventListener('visibilitychange',sync);
  });
})();
