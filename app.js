import express from "express";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser())

app.use(express.json());
app.get("/", function (req, res) {
  // Cookies that have not been signed
  console.log("Cookies: ", req.cookies);

  // Cookies that have been signed
  console.log("Signed Cookies: ", req.signedCookies);
});
app.use("/server/auth", authRoute);
app.use("/server/test", (req, res) => {
  res.send("its work");
});

app.listen(8000, () => {
  console.log("server is running port 8000");
});
