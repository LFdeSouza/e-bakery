import { Request, Response } from "express";
import { prisma } from "../app";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUserRequestBody } from "../types/IUser";

export class UserController {
  async loadUser(req: Request, res: Response) {
    try {
      const id = res.locals.token.user;
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          username: true,
          password: false,
          orders: { select: { id: true, quantity: true, product: true } },
        },
      });

      if (!user) {
        throw Error("User not found");
      }

      return res.status(200).json({ user });
    } catch (err) {
      UserController.handleErrors(err, res);
    }
  }

  async registerUser(req: Request, res: Response) {
    try {
      //Hash password
      const reqBody: IUserRequestBody = req.body;
      const hash = await UserController.hash(reqBody.password);
      reqBody.password = hash;

      //Create user
      const user = await prisma.user.create({
        data: {
          username: reqBody.username,
          password: reqBody.password,
        },
        select: { id: true, username: true, password: false },
      });

      //Create token and set cookie
      const jwToken = UserController.createToken(user.id);

      res.cookie("jwt", jwToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({ user });
    } catch (err) {
      UserController.handleErrors(err, res);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { username: req.body.username },
        include: {
          orders: {
            select: {
              quantity: true,
              product: true,
              id: true,
            },
          },
        },
      });

      if (!user) {
        throw Error("User not found");
      }

      //Compare passwords
      const authorized = await bcrypt.compare(req.body.password, user.password);
      if (!authorized) {
        throw Error("Password do not match");
      }

      //create token
      const jwToken = UserController.createToken(user.id);

      res.cookie("jwt", jwToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res
        .status(200)
        .json({ user: UserController.exclude(user, "password") });
    } catch (err) {
      UserController.handleErrors(err, res);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      //remove jwt token
      res.cookie("jwt", "", { maxAge: 1 });
      return res.status(200).json({ msg: "Token removed" });
    } catch (err) {
      UserController.handleErrors(err, res);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = res.locals.token.user;
      const user = await prisma.user.delete({ where: { id } });

      if (!user) {
        throw Error("User not found");
      }

      res.cookie("jwt", "", { maxAge: 1 });
      return res.status(200).json({ msg: "User removed Successfully" });
    } catch (err) {
      UserController.handleErrors(err, res);
    }
  }

  private static async hash(password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  private static createToken(user: string) {
    return jsonwebtoken.sign({ user }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: 24 * 60 * 60,
    });
  }

  private static exclude<User, Key extends keyof User>(
    user: User,
    ...keys: Key[]
  ): Omit<User, Key> {
    for (let key of keys) {
      delete user[key];
    }
    return user;
  }

  private static async comparePasswords(req: Request) {
    const user = await prisma.user.findUnique({
      where: { username: req.body.username },
      include: {
        orders: {
          select: {
            quantity: true,
            product: true,
            id: true,
          },
        },
      },
    });

    if (!user) {
      throw Error("User not found");
    }
    const authorized = await bcrypt.compare(req.body.password, user.password);
    if (!authorized) {
      throw Error("Password do not match");
    }
    return UserController.exclude(user, "password");
  }

  private static handleErrors(err: any, res: Response) {
    // Duplicate username
    if (err.code === "P2002") {
      console.log(err);
      return res.status(400).json({
        msg: "This username is already in use. Please choose a different one",
      });
    }
    // Password do not match
    if (err.message === "Password do not match") {
      return res.status(400).json({ msg: "Password do not match" });
    }
    // User not found
    if (err.message === "User not found") {
      return res.status(400).json({ msg: "User not found" });
    }
    console.log(err);
    return res.status(400).json({ err });
  }
}
