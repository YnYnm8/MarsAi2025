import { Resend } from "resend";
import { EMAIL_TEMPLATES } from "../config/emailTemplates.mjs";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Génère le titre et message in-app selon le type.
 */
const IN_APP_CONTENT = (type, data) => {
  const map = {
    FILM_SUBMITTED: {
      title: "Film soumis",
      message: `Votre film "${data.filmTitle}" a bien été soumis et est en cours de validation.`,
    },
    FILM_APPROVED: {
      title: "Film validé ✅",
      message: `Votre film "${data.filmTitle}" est maintenant visible publiquement.`,
    },
    FILM_REJECTED_ADMIN: {
      title: "Film non validé ⚠️",
      message: `Votre film "${data.filmTitle}" n'a pas été validé. Consultez votre espace pour les détails.`,
    },
    FILM_SELECTED: {
      title: "🏆 Sélection Officielle !",
      message: `Félicitations ! Votre film "${data.filmTitle}" fait partie des 50 films de la Sélection Officielle MarsAI 2026.`,
    },
    FILM_NOT_SELECTED: {
      title: "Résultats de la sélection",
      message: `Votre film "${data.filmTitle}" n'a pas été retenu dans la Sélection Officielle. Merci de votre participation.`,
    },
    FILM_MODIFICATION_ASKED: {
      title: "Modification demandée 📝",
      message: `L'équipe MarsAI vous demande de modifier "${data.filmTitle}". Consultez votre espace.`,
    },
    FILM_MODIFICATION_OK: {
      title: "Modification acceptée ✅",
      message: `Votre modification pour "${data.filmTitle}" a été validée.`,
    },
    FILM_MODIFICATION_KO: {
      title: "Modification refusée ❌",
      message: `Votre modification pour "${data.filmTitle}" a été refusée. Consultez les détails.`,
    },
    FILM_BANNED: {
      title: "Film retiré 🚫",
      message: `Votre film "${data.filmTitle}" a été retiré de la plateforme suite à un signalement.`,
    },
    FILMS_ASSIGNED: {
      title: "Films assignés 📋",
      message: `${data.count} film(s) vous ont été assignés pour évaluation.`,
    },
    SELECTION_OPENED: {
      title: "🟢 Phase de sélection ouverte",
      message: `La période de sélection est ouverte. Commencez vos évaluations !`,
    },
    SELECTION_CLOSED: {
      title: "🔴 Phase de sélection fermée",
      message: `La période de sélection est terminée. Merci pour votre travail.`,
    },
    TICKET_CREATED: {
      title: "🚨 Nouveau signalement",
      message: `Un nouveau signalement a été déposé sur "${data.filmTitle}" (motif : ${data.reason}).`,
    },
    NEW_FILM_PENDING: {
      title: "Film en attente de validation",
      message: `Le film "${data.filmTitle}" de ${data.directorName} attend votre validation.`,
    },
    MODIFICATION_REQUEST: {
      title: "Demande de modification",
      message: `${data.directorName} souhaite modifier son film "${data.filmTitle}".`,
    },
    SYSTEM: {
      title: data.title || "Notification système",
      message: data.message || "",
    },
  };

  return map[type] || { title: "Notification", message: "" };
};

/**
 * Envoie une notification multi-canal (BDD + Email + WebSocket).
 */
export const notify = async ({
  type,
  userId,
  emailTo,
  data = {},
  metadata = null,
  sendEmail = true,
  models,
  io,
}) => {
  try {
    const { title, message } = IN_APP_CONTENT(type, data);

    // 1. Persister en BDD
    const notification = await models.Notification.create({
      userId,
      type,
      title,
      message,
      metadata: metadata || data,
      isRead: false,
      emailSent: false,
    });

    // 2. WebSocket
    if (io) {
      io.to(`user_${userId}`).emit("notification", {
        id: notification.id,
        type,
        title,
        message,
        createdAt: notification.createdAt,
        metadata: notification.metadata,
      });
    }

    // 3. Email via Resend
    let emailSentSuccess = false;
    if (sendEmail && emailTo && EMAIL_TEMPLATES[type]) {
      try {
        const { subject, html } = EMAIL_TEMPLATES[type](data);
        await resend.emails.send({
          from: process.env.SMTP_FROM || "noreply@marsai.fr",
          to: emailTo,
          subject,
          html,
        });
        emailSentSuccess = true;
        await notification.update({ emailSent: true });
      } catch (emailError) {
        console.error(`[NotificationService] Email failed userId=${userId}:`, emailError.message);
      }
    }

    console.log(`[NotificationService] ✅ type=${type} | userId=${userId} | email=${emailSentSuccess}`);
    return notification;

  } catch (error) {
    console.error("[NotificationService] ❌ Failed:", error);
    throw error;
  }
};

