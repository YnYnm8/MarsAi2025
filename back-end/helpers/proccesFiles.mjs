
import sharp from "sharp";
import fs from "fs";


export const handleFileProcessing = async (filmId, files, existingFileRecord = null, reqBody = {}) => {
    const updates = {};

    // Función interna de limpieza
    const clean = (f) => {
        if (!f) return null;
        // Si f es un string (ruta vieja), extraemos solo el nombre
        if (typeof f === 'string') return `/uploads/${f.split('/').pop()}`;
        // Si f es objeto Multer, usamos filename o limpiamos el path
        const name = f.filename || (f.path ? f.path.split('/').pop() : null);
        return name ? `/uploads/${name}` : null;
    };

    // 1. SHARP POSTER
    if (files?.poster) {
        const file = files.poster[0];
        const resizedFilename = `resized-${file.filename}`;
        const resizedPath = `${file.destination}/${resizedFilename}`;

        await sharp(file.path).resize(800, 600, { fit: "inside" }).toFile(resizedPath);

        // Borrar original
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path); 
        

        // base de datos guardamos la limpia
        updates.poster_url = `/uploads/${resizedFilename}`;
    }

    // 2. VIDEO
    if (files?.film) {
        updates.film_url = clean(files.film[0]);
    }

    // 3. GALERÍA (JSON ARRAY)
    const existingEntries = reqBody.existing_galerie 
        ? (Array.isArray(reqBody.existing_galerie) ? reqBody.existing_galerie : [reqBody.existing_galerie])
        : [];
    
    const newGalleryFiles = files?.galerie || [];
    
    // stockage
    if (newGalleryFiles.length > 0 || existingEntries.length > 0) {
        updates.galerie_url = [...existingEntries, ...newGalleryFiles]
            .map(f => clean(f))
            .filter(Boolean)
            .slice(0, 2);
    }

    // 4. SUBTÍTULOS
    if (files?.subtitle) {
        updates.subtitle = files.subtitle.map(f => clean(f)).join(",");
    }

    // 5. STOCKAGE BDD
    if (existingFileRecord) {
        return await existingFileRecord.update(updates);
    } else {
        return await File.create({ FilmId: filmId, ...updates });
    }
};