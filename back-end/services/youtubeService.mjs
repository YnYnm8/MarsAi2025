import { google } from 'googleapis';

// LLAMAMOS .ENV
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const youtube = google.youtube({
    version: 'v3',
    auth: YOUTUBE_API_KEY
});

/**
 * Extrae el ID del video de una URL de YouTube
 */

export const extractVideoId = (url) => {
    if (!url) return null;
    const decodedUrl = decodeURIComponent(url);
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = decodedUrl.match(regExp);
    return match ? match[1] : null;
};
/**
 * Valida el video con la API oficial
 */
export const validateYoutubeVideo = async (videoId) => {
    const res = await youtube.videos.list({
        id: videoId,
        part: 'status,contentDetails,snippet'
    });

    const video = res.data.items[0];
    if (!video) throw new Error("Video no encontrado en YouTube");

    if (!video.status.embeddable) {
        throw new Error("Le video n'autorise pas l'intégration (Embeddable)");
    }

    if (video.status.privacyStatus === 'private') {
        throw new Error("Le video est privé");
    }

    return {
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
        duration: video.contentDetails.duration // Viene como 'PT1M0S'
    };
};

/**
 * Convierte duración a segundos
 */
export const controlDuration = (duration) => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);
    return hours * 3600 + minutes * 60 + seconds;
};
