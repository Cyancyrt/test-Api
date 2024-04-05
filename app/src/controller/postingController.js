const postingModel = require("../models/post.js");
const kategoriModel = require("../models/category.js");

const getAllPost = async (req, res) => {
  try {
    const data = await postingModel.findAll({
      include: kategoriModel,
    });
    res.status(200).json({
      Message: "get all post success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      Message: "server error",
      serverMesssage: error,
    });
  }
};

const getOnePost = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await postingModel.findOne({
      include: kategoriModel,
      where: {
        slug: id,
      },
    });
    if (!data) {
      return res.status(404).json({
        Message: "No post data found for the given ID",
      });
    }
    if (data.length === 0) {
      return res.status(404).json({
        Message: "No post data found for the given ID",
      });
    }
    res.status(200).json({
      Message: "get post success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      Message: "server error",
      serverMesssage: error,
    });
  }
};

async function createSlug(input) {
  let slug = input
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .trim();
  let counter = 1;
  const ori = slug;
  let getData = await postingModel.findOne({
    where: {
      slug: slug,
    },
  });
  while (getData?.dataValues?.slug == slug) {
    slug = `${ori}-${counter}`;
    getData = await postingModel.findOne({ where: { slug: slug } });
    counter++;
  }
  return slug;
}

const createPost = async (req, res) => {
  try {
    const slug = await createSlug(req.body.title);
    const excerpt = req.body.isi.slice(0, 100);
    const body = { ...req.body, excerpt, slug };
    const data = await postingModel.create(body);
    res.status(200).json({
      Message: "create post success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      Message: "server error",
      serverMesssage: error.message,
    });
  }
};

module.exports = { getAllPost, getOnePost, createPost };
