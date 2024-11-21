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

app.get("/dogs", (req, res) => {
    const data = readData();
    res.json(data.dogs);
});

app.get("/dogs/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const dog = data.dogs.find((dog) => dog.id === id);
    res.json(dog);
});

app.post("/dogs", (req, res) => {
    const data = readData();
    const body = req.body;
    const newDog = {
        id: data.dogs.length + 1,
        ...body,
    };
    data.dogs.push(newDog);
    writeData(data);
    res.json(newDog);
});

app.put("/dogs/:id", (req,res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const dogIndex = data.dogs.findIndex((dog) => dog.id === id);
    data.dogs[dogIndex] = {
        ...data.dogs[dogIndex],
        ...body,
    };
    writeData(data);
    res.json({message: "Se actualizó el registro del perrito"})
});

app.get("/", (req, res) =>{
    res.send("Welcome to my firts api on nodejs");
});

app.listen(3000, () =>{
    console.log('Server is listening on port 3000');
});
