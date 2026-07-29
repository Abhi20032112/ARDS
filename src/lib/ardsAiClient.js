const delay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

const knowledge = [
  ['website', 'Website Development', 'A premium website should do more than look good. ARDS would build a fast, mobile-first, SEO-ready website with clear service pages, enquiry forms, WhatsApp actions, analytics, and conversion-focused content.'],
  ['erp', 'ERP Solutions', 'An ERP should become the operating system of the business: users, roles, departments, approvals, billing, inventory, reports, and management dashboards in one place.'],
  ['school', 'School ERP', 'For a school, ARDS would digitize admissions, fees, attendance, exams, transport, parent communication, staff payroll, and reports. The goal is less register work and better visibility.'],
  ['college', 'College ERP', 'For a college, the best fit is admissions, departments, fees, exams, library, LMS, student portal, IQAC/NAAC dashboards, and alumni workflows.'],
  ['hospital', 'Hospital ERP', 'For healthcare, ARDS would connect OPD/IPD, billing, lab, pharmacy, inventory, doctor schedules, patient records, and dashboards to reduce leakage and improve patient flow.'],
  ['automation', 'AI Automation', 'AI automation is useful where documents, approvals, reports, reminders, attendance, CRM follow-ups, or repetitive work consume team time. ARDS would begin with workflow mapping, then automate the highest-leakage areas first.'],
  ['cloud', 'Cloud Solutions', 'A cloud plan should cover hosting, backups, deployment, monitoring, security, storage, and scale. ARDS would design this around reliability and maintainability.'],
  ['marketing', 'Digital Marketing', 'Digital marketing should connect SEO, campaigns, landing pages, analytics, lead capture, and CRM follow-up so every enquiry is measurable.'],
  ['inventory', 'Inventory Management', 'Inventory automation should track stock movement, purchases, vendors, reorder alerts, warehouse/location control, and leakage reports.'],
  ['hrms', 'HRMS', 'HRMS should centralize employee records, attendance, leave, payroll, documents, approvals, and HR reports.'],
  ['crm', 'CRM', 'CRM should capture leads, assign owners, remind follow-ups, track pipeline stages, and report conversion quality.'],
  ['manufacturing', 'Manufacturing ERP', 'Manufacturing ERP should cover production planning, purchase, inventory, QC, dispatch, vendors, cost tracking, and dashboards.'],
  ['attendance', 'Attendance System', 'An attendance system can use face, QR, device, or app-based capture with reports, leave sync, alerts, and HR/ERP integration.']
];

function matchKnowledge(input) {
  const lower = input.toLowerCase();
  return knowledge.find(([key]) => lower.includes(key)) || knowledge[1];
}

function buildRichReply(message) {
  const [, title, copy] = matchKnowledge(message);
  return `${title} Recommendation

${copy}

Suggested ARDS approach:
- Discovery: map users, departments, current tools, and pain points.
- Solution design: confirm modules, roles, dashboards, integrations, and data migration.
- Build plan: launch the highest-value workflow first, then expand in phases.
- ROI focus: reduce manual work, leakage, delays, duplicate entries, and reporting gaps.

Indicative timeline: 4 - 16 weeks depending on scope.
Next best step: share users, current process, must-have modules, and launch timeline.`;
}

export async function sendConsultantMessage({ message }) {
  await delay(500);
  return {
    reply: buildRichReply(message),
    suggestions: ['Tell me more', 'Estimate Cost', 'Generate Proposal', 'Book Demo', 'View Services', 'Contact Expert']
  };
}

export async function analyzeBusiness({ message }) {
  await delay(450);
  return {
    score: 74,
    maturity: 68,
    readiness: 81,
    risks: ['Manual dependency', 'Reporting delay', 'Follow-up leakage'],
    message: buildRichReply(message || 'business automation')
  };
}

export async function estimateCost(form) {
  await delay(250);
  const base = { Website: 75000, ERP: 350000, 'Mobile App': 250000, Cloud: 125000, AI: 250000, CRM: 180000, Inventory: 180000, Hospital: 450000, School: 300000 }[form.type] || 150000;
  const low = Math.round(base + form.features.length * 45000 + Math.max(0, Number(form.users || 0) - 25) * 1200 + Number(form.integrations || 0) * 55000);
  return { low, high: Math.round(low * 1.75), weeks: form.timeline === 'Urgent' ? '3 - 8 weeks' : '6 - 14 weeks' };
}

export async function generateProposalDraft(proposal) {
  await delay(450);
  const subject = `${proposal.industry} ${proposal.requirements}`;
  const [, title] = matchKnowledge(subject);
  return {
    text: `ARDS Digital Transformation Proposal

Client: ${proposal.company || 'Prospective Client'}
Industry: ${proposal.industry || 'To be confirmed'}

Recommended Solution
${title}

Scope
${proposal.requirements || 'Discovery, solution design, development, deployment, training, and support.'}

Commercial Direction
${proposal.budget || 'Final estimate after discovery'}

Timeline
${proposal.timeline || 'Phased delivery based on confirmed modules'}

Next Step
Schedule a consultation to confirm users, modules, integrations, data migration, hosting, and support.`
  };
}

export async function analyzeWebsite(url) {
  await delay(350);
  const secure = String(url).startsWith('https://');
  return {
    score: secure ? 86 : 68,
    items: [
      { label: 'Security signal', value: secure ? 'HTTPS detected' : 'Use HTTPS for trust and SEO' },
      { label: 'SEO readiness', value: 'Review metadata, structured content, schema, local SEO, and page speed' },
      { label: 'Lead conversion', value: 'Add strong CTAs, WhatsApp, enquiry forms, proof, and analytics events' },
      { label: 'ARDS recommendation', value: 'Run a conversion-focused redesign and SEO foundation sprint' }
    ]
  };
}

export async function analyzeDocumentFile(file) {
  await delay(400);
  return {
    filename: file.name,
    size_kb: Math.round(file.size / 1024),
    category: 'Frontend document intake',
    extracted_signals: ['Requirement document', 'Scope mapping required', 'Proposal-ready input'],
    recommendations: ['Confirm project type, users, deadline, modules, integrations, and budget range.']
  };
}

export async function bookMeeting(lead) {
  await delay(250);
  return { status: 'ready', handoff: `Name: ${lead.name}\nCompany: ${lead.company}\nPhone: ${lead.phone}\nInterest: ${lead.interest}` };
}
