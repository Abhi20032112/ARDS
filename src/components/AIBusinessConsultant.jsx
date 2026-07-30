import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bot,
  BrainCircuit,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Cloud,
  Code2,
  Copy,
  Download,
  FileText,
  Globe2,
  HeartPulse,
  Image as ImageIcon,
  Mail,
  MessageCircle,
  Mic,
  MicOff,
  Minimize2,
  Paperclip,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Volume2,
  Users,
  WalletCards
} from 'lucide-react';
import { analyzeDocumentFile, analyzeWebsite, generateProposalDraft, sendConsultantMessage } from '@/lib/ardsAiClient';
import { logAiAgentInteraction } from '@/services/aiAgent';
import ardsLogo from '@/assets/logo.png';
import './AIBusinessConsultant.css';

const services = [
  'AI Automation',
  'ERP Solutions',
  'Website Development',
  'Mobile App Development',
  'Cloud Solutions',
  'Custom Software',
  'Digital Marketing',
  'Cyber Security',
  'CRM',
  'HRMS',
  'Inventory Management',
  'School ERP',
  'College ERP',
  'Hospital ERP',
  'Manufacturing ERP'
];

const quickActions = [
  { label: 'Build a Website', icon: Globe2 },
  { label: 'ERP', icon: ClipboardList },
  { label: 'AI Automation', icon: BrainCircuit },
  { label: 'Mobile Apps', icon: Smartphone },
  { label: 'Hospital ERP', icon: HeartPulse },
  { label: 'School ERP', icon: Users },
  { label: 'Business Automation', icon: ClipboardList },
  { label: 'Cloud', icon: Cloud },
  { label: 'Get a Free Quote', icon: WalletCards },
  { label: 'Book Demo', icon: CalendarClock },
];

const thinkingSteps = [
  'Thinking...',
  'Analysing your business...',
  'Checking ERP modules...',
  'Generating recommendation...',
  'Calculating ROI...',
  'Preparing proposal...'
];

const responseSuggestions = ['Tell me more', 'Estimate Cost', 'Book Demo', 'Generate Proposal', 'View Services', 'Contact Expert'];

const industryOptions = [
  'School',
  'College',
  'Hospital',
  'Manufacturing',
  'Corporate Office',
  'Retail',
  'Logistics',
  'Hotel',
  'Government',
  'Construction',
  'Custom Business'
];

const expertAgents = [
  ['Business Consultant', /business|problem|growth|operation|manual|process|consult/i],
  ['ERP Expert', /erp|inventory|attendance|billing|hrms|crm|school|college|hospital|manufacturing/i],
  ['AI Automation Expert', /ai|automation|chatbot|workflow|attendance|prediction|ocr/i],
  ['Software Architect', /architecture|database|api|backend|frontend|cloud|server|security|scalable/i],
  ['Website Consultant', /website|seo|ranking|landing|design|performance|web/i],
  ['Document Analyst', /pdf|tender|rfp|document|excel|quotation|srs|proposal/i],
  ['Cloud Consultant', /cloud|hosting|aws|azure|server|backup|deployment/i],
  ['Cyber Security Expert', /security|hack|audit|data|privacy|encryption|risk/i]
];

const solutionMap = {
  hospital: {
    name: 'Hospital ERP + Patient Experience Suite',
    modules: ['OPD/IPD', 'Billing', 'Lab', 'Pharmacy', 'Inventory', 'Doctor scheduling', 'Patient mobile app'],
    range: 'Rs. 3.5L - Rs. 18L',
    timeline: '8 - 18 weeks',
    roi: 'Lower billing leakage, faster patient flow, cleaner inventory control'
  },
  school: {
    name: 'School ERP + Parent App',
    modules: ['Admissions', 'Fees', 'Attendance', 'Exams', 'Transport', 'Parent communication', 'Staff payroll'],
    range: 'Rs. 2.5L - Rs. 12L',
    timeline: '6 - 14 weeks',
    roi: 'Reduced admin workload and better parent communication'
  },
  college: {
    name: 'College ERP + LMS + Accreditation Dashboard',
    modules: ['Admissions', 'Fees', 'Departments', 'Exams', 'Library', 'NAAC/IQAC', 'Student portal'],
    range: 'Rs. 5L - Rs. 28L',
    timeline: '10 - 24 weeks',
    roi: 'Digitized academic workflows and stronger compliance reporting'
  },
  manufacturing: {
    name: 'Manufacturing ERP + Inventory Automation',
    modules: ['Production planning', 'Purchase', 'Inventory', 'QC', 'Dispatch', 'Vendor management', 'Analytics'],
    range: 'Rs. 6L - Rs. 35L',
    timeline: '12 - 28 weeks',
    roi: 'Less stock mismatch, better production visibility, tighter cost control'
  },
  website: {
    name: 'Conversion-Focused Website + SEO Foundation',
    modules: ['Premium UI', 'CMS', 'Landing pages', 'SEO setup', 'Analytics', 'Lead forms', 'WhatsApp integration'],
    range: 'Rs. 75K - Rs. 6L',
    timeline: '2 - 8 weeks',
    roi: 'More trust, stronger enquiries, measurable digital presence'
  },
  default: {
    name: 'AI-led Digital Transformation Roadmap',
    modules: ['Discovery', 'Workflow mapping', 'Automation plan', 'Cloud architecture', 'Dashboards', 'Training'],
    range: 'Rs. 1.5L - Rs. 20L',
    timeline: '4 - 20 weeks',
    roi: 'Lower manual effort and faster decision-making'
  }
};

const starterMessages = [
  {
    role: 'ai',
    text:
      "Welcome to Alpenrose.\n\nI'm your AI Digital Transformation Consultant.\n\nI'll analyse your business, identify operational challenges, and recommend the best technology solutions for your organisation.\n\nThis usually takes less than 3 minutes.\n\nStart by selecting your business type below, then tell me about your operations."
  }
];

const discoveryQuestions = [
  'Industry and business model',
  'Users, branches, or departments',
  'Current software and pain points',
  'Must-have modules and integrations',
  'Budget range and launch timeline'
];

const hindiPattern = /[\u0900-\u097F]|(hindi|namaste|kaise|mujhe|chahiye|vyapar|school|hospital)/i;

function isHindi(input) {
  return hindiPattern.test(input);
}

function detectSolution(input) {
  const text = input.toLowerCase();
  if (text.includes('hospital') || text.includes('clinic') || text.includes('pharmacy')) return solutionMap.hospital;
  if (text.includes('school')) return solutionMap.school;
  if (text.includes('college') || text.includes('university')) return solutionMap.college;
  if (text.includes('manufacturing') || text.includes('factory') || text.includes('production')) return solutionMap.manufacturing;
  if (text.includes('website') || text.includes('seo') || text.includes('landing')) return solutionMap.website;
  return solutionMap.default;
}

function getDiscoveryState(messages) {
  const text = messages.map((message) => message.text).join(' ').toLowerCase();
  const checks = [
    {
      key: 'business',
      label: 'Business type',
      done: /school|college|hospital|clinic|manufacturing|factory|corporate|retail|logistics|hotel|government|construction|website|business/i.test(text),
      ask: 'What type of organisation is this: school, college, hospital, manufacturing, retail, logistics, corporate office, hotel, government, construction, or another business?'
    },
    {
      key: 'scale',
      label: 'Scale',
      done: /\d+|employees|students|beds|branches|users|customers|departments|locations/i.test(text),
      ask: 'What is the approximate scale: employees/users/students/customers, branches, departments, or locations?'
    },
    {
      key: 'process',
      label: 'Current process',
      done: /manual|excel|paper|register|current software|existing erp|software|website|mobile app|server|cloud|local/i.test(text),
      ask: 'What do you use today: Excel, registers, existing ERP, website, mobile app, local server, or cloud software?'
    },
    {
      key: 'pain',
      label: 'Pain points',
      done: /problem|challenge|pain|delay|duplicate|leakage|loss|slow|manual|attendance|inventory|billing|reporting|security/i.test(text),
      ask: 'What are the biggest operational problems: delay, duplicate work, billing leakage, inventory mismatch, attendance, reporting, customer experience, or security risk?'
    },
    {
      key: 'commercial',
      label: 'Budget and timeline',
      done: /budget|timeline|deadline|urgent|month|week|price|cost|quote|quotation|launch|go live/i.test(text),
      ask: 'What budget range and launch timeline should ARDS consider?'
    }
  ];
  return {
    text,
    checks,
    completed: checks.filter((check) => check.done),
    missing: checks.filter((check) => !check.done)
  };
}

function createBusinessReport(messages) {
  const state = getDiscoveryState(messages);
  const solution = detectSolution(state.text);
  const completed = state.completed.length;
  const digitalMaturity = Math.min(88, 24 + completed * 12 + (state.text.includes('software') || state.text.includes('erp') ? 12 : 0));
  const automationReadiness = Math.min(94, 40 + completed * 10 + (state.text.includes('manual') || state.text.includes('excel') ? 14 : 0));
  const businessScore = Math.round((digitalMaturity + automationReadiness + completed * 16) / 3);
  const manualDependency = state.text.includes('manual') || state.text.includes('excel') || state.text.includes('register') ? 'High' : completed >= 4 ? 'Medium' : 'Unknown';
  const timeLoss = manualDependency === 'High' ? 210 : manualDependency === 'Medium' ? 96 : 40;
  const revenueLoss = manualDependency === 'High' ? 'Rs. 3.5L - Rs. 9L/year' : manualDependency === 'Medium' ? 'Rs. 1.2L - Rs. 4L/year' : 'Needs discovery';

  return {
    solution,
    businessScore,
    digitalMaturity,
    automationReadiness,
    manualDependency,
    timeLoss,
    revenueLoss,
    completed,
    missing: state.missing
  };
}

function recommendationReasons(solution, text) {
  const items = [];
  if (/manual|excel|register|duplicate|reporting|billing|attendance|inventory/i.test(text)) {
    items.push(['ERP / Business Automation', 'Centralizes operations and removes duplicate manual entry.']);
  }
  if (/attendance|employee|staff|school|college|factory|manufacturing/i.test(text)) {
    items.push(['AI Attendance', 'Reduces proxy attendance, queues, and manual HR reconciliation.']);
  }
  if (/inventory|stock|pharmacy|manufacturing|retail|warehouse/i.test(text)) {
    items.push(['Inventory Management', 'Controls stock leakage, reorder planning, purchase, and dispatch visibility.']);
  }
  if (/customer|lead|sales|retail|corporate|follow/i.test(text)) {
    items.push(['CRM', 'Improves lead tracking, follow-ups, conversion visibility, and customer service.']);
  }
  if (/website|brand|seo|online|lead/i.test(text)) {
    items.push(['Website + SEO', 'Improves trust, enquiry generation, and online discoverability.']);
  }
  if (/mobile|app|parent|patient|customer|field/i.test(text)) {
    items.push(['Mobile App', 'Gives users, customers, parents, patients, or field teams faster access.']);
  }
  if (!items.length) {
    solution.modules.slice(0, 4).forEach((module) => items.push([module, 'Relevant to the business type and early operational signals shared.']));
  }
  return items.slice(0, 6);
}

