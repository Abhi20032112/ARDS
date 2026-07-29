export const industryDetails = [
  {
    name: 'Education',
    slug: 'education',
    icon: 'GraduationCap',
    summary: 'Connected campuses, smarter administration, and better student experiences for schools, colleges, and universities.',
    challenges: ['Manual admissions and fee tracking', 'Disconnected departments', 'Parent/student communication gaps', 'Exam and attendance reporting delays'],
    solutions: ['School ERP', 'College ERP', 'Student portal', 'Parent app', 'LMS', 'Attendance automation', 'IQAC/NAAC dashboards'],
    outcomes: ['Faster administration', 'Cleaner academic data', 'Improved communication', 'Audit-ready reporting'],
    cta: 'Build a connected campus'
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    icon: 'HeartPulse',
    summary: 'Digital care journeys, hospital ERP, billing control, pharmacy visibility, and operational reporting.',
    challenges: ['Slow patient flow', 'Billing leakage', 'Pharmacy stock mismatch', 'Manual lab and OPD/IPD records'],
    solutions: ['Hospital ERP', 'OPD/IPD', 'Billing', 'Lab', 'Pharmacy', 'Inventory', 'Doctor scheduling', 'Patient portal'],
    outcomes: ['Faster patient service', 'Reduced leakage', 'Real-time inventory', 'Cleaner hospital reports'],
    cta: 'Digitize hospital operations'
  },
  {
    name: 'Manufacturing',
    slug: 'manufacturing',
    icon: 'Factory',
    summary: 'Production, inventory, purchase, quality, dispatch, vendors, and analytics working as one system.',
    challenges: ['Stock mismatch', 'Production delays', 'Manual purchase tracking', 'Limited dispatch visibility'],
    solutions: ['Manufacturing ERP', 'Production planning', 'Inventory', 'Purchase', 'Quality control', 'Vendor management', 'Dispatch tracking'],
    outcomes: ['Better material control', 'Production visibility', 'Lower leakage', 'Management dashboards'],
    cta: 'Modernize production'
  },
  {
    name: 'Government',
    slug: 'government',
    icon: 'Landmark',
    summary: 'Secure public-facing portals and administrative workflows built for scale, transparency, and access control.',
    challenges: ['Paper-heavy workflows', 'Citizen request tracking', 'Manual approvals', 'Reporting and accountability gaps'],
    solutions: ['Citizen portals', 'Case tracking', 'Document upload', 'Workflow approvals', 'Dashboards', 'Role-based access'],
    outcomes: ['Transparent service delivery', 'Faster approvals', 'Better public access', 'Audit-ready records'],
    cta: 'Plan a public system'
  },
  {
    name: 'Retail',
    slug: 'retail',
    icon: 'ShoppingCart',
    summary: 'Unified commerce, stock, customers, billing, loyalty, and business intelligence for growing retailers.',
    challenges: ['Stockouts and dead stock', 'Manual billing records', 'Weak customer follow-up', 'No branch-wise visibility'],
    solutions: ['POS', 'Inventory', 'CRM', 'E-commerce', 'Loyalty', 'Analytics', 'WhatsApp campaigns'],
    outcomes: ['Cleaner stock control', 'Better repeat sales', 'Faster billing', 'Stronger business visibility'],
    cta: 'Unify retail operations'
  },
  {
    name: 'Hospitality',
    slug: 'hospitality',
    icon: 'Hotel',
    summary: 'Guest operations from booking and check-in through billing, service requests, inventory, and reporting.',
    challenges: ['Manual booking flow', 'Service request delays', 'Billing errors', 'Low guest visibility'],
    solutions: ['Booking management', 'Guest CRM', 'Billing', 'Inventory', 'Housekeeping workflows', 'Feedback system'],
    outcomes: ['Better guest experience', 'Faster service', 'Cleaner billing', 'Improved repeat visits'],
    cta: 'Improve guest operations'
  },
  {
    name: 'NGO',
    slug: 'ngo',
    icon: 'HandHeart',
    summary: 'Transparent program management, field data capture, beneficiary tracking, and impact reporting.',
    challenges: ['Field data delays', 'Manual beneficiary records', 'Donor reporting pressure', 'Limited program visibility'],
    solutions: ['Field apps', 'Beneficiary database', 'Program dashboards', 'Document management', 'Impact reports'],
    outcomes: ['Better transparency', 'Real-time field visibility', 'Cleaner reporting', 'Stronger donor confidence'],
    cta: 'Track social impact'
  },
  {
    name: 'Real Estate',
    slug: 'real-estate',
    icon: 'Building2',
    summary: 'Lead, property, document, site visit, payment, and customer lifecycle automation.',
    challenges: ['Lead leakage', 'Property data scattered', 'Manual follow-ups', 'Document tracking issues'],
    solutions: ['Real estate CRM', 'Property inventory', 'Site visit tracking', 'Document workflows', 'Payment reminders'],
    outcomes: ['Better lead conversion', 'Cleaner property records', 'Faster follow-ups', 'Improved customer experience'],
    cta: 'Automate property sales'
  },
  {
    name: 'Transportation',
    slug: 'transportation',
    icon: 'Truck',
    summary: 'Fleet visibility, scheduling, trip tracking, maintenance, driver records, and operational dashboards.',
    challenges: ['Limited fleet visibility', 'Maintenance delays', 'Manual trip records', 'Scheduling conflicts'],
    solutions: ['Fleet dashboard', 'Trip scheduling', 'Driver records', 'Maintenance alerts', 'Fuel tracking', 'Reports'],
    outcomes: ['Better fleet utilization', 'Lower downtime', 'Cleaner trip records', 'Improved planning'],
    cta: 'Connect fleet operations'
  },
  {
    name: 'Sports Club',
    slug: 'sports-club',
    icon: 'Trophy',
    summary: 'Membership, attendance, billing, batches, facilities, coaches, and engagement management.',
    challenges: ['Manual memberships', 'Payment follow-up gaps', 'Batch scheduling issues', 'No attendance visibility'],
    solutions: ['Membership CRM', 'Billing', 'Attendance', 'Batch scheduling', 'Coach dashboard', 'Facility booking'],
    outcomes: ['Smoother member experience', 'Better collections', 'Cleaner scheduling', 'Operational visibility'],
    cta: 'Digitize club management'
  },
  {
    name: 'Infrastructure',
    slug: 'infrastructure',
    icon: 'HardHat',
    summary: 'Project monitoring, resource planning, field reporting, approvals, documents, and milestone visibility.',
    challenges: ['Field reporting delays', 'Resource tracking gaps', 'Document version issues', 'Weak milestone visibility'],
    solutions: ['Project dashboard', 'Field reporting app', 'Resource tracking', 'Approvals', 'Document control', 'Analytics'],
    outcomes: ['Better project control', 'Real-time reporting', 'Faster decisions', 'Reduced coordination gaps'],
    cta: 'Track projects clearly'
  },
  {
    name: 'Finance',
    slug: 'finance',
    icon: 'BarChart3',
    summary: 'Secure workflows, CRM, reporting, approval control, document management, and actionable analytics.',
    challenges: ['Manual approvals', 'Customer follow-up gaps', 'Document risk', 'Slow reporting'],
    solutions: ['CRM', 'Workflow approvals', 'Document management', 'Analytics', 'Role access', 'Audit logs'],
    outcomes: ['Better control', 'Faster reporting', 'Lower operational risk', 'Improved client service'],
    cta: 'Secure finance workflows'
  }
];

export const industryBySlug = Object.fromEntries(industryDetails.map((industry) => [industry.slug, industry]));
export const industryByName = Object.fromEntries(industryDetails.map((industry) => [industry.name.toLowerCase(), industry]));

export function industryPath(name) {
  return `/industries/${industryByName[name.toLowerCase()]?.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
}
