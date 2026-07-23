import React,{useEffect,useRef} from 'react';

export default function ExperienceEffects(){
 const canvas=useRef(null),dot=useRef(null),ring=useRef(null);
 useEffect(()=>{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const c=canvas.current,ctx=c.getContext('2d');let w,h,raf,mouse={x:-500,y:-500};
  const particles=Array.from({length:55},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22}));
  const resize=()=>{w=c.width=innerWidth*devicePixelRatio;h=c.height=innerHeight*devicePixelRatio;c.style.width=innerWidth+'px';c.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)};resize();
  const move=e=>{mouse={x:e.clientX,y:e.clientY};if(dot.current){dot.current.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`;ring.current.animate({transform:`translate3d(${e.clientX}px,${e.clientY}px,0)`},{duration:350,fill:'forwards'})}};
  const draw=()=>{ctx.clearRect(0,0,innerWidth,innerHeight);particles.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;const md=Math.hypot(p.x-mouse.x,p.y-mouse.y);if(md<150){p.x+=(p.x-mouse.x)*.002;p.y+=(p.y-mouse.y)*.002}ctx.fillStyle='rgba(124,58,237,.28)';ctx.beginPath();ctx.arc(p.x,p.y,1.2,0,7);ctx.fill();particles.slice(i+1).forEach(q=>{const d=Math.hypot(p.x-q.x,p.y-q.y);if(d<105){ctx.strokeStyle=`rgba(30,64,175,${.08*(1-d/105)})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}})});raf=requestAnimationFrame(draw)};draw();
  addEventListener('resize',resize);addEventListener('mousemove',move);return()=>{cancelAnimationFrame(raf);removeEventListener('resize',resize);removeEventListener('mousemove',move)}
 },[]);
 return <><canvas ref={canvas} className="network-canvas" aria-hidden="true"/><span ref={ring} className="cursor-ring"/><span ref={dot} className="cursor-dot"/></>
}
