import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { AiAgentInteractionInput } from '@/types/aiAgent';

const MAX_TEXT_LENGTH = 8000;

const cleanText = (value?: string) =>
  String(value || '')
    .replace(/[<>]/g, '')
    .replace(/\s+\n/g, '\n')
    .trim()
    .slice(0, MAX_TEXT_LENGTH);

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

export const logAiAgentInteraction = async (input: AiAgentInteractionInput) => {
  if (!isSupabaseConfigured || !input.session_id) {
    return { skipped: true };
  }

  const payload = {
    session_id: input.session_id,
    interaction_type: input.interaction_type,
    mode: input.mode || 'chat',
    user_message: cleanText(input.user_message),
    ai_response: cleanText(input.ai_response),
    lead_name: cleanText(input.lead_name),
    lead_company: cleanText(input.lead_company),
    lead_phone: cleanText(input.lead_phone),
    lead_interest: cleanText(input.lead_interest),
    lead_score: Number.isFinite(input.lead_score) ? input.lead_score : null,
    service: cleanText(input.service),
    metadata: input.metadata || {},
    source: input.source || 'alpenrose_ai_agent',
    device: getDevice(),
    browser: getBrowser(),
  };

  const { error } = await supabase.from('ai_agent_interactions').insert(payload);
  if (error) {
    console.warn('AI interaction was not saved:', error.message);
    return { error: error.message };
  }

  return { ok: true };
};
