import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

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

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // console.log(user);
    if (!user) {
      return res.status(401).json({ message: "invalid user" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "invaillid credentials" });

    res
      .cookie("cokkieName", username, { maxAge: 900000, httpOnly: true })
      .json("successfully");
    // res.setHeader("Set-Cookies", "test=" + "myvalue").json("successfully");
  } catch (error) {
    res.status(500).json({ message: "failed to login" });
  }
};

export const logout = (req, res) => {};
