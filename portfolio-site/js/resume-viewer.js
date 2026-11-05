(function(){
  var a=document.getElementById('resume'),rv=document.getElementById('rv'),x=document.getElementById('rv-x'),last;
  if(!a||!rv)return;
  function open(){last=document.activeElement;rv.hidden=false;requestAnimationFrame(function(){rv.classList.add('open')});document.body.classList.add('rv-lock');x.focus()}
  function close(){rv.classList.remove('open');document.body.classList.remove('rv-lock');setTimeout(function(){rv.hidden=true},250);if(last&&last.focus)last.focus()}
  a.addEventListener('click',function(e){e.preventDefault();open()});
  x.addEventListener('click',close);
  rv.addEventListener('click',function(e){if(e.target===rv)close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!rv.hidden)close()});
})();
