import { supabase } from '@/lib/supabase';

const delay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

const knowledge = [
  ['website', 'Website Development', 'a fast, mobile-first website with clear service journeys, lead capture, analytics, and an SEO-ready content structure'],
  ['school', 'School ERP', 'admissions, fees, attendance, exams, transport, parent communication, payroll, and management reporting'],
  ['college', 'College ERP', 'admissions, departments, fees, exams, library, LMS, student portal, and IQAC/NAAC reporting'],
  ['hospital', 'Hospital ERP', 'OPD/IPD, billing, lab, pharmacy, inventory, scheduling, patient records, and management dashboards'],
  ['manufacturing', 'Manufacturing ERP', 'production planning, purchasing, inventory, quality control, dispatch, vendors, costing, and reporting'],
  ['automation', 'AI Automation', 'document processing, approvals, reminders, CRM follow-ups, reporting, and other repetitive workflows'],
  ['mobile', 'Mobile App Development', 'focused mobile journeys, authentication, notifications, API integration, analytics, and reliable release management'],
  ['cloud', 'Cloud Solutions', 'hosting, deployment, backups, monitoring, security, storage, disaster recovery, and scaling'],
  ['marketing', 'Digital Marketing', 'SEO, campaigns, landing pages, analytics, lead capture, and CRM follow-up'],
  ['inventory', 'Inventory Management', 'stock movement, purchases, vendors, reorder alerts, warehouse controls, and leakage reporting'],
  ['hrms', 'HRMS', 'employee records, attendance, leave, payroll, documents, approvals, and HR reporting'],
  ['crm', 'CRM', 'lead capture, ownership, follow-up reminders, pipeline stages, and conversion reporting'],
  ['erp', 'ERP Solutions', 'roles, departments, approvals, billing, inventory, reports, dashboards, and integrations']
];

const signals = [
  ['business type', /school|college|hospital|clinic|manufactur|factory|retail|logistics|hotel|government|construction|agency|company|startup/i],
  ['scale', /\d+\s*(users|employees|students|beds|branches|locations|departments|customers)|users|employees|students|beds|branches/i],
  ['current process', /excel|manual|paper|register|existing|currently|software|erp|website|app|cloud|server/i],
  ['pain point', /problem|challenge|delay|duplicate|leakage|slow|manual|error|inventory|billing|reporting|security/i],
  ['timeline or budget', /budget|timeline|deadline|urgent|week|month|lakh|crore|₹|cost|price|launch|go.live/i]
];

function matchKnowledge(input) {
  const lower = String(input || '').toLowerCase();
  return knowledge.find(([key]) => lower.includes(key)) || knowledge[knowledge.length - 1];
}

function buildGroundedFallback(message, history = []) {
  const conversation = [...history, { role: 'user', text: message }]
    .filter((item) => item?.role === 'user')
    .map((item) => item.text)
    .join(' ');
  const [, title, scope] = matchKnowledge(conversation);
  const known = signals.filter(([, pattern]) => pattern.test(conversation)).map(([label]) => label);
  const missing = signals.filter(([, pattern]) => !pattern.test(conversation)).map(([label]) => label);

  if (missing.length && known.length < 3) {
    const questionBySignal = {
      'business type': 'What type of organisation is this, and what does it sell or deliver?',
      scale: 'Approximately how many users, employees, branches, students, beds, or locations are involved?',
      'current process': 'How is this handled today: Excel, paper, existing software, or another system?',
      'pain point': 'What is the single biggest delay, error, or revenue risk in the current process?',
      'timeline or budget': 'What launch window and approximate budget range should I design around?'
    };
    return {
      reply: `Understanding so far\n\nI can see a possible need for ${title}, but there is not enough evidence yet for a responsible recommendation.\n\nWhat I know\n- ${known.length ? known.join('\n- ') : 'Only the initial service interest'}\n\nNext question\n${questionBySignal[missing[0]]}\n\nWhy I am asking\nThis changes the architecture, delivery effort, and realistic budget range.`,
      confidence: known.length <= 1 ? 'Early discovery' : 'Developing brief'
    };
  }

  return {
    reply: `Consultant assessment\n\nRecommended direction\n${title}, initially focused on ${scope}.\n\nWhy this fits\n- It addresses the operating signals you shared.\n- A phased launch limits delivery risk and validates adoption early.\n- Integrations and data migration should be confirmed before scope approval.\n\nAssumptions to validate\n- User roles and approval rules are not fully confirmed.\n- Existing data quality and third-party API access require discovery.\n- Any cost or timeline is budgetary until the scope is signed off.\n\nRecommended next step\nRun a 45-minute discovery session to map the highest-value workflow, users, integrations, success metric, and Phase 1 boundary.`,
    confidence: missing.length ? 'Directional recommendation' : 'Discovery-ready'
  };
}

