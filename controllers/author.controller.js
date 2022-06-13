import { Author } from "../models/Author.js";


export const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        return res.json({ authors });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
}

export const getAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const author = await Author.findById(id).lean();

        if (!author)
            return res.status(404).json({ error: "No existe el Autor" });

        return res.json({ author });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
}

export const createAuthor = async (req, res) => {
    try {
        const author = new Author(req.body);
        const existAuthor = await Author.findOne({ name: author.name }).lean();

        if (existAuthor) return res.status(400).json({ error: "El Autor ya esta en la BBDD" });

        const newAuthor = await author.save();
        console.log(author);
        return res.status(201).json({ newAuthor });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
}

export const removeAuthor = async (req, res) => {
    try {

        const { id } = req.params;
        console.log(req.params);
        const author = await Author.findById(id);

        if (!author) return res.status(404).json({ error: "No existe el Autor" });
        if (!author.uid.equals(req.uid))
            return res.status(401).json({ error: "El Autor no te pertenece" });

        await Author.deleteOne(author);
        return res.json({ author });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
}

export const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        let author = await Author.findByIdAndUpdate(id, req.body);


        if (!author) return res.status(404).json({ error: "No existe el Autor" });

        if (!author.uid.equals(req.uid))
            return res.status(401).json({ error: "El autor no te pertenece" });

        console.log(author);

        return res.json({ author });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId")
            return res.status(403).json({ error: "Formato id incorrecto" });
        return res.status(500).json({ error: "Error de servidor" });
    }
}