function createConsultantReply(input, history) {
  const allMessages = [...history, { role: 'user', text: input }];
  const report = createBusinessReport(allMessages);
  const solution = report.solution;
  const lower = input.toLowerCase();
  const hindi = isHindi(input);
  const state = getDiscoveryState(allMessages);
  const shouldDiagnose = lower.includes('report') || lower.includes('analyse') || lower.includes('analyze') || lower.includes('recommend') || lower.includes('solution') || lower.includes('proposal') || lower.includes('quote') || lower.includes('quotation') || lower.includes('cost');

  if (state.missing.length && (!shouldDiagnose || state.completed.length < 3)) {
    const missing = state.missing.slice(0, 3).map((item, index) => `${index + 1}. ${item.ask}`).join('\n');
    return hindi
      ? `Main turant solution recommend nahi karunga, pehle business ko samajhna zaroori hai.\n\nAbhi mujhe ye details chahiye:\n${missing}\n\nIn answers ke baad main bottlenecks, ROI, relevant ARDS services aur implementation roadmap dunga.`
      : `I will not recommend a solution too early. A proper digital transformation plan needs a short diagnosis first.\n\nPlease answer these:\n${missing}\n\nAfter that I will prepare a business score, bottleneck analysis, relevant ARDS services, ROI estimate, and implementation roadmap.`;
  }

  if (lower.includes('price') || lower.includes('cost') || lower.includes('quotation') || lower.includes('quote')) {
    return hindi
      ? `Aapke message ke basis par ARDS ko ${solution.name} se start karna chahiye.\n\nEstimated investment: ${solution.range}\nLikely timeline: ${solution.timeline}\nRecommended modules: ${solution.modules.join(', ')}\nExpected ROI: ${solution.roi}\n\nExact quotation ke liye users, branches, integrations, must-have modules aur deadline share kijiye.`
      : `Based on your message, I would start with ${solution.name}.\n\nEstimated investment: ${solution.range}\nLikely timeline: ${solution.timeline}\nRecommended modules: ${solution.modules.join(', ')}\nExpected ROI: ${solution.roi}\n\nFor a tighter quote, share users, branches, integrations, must-have modules, and launch deadline.`;
  }

  if (lower.includes('meeting') || lower.includes('demo') || lower.includes('call')) {
    return hindi
      ? 'Main free ARDS consultation schedule karne mein help kar sakta hoon. Naam, company, phone number, preferred date/time aur service interest share kijiye. Aap Book Demo ya WhatsApp action bhi use kar sakte hain.'
      : 'I can help schedule a free ARDS consultation. Please share your name, company, phone number, preferred date/time, and service interest. You can also use the Book Demo or WhatsApp action below.';
  }

  if (lower.includes('website') && lower.includes('analy')) {
    return 'Open the Website Analyzer tab, enter the URL, and I will generate a practical audit covering design, SEO, performance, mobile readiness, security signals, accessibility, lead score, and ARDS recommendations.';
  }

  const recommendations = recommendationReasons(solution, state.text)
    .map(([name, reason]) => `- ${name}: ${reason}`)
    .join('\n');

  const roadmap = [
    'Week 1: Business analysis and process mapping',
    'Week 2: UX, architecture, and module planning',
    'Weeks 3-6: Core development and weekly demos',
    'Week 7: Testing, security review, and data validation',
    'Week 8: Deployment, training, and go-live plan'
  ].join('\n');

  if (hindi) {
    return `Business Analysis Report\n\nBusiness Score: ${report.businessScore}%\nAutomation Readiness: ${report.automationReadiness}%\nDigital Maturity: ${report.digitalMaturity}%\nManual Dependency: ${report.manualDependency}\nEstimated Time Loss: ${report.timeLoss} hours/month\nEstimated Leakage/Risk: ${report.revenueLoss}\n\nRelevant ARDS recommendations:\n${recommendations}\n\nPrimary Solution: ${solution.name}\nEstimated Range: ${solution.range}\nTimeline: ${solution.timeline}\n\nROI logic: manual approval, attendance, billing, inventory aur reporting ko automate karne se time loss aur leakage reduce hota hai.\n\nRoadmap:\n${roadmap}\n\nNext: Agar aap name, company aur phone share karte hain, main isko proposal/consultation request mein convert kar sakta hoon.`;
  }

  return `Business Analysis Report\n\nBusiness Score: ${report.businessScore}%\nAutomation Readiness: ${report.automationReadiness}%\nDigital Maturity: ${report.digitalMaturity}%\nManual Dependency: ${report.manualDependency}\nEstimated Time Loss: ${report.timeLoss} hours/month\nEstimated Leakage/Risk: ${report.revenueLoss}\n\nRelevant ARDS recommendations:\n${recommendations}\n\nPrimary Solution: ${solution.name}\nEstimated Range: ${solution.range}\nTimeline: ${solution.timeline}\n\nROI logic: ARDS should focus on workflows where manual entry, delayed approvals, attendance, billing, inventory, and reporting create measurable time or revenue leakage.\n\nImplementation Roadmap:\n${roadmap}\n\nNext step: Share name, company, and phone number, and I can convert this into a proposal or consultation request.`;
}

function estimateCost(form) {
  const profile = estimatorProfiles[form.type] || estimatorProfiles['Custom Software'];
  const market = getMarketPricing(form);
  const featureCount = form.features.length;
  const users = Number(form.users || 0);
  const integrations = Number(form.integrations || 0);
  const pageCount = Number(form.pages || 0);
  const timelineWeight = form.timeline === 'Urgent' ? 0.16 : form.timeline === 'Flexible' ? -0.04 : 0.06;
  const securityWeight = form.security === 'High' ? 0.16 : form.security === 'Standard' ? 0.06 : 0;
  const scaleWeight = form.scalability === 'Enterprise' ? 0.18 : form.scalability === 'Growth' ? 0.08 : 0;
  const featureWeight = Math.min(0.28, featureCount * 0.035);
  const userWeight = Math.min(0.18, Math.max(0, users - 25) / 500);
  const integrationWeight = Math.min(0.2, integrations * 0.045);
  const pageWeight = form.type === 'Website' ? Math.min(0.16, Math.max(0, pageCount - 5) * 0.012) : 0;
  const hostingWeight = form.hosting === 'Yes' ? 0.035 : 0;
  const complexityFactor = Math.max(0, Math.min(1, 0.18 + featureWeight + userWeight + integrationWeight + pageWeight + timelineWeight + securityWeight + scaleWeight + hostingWeight));
  const spread = market.high - market.low;
  const low = roundToNearest(market.low + spread * complexityFactor * 0.42, 5000);
  const high = roundToNearest(Math.max(low + spread * 0.16, market.low + spread * Math.min(1, complexityFactor + 0.28)), 5000);
  const recommended = Math.round((low + high) / 2);
  const premium = Math.min(market.high, roundToNearest(high * 1.18, 5000));
  const gstLow = Math.round(low * 0.18);
  const gstHigh = Math.round(high * 0.18);
  const complexityScore = Math.min(100, 24 + featureCount * 7 + integrations * 8 + Math.max(0, users - 20) / 8 + (form.timeline === 'Urgent' ? 14 : 0) + (form.security === 'High' ? 10 : 0) + (form.scalability === 'Enterprise' ? 12 : 0));
  const risk = complexityScore > 74 ? 'High' : complexityScore > 48 ? 'Medium' : 'Low';
  const maintenance = Math.round(recommended * 0.08);
  const hosting = form.hosting === 'Yes' ? profile.hosting : 0;
  const budgetMax = budgetRanges[form.budget]?.max ?? null;
  const included = [...new Set([...profile.priority, ...form.features])].slice(0, 5);
  const excluded = [...new Set([...profile.postpone, ...form.features.slice(5)])].slice(0, 5);
  const futureUpgrade = budgetMax ? Math.max(0, recommended - budgetMax) : Math.round(recommended * 0.35);
  return {
    low,
    high,
    recommended,
    premium,
    minimum: low,
    weeks: form.timeline === 'Urgent' ? profile.urgentWeeks : form.timeline === 'Flexible' ? profile.flexibleWeeks : profile.standardWeeks,
    complexity: complexityScore > 74 ? 'Enterprise' : complexityScore > 48 ? 'Advanced' : 'Focused',
    complexityScore: Math.round(complexityScore),
    risk,
    security: form.security || 'Standard',
    scalability: form.scalability || 'Growth',
    team: profile.team,
    stack: profile.stack,
    maintenance,
    hosting,
    gstLow,
    gstHigh,
    gstRate: 18,
    support: '30 Days Free Support Included',
    amc: 'Available on Request',
    roi: profile.roi,
    postpone: profile.postpone.filter((item) => form.features.includes(item) || featureCount > 4).slice(0, 3),
    priority: profile.priority,
    included,
    excluded,
    marketLabel: market.label,
    budgetMax,
    needsNegotiation: budgetMax ? budgetMax < recommended : false,
    phaseOne: budgetMax ? Math.min(budgetMax, recommended) : Math.round(recommended * 0.62),
    futureUpgrade
  };
}

