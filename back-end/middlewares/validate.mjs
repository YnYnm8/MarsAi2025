export const validate = (schema) => (req, res, next) => {
  try {
    // On valide le corps de la requête avec le schéma Zod
    schema.parse(req.body);
    next(); // Si c'est bon, on passe à la suite (le register)
  } catch (error) {
    // Si Zod renvoie une erreur, on la capture proprement
    return res.status(400).json({
      message: "Erreur de validation",
      errors: error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    });
  }
};