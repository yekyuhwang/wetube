import routes from "./routes";

export const LocalsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};

// isAuthenticated : 로그인이 잘 되었는지 알려주는 변수
