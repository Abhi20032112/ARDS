export type AiAgentInteractionType = 'chat' | 'quick_action' | 'file_upload' | 'proposal' | 'website_audit' | 'meeting_request' | 'voice';

export type AiAgentInteractionInput = {
  session_id: string;
  interaction_type: AiAgentInteractionType;
  mode: string;
  user_message?: string;
  ai_response?: string;
  lead_name?: string;
  lead_company?: string;
  lead_phone?: string;
  lead_interest?: string;
  lead_score?: number;
  service?: string;
  metadata?: Record<string, unknown>;
  source?: string;
};
