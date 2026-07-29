import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CalendarDays, CheckCircle2, ChevronDown, Loader2, PartyPopper, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { useContact } from '@/hooks/useContact';
import type { ContactLeadInput } from '@/types/contact';

const services = [
  'Website Development',
  'Mobile App Development',
  'AI Automation',
  'ERP Solutions',
  'School ERP',
  'College ERP',
  'Hospital ERP',
  'Manufacturing ERP',
  'HRMS',
  'Inventory Management',
  'Business Automation',
  'Cloud Solutions',
  'Digital Marketing',
  'Custom Software',
  'Other',
];

const industries = ['Education', 'Healthcare', 'Manufacturing', 'Retail', 'Real Estate', 'Finance', 'Hospitality', 'Logistics', 'Corporate Office', 'Startup', 'Other'];

type FieldProps = {
  label: string;
  name: keyof ContactLeadInput;
  value: string;
  error?: string;
  placeholder?: string;
  type?: string;
  options?: string[];
  multiline?: boolean;
  onChange: (name: keyof ContactLeadInput, value: string) => void;
};

const Field = ({ label, name, value, error, placeholder, type = 'text', options, multiline, onChange }: FieldProps) => (
  <motion.label className={`premium-field ${error ? 'has-error' : ''} ${multiline ? 'wide' : ''}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
    <span>{label}</span>
    <div className="premium-input-shell">
      {options ? (
        <>
          <select name={name} value={value} onChange={(event) => onChange(name, event.target.value)} aria-invalid={Boolean(error)}>
            <option value="">Select {label.toLowerCase()}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" />
        </>
      ) : multiline ? (
        <textarea name={name} value={value} rows={5} minLength={20} onChange={(event) => onChange(name, event.target.value)} placeholder={placeholder} aria-invalid={Boolean(error)} />
      ) : (
        <input name={name} value={value} type={type} onChange={(event) => onChange(name, event.target.value)} placeholder={placeholder} aria-invalid={Boolean(error)} />
      )}
    </div>
    {error ? <small>{error}</small> : null}
  </motion.label>
);

export default function ContactForm() {
  const { values, errors, isSubmitting, isSuccess, submitError, progress, updateField, submit, setIsSuccess } = useContact();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit();
  };

  return (
    <div className="premium-contact-wrap">
      <div className="premium-contact-bg" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className="premium-contact-head">
        <span>
          <Sparkles /> Secure Supabase Lead Capture
        </span>
        <h2>Tell us what you want to build.</h2>
        <p>Your message is stored securely in Supabase and reviewed by the Alpenrose team.</p>
      </div>

      <div className="contact-progress" aria-label={`Form completion ${progress}%`}>
        <div>
          <span>Progress</span>
          <b>{progress}%</b>
        </div>
        <i style={{ width: `${progress}%` }} />
      </div>

      <form onSubmit={handleSubmit} className="premium-contact-form" noValidate>
        <input className="contact-honeypot" name="website" value={values.website || ''} onChange={(event) => updateField('website', event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div className="premium-field-grid">
          <Field label="Full Name" name="name" value={values.name} error={errors.name} placeholder="Your full name" onChange={updateField} />
          <Field label="Company Name" name="company" value={values.company} error={errors.company} placeholder="Company or institution" onChange={updateField} />
          <Field label="Email Address" name="email" value={values.email} error={errors.email} placeholder="you@company.com" type="email" onChange={updateField} />
          <Field label="Phone Number" name="phone" value={values.phone} error={errors.phone} placeholder="+91 98765 43210" type="tel" onChange={updateField} />
          <Field label="Industry" name="industry" value={values.industry} error={errors.industry} options={industries} onChange={updateField} />
          <Field label="Service Interested In" name="service" value={values.service} error={errors.service} options={services} onChange={updateField} />
          <Field label="Message" name="message" value={values.message} error={errors.message} placeholder="Share your requirement, current challenge, timeline, users, and expected outcome." multiline onChange={updateField} />
        </div>

        <AnimatePresence>
          {submitError ? (
            <motion.div className="contact-alert error" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <AlertCircle />
              <span>{submitError}</span>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="premium-contact-actions">
          <button type="submit" className="contact-submit premium-submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="spin" /> Sending message
              </>
            ) : (
              <>
                Send Message <Send />
              </>
            )}
          </button>
          <a href="https://wa.me/919308579699?text=I%20want%20to%20book%20a%20free%20consultation%20with%20Alpenrose%20Digital%20Solutions" target="_blank" rel="noreferrer" className="consultation-button">
            <CalendarDays /> Book Free Consultation
          </a>
        </div>

        <p className="premium-contact-note">
          <ShieldCheck /> Protected with Supabase RLS. Never use a service role key in the browser.
        </p>
      </form>

      <AnimatePresence>
        {isSuccess ? (
          <motion.div className="success-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="confetti" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, index) => (
                <i key={index} style={{ '--x': `${Math.random() * 220 - 110}px`, '--delay': `${index * 0.035}s` } as React.CSSProperties} />
              ))}
            </div>
            <motion.div className="success-modal" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 12 }}>
              <PartyPopper />
              <CheckCircle2 />
              <h3>Thank you!</h3>
              <p>Our team will contact you shortly.</p>
              <button type="button" onClick={() => setIsSuccess(false)}>
                Done
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
