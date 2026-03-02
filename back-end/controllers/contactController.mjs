import { catchError } from "../helpers/errorHandler.mjs";
import Contact from "../models/Contact.mjs";

export async function saveAllInfos(req, res) {
  try {
    const { name, email, message, UserId } = req.body;

    if (!UserId) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const allInfos = await Contact.create({ name, email, message, UserId });
    // 管理者宛
    // await sendMail({
    //   to: process.env.ADMIN_EMAIL,
    //   subject: `Nouvelle demande de contact : ${name}`,
    //   text: message,
    //   html: `<p>Nom : ${name}</p><p>Email : ${email}</p><p>Message : ${message}</p>`,
    // });

    // // 利用者宛（受付メール）
    // await sendMail({
    //   to: email,
    //   subject: `Votre demande a été reçue`,
    //   text: `Merci pour votre message. Nous vous répondrons dans les plus brefs délais.`,
    //   html: `<p>${name},</p><p>Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>`,
    // });

    return res.json({ message: "Successfully sent" });
  } catch (error) {
    return catchError(res, error);
  }
}
