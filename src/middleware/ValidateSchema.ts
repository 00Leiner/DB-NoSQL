import joi, { ObjectSchema } from "joi";
import { NextFunction, Response, Request } from "express";
import { Schema } from "mongoose";
import Logging from "../library/Logging";
import { IAuthor } from "../models/Author";
import { IBook } from "../models/Book";

export const ValidateSchema = (Schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Schema.validateAsync(req.body);
      next();
    } catch (error) {
      Logging.error(error);
      res.status(422).json({ error });
    }
  };
};
export const Schemas = {
  author: {
    create: joi.object<IAuthor>({
      name: joi.string().required(),
    }),
    update: joi.object<IAuthor>({
      name: joi.string().required(),
    }),
  },
  book: {
    create: joi.object<IBook>({
      author: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      title: joi.string().required(),
    }),
    update: joi.object<IBook>({
      author: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      title: joi.string().required(),
    }),
  },
};
