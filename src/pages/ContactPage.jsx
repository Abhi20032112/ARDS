import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, Check, Clock3, Headphones, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import './ContactPage.css';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact ARDS | Start Your Digital Transformation</title>
        <meta name="description" content="Talk to Alpenrose Digital Solutions in Patna about AI automation, ERP, custom software, websites, mobile apps and cloud solutions." />
        <link rel="canonical" href="https://ards.in/contact" />
      </Helmet>

      <section className="contact-hero">
        <div className="contact-grid" />
        <div className="contact-orb co-one" />
        <div className="contact-orb co-two" />
        <div className="site-shell contact-hero-layout">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <span className="contact-kicker">
              <i /> LET'S BUILD SOMETHING USEFUL
            </span>
            <h1>
              Bring us the problem.
              <br />
              <em>We'll map the next move.</em>
            </h1>
            <p>Tell us what is slowing your team down. You'll get a practical conversation with people who design and build the solution.</p>
            <div className="contact-hero-actions">
              <a href="#contact-form" className="btn btn-primary">
                Start a conversation <ArrowUpRight />
              </a>
              <a href="https://wa.me/919308579699" target="_blank" rel="noreferrer" className="btn btn-secondary">
                <MessageCircle /> WhatsApp us
              </a>
            </div>
            <div className="contact-trust">
              <span>
                <ShieldCheck /> Your details stay private
              </span>
              <span>
                <Clock3 /> Reply within one business day
              </span>
            </div>
          </motion.div>

          <motion.div className="contact-signal" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.12 }}>
            <div className="signal-rings">
              <i />
              <i />
              <i />
            </div>
            <div className="signal-core">
              <Sparkles />
              <b>ARDS</b>
              <small>DISCOVERY DESK</small>
            </div>
            <div className="signal-card sc-one">
              <span>
                <MessageCircle />
              </span>
              <div>
                <b>New conversation</b>
                <small>Tell us the challenge</small>
              </div>
            </div>
            <div className="signal-card sc-two">
              <span>
                <CalendarDays />
              </span>
              <div>
                <b>Plan the solution</b>
                <small>Clear scope and next steps</small>
              </div>
            </div>
            <div className="signal-card sc-three">
              <span>
                <Check />
              </span>
              <div>
                <b>Build with confidence</b>
                <small>One accountable team</small>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="contact-main section" id="contact-form">
        <div className="site-shell contact-layout">
          <motion.div className="contact-form-card premium-form-card" {...reveal}>
            <ContactForm />
          </motion.div>

          <div className="contact-side">
            <motion.div className="direct-card" {...reveal}>
              <span>DIRECT CONTACT</span>
              <h3>Prefer to speak now?</h3>
              <a href="tel:+919308579699">
                <i>
                  <Phone />
                </i>
                <div>
                  <small>Call our team</small>
                  <b>+91 9308579699</b>
                </div>
                <ArrowUpRight />
              </a>
              <a href="mailto:business@ards.in">
                <i>
                  <Mail />
                </i>
                <div>
                  <small>Email us</small>
                  <b>business@ards.in</b>
                </div>
                <ArrowUpRight />
              </a>
              <a href="https://wa.me/919308579699" target="_blank" rel="noreferrer">
                <i>
                  <MessageCircle />
                </i>
                <div>
                  <small>WhatsApp</small>
                  <b>Start a chat</b>
                </div>
                <ArrowUpRight />
              </a>
              <div className="availability">
                <i />
                <div>
                  <b>Team available</b>
                  <span>Monday-Saturday | 9:00 AM-6:00 PM</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="contact-location" {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
              <div className="location-map">
                <div className="map-lines" />
                <span>
                  <MapPin />
                </span>
                <i className="map-pulse" />
              </div>
              <div>
                <small>OUR HOME BASE</small>
                <h3>Patna, Bihar, India</h3>
                <p>Working with ambitious organizations across India.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="contact-expect">
        <div className="site-shell">
          <motion.div {...reveal}>
            <span>WHAT HAPPENS NEXT</span>
            <h2>
              A clear first step.
              <br />
              No complicated process.
            </h2>
          </motion.div>
          <div className="expect-grid">
            {[
              ['01', 'We listen', 'A focused call about the operation, users and desired outcome.'],
              ['02', 'We frame', 'A practical recommendation, scope direction and delivery path.'],
              ['03', 'You decide', 'Move forward when the approach, timing and investment make sense.'],
            ].map((item, index) => (
              <motion.article key={item[0]} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <b>{item[0]}</b>
                <span>{index === 0 ? <Headphones /> : index === 1 ? <Sparkles /> : <Check />}</span>
                <h3>{item[1]}</h3>
                <p>{item[2]}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
