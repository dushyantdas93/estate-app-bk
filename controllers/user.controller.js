import prisma from "../lib/prisma.js";
import bycrypt from "bcrypt"

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
    // console.log("dfjsadfh jawat he")
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json({user});
  } catch (error) {}
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const {password , avatar , ...input} = req.body;

  console.log(id, tokenUserId);

  if (id !== tokenUserId) {
    return res.status(403).send("not authorized");
  }
 let updatePassword = null 
  try {
    if(password){
      updatePassword = await bycrypt.hash(password,10)
    }
    const updatedUser = await prisma.user.update({
        where: { id },
        data:{
          ...input,...(updatePassword && {password:updatePassword}),
          ...(avatar && { avatar})
        }
    
    });

    const {password:userPassword, ...rest} = updateUser

    return res.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
 

  console.log(id, tokenUserId);

  if (id !== tokenUserId) {
    return res.status(403).send("not authorized");
  }


  try {
    await prisma.user.delete({
      where:{id}
    })
    res.status(200).json({ message: "user deleted" });
  } catch (error) {}
};
