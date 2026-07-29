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
  const base = {
    Website: 75000,
    ERP: 350000,
    'Mobile App': 250000,
    Cloud: 125000,
    AI: 250000,
    CRM: 180000,
    Inventory: 180000,
    Hospital: 450000,
    School: 300000
  }[form.type] || 150000;
  const featureCost = form.features.length * 45000;
  const userCost = Math.max(0, Number(form.users || 0) - 25) * 1200;
  const integrationCost = Number(form.integrations || 0) * 55000;
  const rush = form.timeline === 'Urgent' ? 1.28 : form.timeline === 'Standard' ? 1 : 0.9;
  const low = Math.round((base + featureCost + userCost + integrationCost) * rush);
  const high = Math.round(low * 1.75);
  return {
    low,
    high,
    weeks: form.timeline === 'Urgent' ? '3 - 8 weeks' : form.timeline === 'Flexible' ? '8 - 20 weeks' : '6 - 14 weeks',
    complexity: high > 1200000 ? 'Enterprise' : high > 500000 ? 'Advanced' : 'Focused'
  };
}

function formatCurrency(value) {
  return `Rs. ${value.toLocaleString('en-IN')}`;
}

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
  type: 'ERP',
  users: 80,
  integrations: 2,
  timeline: 'Standard',
  features: ['Dashboard', 'Role Access', 'Reports']
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
    if (apiProposal?.text) {
      setProposalText(apiProposal.text);
      saveAiData({
        interaction_type: 'proposal',
        mode: 'proposal',
        user_message: proposal.requirements || 'Generate proposal',
        ai_response: apiProposal.text,
        lead_company: proposal.company || lead.company,
        lead_interest: proposal.requirements || lead.interest,
        metadata: { proposal }
      });
      return;
    }

    const solution = detectSolution(`${proposal.industry} ${proposal.requirements}`);
    const text = `ARDS Digital Transformation Proposal

Client: ${proposal.company || 'Prospective Client'}
Industry: ${proposal.industry || 'To be confirmed'}
Prepared by: Alpenrose Digital Solutions (ARDS), Patna
Positioning: Empowering Businesses Through Innovative Digital Transformations

Recommended Solution
${solution.name}

Project Scope
${proposal.requirements || 'Discovery, solution design, development, deployment, training, and support.'}

Core Deliverables
${solution.modules.map((item) => `- ${item}`).join('\n')}

Commercial Estimate
${proposal.budget || solution.range}

Timeline
${proposal.timeline || solution.timeline}

Technology Direction
Modern React/Next.js frontend, secure backend APIs, cloud deployment, role-based dashboards, analytics, and integration-ready architecture.

Commercial Notes
- Final pricing depends on confirmed users, modules, integrations, hosting, data migration, and SLA.
- ARDS can phase the project to launch the most valuable workflows first.

Next Step
Schedule a free ARDS consultation to validate scope, users, integrations, and launch plan.`;
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
    const blob = new Blob([proposalText || 'Generate a proposal first.'], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ARDS-Proposal-${proposal.company || 'Draft'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
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
                      <p>Select a quick action or type your requirement. I will simulate discovery, ROI, modules, roadmap, and proposal direction.</p>
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
                  <button type="button" onClick={() => sendMessage()} aria-label="Send message">
                    <Send />
                  </button>
                </div>
              </section>
            )}

            {mode === 'estimate' && (
              <section className="ards-ai-tool">
                <h3>AI Cost Estimator</h3>
                <div className="ards-ai-grid">
                  {['Website', 'ERP', 'Mobile App', 'Cloud', 'AI', 'CRM', 'Inventory', 'Hospital', 'School'].map((type) => (
                    <button key={type} type="button" className={estimator.type === type ? 'active' : ''} onClick={() => setEstimator((prev) => ({ ...prev, type }))}>
                      {type}
                    </button>
                  ))}
                </div>
                <label>Users <input type="number" value={estimator.users} onChange={(event) => setEstimator((prev) => ({ ...prev, users: event.target.value }))} /></label>
                <label>Integrations <input type="number" value={estimator.integrations} onChange={(event) => setEstimator((prev) => ({ ...prev, integrations: event.target.value }))} /></label>
                <label>Timeline
                  <select value={estimator.timeline} onChange={(event) => setEstimator((prev) => ({ ...prev, timeline: event.target.value }))}>
                    <option>Flexible</option>
                    <option>Standard</option>
                    <option>Urgent</option>
                  </select>
                </label>
                <div className="ards-ai-chips">
                  {['Dashboard', 'Role Access', 'Reports', 'Payment Gateway', 'Mobile App', 'AI Assistant', 'WhatsApp', 'Data Migration'].map((feature) => (
                    <button key={feature} type="button" className={estimator.features.includes(feature) ? 'active' : ''} onClick={() => toggleFeature(feature)}>
                      {feature}
                    </button>
                  ))}
                </div>
                <div className="ards-ai-result">
                  <span>Estimated Price Range</span>
                  <strong>{formatCurrency(estimate.low)} - {formatCurrency(estimate.high)}</strong>
                  <p>{estimate.weeks} timeline, {estimate.complexity} complexity, React/cloud/API-ready architecture.</p>
                  <div className="ards-ai-mini-table">
                    <span>Type <b>{estimator.type}</b></span>
                    <span>Features <b>{estimator.features.length}</b></span>
                    <span>Integrations <b>{estimator.integrations}</b></span>
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
                  <div className="ards-ai-proposal">
                    <pre>{proposalText}</pre>
                    <div className="ards-ai-inline-actions">
                      <button type="button" onClick={downloadProposal}><Download /> Download Draft</button>
                      <button type="button" onClick={() => navigator.clipboard?.writeText(proposalText)}><Copy /> Copy</button>
                    </div>
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
