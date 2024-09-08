import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use(express.json());
app.get("/", function (req, res) {
  // Cookies that have not been signed
  console.log("Cookies: ", req.cookies);

  // Cookies that have been signed
  console.log("Signed Cookies: ", req.signedCookies);
});
app.use("/server/auth", authRoute);
app.use("/server/test", testRoute);
app.use("/server/user", userRoute);
app.use("/server/test", (req, res) => {
  res.send("its work");
});

app.listen(8000, () => {
  console.log("server is running port 8000");
});