export async function sendConsultantMessage({ message, history = [], lead = {} }) {
  const safeHistory = history
    .filter((item) => item?.text && (item.role === 'user' || item.role === 'ai'))
    .slice(-10)
    .map(({ role, text }) => ({ role, text: String(text).slice(0, 3000) }));

  try {
    const { data, error } = await supabase.functions.invoke('alpenrose-consultant', {
      body: {
        message: String(message).slice(0, 4000),
        history: safeHistory,
        context: {
          name: String(lead.name || '').slice(0, 80),
          company: String(lead.company || '').slice(0, 120),
          interest: String(lead.interest || '').slice(0, 120)
        }
      }
    });

    if (error || !data?.reply) throw error || new Error('Invalid consultant response');
    return {
      reply: data.reply,
      suggestions: Array.isArray(data.suggestions) ? data.suggestions.slice(0, 4) : undefined,
      confidence: data.confidence || 'AI-assisted analysis',
      source: 'genai'
    };
  } catch (error) {
    console.info('Alpenrose GenAI unavailable; using grounded consultant fallback.', error);
    await delay(280);
    const fallback = buildGroundedFallback(message, history);
    return {
      ...fallback,
      suggestions: ['Answer next question', 'Estimate Cost', 'Book Demo', 'Contact Expert'],
      source: 'fallback'
    };
  }
}

export async function analyzeBusiness({ message }) {
  const result = buildGroundedFallback(message || 'business automation');
  await delay(220);
  return { message: result.reply, confidence: result.confidence };
}

export async function estimateCost(form) {
  await delay(200);
  const base = { Website: 75000, ERP: 350000, 'Mobile App': 250000, Cloud: 125000, 'AI Automation': 250000, CRM: 180000, Inventory: 180000, Hospital: 450000, School: 300000 }[form.type] || 150000;
  const low = Math.round(base + form.features.length * 45000 + Math.max(0, Number(form.users || 0) - 25) * 1200 + Number(form.integrations || 0) * 55000);
  return { low, high: Math.round(low * 1.75), weeks: form.timeline === 'Urgent' ? '3 - 8 weeks' : '6 - 14 weeks' };
}

export async function generateProposalDraft(proposal) {
  await delay(300);
  const [, title] = matchKnowledge(`${proposal.industry} ${proposal.requirements}`);
  return {
    text: `Recommended direction: ${title}. This budgetary draft must be validated against users, workflows, integrations, migration, security, hosting, support, and acceptance criteria before a final quotation is issued.`
  };
}

export async function analyzeWebsite(url) {
  await delay(300);
  const secure = String(url).startsWith('https://');
  return {
    score: null,
    items: [
      { label: 'Security signal', value: secure ? 'HTTPS is present' : 'HTTPS was not detected in the submitted URL' },
      { label: 'Audit limitation', value: 'This quick check does not crawl the website or measure Core Web Vitals.' },
      { label: 'Recommended review', value: 'Run Lighthouse, inspect mobile journeys, metadata, schema, accessibility, forms, and analytics events.' },
      { label: 'Next step', value: 'ARDS can complete a measured technical and conversion audit using the live URL.' }
    ]
  };
}

export async function analyzeDocumentFile(file) {
  await delay(300);
  return {
    filename: file.name,
    size_kb: Math.round(file.size / 1024),
    category: 'Document received, content not yet extracted',
    extracted_signals: ['File metadata captured', 'No unsupported claim of document reading'],
    recommendations: ['Share the key requirements in chat or connect a secure document extraction service.']
  };
}

export async function bookMeeting(lead) {
  await delay(200);
  return { status: 'ready', handoff: `Name: ${lead.name}\nCompany: ${lead.company}\nPhone: ${lead.phone}\nInterest: ${lead.interest}` };
}
