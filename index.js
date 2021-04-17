import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router";

// require : node modules을 어딘가에서 가져오다
const app = express();

const PORT = 4000;

const handleListening = () =>
  console.log(`listening on: http://localhost:${PORT}`);

// 무언가를 요청하고 응답할때 req, res 를 써준다.
const handleHome = (req, res) => res.send("hello from home");

const handleProfile = (req, res) => res.send("You are on my profile");

app.use(cookieParser());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

//Router 를 생성한다.
app.get("/", handleHome);

app.get("/profile", handleProfile);

app.use("/user", userRouter);

app.listen(PORT, handleListening);
