import express from 'express';
import fs, { readFileSync } from "fs";

const app = express();

const readData =() => {
    try{
        const data = readFileSync("./db.json");
        return(JSON.parse(data));
    } catch (error){
        console.log(error);
    }
}

const writeData = () => {
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

app.get("/", (req, res) =>{
    res.send("Welcome to my firts api on nodejs");
});

app.listen(3000, () =>{
    console.log('Server is listening on port 3000');
});
