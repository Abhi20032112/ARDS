import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const items = [
  ['Use of website', 'This website provides information about Alpenrose Digital Solutions services. You agree not to misuse the website, attempt unauthorized access, or interfere with normal operation.'],
  ['Service discussions', 'Information, estimates, proposals, and AI-generated recommendations on the website are directional until confirmed in writing by ARDS after proper discovery.'],
  ['Project terms', 'Final scope, timeline, pricing, payment schedule, deliverables, support, hosting, and third-party costs are governed by the signed proposal, agreement, or invoice.'],
  ['Intellectual property', 'Website content, branding, graphics, copy, and service materials belong to Alpenrose Digital Solutions unless otherwise stated.'],
  ['Third-party services', 'Projects may use hosting, APIs, payment gateways, analytics, communication tools, or cloud platforms subject to their own terms and availability.'],
  ['Contact', 'For questions about these terms, contact Alpenrose Digital Solutions at business@ards.in.']
];

export default function TermsConditionsPage() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Alpenrose Digital Solutions</title>
        <meta name="description" content="Terms and conditions for using the Alpenrose Digital Solutions website and requesting digital transformation services." />
        <link rel="canonical" href="https://ards.in/terms-conditions" />
      </Helmet>
      <section className="sub-hero">
        <div className="site-shell">
          <span>LEGAL</span>
          <h1>Terms & Conditions</h1>
          <p>Basic terms for using this website and discussing services with Alpenrose Digital Solutions.</p>
          <Link to="/contact" className="btn btn-primary">Start a project <ArrowUpRight /></Link>
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
