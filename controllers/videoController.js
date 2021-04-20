import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    throw Error("Lalalal");
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.dir(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("Upload", { pageTitle: "Upload" });

export const postUpload = (req, res) => {
  const {
    body: { file, title, description },
  } = req;
  console.log(file, title, description);
  // To Do : Upload and save video
  res.redirect(routes.videoDetail(324393));
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });

// MVC -> C : Control 에 해당하는 부분

// async -> 기다려주는 무언가. / JavaScript 이고, function의 어떤 부분은 꼭 기다려야 된다고 신호를 보낸다.
// await -> 다음 과정이 끝날때까지 잠시 기다려 달라는 의미.
// 만약 async를 쓰지 않았다면 error가 난다. -> await keyword는 async 없이는 쓸 수 없다.
// await 부분이 끝나기 전까지는 render 부분을 실행하지 않을 것이다.
// try는 해야할 것들 -> 만약 실패한다면 해당 error를 잡아낸다. 그래야 무슨 error인지 볼 수 있다.
// catch -> try 해준 것을 catch 잡아내겠다.

// multer -> upload.single('avatar') -> function을 집어 넣으면 middleware가 file의 URL을 반환한다.
