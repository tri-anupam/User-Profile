import jwt from "jsonwebtoken";

export default async function Auth(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authorizationHeader.split(" ")[1];

    // Verify the token and decode it
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded token payload for debugging
    // console.log("Decoded Token:", decodedToken);

    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication Failed" });
  }
}

export function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
