import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  GraduationCap,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Waves,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const brandGradientStyle = {
  backgroundImage: 'linear-gradient(135deg, #0c4a6e 0%, #0f766e 52%, #0891b2 100%)',
};

const heroAuraStyle = {
  backgroundImage:
    'radial-gradient(circle at 10% 16%, rgba(255,255,255,0.22), transparent 22%), radial-gradient(circle at 84% 18%, rgba(103,232,249,0.18), transparent 24%), radial-gradient(circle at 70% 72%, rgba(34,211,238,0.12), transparent 28%)',
};

const heroGridStyle = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
  backgroundSize: '76px 76px',
  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 92%)',
  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 92%)',
};

const glassCardStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
};

const glassPanelStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.12)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  boxShadow: '0 30px 90px rgba(2, 18, 32, 0.24)',
};

const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const heroPills = [
  'Digital identity systems',
  'Workflow-first execution',
  'Built for real operations',
];

const metricCards = [
  {
    value: '5+',
    label: 'Core Case Studies',
    detail: 'Projects documented clearly across education, fitness, healthcare, agriculture, and security.',
    icon: Briefcase,
  },
  {
    value: '3K+',
    label: 'Users Supported',
    detail: 'Digital systems built to serve real teams, daily users, and institution-scale operations.',
    icon: BarChart3,
  },
  {
    value: '80%',
    label: 'Workflow Reduction',
    detail: 'Measured operational improvement in process-heavy admin and reporting environments.',
    icon: Target,
  },
];

const caseStudies = [
  {
    id: 1,
    sector: 'Education',
    title: 'Government College Digital Campus Transformation',
    summary:
      'A connected digital layer for admissions, hostel workflows, student reporting, and campus operations at scale.',
    challenge:
      'Manual, paper-first processes slowed down administration, fragmented student data, and made reporting harder for staff.',
    solution:
      "We built a modern website, process-led dashboards, ERP-style flows, and support systems around the college's day-to-day operations.",
    outcomes: [
      '80% reduction in manual administrative workload',
      'Faster admission, hostel, and record management flows',
      'Clearer reporting visibility across departments',
    ],
    services: ['Website System', 'Workflow Automation', 'Reporting Dashboards'],
    highlight: '3K+ students supported',
    accentGradient: 'linear-gradient(90deg, #22d3ee 0%, #0ea5e9 45%, #14b8a6 100%)',
    iconGradient: 'linear-gradient(135deg, #22d3ee 0%, #14b8a6 100%)',
    badgeBg: 'bg-cyan-50 text-cyan-700 border border-cyan-100',
    sectorTextColor: 'text-cyan-600',
    icon: GraduationCap,
  },
  {
    id: 2,
    sector: 'Fitness',
    title: 'Smart Swimming Pool Management System',
    summary:
      'A high-volume management platform for attendance, billing, session control, and stock monitoring.',
    challenge:
      'Daily member tracking, payments, and session monitoring took too much staff time and left room for costly errors.',
    solution:
      'We introduced biometric attendance, automated billing logic, cleaner operations reporting, and inventory controls for daily execution.',
    outcomes: [
      'Accurate attendance with zero proxy entries',
      'Less manual work in payment and membership tracking',
      'Inventory visibility with lower operational leakage',
    ],
    services: ['Attendance Workflow', 'Billing Automation', 'Operations Reporting'],
    highlight: '1K+ daily participants',
    accentGradient: 'linear-gradient(90deg, #34d399 0%, #14b8a6 52%, #06b6d4 100%)',
    iconGradient: 'linear-gradient(135deg, #34d399 0%, #14b8a6 100%)',
    badgeBg: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    sectorTextColor: 'text-emerald-600',
    icon: Waves,
  },
  {
    id: 3,
    sector: 'Healthcare',
    title: 'Medical Equipment Manufacturer Website',
    summary:
      'A B2B-ready digital presence built to explain technical products clearly and support trust-led inquiries.',
    challenge:
      'The manufacturer needed a stronger online identity that could present complex products with clarity and credibility.',
    solution:
      'We restructured the information architecture, clarified product presentation, and designed a responsive website for serious buyers.',
    outcomes: [
      'Stronger digital credibility in the healthcare market',
      'Cleaner product exploration for distributors and partners',
      'Better quality inbound inquiries from a clearer website journey',
    ],
    services: ['B2B Website Design', 'Content Structuring', 'Conversion UX'],
    highlight: 'B2B positioning upgrade',
    accentGradient: 'linear-gradient(90deg, #a78bfa 0%, #d946ef 52%, #8b5cf6 100%)',
    iconGradient: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
    badgeBg: 'bg-violet-50 text-violet-700 border border-violet-100',
    sectorTextColor: 'text-violet-600',
    icon: Building2,
  },
  {
    id: 4,
    sector: 'Agriculture',
    title: 'Agro and Lab Chemical Supplier Business Website',
    summary:
      'A catalog-first website that makes a technical product range easier to navigate, explain, and inquire about.',
    challenge:
      'The supplier needed a stronger digital storefront to improve product discovery and build confidence with buyers and distributors.',
    solution:
      'We created a clearer content structure, simplified navigation, and built a fast site that supports future catalog growth.',
    outcomes: [
      'Improved product discovery for technical buyers',
      'Stronger brand visibility in a niche category',
      'Higher inquiry readiness through a clearer website journey',
    ],
    services: ['Performance Website', 'Information Architecture', 'Lead Capture Design'],
    highlight: 'Catalog-first UX',
    accentGradient: 'linear-gradient(90deg, #fbbf24 0%, #fb923c 52%, #eab308 100%)',
    iconGradient: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)',
    badgeBg: 'bg-amber-50 text-amber-700 border border-amber-100',
    sectorTextColor: 'text-amber-600',
    icon: Sparkles,
  },
  {
    id: 5,
    sector: 'Security',
    title: 'Security and Manpower Services Digital Identity',
    summary:
      'A sharper corporate website designed to signal reliability, operational readiness, and enterprise confidence.',
    challenge:
      'The company needed a more credible digital front for contract conversations, institutional buyers, and government-facing outreach.',
    solution:
      'We rebuilt the service narrative, strengthened proof points, and designed a website that helps decision-makers evaluate faster.',
    outcomes: [
      'More professional brand positioning for large buyers',
      'Higher trust in enterprise and institutional conversations',
      'Better quality business inquiries from a stronger digital presence',
    ],
    services: ['Brand Messaging', 'Website Redesign', 'Trust-building Content'],
    highlight: 'Enterprise-ready presence',
    accentGradient: 'linear-gradient(90deg, #fb7185 0%, #ec4899 52%, #ef4444 100%)',
    iconGradient: 'linear-gradient(135deg, #fb7185 0%, #ef4444 100%)',
    badgeBg: 'bg-rose-50 text-rose-700 border border-rose-100',
    sectorTextColor: 'text-rose-600',
    icon: ShieldCheck,
  },
];

