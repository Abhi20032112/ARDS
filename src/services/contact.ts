import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { ContactLeadInput, ContactLeadRecord, ContactSubmitResult, ContactValidationErrors } from '@/types/contact';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PHONE_PATTERN = /^[+()\d\s-]{7,20}$/;
const MIN_MESSAGE_LENGTH = 20;
const REQUEST_TIMEOUT_MS = 12000;

const clean = (value: string) =>
  value
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const getDevice = () => {
  if (typeof navigator === 'undefined') return null;
  if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) return 'Mobile';
  if (/Tablet|iPad/i.test(navigator.userAgent)) return 'Tablet';
  return 'Desktop';
};

const getBrowser = () => {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent;
  if (ua.includes('Edg/')) return 'Microsoft Edge';
  if (ua.includes('Chrome/')) return 'Chrome';
  if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Safari';
  if (ua.includes('Firefox/')) return 'Firefox';
  return 'Unknown';
};

const withTimeout = async <T,>(promise: Promise<T>) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  const timeout = new Promise<T>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error('Request timed out. Please try again.')), REQUEST_TIMEOUT_MS);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timeoutId!);
  }
};

export const validateContactLead = (values: ContactLeadInput): ContactValidationErrors => {
  const errors: ContactValidationErrors = {};

  if (!clean(values.name)) errors.name = 'Full name is required.';
  if (!clean(values.company)) errors.company = 'Company name is required.';
  if (!clean(values.email)) errors.email = 'Email address is required.';
  else if (!EMAIL_PATTERN.test(clean(values.email))) errors.email = 'Enter a valid email address.';
  if (!clean(values.phone)) errors.phone = 'Phone number is required.';
  else if (!PHONE_PATTERN.test(clean(values.phone))) errors.phone = 'Enter a valid phone number.';
  if (!clean(values.industry)) errors.industry = 'Industry is required.';
  if (!clean(values.service)) errors.service = 'Please select a service.';
  if (!clean(values.message)) errors.message = 'Message is required.';
  else if (clean(values.message).length < MIN_MESSAGE_LENGTH) errors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
  if (values.website) errors.website = 'Submission blocked.';

  return errors;
};

export const submitContactLead = async (values: ContactLeadInput): Promise<ContactSubmitResult> => {
  const errors = validateContactLead(values);
  if (Object.keys(errors).length) {
    return { error: Object.values(errors)[0] };
  }

  if (!isSupabaseConfigured) {
    return { error: 'Contact form is not configured yet. Please add Supabase environment variables in Vercel.' };
  }

  const payload = {
    name: clean(values.name),
    company: clean(values.company),
    email: clean(values.email).toLowerCase(),
    phone: clean(values.phone),
    industry: clean(values.industry),
    service: clean(values.service),
    message: clean(values.message),
    status: 'New',
    source: values.source || 'contact_page',
    ip_address: null,
    device: getDevice(),
    browser: getBrowser(),
  };

  try {
    const response = supabase.from('contact_leads').insert(payload);

    const { error } = await withTimeout(response);

    if (error) {
      return { error: error.message || 'Unable to submit your message right now.' };
    }

    return {};
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Network error. Please check your connection and try again.';
    return { error: message };
  }
};
