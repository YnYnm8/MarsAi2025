

export const getComite = (req, res) => {
    res.json("Comite router");
};

export const selectFilm = async (req, res) => {

    const lignes = await Model.findAll();
    const films = await films.findAll();

    res.json(films);
};

export const addNote = async (req, res) => {


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
