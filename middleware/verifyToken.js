import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) return res.status(401).json({ message: "dfghjkl" });
//   console.log(token);

//   jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
//     if (err) return res.status(403).json({ message: "Token is not Valid!" });
//     console.log(payload.id);

//     req.userId = payload.id;

//     next();
//   });
// };

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token,"token")
    if (!token) {
      return res.send("invalid token");
    }
    const booleanToken = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(booleanToken);
    req.userId = booleanToken.userId;
    next();
  } catch (error) {}
};
