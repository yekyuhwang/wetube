import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { LocalsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
// express.static : directory 에서 file을 보내주는 middleware , directory는  uploads
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ==== pug에서 비디오를 재생하기 위해 추가해야하는 서버 세팅코드 ====
app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://archive.org"
  );

  return next();
});
// ======================================================

app.use(LocalsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;

// MVC
// M -> Model : data
// V -> View : how does the data look
// C -> Control : function that looks for the data
