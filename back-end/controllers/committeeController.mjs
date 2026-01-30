// controllers/committeeController.mjs

export const getComite = (req, res) => {
  res.json("Comite router");
};

export const selectFilm = (req, res) => {
  res.json({});
};

export const addNote = (req, res) => {
  res.json({});
};

export const validateFilm = (req, res) => {
  const { filmid } = req.params;
  res.json({ filmid });
};

export const refuseFilm = (req, res) => {
  const { filmid } = req.params;
  res.json({ filmid });
};

export const listFilms = (req, res) => {
  res.json({});
};

export const sortHistory = (req, res) => {
  res.json({});
};
