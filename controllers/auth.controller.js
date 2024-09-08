import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // res.send("register");
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.send({ username, email, hashedPassword });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return res.json({ message: "invalid user" });
  }

  const isValidPass = await bcrypt.compare(password, user.password);

  if (!isValidPass) {
    return res.json({ message: "invalid userjname and password" });
  }

  const token = jwt.sign(
    {
      time: Date(),
      userId: user.id,
      isAdmin: true,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  const { email, id } = user;

  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({
      message: "logged in successfully",
      token: token,
      status: true,
      user: { id, username, email },
    }).send
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
