import React,{useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {motion,useMotionValue,useSpring,useTransform} from 'framer-motion';
import * as I from 'lucide-react';
import './CinematicHero.css';

const modules=[['AI Automation','Bot','m1'],['ERP Solutions','Blocks','m2'],['Cloud Sync','Cloud','m3'],['Cyber Security','ShieldCheck','m4'],['Analytics','ChartNoAxesCombined','m5'],['Mobile Apps','Smartphone','m6']];
const SafeIcon=({name,size=18})=>{const C=I[name]||I.Sparkles;return <C size={size}/>};

export default function CinematicHero(){
 const root=useRef(null),mx=useMotionValue(0),my=useMotionValue(0),sx=useSpring(mx,{stiffness:50,damping:20}),sy=useSpring(my,{stiffness:50,damping:20});
 const rotateX=useTransform(sy,[-.5,.5],[5,-5]),rotateY=useTransform(sx,[-.5,.5],[-7,7]),shiftX=useTransform(sx,[-.5,.5],[-15,15]),shiftY=useTransform(sy,[-.5,.5],[-12,12]);
 const move=e=>{const r=root.current.getBoundingClientRect();mx.set((e.clientX-r.left)/r.width-.5);my.set((e.clientY-r.top)/r.height-.5)};
 const words=['Transform','Your Business','With Intelligent','Digital Solutions'];
 return <section className="cinematic-hero" ref={root} onMouseMove={move}>
  <div className="cinema-grid"/><div className="aurora a1"/><div className="aurora a2"/><div className="light-ray"/>
  <div className="binary-stream s1">01001 10110 00101 11001 01010</div><div className="binary-stream s2">API · CLOUD · AI · ERP · SECURE</div>
  <div className="site-shell cinema-layout">
   <motion.div className="cinema-copy" style={{x:shiftX,y:shiftY}}>
    <motion.div className="cinema-eyebrow" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}><span/><I.Sparkles/> FUTURE-READY SYSTEMS · BUILT IN INDIA</motion.div>
    <h1>{words.map((word,i)=><motion.span className={i===0||i===2?'glow-word':''} key={word} initial={{opacity:0,y:45,filter:'blur(10px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} transition={{duration:.7,delay:.12+i*.1,ease:[.22,1,.36,1]}}>{word}</motion.span>)}</h1>
    <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.65}}>We build AI-powered software, ERP systems, cloud platforms and intelligent automation that make complex operations feel simple.</motion.p>
    <motion.div className="cinema-actions" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.78}}><Link className="cinema-btn primary" to="/contact"><span>Book Free Demo</span><I.ArrowUpRight/></Link><a className="cinema-btn glass" href="#solutions">Explore Solutions <I.ArrowRight/></a><a className="cinema-watch" href="#live-demo"><i><I.Play/></i> Watch live demo</a></motion.div>
    <motion.div className="cinema-stats" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.95}}>{[['50+','Projects'],['50+','Clients'],['20+','Solutions'],['100%','Uptime'],['24×7','Support']].map(([v,l])=><div key={l}><b>{v}</b><span>{l}</span></div>)}</motion.div>
   </motion.div>
   <motion.div className="cinema-scene desktop-cinema-scene" style={{rotateX,rotateY}}>
    <div className="scene-halo h1"/><div className="scene-halo h2"/>
    <div className="ai-core"><div className="core-rings"><i/><i/><i/></div><I.BrainCircuit/><span>AI CORE</span></div>
    <div className="live-board">
     <div className="board-top"><div><i/><i/><i/></div><span><b/> LIVE COMMAND CENTER</span><small><I.Lock/> SECURE</small></div>
     <div className="board-body"><aside><strong>A</strong>{[I.LayoutDashboard,I.Workflow,I.Users,I.Cloud,I.Settings].map((C,i)=><C key={i}/>)}</aside><main><header><div><small>MONDAY, 24 JUL</small><h3>Operations overview</h3></div><div className="live-dot"><i/> All systems live</div></header><div className="board-kpis"><div><span>Revenue</span><b>₹28.4L</b><em>↑ 18.2%</em></div><div><span>Attendance</span><b>94.8%</b><em>1,248 live</em></div><div><span>AI actions</span><b>12,840</b><em>↑ 32%</em></div></div><div className="board-row"><div className="revenue-chart"><span>Business growth</span><svg viewBox="0 0 450 130" preserveAspectRatio="none"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8b5cf6" stopOpacity=".35"/><stop offset="1" stopColor="#8b5cf6" stopOpacity="0"/></linearGradient></defs><path className="fill" d="M0 112 C50 96 70 120 110 86 S180 92 220 55 S300 78 335 42 S400 48 450 15 L450 130 L0 130Z"/><path d="M0 112 C50 96 70 120 110 86 S180 92 220 55 S300 78 335 42 S400 48 450 15"/></svg></div><div className="security-ring"><span>Security</span><div><b>99</b><small>/100</small></div><em>Protected</em></div></div><div className="workflow-line">{['Lead','CRM','ERP','Automate','Growth'].map((x,i)=><React.Fragment key={x}><span>{i===4?<I.TrendingUp/>:<I.Check/>}{x}</span>{i<4&&<i/>}</React.Fragment>)}</div></main></div>
    </div>
    {modules.map(([name,icon,cls],i)=><motion.div className={'orbit-card '+cls} key={name} animate={{y:[0,i%2?10:-10,0],rotate:[0,i%2?-2:2,0]}} transition={{duration:4+i*.3,repeat:Infinity,ease:'easeInOut'}}><span><SafeIcon name={icon}/></span><div><b>{name}</b><small>{i%2?'Connected':'Active'}</small></div></motion.div>)}
    <div className="cloud-node"><I.Cloud/><span>SYNCED</span></div><div className="notification-pop"><I.Bell/><div><b>Workflow complete</b><span>Monthly report generated</span></div><I.CheckCircle2/></div>
   </motion.div>
   <motion.div className="mobile-command-card" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.85}}>
    <div className="mobile-command-top"><span><i/> ARDS COMMAND</span><small><I.ShieldCheck/> Secure</small></div>
    <div className="mobile-command-head"><div><small>OPERATIONS</small><h3>Everything is on track.</h3></div><span><I.Bell/></span></div>
    <div className="mobile-command-kpis"><div><span>Efficiency</span><b>94.8%</b><em>↑ 12%</em></div><div><span>AI Actions</span><b>12.8K</b><em>Live</em></div></div>
    <div className="mobile-command-chart"><div><span>Business growth</span><b>+38%</b></div><svg viewBox="0 0 340 90" preserveAspectRatio="none"><path d="M0 75 C40 68 55 80 90 55 S145 63 175 38 S235 50 265 23 S310 30 340 8"/></svg></div>
    <div className="mobile-command-flow">{[['Lead','Check'],['ERP','Blocks'],['AI','Sparkles'],['Growth','TrendingUp']].map(([x,icon],i)=><React.Fragment key={x}><span><SafeIcon name={icon} size={11}/>{x}</span>{i<3&&<i/>}</React.Fragment>)}</div>
    <motion.div className="mobile-ai-chip" animate={{y:[0,-6,0]}} transition={{duration:3,repeat:Infinity}}><I.BrainCircuit/><span><b>AI Core</b><small>Active</small></span></motion.div>
   </motion.div>
  </div>
  <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><i/></div>
 </section>
}
