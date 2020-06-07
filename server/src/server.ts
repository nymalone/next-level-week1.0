import express from "express";
import cors from "cors";
import path from "path";
import routes from "./routes";
import { errors } from "celebrate";

const app = express();

app.use(cors()); //assim eu permito que todas as urls acessem
app.use(express.json());
app.use(routes);

app.use("/uploads", express.static(path.resolve(__dirname, ".", "uploads")));

app.use(errors());

app.listen(3333, () => {
  console.log("Listening on port 3333! Happy hacking!");
});
