import express, { NextFunction, Response, Request } from "express";
import request from "request";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config();
const baseUrl = process.env.BASE_API;

const verifyLogin = (req: Request, res: Response, next: NextFunction): void => {
  const reqBody = req.body;
  request(
    {
      url: `${baseUrl}/auth`,
      method: "POST",
      qs: JSON.stringify(reqBody),
      json: { email: req.body.email, password: req.body.password },
    },
    (error, response, body) => {
      res.send(body);
    }
  );
};

router.post("/auth", verifyLogin); // get token from login

const getRcaeResults = (req: Request, res: Response, next: NextFunction) => {
  const reqBody = req.body;
  const authorization = req.get("Authorization");
  request(
    {
      url: `${baseUrl}/results`,
      headers: { Authorization: authorization },
      method: "GET",
    },
    (error, response, body) => {
      if (error) {
        res.send(error);
      } else {
        res.send(body);
      }
    }
  );
};

router.get("/results", getRcaeResults); // get horse race status

export default router;
