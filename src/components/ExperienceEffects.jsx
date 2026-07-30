import React,{useEffect,useRef} from 'react';

export default function ExperienceEffects(){
 const canvas=useRef(null),dot=useRef(null),ring=useRef(null);
 useEffect(()=>{
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer=matchMedia('(hover: none), (pointer: coarse)').matches;
  if(reduceMotion||coarsePointer||innerWidth<1024)return;

  const c=canvas.current;
  const ctx=c?.getContext('2d',{alpha:true});
  if(!c||!ctx)return;

  let raf,cursorRaf,lastFrame=0,dpr=1,mouse={x:-500,y:-500},cursor={x:-500,y:-500},active=!document.hidden;
  const fpsInterval=1000/30;
  const particles=Array.from({length:28},()=>({
   x:Math.random()*innerWidth,
   y:Math.random()*innerHeight,
   vx:(Math.random()-.5)*.18,
   vy:(Math.random()-.5)*.18
  }));

  const resize=()=>{
   dpr=Math.min(devicePixelRatio||1,1.5);
   c.width=Math.round(innerWidth*dpr);
   c.height=Math.round(innerHeight*dpr);
   c.style.width=innerWidth+'px';
   c.style.height=innerHeight+'px';
   ctx.setTransform(dpr,0,0,dpr,0,0);
  };

  const paintCursor=()=>{
   cursorRaf=0;
   if(dot.current)dot.current.style.transform=`translate3d(${cursor.x}px,${cursor.y}px,0)`;
   if(ring.current)ring.current.style.transform=`translate3d(${cursor.x}px,${cursor.y}px,0)`;
  };

  const move=e=>{
   mouse={x:e.clientX,y:e.clientY};
   cursor=mouse;
   if(!cursorRaf)cursorRaf=requestAnimationFrame(paintCursor);
  };

  const draw=now=>{
   raf=requestAnimationFrame(draw);
   if(!active||now-lastFrame<fpsInterval)return;
   lastFrame=now;
   ctx.clearRect(0,0,innerWidth,innerHeight);
   for(let i=0;i<particles.length;i+=1){
    const p=particles[i];
    p.x+=p.vx;
    p.y+=p.vy;
    if(p.x<0||p.x>innerWidth)p.vx*=-1;
    if(p.y<0||p.y>innerHeight)p.vy*=-1;
    const md=Math.hypot(p.x-mouse.x,p.y-mouse.y);
    if(md<130){
     p.x+=(p.x-mouse.x)*.0015;
     p.y+=(p.y-mouse.y)*.0015;
    }
    ctx.fillStyle='rgba(124,58,237,.24)';
    ctx.beginPath();
    ctx.arc(p.x,p.y,1.1,0,7);
    ctx.fill();
    for(let j=i+1;j<particles.length;j+=1){
     const q=particles[j];
     const dx=p.x-q.x;
     const dy=p.y-q.y;
     const d=dx*dx+dy*dy;
     if(d<8100){
      ctx.strokeStyle=`rgba(30,64,175,${.07*(1-d/8100)})`;
      ctx.beginPath();
      ctx.moveTo(p.x,p.y);
      ctx.lineTo(q.x,q.y);
      ctx.stroke();
     }
    }
   }
  };

  const visibility=()=>{
   active=!document.hidden;
   if(!active)ctx.clearRect(0,0,innerWidth,innerHeight);
  };

  resize();
  raf=requestAnimationFrame(draw);
  addEventListener('resize',resize,{passive:true});
  addEventListener('mousemove',move,{passive:true});
  document.addEventListener('visibilitychange',visibility);
  return()=>{
   cancelAnimationFrame(raf);
   if(cursorRaf)cancelAnimationFrame(cursorRaf);
   removeEventListener('resize',resize);
   removeEventListener('mousemove',move);
   document.removeEventListener('visibilitychange',visibility);
  };
 },[]);
 return <><canvas ref={canvas} className="network-canvas" aria-hidden="true"/><span ref={ring} className="cursor-ring"/><span ref={dot} className="cursor-dot"/></>
}