function formatCurrency(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`;
}

function roundToNearest(value, step = 5000) {
  return Math.round(value / step) * step;
}

function getMarketPricing(form) {
  const key = `${form.type}:${form.subtype}`.toLowerCase();
  if (key.includes('website:business website')) return { label: 'Business Website', low: 20000, high: 60000 };
  if (key.includes('website:e-commerce')) return { label: 'E-commerce Website', low: 60000, high: 300000 };
  if (key.includes('website:custom portal')) return { label: 'Custom Web Portal', low: 150000, high: 1200000 };
  if (form.type === 'Website') return { label: 'Corporate Website', low: 40000, high: 120000 };
  if (key.includes('school erp')) return { label: 'School ERP', low: 250000, high: 1200000 };
  if (key.includes('college erp')) return { label: 'College ERP', low: 400000, high: 2000000 };
  if (key.includes('hospital erp')) return { label: 'Hospital ERP', low: 500000, high: 2500000 };
  if (key.includes('manufacturing erp')) return { label: 'Manufacturing ERP', low: 800000, high: 5000000 };
  if (key.includes('hrms')) return { label: 'HRMS', low: 150000, high: 800000 };
  if (key.includes('inventory')) return { label: 'Inventory Management', low: 80000, high: 500000 };
  if (form.type === 'ERP') return { label: 'ERP Solution', low: 250000, high: 2000000 };
  if (form.type === 'AI Automation') return { label: 'AI Automation', low: 100000, high: 1500000 };
  if (form.type === 'Mobile App') return { label: 'Mobile Application', low: 150000, high: 1500000 };
  if (form.type === 'Cloud') return { label: 'Cloud Migration', low: 50000, high: 1000000 };
  if (form.type === 'Digital Marketing') return { label: 'Digital Marketing Program', low: 35000, high: 300000 };
  return { label: 'Custom Enterprise Software', low: 500000, high: 10000000 };
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function proposalNumber(company) {
  const date = new Date();
  const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  return `ARDS-${stamp}-${slugify(company || 'proposal').slice(0, 10).toUpperCase() || 'CLIENT'}`;
}

function buildEnterpriseProposalHtml(proposal, aiNote = '') {
  const company = escapeHtml(proposal.company || 'Prospective Client');
  const industry = escapeHtml(proposal.industry || 'Digital Transformation');
  const requirements = escapeHtml(proposal.requirements || 'Discovery, solution design, development, deployment, training, and support.');
  const budget = escapeHtml(proposal.budget || 'To be confirmed after discovery');
  const timeline = escapeHtml(proposal.timeline || '6 - 12 weeks, subject to confirmed scope');
  const solution = detectSolution(`${proposal.industry} ${proposal.requirements}`);
  const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const number = proposalNumber(proposal.company);
  const modules = solution.modules.slice(0, 7);
  const services = ['Website Development', 'ERP Solutions', 'AI Automation', 'Cloud Infrastructure', 'Mobile App', 'Digital Marketing', 'Cyber Security'];
  const scores = [
    ['Digital Maturity', 68],
    ['Automation Readiness', 74],
    ['Business Health', 71],
    ['AI Readiness', 63],
    ['Security Score', 66],
    ['Technology Gap', 58]
  ];
  const milestones = ['Discovery', 'UI/UX', 'Development', 'Testing', 'Deployment', 'Training', 'Support'];
  const team = ['Project Manager', 'UI/UX Designer', 'Frontend Developer', 'Backend Developer', 'AI Engineer', 'QA Engineer', 'Support Team'];
  const qrSite = `https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent('https://www.ards.in')}`;
  const qrWhatsApp = `https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent('https://wa.me/919308579699')}`;
  const sections = [
    'Executive Summary',
    'Business Analysis',
    'Client Requirements',
    'Problem Statement',
    'Proposed Solution',
    'Solution Architecture',
    'Modules',
    'Project Timeline',
    'Team Structure',
    'Estimated Investment',
    'ROI Analysis',
    'Why Choose ARDS',
    'Portfolio',
    'Testimonials',
    'Next Steps',
    'Contact'
  ];

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${company} - ARDS Enterprise Proposal</title>
<style>
@page{size:A4;margin:0}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:#e5e7eb;color:#111827;font-family:Inter,Arial,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
a{color:inherit;text-decoration:none}
.proposal{width:210mm;margin:auto;background:white}
.page{position:relative;min-height:297mm;padding:24mm 18mm 22mm;overflow:hidden;page-break-after:always;background:#fff}
.page:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 86% 8%,#ddd6fe 0,transparent 25%),radial-gradient(circle at 12% 88%,#dbeafe 0,transparent 24%);opacity:.75;pointer-events:none}
.cover{color:white;background:linear-gradient(145deg,#061127,#102a6b 55%,#5b21b6)}
.cover:before{background-image:linear-gradient(#ffffff10 1px,transparent 1px),linear-gradient(90deg,#ffffff10 1px,transparent 1px);background-size:22px 22px;opacity:.55}
.cover:after{content:"";position:absolute;right:-38mm;top:36mm;width:120mm;height:120mm;border:1px solid #ffffff24;border-radius:50%;box-shadow:0 0 0 18mm #ffffff08,0 0 0 36mm #ffffff05}
.brand-row,.footer-row,.cover-grid,.section-title,.toc-row,.meta-grid,.card-grid,.score-grid,.architecture,.timeline,.team-grid,.pricing-grid,.roi-grid,.contact-grid{position:relative;z-index:1}
.brand-row{display:flex;align-items:center;justify-content:space-between;gap:14px}
.brand{display:flex;align-items:center;gap:12px}.brand img{width:42px;height:42px;object-fit:contain}.brand b{display:block;color:#1e40af;font-size:15px}.brand span{display:block;color:#64748b;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.14em}
.cover .brand b,.cover .brand span{color:white}.badge{display:inline-flex;align-items:center;gap:7px;border:1px solid #ffffff38;border-radius:999px;padding:8px 11px;background:#ffffff12;color:inherit;font-size:8px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
.cover-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:18mm;align-items:end;margin-top:42mm}.kicker{display:inline-flex;margin-bottom:12px;color:#a5f3fc;font-size:9px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.cover h1{margin:0;font-size:42px;line-height:.98;letter-spacing:-.06em}.cover p{max-width:120mm;color:#dbeafe;font-size:13px;line-height:1.7}.cover-panel{border:1px solid #ffffff2b;border-radius:18px;background:#ffffff12;padding:18px;backdrop-filter:blur(10px);box-shadow:0 24px 70px #02061752}.cover-panel h2{margin:0 0 12px;font-size:19px}.cover-panel dl{display:grid;gap:11px;margin:0}.cover-panel div{border-top:1px solid #ffffff1c;padding-top:9px}.cover-panel dt{color:#bfdbfe;font-size:7px;font-weight:900;text-transform:uppercase;letter-spacing:.14em}.cover-panel dd{margin:3px 0 0;font-size:12px;font-weight:800}
.network{height:70mm;margin-top:20mm;border:1px solid #ffffff20;border-radius:22px;background:radial-gradient(circle at 30% 40%,#67e8f966,transparent 22%),radial-gradient(circle at 72% 24%,#c084fc66,transparent 24%),linear-gradient(145deg,#ffffff12,#ffffff05);position:relative;z-index:1}.network i{position:absolute;width:8px;height:8px;border-radius:50%;background:white;box-shadow:0 0 20px #67e8f9}.network i:nth-child(1){left:18%;top:24%}.network i:nth-child(2){left:48%;top:42%}.network i:nth-child(3){right:20%;top:20%}.network i:nth-child(4){right:28%;bottom:22%}.network svg{position:absolute;inset:0;width:100%;height:100%}
.section-title{margin-bottom:16px}.section-title span{color:#7c3aed;font-size:8px;font-weight:900;letter-spacing:.15em;text-transform:uppercase}.section-title h2{margin:8px 0 0;color:#0f172a;font-size:30px;line-height:1.04;letter-spacing:-.05em}.lead{position:relative;z-index:1;color:#475569;font-size:13px;line-height:1.75}
.toc-row{display:grid;grid-template-columns:1fr 34px;align-items:center;padding:12px 0;border-bottom:1px solid #e5e7eb;color:#1e293b}.toc-row b{font-size:13px}.toc-row span{color:#7c3aed;font-size:11px;font-weight:900;text-align:right}
.meta-grid,.card-grid,.score-grid,.team-grid,.pricing-grid,.roi-grid{display:grid;gap:12px}.meta-grid{grid-template-columns:repeat(3,1fr);margin-top:20px}.card-grid{grid-template-columns:repeat(2,1fr);margin-top:18px}.score-grid{grid-template-columns:repeat(3,1fr);margin-top:18px}.team-grid{grid-template-columns:repeat(4,1fr)}.pricing-grid{grid-template-columns:repeat(3,1fr)}.roi-grid{grid-template-columns:repeat(4,1fr)}
.card,.score,.team-card,.price-card,.roi-card,.module-card,.why-card,.portfolio-card,.quote-card{position:relative;z-index:1;border:1px solid #e2e8f0;border-radius:16px;background:linear-gradient(145deg,#fff,#f8fafc);padding:15px;box-shadow:0 12px 34px #1e3a8a0d}.card b,.module-card b,.team-card b,.why-card b,.portfolio-card b{display:block;color:#1e3a8a;font-size:13px}.card p,.module-card p,.why-card p,.portfolio-card p,.quote-card p{margin:8px 0 0;color:#64748b;font-size:10px;line-height:1.6}.score strong{display:block;color:#0f172a;font-size:28px}.score span,.price-card span,.roi-card span{color:#64748b;font-size:8px;font-weight:900;text-transform:uppercase;letter-spacing:.1em}.bar{height:7px;margin-top:12px;border-radius:999px;background:#e5e7eb;overflow:hidden}.bar i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#2563eb,#7c3aed,#ec4899)}
.architecture{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:18px}.arch-node{min-height:38mm;border:1px solid #c7d2fe;border-radius:18px;padding:15px;background:#f8fbff;text-align:center}.arch-node b{display:block;color:#1e3a8a}.arch-node span{display:inline-flex;margin-top:9px;padding:7px 9px;border-radius:999px;background:white;color:#475569;font-size:9px;font-weight:800}.arch-line{grid-column:1/-1;height:16px;background:linear-gradient(90deg,#2563eb,#7c3aed,#ec4899);border-radius:999px;opacity:.85}
.module-grid,.why-grid,.portfolio-grid,.quote-grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.module-card i,.why-card i{display:grid;place-items:center;width:34px;height:34px;border-radius:11px;color:white;background:linear-gradient(135deg,#2563eb,#7c3aed);font-style:normal;font-weight:900;margin-bottom:10px}
.timeline{display:grid;gap:10px;margin-top:18px}.milestone{display:grid;grid-template-columns:32mm 1fr;gap:10px;align-items:center}.milestone b{color:#1e3a8a;font-size:11px}.track{height:13px;border-radius:999px;background:#e0e7ff;overflow:hidden}.track i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#2563eb,#7c3aed)}
.price-card.recommended{color:white;background:linear-gradient(145deg,#1e40af,#6d28d9);border-color:transparent}.price-card strong{display:block;margin:9px 0;color:#1e3a8a;font-size:20px}.price-card.recommended strong,.price-card.recommended span,.price-card.recommended p{color:white}.note{position:relative;z-index:1;margin-top:14px;border-left:4px solid #7c3aed;padding:12px 14px;background:#f5f3ff;color:#5b21b6;font-size:10px;font-weight:800;line-height:1.6}
.contact-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:16px;margin-top:20px}.qr-row{display:flex;gap:14px}.qr-row img{width:96px;height:96px;border:1px solid #e2e8f0;border-radius:12px;padding:7px;background:white}
.footer-row{position:absolute;left:18mm;right:18mm;bottom:10mm;display:flex;align-items:center;justify-content:space-between;border-top:1px solid #e5e7eb;padding-top:7px;color:#94a3b8;font-size:8px}.footer-row img{width:18px;height:18px;vertical-align:middle;margin-right:6px}.cover .footer-row{border-color:#ffffff25;color:#cbd5e1}
@media print{body{background:white}.proposal{width:auto}.page{margin:0;box-shadow:none}.no-print{display:none!important}}
</style>
</head>
<body>
<main class="proposal">
<section class="page cover" id="cover">
  <div class="brand-row"><div class="brand"><img src="${ardsLogo}" alt="ARDS logo"><div><b>Alpenrose Digital Solutions</b><span>Empowering Businesses Through Innovative Digital Transformations</span></div></div><span class="badge">Confidential</span></div>
  <div class="cover-grid"><div><span class="kicker">Enterprise Consulting Proposal</span><h1>${escapeHtml(solution.name)}</h1><p>A premium transformation roadmap prepared for ${company}, designed to improve business clarity, operational efficiency, automation readiness, and scalable digital growth.</p></div><div class="cover-panel"><h2>Proposal Details</h2><dl><div><dt>Prepared For</dt><dd>${company}</dd></div><div><dt>Industry</dt><dd>${industry}</dd></div><div><dt>Prepared By</dt><dd>Alpenrose Digital Solutions (ARDS)</dd></div><div><dt>Date</dt><dd>${date}</dd></div><div><dt>Proposal Number</dt><dd>${number}</dd></div></dl></div></div>
  <div class="network"><svg viewBox="0 0 600 220" fill="none"><path d="M110 62L290 105L485 54M290 105L430 165M110 62L170 170M170 170L430 165" stroke="white" stroke-opacity=".34" stroke-width="2"/></svg><i></i><i></i><i></i><i></i></div>
  <div class="footer-row"><span><img src="${ardsLogo}" alt="">Confidential</span><span>Generated by ARDS AI Consultant</span></div>
</section>
<section class="page" id="contents"><div class="brand-row"><div class="brand"><img src="${ardsLogo}" alt=""><div><b>ARDS</b><span>Enterprise Proposal</span></div></div><span class="badge" style="color:#1e3a8a;border-color:#dbeafe;background:#eff6ff">Table of Contents</span></div><div class="section-title" style="margin-top:24mm"><span>Navigation</span><h2>Contents</h2></div>${sections.map((section, index) => `<a class="toc-row" href="#${slugify(section)}"><b>${section}</b><span>${index + 3}</span></a>`).join('')}<div class="footer-row"><span><img src="${ardsLogo}" alt="">Confidential</span><span>Page 2 | Generated by ARDS AI Consultant</span></div></section>
<section class="page" id="executive-summary"><div class="section-title"><span>01 / Executive Summary</span><h2>Strategic Transformation Overview</h2></div><p class="lead">ARDS recommends ${escapeHtml(solution.name)} for ${company}. The engagement should focus on confirmed business goals, current operational friction, user workflows, reporting needs, security, scalability, and measurable outcomes. ${escapeHtml(aiNote).slice(0, 420)}</p><div class="meta-grid"><div class="card"><b>Business Goals</b><p>Digitize workflows, improve visibility, reduce manual dependency, and create a reliable foundation for growth.</p></div><div class="card"><b>Challenges</b><p>Fragmented systems, manual reporting, limited automation, unclear data ownership, and avoidable operational delays.</p></div><div class="card"><b>Expected Outcome</b><p>A secure, scalable, and measurable digital platform aligned with the client's business priorities.</p></div></div><div class="footer-row"><span><img src="${ardsLogo}" alt="">Confidential</span><span>Page 3 | Generated by ARDS AI Consultant</span></div></section>
<section class="page" id="business-analysis"><div class="section-title"><span>02 / Business Analysis</span><h2>Readiness Dashboard</h2></div><div class="score-grid">${scores.map(([label, value]) => `<div class="score"><span>${label}</span><strong>${value}%</strong><div class="bar"><i style="width:${value}%"></i></div></div>`).join('')}</div><div class="card-grid"><div class="card"><b>Technology Gap</b><p>ARDS should validate current tools, data flow, integrations, and decision reporting before final architecture approval.</p></div><div class="card"><b>Operational Priority</b><p>The first phase should target high-frequency workflows where automation produces immediate business value.</p></div></div><div class="footer-row"><span><img src="${ardsLogo}" alt="">Confidential</span><span>Page 4 | Generated by ARDS AI Consultant</span></div></section>
<section class="page" id="client-requirements"><div class="section-title"><span>03 / Client Requirements</span><h2>Requirement Summary</h2></div><div class="card-grid"><div class="card"><b>Client</b><p>${company}</p></div><div class="card"><b>Industry</b><p>${industry}</p></div><div class="card"><b>Requirement</b><p>${requirements}</p></div><div class="card"><b>Preferred Budget / Timeline</b><p>${budget}<br>${timeline}</p></div></div><div class="footer-row"><span><img src="${ardsLogo}" alt="">Confidential</span><span>Page 5 | Generated by ARDS AI Consultant</span></div></section>
<section class="page" id="problem-statement"><div class="section-title"><span>04 / Problem Statement</span><h2>Current Problems and Business Impact</h2></div><div class="card-grid"><div class="card"><b>Current Problems</b><p>Manual work, disconnected data, weak reporting, and limited real-time operational visibility.</p></div><div class="card"><b>Business Impact</b><p>Higher cost of coordination, slower decisions, reduced customer experience, and preventable leakage.</p></div><div class="card"><b>Operational Risks</b><p>Data inconsistency, security exposure, user adoption risk, and poor scalability if architecture is not planned carefully.</p></div><div class="card"><b>ARDS Response</b><p>Structured discovery, phased implementation, secure architecture, and measurable delivery governance.</p></div></div><div class="footer-row"><span><img src="${ardsLogo}" alt="">Confidential</span><span>Page 6 | Generated by ARDS AI Consultant</span></div></section>
<section class="page" id="proposed-solution"><div class="section-title"><span>05 / Proposed Solution</span><h2>Recommended ARDS Services</h2></div><div class="module-grid">${services.map((service, index) => `<div class="module-card"><i>${index + 1}</i><b>${service}</b><p>Designed to support ${company} with scalable delivery, secure implementation, and measurable business outcomes.</p></div>`).join('')}</div><div class="footer-row"><span><img src="${ardsLogo}" alt="">Confidential</span><span>Page 7 | Generated by ARDS AI Consultant</span></div></section>
<section class="page" id="solution-architecture"><div class="section-title"><span>06 / Solution Architecture</span><h2>System Blueprint</h2></div><div class="architecture"><div class="arch-node"><b>User Experience</b><span>Web / Mobile / Portal</span></div><div class="arch-node"><b>Application Layer</b><span>ERP, AI, CRM, Automation</span></div><div class="arch-node"><b>Data Layer</b><span>Database, Reports, Analytics</span></div><div class="arch-line"></div><div class="arch-node"><b>Security</b><span>Roles, Audit, Backup</span></div><div class="arch-node"><b>Integrations</b><span>Payment, WhatsApp, APIs</span></div><div class="arch-node"><b>Cloud</b><span>Hosting, Monitoring, Scaling</span></div></div><div class="footer-row"><span><img src="${ardsLogo}" alt="">Confidential</span><span>Page 8 | Generated by ARDS AI Consultant</span></div></section>
<section class="page" id="modules"><div class="section-title"><span>07 / Modules</span><h2>Functional Modules</h2></div><div class="module-grid">${modules.map((module, index) => `<div class="module-card"><i>${index + 1}</i><b>${escapeHtml(module)}</b><p><strong>Description:</strong> Core workflow module for the proposed solution.<br><strong>Benefits:</strong> Better control, faster operations, and cleaner reporting.<br><strong>Business Value:</strong> Reduces manual effort and improves decision visibility.</p></div>`).join('')}</div><div class="footer-row"><span><img src="${ardsLogo}" alt="">Confidential</span><span>Page 9 | Generated by ARDS AI Consultant</span></div></section>
<section class="page" id="project-timeline"><div class="section-title"><span>08 / Project Timeline</span><h2>Milestone Roadmap</h2></div><p class="lead">Estimated timeline: ${timeline}</p><div class="timeline">${milestones.map((item, index) => `<div class="milestone"><b>${item}</b><div class="track"><i style="width:${Math.min(100, 22 + index * 12)}%"></i></div></div>`).join('')}</div><div class="footer-row"><span><img src="${ardsLogo}" alt="">Confidential</span><span>Page 10 | Generated by ARDS AI Consultant</span></div></section>
<section class="page" id="team-structure"><div class="section-title"><span>09 / Team Structure</span><h2>Delivery Team</h2></div><div class="team-grid">${team.map((person) => `<div class="team-card"><b>${person}</b><p>Responsible for quality, execution, coordination, and successful delivery.</p></div>`).join('')}</div><div class="footer-row"><span><img src="${ardsLogo}" alt="">Confidential</span><span>Page 11 | Generated by ARDS AI Consultant</span></div></section>
<section class="page" id="estimated-investment"><div class="section-title"><span>10 / Estimated Investment</span><h2>Commercial Overview</h2></div><div class="pricing-grid"><div class="price-card"><span>Estimated Range</span><strong>${escapeHtml(solution.range)}</strong><p>Depends on confirmed users, integrations, hosting, and modules.</p></div><div class="price-card recommended"><span>Recommended Budget</span><strong>${budget}</strong><p>Best validated after discovery and scope alignment.</p></div><div class="price-card"><span>Maintenance</span><strong>8% - 15% yearly</strong><p>Support, updates, monitoring, and enhancement planning.</p></div></div><div class="note">This is an estimated quotation generated by AI. Final pricing may vary after detailed project discussion.</div><div class="footer-row"><span><img src="${ardsLogo}" alt="">Confidential</span><span>Page 12 | Generated by ARDS AI Consultant</span></div></section>
<section class="page" id="roi-analysis"><div class="section-title"><span>11 / ROI Analysis</span><h2>Expected Business Return</h2></div><div class="roi-grid"><div class="roi-card"><span>Time Saved</span><strong>30-45%</strong><p>Less manual entry.</p></div><div class="roi-card"><span>Cost Savings</span><strong>15-28%</strong><p>Reduced leakage.</p></div><div class="roi-card"><span>Efficiency</span><strong>35%</strong><p>Faster approvals.</p></div><div class="roi-card"><span>Automation</span><strong>High</strong><p>${escapeHtml(solution.roi)}</p></div></div><div class="footer-row"><span><img src="${ardsLogo}" alt="">Confidential</span><span>Page 13 | Generated by ARDS AI Consultant</span></div></section>
<section class="page" id="why-choose-ards"><div class="section-title"><span>12 / Why Choose ARDS</span><h2>Enterprise Delivery Strengths</h2></div><div class="why-grid">${['Industry Expertise','AI Automation','Custom Development','24x7 Support','Scalable Solutions','Secure Architecture','Dedicated Team','Transparent Delivery'].map((item, index) => `<div class="why-card"><i>${index + 1}</i><b>${item}</b><p>Professional consulting, engineering, and implementation practices aligned with business outcomes.</p></div>`).join('')}</div><div class="footer-row"><span><img src="${ardsLogo}" alt="">Confidential</span><span>Page 14 | Generated by ARDS AI Consultant</span></div></section>
<section class="page" id="portfolio"><div class="section-title"><span>13 / Portfolio</span><h2>Selected Work Signals</h2></div><div class="portfolio-grid">${['Education ERP','Healthcare ERP','Manufacturing Automation','Web & Mobile Platform'].map((item) => `<div class="portfolio-card"><b>${item}</b><p><strong>Industry:</strong> ${industry}<br><strong>Technology:</strong> React, Cloud, Database, Automation<br><strong>Result:</strong> Faster operations, stronger reporting, and improved stakeholder experience.</p></div>`).join('')}</div><div class="footer-row"><span><img src="${ardsLogo}" alt="">Confidential</span><span>Page 15 | Generated by ARDS AI Consultant</span></div></section>
<section class="page" id="testimonials"><div class="section-title"><span>14 / Testimonials</span><h2>Client Confidence</h2></div><div class="quote-grid"><div class="quote-card"><p>"ARDS brought structure, speed, and clarity to our digital transformation plan."</p><b>Operations Leader</b></div><div class="quote-card"><p>"The team understood our workflows and converted them into a practical platform roadmap."</p><b>Business Owner</b></div><div class="quote-card"><p>"Professional communication, strong UI thinking, and reliable delivery planning."</p><b>Project Stakeholder</b></div></div><div class="footer-row"><span><img src="${ardsLogo}" alt="">Confidential</span><span>Page 16 | Generated by ARDS AI Consultant</span></div></section>
<section class="page" id="next-steps"><div class="section-title"><span>15 / Next Steps</span><h2>Recommended Process</h2></div><div class="timeline">${['Free Consultation','Requirement Gathering','Proposal Approval','Development','Go Live'].map((item, index) => `<div class="milestone"><b>${index + 1}. ${item}</b><div class="track"><i style="width:${(index + 1) * 20}%"></i></div></div>`).join('')}</div><div class="footer-row"><span><img src="${ardsLogo}" alt="">Confidential</span><span>Page 17 | Generated by ARDS AI Consultant</span></div></section>
<section class="page" id="contact"><div class="section-title"><span>16 / Contact</span><h2>Alpenrose Digital Solutions</h2></div><div class="contact-grid"><div class="card"><b>Contact Details</b><p>Justice Madal Path,<br>Rajbanshi Nagar,<br>Patna - 800023<br><br><strong>Phone:</strong> +91 9308579699<br><strong>Email:</strong> business@ards.in<br><strong>Website:</strong> www.ards.in</p></div><div class="card"><b>Quick Access</b><div class="qr-row"><span><img src="${qrSite}" alt="Website QR"><p>Website</p></span><span><img src="${qrWhatsApp}" alt="WhatsApp QR"><p>WhatsApp</p></span></div></div></div><div class="footer-row"><span><img src="${ardsLogo}" alt="">Copyright ARDS</span><span>Generated by ARDS AI Consultant</span></div></section>
</main>
</body>
</html>`;
}