const deliverySteps = [
  {
    id: '01',
    title: 'Audit',
    label: 'Find the friction',
    description:
      'We diagnose the actual problem first: offer clarity, user behavior, broken workflows, messaging gaps, or weak trust signals.',
    icon: Search,
  },
  {
    id: '02',
    title: 'Design',
    label: 'Shape the right system',
    description:
      'We turn the diagnosis into a practical system, interface, and narrative that fits the business instead of forcing a template.',
    icon: PenTool,
  },
  {
    id: '03',
    title: 'Launch',
    label: 'Ship with direction',
    description:
      'We launch with outcome-focused execution so the end result is not just polished, but usable, measurable, and easier to grow.',
    icon: Rocket,
  },
];

const sectorFilters = ['All', 'Education', 'Fitness', 'Healthcare', 'Agriculture', 'Security'];
const ctaPills = ['Patna-based', 'Strategy-led', 'Launch-ready'];

const WaveDivider = ({ fill, flip = false }) => (
  <div aria-hidden="true" className={flip ? 'rotate-180 transform bg-transparent' : 'bg-transparent'}>
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-16 w-full sm:h-20"
    >
      <path
        d="M0,32L48,48C96,64,192,96,288,101.3C384,107,480,85,576,69.3C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
        fill={fill}
      />
    </svg>
  </div>
);

