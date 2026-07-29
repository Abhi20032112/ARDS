export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Closed' | 'Lost';

export type ContactLeadInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  service: string;
  message: string;
  source?: string;
  website?: string;
};

export type ContactLeadRecord = {
  id: string;
  created_at: string;
  name: string;
  company: string | null;
  email: string;
  phone: string;
  industry: string;
  service: string;
  message: string;
  status: LeadStatus;
  source: string;
  ip_address: string | null;
  device: string | null;
  browser: string | null;
};

export type ContactValidationErrors = Partial<Record<keyof ContactLeadInput, string>>;

export type ContactSubmitResult = {
  lead?: ContactLeadRecord;
  error?: string;
};
