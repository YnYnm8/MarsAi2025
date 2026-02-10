import multer from "multer";
import fs from "fs";

//storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "./uploads";
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
})

//filtres
const fileFilter = (req, file, cb) => {
    const field = file.fieldname;
    if (field === "film") {
        file.mimetype.startsWith("video/") ? cb(null, true) : cb(new Error("Le fichier du film doit être une vidéo"));
    } else if (field === "poster" || field === "galerie") {
        ["image/jpeg", "image/png"].includes(file.mimetype)
            ? cb(null, true)
            : cb(new Error("Le poster doit être au format JPG ou PNG"));
    } else if (field === "subtitle") {
        ["application/x-subrip", "text/plain"].includes(file.mimetype)
            ? cb(null, true)
            : cb(new Error("Le fichier de sous-titres doit être au format .srt"));
    } else {
        cb(new Error("Champ de fichier non autorisé"));
    }
};

export const upload = multer({ storage, fileFilter });

export const uploadFields = upload.fields([
    { name: "film", maxCount: 1 },
    { name: "poster", maxCount: 1 },
    { name: "galerie", maxCount: 2 },
    { name: "subtitle", maxCount: 5 },
]);

