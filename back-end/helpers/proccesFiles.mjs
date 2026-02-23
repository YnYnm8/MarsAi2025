import sharp from "sharp";
import fs from "fs";

export const handleFileProcessing = async (filmId, files, existingFileRecord = null) => {
    const updates = {};

    // sharp poster
    if (files?.poster) {
        const file = files.poster[0];
        const resizedPath = `${file.destination}/resized-${file.filename}`;

        await sharp(file.path).resize(800, 600, { fit: "inside" }).toFile(resizedPath);

        if (fs.existsSync(file.path)) fs.unlinkSync(file.path); // Borrar original
        if (existingFileRecord?.poster_url && fs.existsSync(existingFileRecord.poster_url)) {
            fs.unlinkSync(existingFileRecord.poster_url); // Borrar viejo
        }
        updates.poster_url = resizedPath;
    }
    //VIDEO
    if (files?.film) {
        if (existingFileRecord?.film_url && fs.existsSync(existingFileRecord.film_url)) {
            fs.unlinkSync(existingFileRecord.film_url);
        }
        updates.film_url = files.film[0].path;
    }

    // subtitulos galeria
    if (files?.galerie) updates.galerie_url = files.galerie.map(f => f.path).join(",");
    if (files?.subtitle) updates.subtitle = files.subtitle.map(f => f.path).join(",");

    // stockage bdd
    if (existingFileRecord) {
        return await existingFileRecord.update(updates);
    } else {
        return await File.create({ FilmId: filmId, ...updates });
    }
};