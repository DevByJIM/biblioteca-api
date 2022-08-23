import { Book } from "../models/Book.js";


export const getBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({'feclec':'descending'}).populate('authorid');
        // return res.json({ books });
        return res.status(200).json({ books });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
}

export const getBook = async (req, res) => {
    try {
        const { id } = req.params;
        
        const book = await Book.findById(id).populate('authorid');
        
        if (!book)
            return res.status(404).json({ error: "No existe el libro" });

        return res.json({ book });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
}

export const createBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        const existbook = await Book.findOne({ title: book.title, author: book.author }).lean();

        if (existbook) return res.status(400).json({ error: "El libro ya esta en la BBDD" });

        const newBook = await book.save();
        
        return res.status(201).json({ newBook });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
}

export const removeBook = async (req, res) => {
    try {

        const { id } = req.params;
        
        const book = await Book.findById(id);

        if (!book) return res.status(404).json({ error: "No existe el libro" });
        if (!book.uid.equals(req.uid))
            return res.status(401).json({ error: "El libro no te pertenece" });

        await Book.deleteOne(book);
        return res.json({ book });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
}

export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;

        let book = await Book.findByIdAndUpdate(id, req.body);


        if (!book) return res.status(404).json({ error: "no existe el libro" });

        if (!book.uid.equals(req.uid))
            return res.status(401).json({ error: "El libro no te pertenece" });

        console.log(book);

        return res.json({ book });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId")
            return res.status(403).json({ error: "Formato id incorrecto" });
        return res.status(500).json({ error: "Error de servidor" });
    }
}

export const getBooksAuthor = async (req, res) => {
    try {
        const { author } = req.params;
        console.log(author)
        const book = await Book.find({ authorid: authorid }).populate('authorid');

        if (!book)
            return res.status(404).json({ error: "No existe el libro" });

        return res.json({ book });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
}
