import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(403).json({ msg: "No token: Authorization denied" });
  }

  try {
    const decodedToken = jsonwebtoken.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as string;

    res.locals.token = decodedToken;
    next();
    return;
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Token is not valid: Authorization denied" });
  }
};
