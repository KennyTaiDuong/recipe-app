import express, { Request, Response } from "express"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"
const recipes = require("../client/data.json")
const cors = require("cors")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json())

const getData = () => {
  const dataPath = path.join(__dirname, '../client/data.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(rawData);
};

app.get("/recipes", async (req: Request, res: Response) => {
  const recipes = getData();
  res.json(recipes);
})

app.post("/recipes", async (req: Request, res: Response) => {
  const data = getData();

  data.recipes.push(req.body);

  fs.writeFile('../client/data.json', JSON.stringify(data), (err) => {
    if (err) throw err;
    res.status(200).send('Recipe added successfully');
  });
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

