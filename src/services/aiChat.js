import { QUALITY_MEDIA_KNOWLEDGE, FALLBACK_ANSWERS } from '../data/knowledgeBase';

export async function askGroqAI(messages, apiKey) {
  // If an API key is provided, use Groq's high-speed Llama 3.3 endpoint
  if (apiKey && apiKey.trim().startsWith('gsk_')) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: QUALITY_MEDIA_KNOWLEDGE },
            ...messages.slice(-6), // Keep context of last 6 messages
          ],
          temperature: 0.3,
          max_tokens: 280,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.warn('Groq API error, falling back:', errText);
      } else {
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content;
        if (content) {
          return { reply: content, isAi: true };
        }
      }
    } catch (err) {
      console.warn('Network error reaching Groq API, using intelligent fallback:', err);
    }
  }

  // Smart Fallback Engine based on Quality Media Services Knowledge Base
  const lastUserMsg = messages
    .filter((m) => m.role === 'user')
    .slice(-1)[0]?.content?.toLowerCase() || '';

  for (const item of FALLBACK_ANSWERS) {
    if (item.keywords.some((k) => lastUserMsg.includes(k))) {
      return { reply: item.reply, action: item.action, isAi: false };
    }
  }

  return {
    reply:
      "Hello! Quality Media.com Pvt Ltd (Udupi) can assist you with Class 3 Digital Signatures (DSC), Income Tax Returns (ITR), quarterly TDS filings, PAN services, and authorized TallyPrime / BUSY software. You can upload forms directly on our portal, or ask me for document checklists!",
    action: { label: 'Upload Documents Online', action: 'portal' },
    isAi: false,
  };
}

