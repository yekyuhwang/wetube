import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    // Database에 있는 모든 Video 를 가져오겠다.

    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.dir(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;

  let videos = [];

  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
    // i -> insensitive 둔감한, 덜 민간함
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("Upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  console.log(newVideo);

  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);

    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;

  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// res.render("deleteVideo", { pageTitle: "Delete Video" });

// MVC -> C : Control 에 해당하는 부분
// redirect : 재조회 = refetch

// async -> 기다려주는 무언가. / JavaScript 이고, function의 어떤 부분은 꼭 기다려야 된다고 신호를 보낸다.
// await -> 다음 과정이 끝날때까지 잠시 기다려 달라는 의미. 성공하고 실패가 중요한게 아니라 끝났다는 것이 중요하다.
// 만약 async를 쓰지 않았다면 error가 난다. -> await keyword는 async 없이는 쓸 수 없다.
// await 부분이 끝나기 전까지는 render 부분을 실행하지 않을 것이다.
// try는 해야할 것들 -> 만약 실패한다면 해당 error를 잡아낸다. 그래야 무슨 error인지 볼 수 있다.
// catch -> try 해준 것을 catch 잡아내겠다.
// try catch -> error가 생기면 default로 잡아내지 못한다.

// multer -> upload.single('avatar') -> function을 집어 넣으면 middleware가 file의 URL을 반환한다.

// linter -> 뭔가 틀린게 있으면 알려주는 역할을 한다.

// $regex -> regular expression 정규표현식
