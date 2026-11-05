/* Wave Mesh: dotted field rolling to the horizon; pointer lifts a hill, click throws a ring */
(function(){
  var canvas=document.getElementById('mesh');if(!canvas||!canvas.getContext)return;
  var ctx=canvas.getContext('2d');if(!ctx)return;
  var CAM=.62,NEAR=.35,FAR=3.4;
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse=!matchMedia('(hover: hover) and (pointer: fine)').matches;
  var dpr=Math.min(window.devicePixelRatio||1,2);
  var dot='201,214,234',accent='45,102,224',crests=false;
  var W=0,H=0,cols=0,rows=0,f=0,hz=0,raf=0,last=0,t0=performance.now();
  var ptr={x:0,z:1.4,s:0,tx:0,tz:1.4,ts:0},rings=[];
  function resize(){
    var w=canvas.clientWidth,h=canvas.clientHeight;if(w===W&&h===H)return;
    W=w;H=h;canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    f=Math.max(W,H*1.2)*.55;hz=H*.3;
    cols=Math.round(Math.min(150,Math.max(56,W/9)));rows=Math.round(Math.min(90,Math.max(48,H/9.5)));
  }
  function half(){return (W/2/f)*FAR*1.05}
  function height(x,z,t){
    var y=.085*Math.sin(x*2.2+t*.7)+.07*Math.sin(z*2.9-t*.9+x*.8)+.03*Math.sin((x+z)*6.1+t*1.6);
    if(ptr.s>.01){var d2=(x-ptr.x)*(x-ptr.x)+(z-ptr.z)*(z-ptr.z);y+=.24*ptr.s*Math.exp(-d2/.07)}
    for(var k=0;k<rings.length;k++){
      var r=rings[k],age=t-r.t,d=Math.hypot(x-r.x,z-r.z),fr=age*1.15,q=d-fr;
      y+=.2*Math.exp(-(q*q)/.014)*Math.exp(-age*.75);
    }
    return y;
  }
  function frame(t){
    ctx.clearRect(0,0,W,H);
    ptr.x+=(ptr.tx-ptr.x)*.1;ptr.z+=(ptr.tz-ptr.z)*.1;ptr.s+=(ptr.ts-ptr.s)*.06;
    while(rings.length&&t-rings[0].t>5)rings.shift();
    var hw=half(),hot=[];
    for(var j=0;j<rows;j++){
      var z=FAR*Math.pow(NEAR/FAR,j/(rows-1));
      var fog=Math.pow(1-(z-NEAR)/(FAR-NEAR),1.25);
      var size=Math.max(.8,Math.min(3.2,2.3/z));
      ctx.fillStyle='rgba('+dot+','+(.12+fog*.85).toFixed(3)+')';
      for(var i=0;i<cols;i++){
        var x=-hw+(i/(cols-1))*hw*2,y=height(x,z,t),sx=W/2+(x/z)*f;
        if(sx<-4||sx>W+4)continue;
        var sy=hz+((CAM-y)/z)*f;
        if(crests&&y>.12){hot.push(sx,sy,size,fog);continue}
        ctx.fillRect(sx-size/2,sy-size/2,size,size);
      }
    }
    for(var k=0;k<hot.length;k+=4){
      ctx.fillStyle='rgba('+accent+','+(.2+hot[k+3]*.8).toFixed(3)+')';
      var s=hot[k+2]*1.15;ctx.fillRect(hot[k]-s/2,hot[k+1]-s/2,s,s);
    }
  }
  function now(){return (performance.now()-t0)/1000}
  function loop(ms){
    if(document.hidden){raf=0;return}
    raf=requestAnimationFrame(loop);
    if(document.documentElement.classList.contains('is-case'))return;
    if(ms-last<32)return;
    last=ms;resize();frame(now());
  }
  function wake(){if(!reduced&&!raf&&!document.hidden)raf=requestAnimationFrame(loop)}
  function ground(e){
    var sx=e.clientX,sy=e.clientY;
    if(sx<0||sy<0||sx>W||sy>H||sy<=hz+4)return null;
    var z=Math.min(FAR,Math.max(NEAR,(CAM*f)/(sy-hz)));
    return {x:((sx-W/2)*z)/f,z:z};
  }
  function onMove(e){
    var g=ground(e);
    if(g){ptr.tx=g.x;ptr.tz=g.z;if(ptr.s<.05){ptr.x=g.x;ptr.z=g.z}}
    ptr.ts=g?1:0;
  }
  function onDown(e){var g=ground(e);if(g)rings.push({x:g.x,z:g.z,t:now()})}
  resize();frame(reduced?3:0);
  window.addEventListener('resize',function(){resize();if(reduced)frame(3)});
  document.addEventListener('visibilitychange',wake);
  document.addEventListener('mouseleave',function(){ptr.ts=0});
  if(!reduced){
    wake();
    if(!coarse)window.addEventListener('pointermove',onMove,{passive:true});
    window.addEventListener('pointerdown',onDown,{passive:true});
  }
})();
