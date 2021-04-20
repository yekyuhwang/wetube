import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "videos/" });

export const LocalsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};

export const uploadVideo = multerVideo.single("videoFile");

// isAuthenticated : 로그인이 잘 되었는지 알려주는 변수
