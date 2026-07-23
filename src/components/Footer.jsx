import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {Facebook,Instagram,Linkedin,MessageCircle,ArrowRight,MapPin,Mail,Phone,Globe2,Clock3,Heart,Send,Check} from 'lucide-react';
import logo from '@/assets/logo.png';
import './Footer.css';

const services=['Website Development','Mobile App Development','AI Automation','ERP Solutions','Business Automation','Cloud Solutions','Custom Software','Digital Marketing','Cyber Security','Web Hosting'];
const erp=['School ERP','College ERP','University ERP','Hospital ERP','Manufacturing ERP','HRMS','CRM','Inventory Management','Attendance Management','Hostel Management'];
const quick=[['Home','/'],['About Us','/about'],['Services','/services'],['Portfolio','/work'],['Industries','/industries'],['Case Studies','/work'],['Blog','/blog'],['Careers','/contact'],['Contact Us','/contact'],['Book Demo','/contact'],['Privacy Policy','#'],['Terms & Conditions','#']];
const socials=[['Facebook',Facebook,'#'],['Instagram',Instagram,'#'],['WhatsApp',MessageCircle,'https://wa.me/919308579699'],['LinkedIn',Linkedin,'#']];
const reveal={initial:{opacity:0,y:24},whileInView:{opacity:1,y:0},viewport:{once:true,margin:'-60px'},transition:{duration:.55,ease:[.22,1,.36,1]}};

export default function Footer(){
 const [email,setEmail]=useState(''),[sent,setSent]=useState(false);
 const subscribe=e=>{e.preventDefault();setSent(true);setEmail('');setTimeout(()=>setSent(false),2500)};
 return <footer className="light-footer">
  <div className="footer-wave" aria-hidden="true"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0 74C218 10 416 12 650 66c255 58 491 51 790-39v93H0Z"/></svg></div>
  <div className="footer-mesh"/><div className="footer-blob fb-one"/><div className="footer-blob fb-two"/><div className="footer-dots"/>
  <div className="site-shell light-footer-inner">
   <motion.section className="newsletter-card" {...reveal}>
    <div className="newsletter-shape ns-one"/><div className="newsletter-shape ns-two"/>
    <div className="newsletter-copy"><span><Send/> ARDS INSIGHTS</span><h2>Stay Updated With Technology</h2><p>Get the latest insights on AI, ERP, Automation, and Digital Transformation.</p></div>
    <form onSubmit={subscribe} className="newsletter-form"><div><Mail/><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your work email" aria-label="Work email"/></div><motion.button whileHover={{scale:1.03}} whileTap={{scale:.97}}>{sent?<><Check/> Subscribed</>:<>Subscribe <ArrowRight/></>}</motion.button></form>
   </motion.section>

   <div className="light-footer-grid">
    <motion.div className="lf-company" {...reveal}>
     <Link to="/" className="lf-logo"><img src={logo} alt="Alpenrose Digital Solutions logo"/><span><b>Alpenrose</b><strong>Digital Solutions</strong></span></Link>
     <p className="lf-tagline">Empowering Businesses Through Innovative Digital Transformations</p>
     <p className="lf-description">We build AI-powered software, ERP solutions, websites, mobile applications, cloud platforms, and automation systems that help organizations grow faster and smarter.</p>
     <div className="lf-socials">{socials.map(([name,Icon,url],i)=><motion.a href={url} aria-label={name} target={url.startsWith('http')?'_blank':undefined} rel="noreferrer" key={name} whileHover={{scale:1.12,rotate:i%2?5:-5,y:-3}}><Icon/></motion.a>)}</div>
    </motion.div>
    <motion.div className="lf-column" {...reveal} transition={{...reveal.transition,delay:.06}}><h3>Services</h3>{services.map(x=><Link className="lf-link" to="/services" key={x}>{x}</Link>)}</motion.div>
    <motion.div className="lf-column" {...reveal} transition={{...reveal.transition,delay:.12}}><h3>ERP Solutions</h3>{erp.map(x=><Link className="lf-link" to="/services" key={x}>{x}</Link>)}</motion.div>
    <motion.div className="lf-column" {...reveal} transition={{...reveal.transition,delay:.18}}><h3>Quick Links</h3>{quick.map(([x,url])=><Link className="lf-link" to={url} key={x}>{x}</Link>)}</motion.div>
    <motion.div className="lf-contact" {...reveal} transition={{...reveal.transition,delay:.24}}><h3>Contact</h3><a href="https://maps.google.com/?q=Patna+Bihar" target="_blank" rel="noreferrer"><span><MapPin/></span><div><small>Office</small><b>Patna, Bihar, India</b></div></a><a href="tel:+919308579699"><span><Phone/></span><div><small>Call</small><b>+91 9308579699</b></div></a><a href="mailto:business@ards.in"><span><Mail/></span><div><small>Email</small><b>business@ards.in</b></div></a><a href="https://ards.in"><span><Globe2/></span><div><small>Website</small><b>www.ards.in</b></div></a><div className="business-hours"><Clock3/><div><small>Business Hours</small><b>Monday–Saturday</b><span>9:00 AM – 6:00 PM</span></div></div><Link className="consult-btn" to="/contact"><i/>Book Free Consultation <ArrowRight/></Link></motion.div>
   </div>
   <div className="lf-divider"/>
   <div className="lf-bottom"><span>© 2026 Alpenrose Digital Solutions. All Rights Reserved.</span><p>Made with <Heart/> in India</p><div><a href="#">Privacy Policy</a><a href="#">Terms</a><a href="/sitemap.xml">Sitemap</a></div></div>
  </div>
 </footer>
}
