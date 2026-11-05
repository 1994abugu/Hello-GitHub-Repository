(function(){
  var wraps=[].slice.call(document.querySelectorAll('.c-annot'));if(!wraps.length)return;
  function closeAll(){wraps.forEach(function(w){[].slice.call(w.querySelectorAll('.an')).forEach(function(d){d.setAttribute('aria-expanded','false')});w.classList.remove('open')})}
  wraps.forEach(function(w){
    var dots=[].slice.call(w.querySelectorAll('.an'));
    dots.forEach(function(d){
      var x=parseFloat(d.style.left),y=parseFloat(d.style.top);
      d.classList.add(x<28?'h-l':(x>72?'h-r':'h-c'),y>64?'v-up':'v-dn');
      d.addEventListener('click',function(e){e.stopPropagation();var was=d.getAttribute('aria-expanded')==='true';closeAll();if(!was){d.setAttribute('aria-expanded','true');d.classList.add('seen');w.classList.add('open')}});
    });
    w.addEventListener('click',closeAll);
    if(!('IntersectionObserver' in window)){w.classList.add('ready');return}
    var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){w.classList.add('ready');io.disconnect()}},{threshold:.35});
    io.observe(w);
  });
  document.addEventListener('click',function(e){if(!e.target.closest||!e.target.closest('.c-annot'))closeAll()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAll()});
})();
