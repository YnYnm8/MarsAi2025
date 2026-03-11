const BASE_URL = process.env.FRONTEND_URL_HOST || "http://localhost:5173";

/**
 * Wrapper HTML commun à tous les emails
 */
const layout = (content, previewText = "") => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>MarsAI - Festival</title>
  <style>
    body { font-family: Arial, sans-serif; background: #0d0d1a; color: #e0e0e0; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .card { background: #1a1a2e; border-radius: 12px; padding: 32px; border: 1px solid #2a2a4a; }
    .logo { font-size: 28px; font-weight: bold; color: #a78bfa; letter-spacing: 2px; margin-bottom: 24px; }
    .badge { display: inline-block; background: #7c3aed; color: #fff; border-radius: 20px; padding: 4px 14px; font-size: 12px; margin-bottom: 16px; }
    h1 { color: #ffffff; font-size: 22px; margin: 0 0 16px; }
    p { color: #b0b0c8; line-height: 1.7; margin: 0 0 16px; }
    .btn { display: inline-block; background: #7c3aed; color: #fff !important; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: bold; margin-top: 8px; }
    .btn-outline { background: transparent; border: 1px solid #7c3aed; color: #a78bfa !important; }
    .divider { border: none; border-top: 1px solid #2a2a4a; margin: 24px 0; }
    .footer { text-align: center; margin-top: 24px; font-size: 12px; color: #555577; }
    .highlight { color: #a78bfa; font-weight: bold; }
    .reason-box { background: #2a1a3a; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 4px; margin: 16px 0; }
    .success-box { background: #0f2a1a; border-left: 4px solid #22c55e; padding: 12px 16px; border-radius: 4px; margin: 16px 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="logo">🎬 MARS<span style="color:#ffffff">AI</span></div>
    <div class="card">
      ${content}
    </div>
    <div class="footer">
      Festival International de Courts-Métrages IA · Marseille 2026<br/>
      <a href="${BASE_URL}/unsubscribe" style="color:#555577">Se désabonner</a>
    </div>
  </div>
</body>
</html>
`;

/**
 * Dictionnaire de tous les templates d'emails par type de notification.
 */
export const EMAIL_TEMPLATES = {

  // RÉALISATEUR

  /**
   * Confirmation de soumission d'un film
   */
  FILM_SUBMITTED: ({ directorName, filmTitle, filmId }) => ({
    subject: `🎬 Votre film "${filmTitle}" a bien été soumis — MarsAI 2026`,
    html: layout(`
      <div class="badge">SOUMISSION REÇUE</div>
      <h1>Votre film est en cours d'examen</h1>
      <p>Bonjour <span class="highlight">${directorName}</span>,</p>
      <p>Nous avons bien reçu votre court-métrage <span class="highlight">"${filmTitle}"</span>. 
      Notre équipe va procéder à sa vérification dans les meilleurs délais.</p>
      <div class="success-box">
        <strong>Prochaine étape :</strong> Validation par notre équipe (droits d'auteur, conformité technique).
      </div>
      <a href="${BASE_URL}/films/${filmId}" class="btn">Voir ma soumission</a>
      <hr class="divider"/>
      <p style="font-size:13px">Vous recevrez un email lors de chaque changement de statut de votre film.</p>
    `),
  }),

  /**
   * Film validé et visible publiquement
   */
  FILM_APPROVED: ({ directorName, filmTitle, filmId }) => ({
    subject: `✅ "${filmTitle}" est maintenant en ligne — MarsAI 2026`,
    html: layout(`
      <div class="badge" style="background:#16a34a">VALIDÉ</div>
      <h1>Votre film est en ligne !</h1>
      <p>Bonjour <span class="highlight">${directorName}</span>,</p>
      <p>Excellente nouvelle ! Votre court-métrage <span class="highlight">"${filmTitle}"</span> 
      a été validé et est désormais visible par le public et le comité de sélection.</p>
      <a href="${BASE_URL}/films/${filmId}" class="btn">Voir mon film</a>
      <a href="${BASE_URL}/films/${filmId}" class="btn btn-outline" style="margin-left:12px">Partager</a>
    `),
  }),

  /**
   * Film refusé par l'admin avec raison
   */
  FILM_REJECTED_ADMIN: ({ directorName, filmTitle, reason }) => ({
    subject: `⚠️ Votre film "${filmTitle}" n'a pas été validé — MarsAI 2026`,
    html: layout(`
      <div class="badge" style="background:#dc2626">REFUSÉ</div>
      <h1>Votre film nécessite des corrections</h1>
      <p>Bonjour <span class="highlight">${directorName}</span>,</p>
      <p>Malheureusement, votre court-métrage <span class="highlight">"${filmTitle}"</span> 
      n'a pas pu être validé pour la raison suivante :</p>
      <div class="reason-box">${reason}</div>
      <p>Vous pouvez corriger votre film et le resoumettre avant la date limite de clôture des candidatures.</p>
      <a href="${BASE_URL}/dashboard/my-films" class="btn">Modifier mon film</a>
    `),
  }),

  /**
   * Film retenu dans la sélection officielle (envoyé uniquement après validation définitive)
   */
  FILM_SELECTED: ({ directorName, filmTitle, filmId }) => ({
    subject: `🏆 "${filmTitle}" est dans la Sélection Officielle MarsAI 2026 !`,
    html: layout(`
      <div class="badge" style="background:#d97706">⭐ SÉLECTION OFFICIELLE</div>
      <h1>Félicitations, vous êtes sélectionné·e !</h1>
      <p>Bonjour <span class="highlight">${directorName}</span>,</p>
      <p>Nous avons l'immense plaisir de vous informer que votre court-métrage 
      <span class="highlight">"${filmTitle}"</span> fait partie des <strong>50 films retenus</strong> 
      pour la Sélection Officielle du premier festival international de courts-métrages IA à Marseille.</p>
      <p>Votre film sera projeté devant le jury de professionnels et les 3 000 visiteurs attendus lors du festival.</p>
      <div class="success-box">
        🎉 Votre film concourt désormais pour les <strong>Prix du festival MarsAI 2026</strong>.
      </div>
      <a href="${BASE_URL}/selection-officielle/${filmId}" class="btn">Voir la sélection officielle</a>
    `),
  }),

  /**
   * Film non retenu à l'issue de la sélection officielle
   */
  FILM_NOT_SELECTED: ({ directorName, filmTitle }) => ({
    subject: `MarsAI 2026 — Résultats de la sélection officielle`,
    html: layout(`
      <div class="badge" style="background:#6b7280">RÉSULTATS</div>
      <h1>Résultats de la sélection officielle</h1>
      <p>Bonjour <span class="highlight">${directorName}</span>,</p>
      <p>Nous vous remercions chaleureusement d'avoir soumis votre court-métrage 
      <span class="highlight">"${filmTitle}"</span> au festival MarsAI 2026.</p>
      <p>Après examen attentif par notre comité de sélection, votre film n'a pas été retenu 
      parmi les 50 films de la Sélection Officielle. Cette décision a été difficile face au nombre 
      exceptionnel de candidatures reçues (+ 600 films de 120 pays).</p>
      <p>Nous espérons vous retrouver lors d'une prochaine édition et vous encourageons à continuer 
      votre exploration créative de l'IA.</p>
      <a href="${BASE_URL}" class="btn btn-outline">Découvrir la sélection officielle</a>
    `),
  }),

  /**
   * Demande de modification envoyée par l'admin au réalisateur
   */
  FILM_MODIFICATION_ASKED: ({ directorName, filmTitle, filmId, message }) => ({
    subject: `📝 Modification demandée pour "${filmTitle}" — MarsAI 2026`,
    html: layout(`
      <div class="badge" style="background:#0284c7">ACTION REQUISE</div>
      <h1>Une modification est demandée</h1>
      <p>Bonjour <span class="highlight">${directorName}</span>,</p>
      <p>L'équipe MarsAI vous demande d'apporter une modification à votre film 
      <span class="highlight">"${filmTitle}"</span> :</p>
      <div class="reason-box" style="border-color:#0284c7">${message}</div>
      <p>Votre film reste en ligne pendant la modification. 
      Une fois les corrections effectuées, il sera soumis à nouvelle validation.</p>
      <a href="${BASE_URL}/dashboard/my-films/${filmId}/edit" class="btn">Modifier mon film</a>
    `),
  }),

  /**
   * Modification validée par l'admin
   */
  FILM_MODIFICATION_OK: ({ directorName, filmTitle, filmId }) => ({
    subject: `✅ Votre modification pour "${filmTitle}" a été acceptée — MarsAI`,
    html: layout(`
      <div class="badge" style="background:#16a34a">MODIFICATION VALIDÉE</div>
      <h1>Votre modification a été acceptée</h1>
      <p>Bonjour <span class="highlight">${directorName}</span>,</p>
      <p>La modification apportée à votre film <span class="highlight">"${filmTitle}"</span> 
      a été validée par notre équipe. Votre film est de nouveau en ligne.</p>
      <a href="${BASE_URL}/films/${filmId}" class="btn">Voir mon film</a>
    `),
  }),

  /**
   * Modification refusée par l'admin avec raison
   */
  FILM_MODIFICATION_KO: ({ directorName, filmTitle, filmId, reason }) => ({
    subject: `❌ Modification refusée pour "${filmTitle}" — MarsAI`,
    html: layout(`
      <div class="badge" style="background:#dc2626">MODIFICATION REFUSÉE</div>
      <h1>Votre modification n'a pas été acceptée</h1>
      <p>Bonjour <span class="highlight">${directorName}</span>,</p>
      <p>La modification soumise pour <span class="highlight">"${filmTitle}"</span> 
      a été refusée pour la raison suivante :</p>
      <div class="reason-box">${reason}</div>
      <a href="${BASE_URL}/dashboard/my-films/${filmId}/edit" class="btn">Modifier à nouveau</a>
    `),
  }),

  /**
   * Film banni suite à un signalement accepté
   */
  FILM_BANNED: ({ directorName, filmTitle }) => ({
    subject: `🚫 Votre film "${filmTitle}" a été retiré de la plateforme — MarsAI`,
    html: layout(`
      <div class="badge" style="background:#7f1d1d">CONTENU RETIRÉ</div>
      <h1>Votre film a été retiré</h1>
      <p>Bonjour <span class="highlight">${directorName}</span>,</p>
      <p>Suite à un signalement examiné par notre équipe de modération, votre court-métrage 
      <span class="highlight">"${filmTitle}"</span> a été retiré de la plateforme 
      car il ne respecte pas le règlement du festival.</p>
      <p>Si vous pensez que cette décision est une erreur, vous pouvez nous contacter 
      à <a href="mailto:contact@marsai.fr" style="color:#a78bfa">contact@marsai.fr</a>.</p>
    `),
  }),

  // COMITÉ DE SÉLECTION

  /**
   * Films assignés à un membre du comité
   */
  FILMS_ASSIGNED: ({ memberName, count }) => ({
    subject: `📋 ${count} film(s) vous ont été assignés — Comité MarsAI`,
    html: layout(`
      <div class="badge">ASSIGNATION</div>
      <h1>De nouveaux films vous ont été assignés</h1>
      <p>Bonjour <span class="highlight">${memberName}</span>,</p>
      <p><strong>${count} film(s)</strong> vous ont été assignés pour évaluation. 
      Merci de les visionner et de les noter avant la fin de la période de sélection.</p>
      <a href="${BASE_URL}/comite/dashboard" class="btn">Accéder à mon espace comité</a>
    `),
  }),

  /**
   * Phase de sélection ouverte
   */
  SELECTION_OPENED: ({ memberName, deadline }) => ({
    subject: `🟢 La phase de sélection est ouverte — MarsAI 2026`,
    html: layout(`
      <div class="badge" style="background:#16a34a">SÉLECTION OUVERTE</div>
      <h1>La phase de sélection commence !</h1>
      <p>Bonjour <span class="highlight">${memberName}</span>,</p>
      <p>La période de sélection officielle est maintenant ouverte. 
      Vous pouvez commencer à visionner et évaluer les films qui vous ont été assignés.</p>
      <p>📅 <strong>Date limite :</strong> <span class="highlight">${deadline}</span></p>
      <a href="${BASE_URL}/comite/dashboard" class="btn">Commencer l'évaluation</a>
    `),
  }),

  /**
   * Phase de sélection fermée
   */
  SELECTION_CLOSED: ({ memberName }) => ({
    subject: `🔴 La phase de sélection est terminée — MarsAI 2026`,
    html: layout(`
      <div class="badge" style="background:#dc2626">SÉLECTION FERMÉE</div>
      <h1>La période de sélection est désormais close</h1>
      <p>Bonjour <span class="highlight">${memberName}</span>,</p>
      <p>La phase de sélection officielle est maintenant terminée. 
      Les votes ne sont plus acceptés. La sélection finale des 50 films sera annoncée prochainement.</p>
    `),
  }),

  // ADMIN

  /**
   * Nouveau signalement (ticket) créé
   */
  TICKET_CREATED: ({ filmTitle, reason, ticketId, totalReports }) => ({
    subject: `🚨 Nouveau signalement (#${ticketId}) — ${filmTitle}`,
    html: layout(`
      <div class="badge" style="background:#dc2626">SIGNALEMENT</div>
      <h1>Nouveau contenu signalé</h1>
      <p>Un nouveau signalement a été déposé sur la plateforme :</p>
      <ul style="color:#b0b0c8;line-height:2">
        <li><strong>Film :</strong> ${filmTitle}</li>
        <li><strong>Motif :</strong> <span class="highlight">${reason}</span></li>
        <li><strong>Total signalements sur ce film :</strong> ${totalReports}</li>
      </ul>
      <a href="${BASE_URL}/admin/tickets/${ticketId}" class="btn">Traiter le signalement</a>
    `),
  }),

  /**
   * Nouveau film en attente de validation admin
   */
  NEW_FILM_PENDING: ({ filmTitle, directorName, filmId }) => ({
    subject: `🎬 Nouveau film en attente de validation — "${filmTitle}"`,
    html: layout(`
      <div class="badge" style="background:#0284c7">VALIDATION REQUISE</div>
      <h1>Un nouveau film attend votre validation</h1>
      <p><strong>Film :</strong> ${filmTitle}<br/>
      <strong>Réalisateur :</strong> ${directorName}</p>
      <a href="${BASE_URL}/admin/validations/${filmId}" class="btn">Valider ou refuser</a>
    `),
  }),

  /**
   * Demande de modification d'un réalisateur (reçue par l'admin)
   */
  MODIFICATION_REQUEST: ({ filmTitle, directorName, filmId }) => ({
    subject: `📝 Demande de modification — "${filmTitle}" par ${directorName}`,
    html: layout(`
      <div class="badge" style="background:#0284c7">MODIFICATION</div>
      <h1>Un réalisateur souhaite modifier son film</h1>
      <p><strong>Film :</strong> ${filmTitle}<br/>
      <strong>Réalisateur :</strong> ${directorName}</p>
      <a href="${BASE_URL}/admin/validations/${filmId}" class="btn">Examiner la modification</a>
    `),
  }),
};