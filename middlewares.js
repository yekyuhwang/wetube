import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

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

// express는 사용자가 업로드한 파일을 받아서 저장하는 기본 기능을 제공하지 않는다.
// 따라서 모듈을 설치해서 (multer) 사용자가 전송한 파일을 처리하는 작업을 해야한다.
// npm install multer

//- multer -> upload.single('avatar') -> function을 집어 넣으면 middleware가 file의 URL을 반환한다.