const OurWorkPage = () => {
  const [selectedSector, setSelectedSector] = useState('All');

  const filteredCaseStudies =
    selectedSector === 'All'
      ? caseStudies
      : caseStudies.filter((study) => study.sector === selectedSector);

  const featuredStudies = caseStudies.slice(0, 3);

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Our Work | Alpenrose Digital Solutions',
    url: 'https://ards.in/work',
    description:
      'Selected case studies from Alpenrose Digital Solutions, a digital marketing and web solutions agency based in Patna, Bihar, India.',
    keywords:
      'Alpenrose Digital Solutions work, digital marketing agency Patna case studies, website design Patna, workflow automation Bihar, branding case studies India',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Alpenrose Digital Solutions',
      url: 'https://ards.in',
    },
    about: {
      '@type': 'Organization',
      name: 'Alpenrose Digital Solutions',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Patna',
        addressRegion: 'Bihar',
        addressCountry: 'India',
      },
    },
    hasPart: caseStudies.map((study) => ({
      '@type': 'CreativeWork',
      name: study.title,
      about: study.sector,
      description: study.summary,
    })),
  };

  return (
    <>
      <Helmet>
        <title>Our Work | Alpenrose Digital Solutions</title>
        <meta
          name="description"
          content="Explore selected client work from Alpenrose Digital Solutions in Patna, Bihar. Review digital marketing, website, and workflow case studies across education, fitness, healthcare, agriculture, and security."
        />
        <meta
          name="keywords"
          content="Alpenrose Digital Solutions work, Patna digital marketing agency case studies, Bihar web design portfolio, workflow automation projects, healthcare website design, education digital systems, business website Patna"
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://ards.in/work" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Alpenrose Digital Solutions" />
        <meta property="og:title" content="Our Work | Alpenrose Digital Solutions" />
        <meta
          property="og:description"
          content="See how Alpenrose Digital Solutions builds websites, systems, and digital experiences for businesses in Patna, Bihar, and beyond."
        />
        <meta property="og:url" content="https://ards.in/work" />
        <meta property="og:image" content="https://ards.in/logo.png" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Work | Alpenrose Digital Solutions" />
        <meta
          name="twitter:description"
          content="Selected case studies from Alpenrose Digital Solutions across education, fitness, healthcare, agriculture, and security."
        />
        <meta name="twitter:image" content="https://ards.in/logo.png" />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <div className="bg-white text-slate-900">
        <section
          className="relative overflow-hidden px-4 pb-24 pt-24 text-white sm:px-6 lg:px-8"
          style={brandGradientStyle}
        >
          <div className="pointer-events-none absolute inset-0" style={heroAuraStyle} />
          <div className="pointer-events-none absolute inset-0 opacity-40" style={heroGridStyle} />
          <div className="pointer-events-none absolute -left-16 top-24 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-200/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={0} className="max-w-4xl">
                <span
                  className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white"
                  style={glassCardStyle}
                >
                  Selected Work
                </span>

                <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.02] text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                  No stock mockups. Just clear proof of what we build.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-50 sm:text-lg">
                  Alpenrose Digital Solutions builds digital systems, websites, and growth-ready
                  experiences for ambitious businesses from Patna, Bihar. This page shows the work
                  in plain language: the problem, the build, and the result.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {heroPills.map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/85"
                      style={glassCardStyle}
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="h-auto rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#0c4a6e] hover:bg-slate-100"
                  >
                    <Link to="/contact">
                      Start Your Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-auto rounded-full border-white/30 bg-transparent px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
                  >
                    <a href="#case-studies">Explore Case Studies</a>
                  </Button>
                </div>

                <div className="mt-14 grid gap-5 md:grid-cols-3">
                  {metricCards.map((metric, index) => {
                    const MetricIcon = metric.icon;

                    return (
                      <motion.div
                        key={metric.label}
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        custom={0.12 + index * 0.08}
                        className="rounded-[1.75rem] border border-white/15 p-6"
                        style={glassCardStyle}
                      >
                        <div className="flex items-center justify-between">
                          <MetricIcon className="h-5 w-5 text-cyan-100" />
                          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/65">
                            Proof
                          </span>
                        </div>
                        <div className="mt-5 text-4xl font-bold text-white">{metric.value}</div>
                        <div className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                          {metric.label}
                        </div>
                        <p className="mt-3 text-sm leading-7 text-slate-100">{metric.detail}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.aside
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                custom={0.16}
                className="relative overflow-hidden rounded-[2rem] border border-white/15 p-6 sm:p-8"
                style={glassPanelStyle}
              >
                <div className="pointer-events-none absolute inset-0 bg-white/[0.04]" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.26em] text-white/70">
                      Proof Panel
                    </span>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/80">
                      5 live sectors
                    </span>
                  </div>

                  <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-950/15 p-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/90">
                      Built from Patna, Bihar
                    </div>
                    <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-[2rem]">
                      Digital work with operational context, not decorative filler.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-white/75">
                      Every project on this page is framed around a concrete business problem, a
                      practical build, and a measurable shift after launch.
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    {featuredStudies.map((study, index) => {
                      const StudyIcon = study.icon;

                      return (
                        <motion.div
                          key={study.id}
                          initial="hidden"
                          animate="visible"
                          variants={fadeIn}
                          custom={0.24 + index * 0.07}
                          className="flex items-start gap-4 rounded-[1.5rem] border border-white/10 p-4"
                          style={glassCardStyle}
                        >
                          <div
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white"
                            style={{ backgroundImage: study.iconGradient }}
                          >
                            <StudyIcon className="h-5 w-5" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-4">
                              <span className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${study.sectorTextColor}`}>
                                {study.sector}
                              </span>
                              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                                0{index + 1}
                              </span>
                            </div>
                            <h3 className="mt-2 text-base font-semibold leading-6 text-white">
                              {study.title}
                            </h3>
                            <p className="mt-1 text-sm text-white/70">{study.highlight}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        <div className="-mt-px bg-transparent">
          <WaveDivider fill="#f8fafc" />
        </div>

        <section id="case-studies" className="relative bg-slate-50 px-4 py-24 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-cyan-50/80 to-transparent" />

          <div className="relative mx-auto max-w-6xl">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
                custom={0}
                className="max-w-3xl"
              >
                <span className="inline-flex rounded-full bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">
                  Case Studies
                </span>
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Work with context, not polished filler.
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">
                  Filter the portfolio by sector and review what the client needed, what we built,
                  and what changed after launch.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
                custom={0.08}
                className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-4 shadow-sm"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Visible Projects
                </div>
                <div className="mt-2 flex items-end gap-3">
                  <span className="text-3xl font-bold text-slate-900">{filteredCaseStudies.length}</span>
                  <span className="pb-1 text-sm text-slate-500">selected results</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
              custom={0.1}
              className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <p className="text-sm leading-7 text-slate-600">
                  Choose a sector to focus the portfolio view. The writing stays practical so a
                  visitor can understand the challenge and solution without guessing.
                </p>

                <div className="flex flex-wrap gap-3">
                  {sectorFilters.map((sector) => {
                    const isActive = selectedSector === sector;

                    return (
                      <button
                        key={sector}
                        type="button"
                        onClick={() => setSelectedSector(sector)}
                        className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                          isActive
                            ? 'text-white shadow-lg shadow-cyan-950/10'
                            : 'border border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:text-cyan-700'
                        }`}
                        style={
                          isActive
                            ? {
                                backgroundImage:
                                  'linear-gradient(90deg, #0c4a6e 0%, #0f766e 52%, #0891b2 100%)',
                              }
                            : undefined
                        }
                        aria-pressed={isActive}
                      >
                        {sector}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div layout className="mt-12 grid grid-cols-1 gap-8 xl:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredCaseStudies.map((study, index) => {
                  const StudyIcon = study.icon;

                  return (
                    <motion.article
                      key={study.id}
                      layout
                      initial={{ opacity: 0, y: 28, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 24, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/80"
                    >
                      <div className="h-1.5" style={{ backgroundImage: study.accentGradient }} />
                      <div
                        className="pointer-events-none absolute -right-12 top-12 h-40 w-40 rounded-full opacity-10 blur-3xl"
                        style={{ backgroundImage: study.iconGradient }}
                      />
                      <div className="pointer-events-none absolute right-6 top-6 text-6xl font-black tracking-tight text-slate-100">
                        0{index + 1}
                      </div>

                      <div className="relative p-6 sm:p-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex items-start gap-4">
                            <div
                              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg shadow-slate-200"
                              style={{ backgroundImage: study.iconGradient }}
                            >
                              <StudyIcon className="h-6 w-6" />
                            </div>

                            <div className="max-w-xl">
                              <div className={`text-xs font-semibold uppercase tracking-[0.24em] ${study.sectorTextColor}`}>
                                {study.sector}
                              </div>
                              <h3 className="mt-2 pr-10 text-2xl font-bold leading-tight text-slate-900">
                                {study.title}
                              </h3>
                            </div>
                          </div>

                          <span className={`inline-flex self-start rounded-full px-4 py-2 text-xs font-semibold ${study.badgeBg}`}>
                            {study.highlight}
                          </span>
                        </div>

                        <p className="mt-5 text-sm leading-7 text-slate-700 sm:text-base">
                          {study.summary}
                        </p>

                        <div className="mt-6 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
                          <div className="rounded-[1.5rem] bg-slate-100 p-5">
                            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
                              <span className="h-2 w-2 rounded-full bg-slate-400" />
                              Challenge
                            </div>
                            <p className="mt-3 text-sm leading-7 text-slate-800">{study.challenge}</p>
                          </div>

                          <div className="rounded-[1.5rem] p-5 text-white" style={brandGradientStyle}>
                            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                              <span className="h-2 w-2 rounded-full bg-white/80" />
                              What We Built
                            </div>
                            <p className="mt-3 text-sm leading-7 text-slate-50">{study.solution}</p>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {study.services.map((service) => (
                            <span
                              key={service}
                              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700"
                            >
                              {service}
                            </span>
                          ))}
                        </div>

                        <div className="mt-6 space-y-3">
                          {study.outcomes.map((outcome) => (
                            <div
                              key={outcome}
                              className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3"
                            >
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                              <p className="text-sm font-medium leading-7 text-emerald-900">{outcome}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-sm text-slate-500">
                            Need similar execution for your sector or workflow?
                          </p>
                          <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e] transition-colors hover:text-[#0c4a6e]"
                          >
                            Start a similar project
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
              custom={0}
              className="max-w-3xl"
            >
              <span className="inline-flex rounded-full bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">
                Delivery Method
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Audit, design, launch. The process stays clear from day one.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">
                We keep delivery structured so clients understand what is happening, why it is
                happening, and what success should look like after launch.
              </p>
            </motion.div>

            <div className="relative mt-14">
              <div className="pointer-events-none absolute left-0 right-0 top-10 hidden lg:block">
                <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-slate-200 via-cyan-300 to-slate-200" />
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {deliverySteps.map((step, index) => {
                  const StepIcon = step.icon;

                  return (
                    <motion.div
                      key={step.id}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={fadeIn}
                      custom={index * 0.08}
                      className="relative rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg shadow-cyan-100/70"
                          style={brandGradientStyle}
                        >
                          <StepIcon className="h-5 w-5" />
                        </div>

                        <div>
                          <div className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                            {step.id}
                          </div>
                          <h3 className="mt-2 text-2xl font-bold text-slate-900">{step.title}</h3>
                        </div>
                      </div>

                      <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#0f766e]">
                        {step.label}
                      </p>
                      <p className="mt-4 text-sm leading-7 text-slate-700">{step.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="-mb-px bg-white">
          <WaveDivider fill="#0c4a6e" flip />
        </div>

        <section
          className="relative overflow-hidden px-4 py-24 text-white sm:px-6 lg:px-8"
          style={brandGradientStyle}
        >
          <div className="pointer-events-none absolute inset-0" style={heroAuraStyle} />
          <div className="pointer-events-none absolute inset-0 opacity-30" style={heroGridStyle} />
          <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-cyan-200/10 blur-3xl" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn}
            custom={0}
            className="relative z-10 mx-auto max-w-4xl rounded-[2rem] border border-white/15 px-6 py-10 text-center sm:px-10 sm:py-12"
            style={glassPanelStyle}
          >
            <span
              className="inline-flex rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white"
              style={glassCardStyle}
            >
              Start Something Stronger
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
              Need a website or digital system that can actually carry the business forward?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-50 sm:text-lg">
              If you need sharper positioning, cleaner execution, and delivery built around real
              operational goals, Alpenrose Digital Solutions is ready to help.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {ctaPills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/85"
                  style={glassCardStyle}
                >
                  {pill}
                </span>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="mt-10 h-auto rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#0c4a6e] hover:bg-slate-100"
            >
              <Link to="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default OurWorkPage;
