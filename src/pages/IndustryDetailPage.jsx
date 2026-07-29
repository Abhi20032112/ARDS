import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { industryBySlug } from '@/data/industryDetails';

const SafeIcon = ({ name, size = 30 }) => {
  const Icon = Icons[name] || Icons.Sparkles;
  return <Icon size={size} />;
};

export default function IndustryDetailPage() {
  const { slug } = useParams();
  const industry = industryBySlug[slug];

  if (!industry) {
    return (
      <section className="sub-hero">
        <div className="site-shell">
          <span>INDUSTRY DETAILS</span>
          <h1>Industry not found</h1>
          <p>This industry page is not available yet. Explore all industries or talk to ARDS about your exact workflow.</p>
          <Link to="/industries" className="btn btn-primary">View industries <ArrowRight /></Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{industry.name} Digital Solutions | Alpenrose Digital Solutions</title>
        <meta name="description" content={industry.summary} />
        <link rel="canonical" href={`https://ards.in/industries/${industry.slug}`} />
      </Helmet>

      <section className="sub-hero industry-detail-hero">
        <div className="site-shell">
          <Link to="/industries" className="service-back"><ArrowLeft /> All industries</Link>
          <span>INDUSTRY SOLUTIONS</span>
          <h1>{industry.name}</h1>
          <p>{industry.summary}</p>
          <div className="service-detail-actions">
            <Link to="/contact" className="btn btn-primary">{industry.cta} <ArrowUpRight /></Link>
            <Link to="/services" className="btn btn-secondary">Explore services</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-shell industry-detail-layout">
          <article className="industry-detail-card primary">
            <div className="service-detail-icon"><SafeIcon name={industry.icon} /></div>
            <h2>Common challenges</h2>
            <div className="service-points">
              {industry.challenges.map((item) => (
                <div key={item}><CheckCircle2 /><span>{item}</span></div>
              ))}
            </div>
          </article>

          <article className="industry-detail-card">
            <h2>ARDS can build</h2>
            <div className="service-module-list">
              {industry.solutions.map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>

          <article className="industry-detail-card">
            <h2>Expected outcomes</h2>
            <div className="service-points single">
              {industry.outcomes.map((item) => (
                <div key={item}><CheckCircle2 /><span>{item}</span></div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
