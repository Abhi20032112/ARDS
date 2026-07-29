import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { serviceBySlug } from '@/data/serviceDetails';

const SafeIcon = ({ name, size = 28 }) => {
  const Icon = Icons[name] || Icons.Sparkles;
  return <Icon size={size} />;
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = serviceBySlug[slug];

  if (!service) {
    return (
      <section className="sub-hero">
        <div className="site-shell">
          <span>SERVICE DETAILS</span>
          <h1>Service not found</h1>
          <p>This service page is not available yet. Explore all ARDS capabilities or contact us for a custom discussion.</p>
          <Link to="/services" className="btn btn-primary">View services <ArrowRight /></Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{service.title} | Alpenrose Digital Solutions</title>
        <meta name="description" content={service.summary} />
        <link rel="canonical" href={`https://ards.in/services/${service.slug}`} />
      </Helmet>

      <section className="sub-hero service-detail-hero">
        <div className="site-shell">
          <Link to="/services" className="service-back"><ArrowLeft /> All services</Link>
          <span>{service.category}</span>
          <h1>{service.title}</h1>
          <p>{service.summary}</p>
          <div className="service-detail-actions">
            <Link to="/contact" className="btn btn-primary">Discuss this service <ArrowUpRight /></Link>
            <a href="tel:+919308579699" className="btn btn-secondary">Call ARDS</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-shell service-detail-grid">
          <article className="service-detail-main">
            <div className="service-detail-icon"><SafeIcon name={service.icon} /></div>
            <h2>What you get</h2>
            <div className="service-points">
              {service.outcomes.map((item) => (
                <div key={item}><CheckCircle2 /><span>{item}</span></div>
              ))}
            </div>
          </article>

          <article className="service-detail-card">
            <h3>Best for</h3>
            <p>{service.bestFor}</p>
            <h3>Typical timeline</h3>
            <p>{service.timeline}</p>
          </article>

          <article className="service-detail-card wide">
            <h3>Core scope</h3>
            <div className="service-module-list">
              {service.modules.map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