const budgetRanges = {
  'Below ₹50,000': { max: 50000 },
  '₹50,000-₹1,00,000': { max: 100000 },
  '₹1,00,000-₹5,00,000': { max: 500000 },
  '₹5,00,000-₹10,00,000': { max: 1000000 },
  'Above ₹10,00,000': { max: 99999999 },
  'Custom Budget': { max: null }
};

const estimatorProfiles = {
  Website: {
    base: 25000,
    featureRate: 8000,
    integrationRate: 14000,
    userRate: 0,
    hosting: 4000,
    standardWeeks: '2 - 6 weeks',
    urgentWeeks: '10 - 21 days',
    flexibleWeeks: '4 - 9 weeks',
    team: ['UX Designer', 'Frontend Engineer', 'SEO Specialist', 'QA'],
    stack: ['React', 'Vite/Next.js', 'Supabase/CMS', 'Analytics', 'SEO schema'],
    roi: 'More qualified enquiries, stronger trust, better local search visibility.',
    priority: ['Clear offer pages', 'Lead capture', 'Mobile speed', 'SEO foundation'],
    postpone: ['Multi-language', 'Advanced booking', 'Custom portal', 'AI Assistant']
  },
  ERP: {
    base: 250000,
    featureRate: 45000,
    integrationRate: 65000,
    userRate: 1200,
    hosting: 15000,
    standardWeeks: '8 - 18 weeks',
    urgentWeeks: '6 - 12 weeks',
    flexibleWeeks: '12 - 28 weeks',
    team: ['Solution Architect', 'Product Designer', 'Frontend Engineer', 'Backend Engineer', 'QA'],
    stack: ['React', 'PostgreSQL', 'Supabase/Node APIs', 'Role-based access', 'Reports'],
    roi: 'Less manual work, lower leakage, faster reporting and better management control.',
    priority: ['User roles', 'Core workflows', 'Reports', 'Audit trail'],
    postpone: ['AI Assistant', 'Mobile App', 'Advanced analytics']
  },
  'Mobile App': {
    base: 180000,
    featureRate: 35000,
    integrationRate: 50000,
    userRate: 900,
    hosting: 12000,
    standardWeeks: '8 - 16 weeks',
    urgentWeeks: '6 - 10 weeks',
    flexibleWeeks: '12 - 22 weeks',
    team: ['Product Designer', 'Flutter Engineer', 'API Engineer', 'QA'],
    stack: ['Flutter', 'Android/iOS', 'Supabase/API', 'Push notifications'],
    roi: 'Faster access for customers, staff or field teams with better engagement.',
    priority: ['Core journeys', 'Authentication', 'Notifications', 'API sync'],
    postpone: ['Offline mode', 'AI Assistant', 'Advanced analytics']
  },
  'AI Automation': {
    base: 150000,
    featureRate: 42000,
    integrationRate: 55000,
    userRate: 800,
    hosting: 12000,
    standardWeeks: '4 - 12 weeks',
    urgentWeeks: '3 - 8 weeks',
    flexibleWeeks: '8 - 16 weeks',
    team: ['AI Architect', 'Workflow Consultant', 'Full Stack Engineer', 'QA'],
    stack: ['AI workflow', 'OCR/RAG', 'Supabase', 'Automation rules', 'Human review'],
    roi: 'Reduced repetitive work, faster document handling and cleaner decisions.',
    priority: ['Workflow mapping', 'Human approval', 'Data structure', 'Monitoring'],
    postpone: ['Voice UI', 'Predictive analytics', 'Large custom model']
  },
  'Digital Marketing': {
    base: 35000,
    featureRate: 10000,
    integrationRate: 12000,
    userRate: 0,
    hosting: 0,
    standardWeeks: 'Monthly program',
    urgentWeeks: '2 - 4 weeks setup',
    flexibleWeeks: 'Quarterly program',
    team: ['SEO Specialist', 'Content Strategist', 'Designer', 'Ads Specialist'],
    stack: ['SEO', 'Analytics', 'Landing pages', 'CRM tracking'],
    roi: 'Better lead quality, measurable campaigns and stronger search presence.',
    priority: ['Analytics', 'Landing pages', 'Keyword map', 'Conversion tracking'],
    postpone: ['Large ad scale', 'Video campaigns', 'Advanced automation']
  },
  Cloud: {
    base: 80000,
    featureRate: 18000,
    integrationRate: 35000,
    userRate: 0,
    hosting: 18000,
    standardWeeks: '2 - 8 weeks',
    urgentWeeks: '1 - 4 weeks',
    flexibleWeeks: '4 - 12 weeks',
    team: ['Cloud Architect', 'DevOps Engineer', 'Security Reviewer'],
    stack: ['Vercel/AWS', 'Backups', 'Monitoring', 'CI/CD', 'Storage'],
    roi: 'Improved uptime, safer releases, faster deployments and better recovery.',
    priority: ['Hosting', 'Backups', 'Monitoring', 'Security'],
    postpone: ['Multi-region setup', 'Advanced observability', 'Enterprise SSO']
  },
  'Custom Software': {
    base: 180000,
    featureRate: 38000,
    integrationRate: 52000,
    userRate: 1000,
    hosting: 12000,
    standardWeeks: '6 - 18 weeks',
    urgentWeeks: '4 - 10 weeks',
    flexibleWeeks: '10 - 24 weeks',
    team: ['Solution Architect', 'UX Designer', 'Full Stack Engineer', 'QA'],
    stack: ['React', 'PostgreSQL', 'Supabase/Node', 'Dashboards', 'Integrations'],
    roi: 'Workflow fit, less tool switching, cleaner accountability and reporting.',
    priority: ['Discovery', 'MVP workflows', 'Role access', 'Reports'],
    postpone: ['Advanced AI', 'Native app', 'Complex integrations']
  }
};

