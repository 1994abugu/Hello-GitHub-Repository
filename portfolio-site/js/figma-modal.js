(function(){
  var m=document.getElementById('figma-modal'),btn=document.getElementById('figma-link'),x=document.getElementById('fm-x'),last;
  if(!m||!btn)return;
  var lg=m.querySelector('.fm-logo'),ic=btn.querySelector('img');if(lg&&ic)lg.src=ic.src;
  function open(){last=document.activeElement;m.hidden=false;requestAnimationFrame(function(){m.classList.add('open')});document.body.classList.add('rv-lock');x.focus()}
  function close(){m.classList.remove('open');document.body.classList.remove('rv-lock');setTimeout(function(){m.hidden=true},260);if(last&&last.focus)last.focus()}
  btn.addEventListener('click',function(e){e.preventDefault();open()});
  x.addEventListener('click',close);
  m.addEventListener('click',function(e){if(e.target===m)close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!m.hidden)close()});
  // placeholder links should never send the visitor back home
  [].slice.call(document.querySelectorAll('.fm-row[href="#"],.c-links a[href="#"]')).forEach(function(a){a.addEventListener('click',function(e){e.preventDefault()})});
})();
