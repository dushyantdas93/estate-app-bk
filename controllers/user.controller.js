import prisma from "../lib/prisma.js";

export const getUsers = async (req, res) => {
  try {
    const user = await prisma.user.findMany();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "failed to get users" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (error) {}
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const body = req.body;

  console.log(id, tokenUserId);

  if (id !== tokenUserId) {
    return res.status(403).send("please enter valid params and invalid token");
  }

  try {
    const updatedUser = await prisma.user.update({
        where: { id },
        data:body,
    
    });

    return res.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (req, res) => {
  try {
    res.json({ message: "its works deleteuser" });
  } catch (error) {}
};