const estimatorQuestions = {
  Website: ['Business Website', 'E-commerce', 'Portfolio', 'Landing Page', 'Custom Portal'],
  ERP: ['School ERP', 'College ERP', 'Hospital ERP', 'Manufacturing ERP', 'HRMS', 'Inventory'],
  'Mobile App': ['Customer App', 'Staff App', 'Delivery App', 'Parent/Patient App', 'Marketplace'],
  'AI Automation': ['Document AI', 'Chatbot', 'Workflow Automation', 'OCR', 'AI Reports'],
  'Digital Marketing': ['SEO', 'Lead Generation', 'Landing Pages', 'Content', 'Paid Ads'],
  Cloud: ['Hosting', 'Migration', 'Backups', 'DevOps', 'Security'],
  'Custom Software': ['Admin Dashboard', 'CRM', 'Portal', 'Workflow App', 'Reporting System']
};

function calculateLeadScore(messages, lead) {
  const combined = `${messages.map((message) => message.text).join(' ')} ${Object.values(lead).join(' ')}`.toLowerCase();
  let score = 18;
  ['hospital', 'school', 'college', 'erp', 'website', 'automation', 'mobile', 'cloud', 'crm'].forEach((term) => {
    if (combined.includes(term)) score += 7;
  });
  ['budget', 'cost', 'quote', 'quotation', 'price'].forEach((term) => {
    if (combined.includes(term)) score += 8;
  });
  ['urgent', 'deadline', 'timeline', 'demo', 'meeting', 'call'].forEach((term) => {
    if (combined.includes(term)) score += 8;
  });
  if (lead.name) score += 8;
  if (lead.company) score += 8;
  if (lead.phone) score += 12;
  return Math.min(score, 100);
}

function leadStage(score) {
  if (score >= 78) return 'Sales-ready lead';
  if (score >= 52) return 'Qualified discovery';
  if (score >= 30) return 'Early research';
  return 'New visitor';
}

const initialEstimator = {
  business: 'Growing business',
  type: 'Website',
  subtype: 'Business Website',
  pages: 8,
  users: 25,
  integrations: 1,
  timeline: 'Standard',
  budget: '₹50,000-₹1,00,000',
  hosting: 'Yes',
  security: 'Standard',
  scalability: 'Growth',
  features: ['Custom Design', 'SEO Required', 'Lead Forms']
};

function activeAgent(messages) {
  const text = messages.map((message) => message.text).join(' ');
  return expertAgents.find(([, pattern]) => pattern.test(text))?.[0] || 'Business Consultant';
}

function maturityScores(messages, lead) {
  const report = createBusinessReport(messages);
  const text = `${messages.map((message) => message.text).join(' ')} ${Object.values(lead).join(' ')}`.toLowerCase();
  const manualPenalty = /manual|excel|paper|register/.test(text) ? -18 : 4;
  const cloudBoost = /cloud|online|website|app|software|erp/.test(text) ? 12 : 0;
  const securityBoost = /security|role|permission|backup|audit/.test(text) ? 10 : 0;
  const clamp = (value) => Math.max(18, Math.min(96, Math.round(value)));
  return [
    ['Digital Maturity', clamp(report.digitalMaturity)],
    ['Automation Score', clamp(report.automationReadiness)],
    ['Security Score', clamp(48 + securityBoost + report.completed * 5)],
    ['Cloud Readiness', clamp(42 + cloudBoost + report.completed * 4)],
    ['AI Readiness', clamp(38 + (/data|report|attendance|workflow|prediction|ocr|analytics/.test(text) ? 18 : 0) + report.completed * 5)],
    ['Operational Efficiency', clamp(58 + manualPenalty + report.completed * 6)],
    ['Technology Health', clamp(44 + cloudBoost + securityBoost + report.completed * 4)],
    ['Growth Potential', clamp(60 + report.completed * 6)]
  ];
}

function auditFindings(messages) {
  const text = messages.map((message) => message.text).join(' ').toLowerCase();
  const findings = [];
  if (/manual|paper|register|excel/.test(text)) findings.push(['Manual process dependency', 'Duplicate entry and delayed reporting', 'ERP workflow automation', 'High', 'Save 80-210 hours/month']);
  if (/attendance|employee|staff|student/.test(text)) findings.push(['Attendance bottleneck', 'Manual marking or proxy risk', 'AI attendance with HR/ERP sync', 'High', 'Reduce attendance time by up to 85%']);
  if (/inventory|stock|pharmacy|warehouse|purchase/.test(text)) findings.push(['Inventory leakage risk', 'No real-time stock visibility', 'Inventory + purchase + alerts', 'High', 'Lower dead stock and stock-outs']);
  if (/billing|payment|fee|invoice/.test(text)) findings.push(['Revenue leakage', 'Billing, fee, or invoice gaps', 'Payment gateway and approval controls', 'High', 'Improve collections and auditability']);
  if (/website|seo|lead|customer/.test(text)) findings.push(['Weak digital acquisition', 'Poor lead capture or online trust gap', 'Website, SEO, CRM, WhatsApp funnels', 'Medium', 'Increase qualified enquiries']);
  if (!findings.length) findings.push(['Incomplete discovery', 'Not enough operating data yet', 'Complete business profiling first', 'Medium', 'Sharper solution fit']);
  return findings;
}

function architectureBlueprint(messages) {
  const solution = detectSolution(messages.map((message) => message.text).join(' '));
  return {
    solution: solution.name,
    frontend: ['React/Next.js UI', 'Role-based dashboards', 'Mobile-first experience'],
    backend: ['Future API layer', 'Workflow engine', 'Notification services'],
    database: ['PostgreSQL/MySQL', 'Audit logs', 'Reporting views'],
    cloud: ['Vercel/AWS/Railway', 'Object storage', 'Automated backups'],
    security: ['JWT/RBAC', 'Input validation', 'Encrypted uploads', 'Rate limiting'],
    integrations: ['WhatsApp', 'Email', 'Payment gateway', 'SMS', 'Google Calendar'],
    dataEntities: ['Users', 'Roles', 'Departments', 'Transactions', 'Documents', 'Reports', 'Leads'],
    flow: ['Lead capture', 'Discovery', 'Solution design', 'Sprint delivery', 'Testing', 'Training', 'Go-live']
  };
}

