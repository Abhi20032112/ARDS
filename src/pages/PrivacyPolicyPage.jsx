import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const items = [
  ['Information we collect', 'We collect details shared through forms, consultation requests, newsletter signup, WhatsApp, email, and project discussions. This can include name, phone, email, company, requirements, uploaded files, and technical context needed to respond properly.'],
  ['How we use information', 'We use the information to respond to enquiries, prepare proposals, deliver services, improve the website, support clients, and maintain business records.'],
  ['Data sharing', 'We do not sell personal information. We may share limited data with trusted service providers only when needed for hosting, communication, analytics, payment, security, or project delivery.'],
  ['Security', 'We use reasonable technical and operational safeguards for business data, including access control, secure communication practices, and limited internal access.'],
  ['Retention', 'We keep information only as long as required for enquiries, service delivery, support, legal obligations, and legitimate business records.'],
  ['Contact', 'For privacy questions or data requests, contact Alpenrose Digital Solutions at business@ards.in.']
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Alpenrose Digital Solutions</title>
        <meta name="description" content="Privacy policy for Alpenrose Digital Solutions, including how enquiry, consultation and project information is collected and used." />
        <link rel="canonical" href="https://ards.in/privacy-policy" />
      </Helmet>
      <section className="sub-hero">
        <div className="site-shell">
          <span>LEGAL</span>
          <h1>Privacy Policy</h1>
          <p>How Alpenrose Digital Solutions handles enquiry, consultation, project, and website information.</p>
          <Link to="/contact" className="btn btn-primary">Contact us <ArrowUpRight /></Link>
        </div>
      </section>
      <section className="section">
        <div className="site-shell solution-page-grid">
          {items.map(([title, copy]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
