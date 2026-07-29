import { useMemo, useState } from 'react';
import { submitContactLead, validateContactLead } from '@/services/contact';
import type { ContactLeadInput, ContactValidationErrors } from '@/types/contact';

export const initialContactForm: ContactLeadInput = {
  name: '',
  company: '',
  email: '',
  phone: '',
  industry: '',
  service: '',
  message: '',
  source: 'contact_page',
  website: '',
};

export const useContact = () => {
  const [values, setValues] = useState<ContactLeadInput>(initialContactForm);
  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const progress = useMemo(() => {
    const required = ['name', 'company', 'email', 'phone', 'industry', 'service', 'message'] as const;
    const completed = required.filter((field) => values[field]?.trim()).length;
    return Math.round((completed / required.length) * 100);
  }, [values]);

  const updateField = (name: keyof ContactLeadInput, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSubmitError('');
    setIsSuccess(false);
  };

  const reset = () => {
    setValues(initialContactForm);
    setErrors({});
  };

  const submit = async () => {
    if (isSubmitting) return false;

    const nextErrors = validateContactLead(values);
    setErrors(nextErrors);
    setSubmitError('');
    setIsSuccess(false);

    if (Object.keys(nextErrors).length) return false;

    setIsSubmitting(true);
    const result = await submitContactLead(values);
    setIsSubmitting(false);

    if (result.error) {
      setSubmitError(result.error);
      return false;
    }

    setIsSuccess(true);
    reset();
    return true;
  };

  return {
    values,
    errors,
    isSubmitting,
    isSuccess,
    submitError,
    progress,
    updateField,
    submit,
    reset,
    setIsSuccess,
  };
};
