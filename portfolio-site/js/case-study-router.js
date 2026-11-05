(function(){
  var root=document.documentElement,v=document.querySelector('#case video'),src=document.querySelector('.project .media video'),y=0;
  var calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(v){v.muted=true;if(src&&src.poster)v.poster=src.poster}
  function play(){}
  function route(){
    var h=location.hash.slice(1),on=root.classList.contains('is-case');
    if(h==='orderific'){
      if(!on){y=window.scrollY;root.classList.add('is-case');window.scrollTo({top:0,behavior:'instant'})}
      play();
    }else if(on){
      root.classList.remove('is-case');
      if(h==='about'||h==='contact'){requestAnimationFrame(function(){var el=document.getElementById(h);if(el)el.scrollIntoView()})}
      else window.scrollTo({top:y,behavior:'instant'});
    }
  }
  window.addEventListener('hashchange',route);
  
  var br=document.querySelector('.brand');if(br)br.addEventListener('click',function(){if(location.hash)location.hash=''});
  route();
})();
