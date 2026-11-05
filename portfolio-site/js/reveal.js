(function(){
  var els=[].slice.call(document.querySelectorAll('.avatar,h1,.cta,.also,main ul,h2,.project,.more-row,.sec-head,.chips,.photo,.about-copy,.c-shot,.dock'));
  els.forEach(function(e,i){e.classList.add('reveal');if(i<5)e.style.setProperty('--d',(0.15+i*0.1)+'s')});
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12,rootMargin:'0px 0px -5% 0px'});
  els.forEach(function(e){io.observe(e)});
})();
