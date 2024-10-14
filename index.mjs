import express from 'express';
import fs, { readFileSync } from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData =() => {
    try{
        const data = readFileSync("./db.json");
        return(JSON.parse(data));
    } catch (error){
        console.log(error);
    }
}

const writeData = (data) => {
    try{
        fs.writeFileSync("./db.json", JSON.stringify(data))
    } catch (error){
        console.log(error);
    }
}

app.get("/books", (req, res) => {
    const data = readData();
    res.json(data.books);
});

app.get("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const book = data.books.find((book) => book.id === id);
    res.json(book);
});

app.post("/books", (req, res) => {
    const data = readData();
    const body = req.body;
    const newBook = {
        id: data.books.length + 1,
        ...body,
    };
    data.books.push(newBook);
    writeData(data);
    res.json(newBook);
});

app.get("/", (req, res) =>{
    res.send("Welcome to my firts api on nodejs");
});

app.listen(3000, () =>{
    console.log('Server is listening on port 3000');
});