function createSessionId() {
  try {
    const existing = localStorage.getItem('ards-ai-session-id');
    if (existing) return existing;
    const next = `alpenrose-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem('ards-ai-session-id', next);
    return next;
  } catch {
    return `alpenrose-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

export default function AIBusinessConsultant() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('chat');
  const [messages, setMessages] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ards-ai-messages') || 'null');
      return Array.isArray(saved) && saved.length ? saved : starterMessages;
    } catch {
      return starterMessages;
    }
  });
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('');
  const [suggestions, setSuggestions] = useState(responseSuggestions);
  const [dark, setDark] = useState(true);
  const [listening, setListening] = useState(false);
  const [voiceReply, setVoiceReply] = useState(false);
  const [lead, setLead] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ards-ai-lead') || 'null') || { name: '', company: '', phone: '', interest: 'ERP Solutions' };
    } catch {
      return { name: '', company: '', phone: '', interest: 'ERP Solutions' };
    }
  });
  const [estimator, setEstimator] = useState(initialEstimator);
  const [proposal, setProposal] = useState({
    company: '',
    industry: '',
    requirements: '',
    budget: '',
    timeline: ''
  });
  const [proposalText, setProposalText] = useState('');
  const [auditUrl, setAuditUrl] = useState('');
  const [audit, setAudit] = useState(null);
  const [activeDemo, setActiveDemo] = useState('ERP');
  const fileRef = useRef(null);
  const messagesEndRef = useRef(null);
  const aiSessionId = useMemo(() => createSessionId(), []);

  const estimate = useMemo(() => estimateCost(estimator), [estimator]);
  const leadScore = useMemo(() => calculateLeadScore(messages, lead), [messages, lead]);
  const latestSolution = useMemo(() => detectSolution(messages.map((message) => message.text).join(' ')), [messages]);
  const currentAgent = useMemo(() => activeAgent(messages), [messages]);
  const scores = useMemo(() => maturityScores(messages, lead), [messages, lead]);
  const findings = useMemo(() => auditFindings(messages), [messages]);
  const blueprint = useMemo(() => architectureBlueprint(messages), [messages]);
  const completedDiscovery = useMemo(() => {
    const text = messages.map((message) => message.text).join(' ').toLowerCase();
    return discoveryQuestions.map((question) => {
      if (question.includes('Industry')) return /hospital|school|college|manufacturing|website|clinic|factory|industry/i.test(text);
      if (question.includes('Users')) return /\d+|users|employees|students|branches|departments/i.test(text);
      if (question.includes('Current')) return /current|software|manual|excel|problem|challenge|pain/i.test(text);
      if (question.includes('modules')) return /module|feature|integration|payment|whatsapp|report|dashboard/i.test(text);
      return /budget|timeline|deadline|urgent|month|week|price|cost/i.test(text);
    });
  }, [messages]);

  const saveAiData = (payload) => {
    logAiAgentInteraction({
      session_id: aiSessionId,
      mode,
      lead_name: lead.name,
      lead_company: lead.company,
      lead_phone: lead.phone,
      lead_interest: lead.interest,
      lead_score: leadScore,
      service: latestSolution.name,
      ...payload
    }).catch((error) => {
      console.warn('AI interaction logging failed:', error);
    });
  };

  useEffect(() => {
    localStorage.setItem('ards-ai-messages', JSON.stringify(messages.slice(-30)));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('ards-ai-lead', JSON.stringify(lead));
  }, [lead]);

  useEffect(() => {
    if (open && mode === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, typing, open, mode]);

  const speakReply = (reply, sourceText) => {
    if (voiceReply && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(reply.replace(/[-*#]/g, ' '));
      utterance.lang = isHindi(sourceText) ? 'hi-IN' : 'en-IN';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const sendMessage = async (text = input, interactionType = 'chat') => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const history = messages;
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);
    setThinkingStep(thinkingSteps[0]);
    const stepTimer = window.setInterval(() => {
      setThinkingStep((current) => thinkingSteps[(Math.max(0, thinkingSteps.indexOf(current)) + 1) % thinkingSteps.length]);
    }, 520);

    const apiReply = await sendConsultantMessage({ message: trimmed, history, lead });
    const reply = apiReply?.reply || createConsultantReply(trimmed, history);

    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'ai', text: reply }]);
      setSuggestions(apiReply?.suggestions || responseSuggestions);
      speakReply(reply, trimmed);
      saveAiData({
        interaction_type: interactionType,
        mode: 'chat',
        user_message: trimmed,
        ai_response: reply,
        metadata: {
          agent: currentAgent,
          suggested_solution: latestSolution.name,
          suggestions: apiReply?.suggestions || responseSuggestions
        }
      });
      window.clearInterval(stepTimer);
      setThinkingStep('');
      setTyping(false);
    }, apiReply ? 150 : 650);
  };

  const handleQuickAction = (label) => {
    if (label === 'Get a Free Quote') {
      setMode('estimate');
      setOpen(true);
      return;
    }
    if (label === 'Book Demo') {
      setMode('meeting');
      setOpen(true);
      return;
    }
    setOpen(true);
    setMode('chat');
    sendMessage(`I am interested in ${label}. Please recommend the best ARDS solution.`, 'quick_action');
  };

  const handleSuggestion = (label) => {
    if (label === 'Estimate Cost') {
      setMode('estimate');
      return;
    }
    if (label === 'Book Demo') {
      setMode('meeting');
      return;
    }
    if (label === 'Generate Proposal') {
      setMode('proposal');
      return;
    }
    if (label === 'View Services') {
      window.location.href = '/services';
      return;
    }
    if (label === 'Contact Expert') {
      window.open(whatsAppUrl('I want to talk to an ARDS expert.'), '_blank', 'noopener,noreferrer');
      return;
    }
    sendMessage(label);
  };

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setOpen(true);
    setMode('chat');
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: `Uploaded file: ${file.name} (${Math.round(file.size / 1024)} KB)` }
    ]);
    setTyping(true);
    const analysis = await analyzeDocumentFile(file);
    const reply = analysis
      ? `Document AI Intake\n\nFile: ${analysis.filename} (${analysis.size_kb} KB)\nCategory: ${analysis.category}\n\nSignals:\n${analysis.extracted_signals.map((item) => `- ${item}`).join('\n')}\n\nRecommended next steps:\n${analysis.recommendations.map((item) => `- ${item}`).join('\n')}`
      : 'I captured the file details and will treat it as a requirement/RFP/tender input.\n\nStart with the project type, deadline, must-have modules, users, and integrations mentioned in the document.';
    setMessages((prev) => [...prev, { role: 'ai', text: reply }]);
    saveAiData({
      interaction_type: 'file_upload',
      mode: 'chat',
      user_message: `Uploaded file: ${file.name}`,
      ai_response: reply,
      metadata: {
        filename: file.name,
        size_kb: Math.round(file.size / 1024),
        type: file.type || 'unknown'
      }
    });
    setTyping(false);
    event.target.value = '';
  };

  const toggleFeature = (feature) => {
    setEstimator((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((item) => item !== feature)
        : [...prev.features, feature]
    }));
  };

  const generateProposal = async () => {
    const apiProposal = await generateProposalDraft(proposal);
    const text = buildEnterpriseProposalHtml(proposal, apiProposal?.text || '');
    setProposalText(text);
    saveAiData({
      interaction_type: 'proposal',
      mode: 'proposal',
      user_message: proposal.requirements || 'Generate proposal',
      ai_response: text,
      lead_company: proposal.company || lead.company,
      lead_interest: proposal.requirements || lead.interest,
      metadata: { proposal }
    });
  };

  const downloadProposal = () => {
    const blob = new Blob([proposalText || buildEnterpriseProposalHtml(proposal)], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ARDS-Enterprise-Proposal-${proposal.company || 'Draft'}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const printProposal = () => {
    const html = proposalText || buildEnterpriseProposalHtml(proposal);
    const frame = document.createElement('iframe');
    frame.title = 'ARDS proposal PDF export';
    frame.style.position = 'fixed';
    frame.style.right = '0';
    frame.style.bottom = '0';
    frame.style.width = '1px';
    frame.style.height = '1px';
    frame.style.border = '0';
    frame.style.opacity = '0';
    document.body.appendChild(frame);

    const cleanup = () => {
      window.setTimeout(() => {
        if (frame.parentNode) frame.parentNode.removeChild(frame);
      }, 1200);
    };

    const doc = frame.contentWindow?.document;
    if (!doc) {
      cleanup();
      return;
    }
    doc.open();
    doc.write(html);
    doc.close();
    frame.onload = () => {
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
      cleanup();
    };
    window.setTimeout(() => {
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
      cleanup();
    }, 700);
  };

  const runAudit = async () => {
    const normalized = auditUrl.trim();
    if (!normalized) return;
    const remoteAudit = await analyzeWebsite(normalized);
    if (remoteAudit?.items?.length) {
      setAudit(remoteAudit);
      saveAiData({
        interaction_type: 'website_audit',
        mode: 'audit',
        user_message: normalized,
        ai_response: `Website audit score: ${remoteAudit.score}/100`,
        service: 'Website Analyzer',
        metadata: { url: normalized, audit: remoteAudit }
      });
      return;
    }

    const https = normalized.startsWith('https://');
    const lengthScore = normalized.length < 45 ? 90 : 72;
    const brandScore = /www\.|\.com|\.in|\.org/.test(normalized) ? 84 : 68;
    const score = Math.round((lengthScore + brandScore + (https ? 92 : 55)) / 3);
    const localAudit = {
      score,
      items: [
        { label: 'Security signal', value: https ? 'HTTPS detected' : 'Use HTTPS for trust and SEO' },
        { label: 'SEO readiness', value: score > 80 ? 'Good domain clarity' : 'Needs metadata, structured content, and local SEO review' },
        { label: 'Lead conversion', value: 'Add clear CTAs, WhatsApp, enquiry forms, case studies, and analytics events' },
        { label: 'ARDS recommendation', value: score > 80 ? 'Conversion audit + SEO growth plan' : 'Website redesign + performance + SEO foundation' }
      ]
    };
    setAudit(localAudit);
    saveAiData({
      interaction_type: 'website_audit',
      mode: 'audit',
      user_message: normalized,
      ai_response: `Website audit score: ${score}/100`,
      service: 'Website Analyzer',
      metadata: { url: normalized, audit: localAudit }
    });
  };

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessages((prev) => [...prev, { role: 'ai', text: 'Voice input is not supported in this browser. You can still type naturally.' }]);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || '';
      setInput(transcript);
      sendMessage(transcript, 'voice');
    };
    recognition.start();
  };

  const saveMeetingRequest = () => {
    saveAiData({
      interaction_type: 'meeting_request',
      mode: 'meeting',
      user_message: leadText,
      ai_response: 'Meeting handoff opened',
      service: lead.interest,
      metadata: { lead }
    });
  };

  const leadText = `Hello ARDS, I want a consultation.
Name: ${lead.name || 'Not provided'}
Company: ${lead.company || 'Not provided'}
Phone: ${lead.phone || 'Not provided'}
Interest: ${lead.interest}`;

  return (
    <>
      <motion.button
        type="button"
        className={`ards-ai-launcher ${typing ? 'thinking' : ''}`}
        aria-label="Open Alpenrose consultant"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="ards-ai-launcher-orb"><Bot /></span>
        <b>Alpenrose</b>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.aside
            className={`ards-ai-panel ${dark ? 'is-dark' : 'is-light'}`}
            initial={{ opacity: 0, y: 34, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            aria-label="Alpenrose Business Consultant"
          >
            <header className="ards-ai-head">
              <div className={`ards-ai-orb ${typing ? 'thinking' : ''}`} aria-hidden="true">
                <i /><i /><i />
                <BrainCircuit />
              </div>
              <div>
                <span><Sparkles /> Alpenrose AI Consultant</span>
                <h2>Welcome to Alpenrose</h2>
                <p>Your Intelligent Digital Transformation Consultant</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Minimize Alpenrose">
                <Minimize2 />
              </button>
            </header>

            <nav className="ards-ai-tabs" aria-label="AI consultant modes">
              {[
                ['chat', 'Consult'],
                ['estimate', 'Estimator'],
                ['proposal', 'Proposal'],
                ['audit', 'Website'],
                ['intel', 'Intel'],
                ['architect', 'Architect'],
                ['demo', 'Demo'],
                ['meeting', 'Meeting']
              ].map(([key, label]) => (
                <button key={key} type="button" className={mode === key ? 'active' : ''} onClick={() => setMode(key)}>
                  {label}
                </button>
              ))}
              <button type="button" onClick={() => setDark((value) => !value)}>{dark ? 'Light' : 'Dark'}</button>
            </nav>

            {mode === 'chat' && (
              <section className="ards-ai-chat">
                {messages.length <= 1 && (
                  <div className="ards-ai-chat-start">
                    <div className="ards-ai-welcome-screen">
                      <span>Welcome to ARDS AI</span>
                      <h3>What should Alpenrose help you build?</h3>
                      <p>Select one option or type your requirement. Alpenrose will ask the right questions, then suggest scope, cost range, ROI, and next steps.</p>
                    </div>
                    <div className="ards-ai-quick-grid" aria-label="Quick AI actions">
                      {quickActions.map(({ label, icon: Icon }) => (
                        <button key={label} type="button" onClick={() => handleQuickAction(label)}>
                          <Icon />
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="ards-ai-messages">
                  {messages.map((message, index) => (
                    <motion.div
                      key={`${message.role}-${index}`}
                      className={`ards-ai-message ${message.role}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {message.role === 'ai' && <Bot />}
                      <p>{message.text}</p>
                      <time>{new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</time>
                    </motion.div>
                  ))}
                  {typing && (
                    <div className="ards-ai-thinking-card">
                      <div className="ards-ai-mini-brain"><BrainCircuit /><i /><i /><i /></div>
                      <div>
                        <b>{thinkingStep || 'Thinking...'}</b>
                        <div className="ards-ai-progress"><span /></div>
                      </div>
                    </div>
                  )}
                  <span ref={messagesEndRef} aria-hidden="true" />
                </div>

                {messages.length > 1 && !typing && (
                  <div className="ards-ai-suggestions">
                    {suggestions.map((item) => <button key={item} type="button" onClick={() => handleSuggestion(item)}>{item}</button>)}
                  </div>
                )}

                <div className="ards-ai-composer">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') sendMessage();
                    }}
                    placeholder="Describe your business problem..."
                  />
                  <input ref={fileRef} type="file" className="sr-only" onChange={handleFile} accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg" />
                  <button type="button" onClick={() => fileRef.current?.click()} aria-label="Upload file">
                    <Paperclip />
                  </button>
                  <button type="button" onClick={startVoice} aria-label="Use voice input" className={listening ? 'recording' : ''}>
                    {listening ? <MicOff /> : <Mic />}
                  </button>
                  {listening && <div className="ards-ai-wave" aria-hidden="true"><i /><i /><i /><i /></div>}
                  <button type="button" onClick={() => setVoiceReply((value) => !value)} aria-label="Toggle voice replies" className={voiceReply ? 'recording' : ''}>
                    <Volume2 />
                  </button>
                  <button type="button" onClick={() => sendMessage()} aria-label="Send message" disabled={typing || !input.trim()}>
                    <Send />
                  </button>
                </div>
              </section>
            )}

            {mode === 'estimate' && (
              <section className="ards-ai-tool ards-estimator">
                <div className="estimator-hero">
                  <span><BrainCircuit /> AI Project Estimator</span>
                  <h3>Let's scope this like a pre-sales consultant.</h3>
                  <p>This is an AI-generated estimate. A final quotation will be prepared by ARDS solution experts after detailed discovery.</p>
                </div>

                <div className="estimator-stepper">
                  {['Understand', 'Analyse', 'Estimate', 'Negotiate', 'Recommend'].map((step, index) => (
                    <div key={step} className={index <= 4 ? 'active' : ''}>
                      <b>{index + 1}</b>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                <div className="estimator-section">
                  <div className="estimator-section-head">
                    <span>Step 1</span>
                    <h4>Understand the client</h4>
                  </div>
                  <label>What type of business do you have?
                    <input value={estimator.business} onChange={(event) => setEstimator((prev) => ({ ...prev, business: event.target.value }))} placeholder="School, hospital, manufacturer, startup..." />
                  </label>
                  <div className="ards-ai-grid estimator-service-grid">
                    {['Website', 'Mobile App', 'ERP', 'AI Automation', 'Digital Marketing', 'Cloud', 'Custom Software'].map((type) => (
                      <button key={type} type="button" className={estimator.type === type ? 'active' : ''} onClick={() => setEstimator((prev) => ({ ...prev, type, subtype: estimatorQuestions[type]?.[0] || type, features: [] }))}>
                        {type}
                      </button>
                    ))}
                  </div>
                  <div className="ards-ai-chips">
                    {(estimatorQuestions[estimator.type] || []).map((subtype) => (
                      <button key={subtype} type="button" className={estimator.subtype === subtype ? 'active' : ''} onClick={() => setEstimator((prev) => ({ ...prev, subtype }))}>
                        {subtype}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="estimator-section">
                  <div className="estimator-section-head">
                    <span>Scope Questions</span>
                    <h4>Features that change the estimate</h4>
                  </div>
                  <div className="estimator-input-grid">
                    <label>Pages / Screens <input type="number" min="1" value={estimator.pages} onChange={(event) => setEstimator((prev) => ({ ...prev, pages: event.target.value }))} /></label>
                    <label>Users / Seats <input type="number" min="1" value={estimator.users} onChange={(event) => setEstimator((prev) => ({ ...prev, users: event.target.value }))} /></label>
                    <label>Integrations <input type="number" min="0" value={estimator.integrations} onChange={(event) => setEstimator((prev) => ({ ...prev, integrations: event.target.value }))} /></label>
                    <label>Expected Timeline
                      <select value={estimator.timeline} onChange={(event) => setEstimator((prev) => ({ ...prev, timeline: event.target.value }))}>
                        <option>Flexible</option>
                        <option>Standard</option>
                        <option>Urgent</option>
                      </select>
                    </label>
                    <label>Hosting Required?
                      <select value={estimator.hosting} onChange={(event) => setEstimator((prev) => ({ ...prev, hosting: event.target.value }))}>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </label>
                    <label>Security Requirements
                      <select value={estimator.security} onChange={(event) => setEstimator((prev) => ({ ...prev, security: event.target.value }))}>
                        <option>Basic</option>
                        <option>Standard</option>
                        <option>High</option>
                      </select>
                    </label>
                    <label>Scalability Need
                      <select value={estimator.scalability} onChange={(event) => setEstimator((prev) => ({ ...prev, scalability: event.target.value }))}>
                        <option>Basic</option>
                        <option>Growth</option>
                        <option>Enterprise</option>
                      </select>
                    </label>
                    <label>Approximate Budget
                      <select value={estimator.budget} onChange={(event) => setEstimator((prev) => ({ ...prev, budget: event.target.value }))}>
                        {Object.keys(budgetRanges).map((budget) => <option key={budget}>{budget}</option>)}
                      </select>
                    </label>
                  </div>
                  <div className="ards-ai-chips estimator-feature-chips">
                    {['Custom Design', 'Admin Panel', 'Payment Gateway', 'Blog', 'Booking System', 'Multi-language', 'SEO Required', 'WhatsApp', 'AI Assistant', 'Data Migration', 'Reports', 'Role Access'].map((feature) => (
                      <button key={feature} type="button" className={estimator.features.includes(feature) ? 'active' : ''} onClick={() => toggleFeature(feature)}>
                        {feature}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="estimator-section">
                  <div className="estimator-section-head">
                    <span>Step 2</span>
                    <h4>Project analysis dashboard</h4>
                  </div>
                  <div className="estimator-dashboard">
                    <div className="estimator-ring" style={{ '--score': estimate.complexityScore }}>
                      <strong>{estimate.complexityScore}</strong>
                      <span>Complexity</span>
                    </div>
                    <div className="estimator-analysis-grid">
                      <span>Complexity <b>{estimate.complexity}</b></span>
                      <span>Risk Level <b>{estimate.risk}</b></span>
                      <span>Development Time <b>{estimate.weeks}</b></span>
                      <span>Feature Count <b>{estimator.features.length}</b></span>
                      <span>Security <b>{estimate.security}</b></span>
                      <span>Scalability <b>{estimate.scalability}</b></span>
                      <span>Maintenance <b>{formatCurrency(estimate.maintenance)}/mo</b></span>
                      <span>Hosting <b>{estimate.hosting ? `${formatCurrency(estimate.hosting)}/yr` : 'Client managed'}</b></span>
                    </div>
                  </div>
                  <div className="estimator-stack">
                    <b>Recommended team</b>
                    <div>{estimate.team.map((item) => <span key={item}>{item}</span>)}</div>
                    <b>Technology stack</b>
                    <div>{estimate.stack.map((item) => <span key={item}>{item}</span>)}</div>
                  </div>
                </div>

                <div className="estimator-section">
                  <div className="estimator-section-head">
                    <span>Step 3</span>
                    <h4>Indian market budgetary estimate</h4>
                  </div>
                  <div className="estimator-market-card">
                    <div>
                      <span>Estimated Development Cost</span>
                      <strong>{formatCurrency(estimate.low)} - {formatCurrency(estimate.high)}</strong>
                      <p>Based on Indian software development market pricing for {estimate.marketLabel}, adjusted for features, users, integrations, timeline, security, scalability and hosting.</p>
                    </div>
                    <div className="estimator-market-grid">
                      <span>GST (18%) <b>{formatCurrency(estimate.gstLow)} - {formatCurrency(estimate.gstHigh)}</b><small>Extra as applicable</small></span>
                      <span>Estimated Project Duration <b>{estimate.weeks}</b><small>Depends on confirmed scope</small></span>
                      <span>Support <b>{estimate.support}</b><small>After go-live</small></span>
                      <span>AMC <b>{estimate.amc}</b><small>Optional annual support</small></span>
                    </div>
                  </div>
                  <div className="estimator-pricing">
                    <article>
                      <span>Minimum Budget</span>
                      <h4>Lean MVP</h4>
                      <strong>{formatCurrency(estimate.minimum)} + GST</strong>
                      <p>Essential launch with controlled scope and must-have workflows only.</p>
                    </article>
                    <article className="recommended">
                      <span>Recommended</span>
                      <h4>Professional Solution</h4>
                      <strong>{formatCurrency(estimate.recommended)} + GST</strong>
                      <p>Balanced scope for quality, security, scalability, integrations and maintainability.</p>
                    </article>
                    <article>
                      <span>Premium</span>
                      <h4>Advanced Solution</h4>
                      <strong>{formatCurrency(estimate.premium)} + GST</strong>
                      <p>More polished UX, stronger architecture, automation, analytics and advanced integrations.</p>
                    </article>
                  </div>
                  <div className="ards-ai-result">
                    <span>Estimated Cost Range</span>
                    <strong>{formatCurrency(estimate.low)} - {formatCurrency(estimate.high)} + GST</strong>
                    <p>GST is extra as applicable. This is not fixed pricing; the estimate changes based on project complexity, features, users, integrations, timeline pressure, security requirements, scalability, hosting, testing depth and maintenance needs.</p>
                  </div>
                </div>

                {estimate.needsNegotiation && (
                  <div className="estimator-section negotiation">
                    <div className="estimator-section-head">
                      <span>Step 5</span>
                      <h4>Negotiation mode</h4>
                    </div>
                    <p>Thank you for sharing your budget. Our recommended solution is approximately {formatCurrency(estimate.recommended)} + GST. Based on your budget of {estimator.budget}, we can recommend a Phase-1 MVP that includes the most essential features. Additional features can be implemented in future phases as your business grows.</p>
                    <div className="estimator-negotiation-columns">
                      <div>
                        <b>Features Included</b>
                        {estimate.included.map((item) => <span key={item}>{item}</span>)}
                      </div>
                      <div>
                        <b>Features Excluded</b>
                        {estimate.excluded.map((item) => <span key={item}>{item}</span>)}
                      </div>
                      <div>
                        <b>Upgrade Roadmap</b>
                        <span>Phase 2 integrations</span>
                        <span>Advanced reports</span>
                        <span>Automation and analytics</span>
                      </div>
                    </div>
                    <div className="ards-ai-mini-table">
                      <span>Phase 1 MVP <b>{formatCurrency(estimate.phaseOne)} + GST</b></span>
                      <span>Estimated Future Cost <b>{formatCurrency(estimate.futureUpgrade)} + GST</b></span>
                      <span>Suggested Action <b>MVP first</b></span>
                    </div>
                  </div>
                )}

                <div className="estimator-section recommendation">
                  <div className="estimator-section-head">
                    <span>Step 6</span>
                    <h4>AI recommendation</h4>
                  </div>
                  <div className="estimator-recommendation">
                    <p><b>Business analysis:</b> {estimator.business || 'Your business'} needs a {estimator.subtype} with a controlled scope, practical launch path and room for future upgrades.</p>
                    <p><b>Recommended solution:</b> {estimator.type} delivered as a {estimate.complexity.toLowerCase()} project with phased implementation. Estimated budget: {formatCurrency(estimate.low)} - {formatCurrency(estimate.high)} + GST.</p>
                    <p><b>Estimated ROI:</b> {estimate.roi}</p>
                    <p><b>Priority list:</b> {estimate.priority.join(', ')}.</p>
                    <p><b>Features to postpone:</b> {(estimate.postpone.length ? estimate.postpone : ['Advanced automation', 'Extra integrations']).join(', ')}.</p>
                  </div>
                </div>

                <div className="estimator-final">
                  <p><b>Disclaimer:</b><br />This is an AI-generated budgetary estimate based on the information provided. The final quotation, project scope, implementation timeline, and commercial proposal will be confirmed after a detailed discussion with the ARDS consulting team. All prices are exclusive of GST unless otherwise stated.</p>
                  <div className="estimator-contact-strip">
                    <span>Website: <b>www.ards.in</b></span>
                    <span>Email: <b>business@ards.in</b></span>
                    <span>Phone: <b>+91 9308579699</b></span>
                  </div>
                  <div className="ards-ai-handoff">
                    <a href={whatsAppUrl(`I want a free consultation for ${estimator.type}. Estimated range: ${formatCurrency(estimate.low)} - ${formatCurrency(estimate.high)} + GST`)} target="_blank" rel="noreferrer"><CalendarClock /> Schedule Free Consultation</a>
                    <a href={`mailto:business@ards.in?subject=${encodeURIComponent('Detailed ARDS project proposal request')}&body=${encodeURIComponent(`Service: ${estimator.type}\nSubtype: ${estimator.subtype}\nEstimated range: ${formatCurrency(estimate.low)} - ${formatCurrency(estimate.high)} + GST\nBudget: ${estimator.budget}`)}`}><FileText /> Download Detailed Proposal</a>
                    <a href={whatsAppUrl(`Please call me back for ${estimator.type} project estimation.`)} target="_blank" rel="noreferrer"><Users /> Request Callback</a>
                    <a href={whatsAppUrl(`I want to discuss my ${estimator.type} estimate with ARDS.`)} target="_blank" rel="noreferrer"><MessageCircle /> Chat on WhatsApp</a>
                    <a href={`mailto:business@ards.in?subject=${encodeURIComponent('ARDS sales enquiry')}&body=${encodeURIComponent(`Hello ARDS Sales Team,\n\nI want to discuss ${estimator.type}.\nEstimated range: ${formatCurrency(estimate.low)} - ${formatCurrency(estimate.high)} + GST\nPhone: `)}`}><Mail /> Contact ARDS Sales Team</a>
                  </div>
                </div>
              </section>
            )}

            {mode === 'proposal' && (
              <section className="ards-ai-tool">
                <h3>AI Proposal Generator</h3>
                {[
                  ['company', 'Company Name'],
                  ['industry', 'Industry'],
                  ['requirements', 'Requirements'],
                  ['budget', 'Budget'],
                  ['timeline', 'Timeline']
                ].map(([key, label]) => (
                  <label key={key}>{label}
                    <input value={proposal[key]} onChange={(event) => setProposal((prev) => ({ ...prev, [key]: event.target.value }))} />
                  </label>
                ))}
                <button type="button" className="ards-ai-primary" onClick={generateProposal}><FileText /> Generate Proposal</button>
                {proposalText && (
                  <div className="ards-ai-proposal ards-ai-enterprise-proposal">
                    <div className="ards-ai-proposal-head">
                      <div>
                        <span>Enterprise proposal ready</span>
                        <b>{proposal.company || 'Prospective Client'}</b>
                        <p>Print-ready A4 proposal with branded cover, dashboards, architecture, pricing, ROI, and contact page.</p>
                      </div>
                      <span>Confidential</span>
                    </div>
                    <iframe title="ARDS enterprise proposal preview" srcDoc={proposalText} />
                    <div className="ards-ai-inline-actions">
                      <button type="button" onClick={printProposal}><Download /> Download PDF</button>
                      <button type="button" onClick={downloadProposal}><FileText /> Download HTML</button>
                      <button type="button" onClick={() => navigator.clipboard?.writeText(proposalText)}><Copy /> Copy HTML</button>
                    </div>
                    <p className="ards-ai-pdf-note">Choose "Save as PDF" in the print dialog to download the proposal as a PDF.</p>
                  </div>
                )}
              </section>
            )}

            {mode === 'audit' && (
              <section className="ards-ai-tool">
                <h3>Website Analyzer</h3>
                <label>Website URL
                  <input value={auditUrl} onChange={(event) => setAuditUrl(event.target.value)} placeholder="https://example.com" />
                </label>
                <button type="button" className="ards-ai-primary" onClick={runAudit}><Globe2 /> Analyze Website</button>
                {audit && (
                  <div className="ards-ai-audit">
                    <strong>{audit.score}/100 Lead Readiness</strong>
                    {audit.items.map((item) => (
                      <p key={item.label}><b>{item.label}:</b> {item.value}</p>
                    ))}
                  </div>
                )}
              </section>
            )}

            {mode === 'meeting' && (
              <section className="ards-ai-tool">
                <h3>Book a Free Consultation</h3>
                {[
                  ['name', 'Name'],
                  ['company', 'Company'],
                  ['phone', 'Phone'],
                  ['interest', 'Interest']
                ].map(([key, label]) => (
                  <label key={key}>{label}
                    <input value={lead[key]} onChange={(event) => setLead((prev) => ({ ...prev, [key]: event.target.value }))} />
                  </label>
                ))}
                <div className="ards-ai-handoff">
                  <a href={whatsAppUrl(leadText)} target="_blank" rel="noreferrer" onClick={saveMeetingRequest}><CheckCircle2 /> WhatsApp ARDS</a>
                  <a href={`mailto:info@ards.in?subject=${encodeURIComponent('ARDS consultation request')}&body=${encodeURIComponent(leadText)}`} onClick={saveMeetingRequest}><Mail /> Email Request</a>
                </div>
              </section>
            )}

            {mode === 'intel' && (
              <section className="ards-ai-tool">
                <h3>Conversation Intelligence</h3>
                <div className="ards-ai-score-ring" style={{ '--score': leadScore }}>
                  <strong>{leadScore}</strong>
                  <span>{leadStage(leadScore)}</span>
                </div>
                <div className="ards-ai-score-grid">
                  {scores.map(([label, value]) => (
                    <div key={label}>
                      <span>{label}</span>
                      <b>{value}%</b>
                      <i style={{ width: `${value}%` }} />
                    </div>
                  ))}
                </div>
                <div className="ards-ai-checklist">
                  {discoveryQuestions.map((question, index) => (
                    <div key={question} className={completedDiscovery[index] ? 'done' : ''}>
                      <CheckCircle2 />
                      <span>{question}</span>
                    </div>
                  ))}
                </div>
                <div className="ards-ai-audit">
                  <p><b>Recommended solution:</b> {latestSolution.name}</p>
                  <p><b>Estimated range:</b> {latestSolution.range}</p>
                  <p><b>Timeline:</b> {latestSolution.timeline}</p>
                  <p><b>Next best action:</b> {leadScore >= 52 ? 'Ask for consultation slot and phone number.' : 'Ask discovery questions and identify urgency.'}</p>
                </div>
                <div className="ards-ai-findings">
                  {findings.map(([problem, cause, solution, priority, impact]) => (
                    <article key={problem}>
                      <b>{problem}</b>
                      <span>{priority}</span>
                      <p><strong>Cause:</strong> {cause}</p>
                      <p><strong>Solution:</strong> {solution}</p>
                      <p><strong>Impact:</strong> {impact}</p>
                    </article>
                  ))}
                </div>
                <div className="ards-ai-capabilities">
                  {services.map((service) => (
                    <span key={service}>{service}</span>
                  ))}
                </div>
              </section>
            )}

            {mode === 'architect' && (
              <section className="ards-ai-tool">
                <h3>AI Solution Architect</h3>
                <div className="ards-ai-audit">
                  <p><b>Blueprint for:</b> {blueprint.solution}</p>
                </div>
                <div className="ards-ai-architecture">
                  {[
                    ['Frontend', blueprint.frontend],
                    ['Backend', blueprint.backend],
                    ['Database', blueprint.database],
                    ['Cloud', blueprint.cloud],
                    ['Security', blueprint.security],
                    ['Integrations', blueprint.integrations],
                    ['Data Entities', blueprint.dataEntities],
                    ['Delivery Flow', blueprint.flow]
                  ].map(([title, items]) => (
                    <article key={title}>
                      <b>{title}</b>
                      {items.map((item) => <span key={item}>{item}</span>)}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {mode === 'demo' && (
              <section className="ards-ai-tool">
                <h3>Interactive Solution Demo</h3>
                <div className="ards-ai-grid">
                  {['ERP', 'Attendance', 'Hospital', 'Inventory', 'Analytics', 'AI Dashboard'].map((demo) => (
                    <button key={demo} type="button" className={activeDemo === demo ? 'active' : ''} onClick={() => setActiveDemo(demo)}>
                      {demo}
                    </button>
                  ))}
                </div>
                <div className="ards-ai-demo-board">
                  <div>
                    <span>Live module</span>
                    <strong>{activeDemo}</strong>
                    <p>{demoCopy(activeDemo)}</p>
                  </div>
                  <div className="ards-ai-demo-bars">
                    {[72, 46, 88, 64, 93].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
                  </div>
                  <div className="ards-ai-demo-flow">
                    {['Capture', 'Validate', 'Automate', 'Report'].map((step) => <span key={step}>{step}</span>)}
                  </div>
                </div>
              </section>
            )}

            <footer className="ards-ai-footer">
              <span><ShieldCheck /> ARDS knowledge mode</span>
              <span><ImageIcon /> Upload PDF, docs, sheets, images</span>
            </footer>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function whatsAppUrl(message) {
  return `https://wa.me/919308579699?text=${encodeURIComponent(message)}`;
}

function demoCopy(demo) {
  return {
    ERP: 'Unified approvals, users, departments, billing, inventory, reports, and management dashboards.',
    Attendance: 'AI attendance reduces queues, proxy entries, manual reconciliation, and HR reporting delays.',
    Hospital: 'Patient registration, OPD/IPD, pharmacy, lab, billing, inventory, and doctor schedules.',
    Inventory: 'Stock movement, reorder alerts, vendor management, purchase workflows, and leakage control.',
    Analytics: 'Live KPIs, branch comparison, revenue leakage, productivity, and executive reporting.',
    'AI Dashboard': 'Predictive insights, document intelligence, recommendations, workflow automation, and lead scoring.'
  }[demo] || 'ARDS simulation module';
}
