import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  try {
    const getPost = await prisma.post.findMany();

    res.status(200).json(getPost);
  } catch (error) {
    res.status(500).json({ message: "failed" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  try {
    const getpost = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user:{select:{username:true,avatar:true,}},
      }
    });
    res.status(200).json(getpost);
  } catch (error) {
    // console.log(error)
    res.status(500).json({ message: "failed" });
  }
};

export const addPost = async (req, res) => {
  const iqou = req.body;
  const tokenUserId = req.userId;

  // const {
  //   title,
  //   price,
  //   address,
  //   city,
  //   bedroom,
  //   bathroom,
  //   type,
  //   property,
  //   latitude,
  //   longitude,
  //   images,
  // } = iqou;
  // if (
  //   !title ||
  //   !price ||
  //   !address ||
  //   !bedroom ||
  //   !bathroom ||
  //   !type ||
  //   !city ||
  //   !property ||
  //   !latitude ||
  //   !longitude ||
  //   !images
  // ) {
  //   return res.status(400).json({ message: "please provide all the details" });
  // }
  try {
    const newPost = await prisma.post.create({
      data: {
        ...iqou.postData,
        userId: tokenUserId,
        postDetail: {
          create: iqou.postDetail,
        },
      },
    });
    res.status(200).json({ message: "created post", data: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to create post" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "not authorized" });
    }

    await prisma.post.delete({
      where: { id },
    });
    res.status(200).json({ message: "post deleted" });
  } catch (error) {
    res.status(500).json({ message: "failed" });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json({ message: "post to" });
  } catch (error) {
    res.status(500).json({ message: "failed" });
  }
};