// Helpers réalisateur

export const notifyFilmSubmitted = ({ director, film, deps }) =>
  notify({ type: "FILM_SUBMITTED", userId: director.id, emailTo: director.email,
    data: { directorName: director.firstName, filmTitle: film.title, filmId: film.id }, ...deps });

export const notifyFilmApproved = ({ director, film, deps }) =>
  notify({ type: "FILM_APPROVED", userId: director.id, emailTo: director.email,
    data: { directorName: director.firstName, filmTitle: film.title, filmId: film.id }, ...deps });

export const notifyFilmRejectedAdmin = ({ director, film, reason, deps }) =>
  notify({ type: "FILM_REJECTED_ADMIN", userId: director.id, emailTo: director.email,
    data: { directorName: director.firstName, filmTitle: film.title, reason }, ...deps });

/** ⚠️ N'appeler qu'après PATCH /admin/lock/selection */
export const notifyFilmSelected = ({ director, film, deps }) =>
  notify({ type: "FILM_SELECTED", userId: director.id, emailTo: director.email,
    data: { directorName: director.firstName, filmTitle: film.title, filmId: film.id }, ...deps });

/** ⚠️ N'appeler qu'après PATCH /admin/lock/selection */
export const notifyFilmNotSelected = ({ director, film, deps }) =>
  notify({ type: "FILM_NOT_SELECTED", userId: director.id, emailTo: director.email,
    data: { directorName: director.firstName, filmTitle: film.title }, ...deps });

export const notifyModificationAsked = ({ director, film, message, deps }) =>
  notify({ type: "FILM_MODIFICATION_ASKED", userId: director.id, emailTo: director.email,
    data: { directorName: director.firstName, filmTitle: film.title, filmId: film.id, message }, ...deps });

export const notifyModificationOk = ({ director, film, deps }) =>
  notify({ type: "FILM_MODIFICATION_OK", userId: director.id, emailTo: director.email,
    data: { directorName: director.firstName, filmTitle: film.title, filmId: film.id }, ...deps });

export const notifyModificationKo = ({ director, film, reason, deps }) =>
  notify({ type: "FILM_MODIFICATION_KO", userId: director.id, emailTo: director.email,
    data: { directorName: director.firstName, filmTitle: film.title, filmId: film.id, reason }, ...deps });

export const notifyFilmBanned = ({ director, film, deps }) =>
  notify({ type: "FILM_BANNED", userId: director.id, emailTo: director.email,
    data: { directorName: director.firstName, filmTitle: film.title }, ...deps });

// Helpers comité 

export const notifyFilmsAssigned = ({ member, count, deps }) =>
  notify({ type: "FILMS_ASSIGNED", userId: member.id, emailTo: member.email,
    data: { memberName: member.firstName, count }, ...deps });

export const notifySelectionOpened = async ({ members, deadline, deps }) =>
  Promise.all(members.map((member) =>
    notify({ type: "SELECTION_OPENED", userId: member.id, emailTo: member.email,
      data: { memberName: member.firstName, deadline }, ...deps })
  ));

export const notifySelectionClosed = async ({ members, deps }) =>
  Promise.all(members.map((member) =>
    notify({ type: "SELECTION_CLOSED", userId: member.id, emailTo: member.email,
      data: { memberName: member.firstName }, ...deps })
  ));

// Helpers admin

export const notifyAdminsNewTicket = async ({ admins, film, ticket, reason, totalReports, deps }) =>
  Promise.all(admins.map((admin) =>
    notify({ type: "TICKET_CREATED", userId: admin.id, emailTo: admin.email,
      data: { filmTitle: film.title, reason, ticketId: ticket.id, totalReports }, ...deps })
  ));

export const notifyAdminsNewFilmPending = async ({ admins, film, director, deps }) =>
  Promise.all(admins.map((admin) =>
    notify({ type: "NEW_FILM_PENDING", userId: admin.id, emailTo: admin.email,
      data: { filmTitle: film.title, directorName: director.firstName, filmId: film.id }, ...deps })
  ));

export const notifyAdminsModificationRequest = async ({ admins, film, director, deps }) =>
  Promise.all(admins.map((admin) =>
    notify({ type: "MODIFICATION_REQUEST", userId: admin.id, emailTo: admin.email,
      data: { filmTitle: film.title, directorName: director.firstName, filmId: film.id }, ...deps })
  ));

/**
 * Notifie TOUS les réalisateurs du résultat final.
 * ⚠️ Appelé uniquement depuis PATCH /admin/lock/selection
 */
export const notifyAllDirectorsSelectionResult = async ({ allFilms, deps }) =>
  Promise.all(allFilms.map((film) => {
    const fn = film.isSelected ? notifyFilmSelected : notifyFilmNotSelected;
    return fn({ director: film.Director, film, deps });
  }));