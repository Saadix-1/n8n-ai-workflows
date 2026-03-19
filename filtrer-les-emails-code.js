const email = $input.item.json;

// Récupère tous les champs possibles selon la version du Gmail Trigger
const from = email.From || email.from || email.headers?.from || 'Inconnu';
const subject = email.Subject || email.subject || email.headers?.subject || '(Sans sujet)';

// Convertit le timestamp Unix en date lisible
const rawDate = email.Date || email.date || email.internalDate || '';
const date = rawDate
  ? new Date(parseInt(rawDate) || rawDate).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  : '';

const body = email.text || email.snippet || email.html || '';

// Ignore les emails trop courts
if (body.length < 20 && subject === '(Sans sujet)') return [];

// Ignore les newsletters et emails automatiques
const skipKeywords = ['noreply', 'no-reply', 'newsletter', 'notification', 'unsubscribe'];
const shouldSkip = skipKeywords.some(k =>
  from.toLowerCase().includes(k) || subject.toLowerCase().includes(k)
);
if (shouldSkip) return [];

return [{
  json: {
    from,
    subject,
    date,
    body: body.substring(0, 3000)
  }
}];
