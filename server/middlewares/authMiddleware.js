import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // console.log("Requested token: ", req.headers.authorization.split(" ")[1])

  try {
    // Bearer dh2920d2-j2d2d2d.2rf55f5553joihoah89wy3r.f32fr2h28hd29
    const userToken = req.headers.authorization;
    if (!userToken || !userToken.startsWith("Bearer ")) {
      return res.send({
        status: false,
        message: "Unauthorized! Please login again",
      });
    }
    // [ "Bearer", "dh2920d2-j2d2d2d.2rf55f5553joihoah89wy3r.f32fr2h28hd2"]
    const secret = "notlifyapp107";
console.log("Token from header: ", userToken);
    const token = userToken.split(" ")[1];
    // consle.log(token);
    const decoded = jwt.verify(token, secret);
console.log("Decoded token: ", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("ERR:", error);
  }
};
