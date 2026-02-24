/**
 * Envoie les erreurs formatées au client
 */
export const sendErrors = (res, errors, status = 400) => {
    if (status === 500) {
        console.error(errors);
    }
    return res.status(status).json({ errors });
};
/**
 * Formate les erreurs de validation Zod
 */
export const formatZodErrors = (zodError) => {
    return zodError.issues.map(issue => ({
        field: issue.path.join(".") || "global",
        message: issue.message
    }));
};

/**
 * Catch global des erreurs (Sequelize + autres)
 */

export const catchError = (res, err) => {
    // Erreurs de validation Sequelize
    if (err.name === "SequelizeValidationError") {
        const errors = err.errors.map(e => ({
            field: e.path,
            message: e.message
        }));
        return sendErrors(res, errors, 400);
    }

    // Erreur générique
    return sendErrors(
        res,
        [{ field: "global", message: err.message || "Erreur serveur" }],
        500
    );
};
