
import { Request} from "express";

export interface AuthenticatedUserRequest extends Request {
  user?: {
    id: number;
    username:string
    role: string
  };
}

export interface AuthenticatedAccountRequest extends Request {
  account?: {
    id: string;
    name:string
    surname: string,
    email:string
  };
}

export interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?: {
    [fieldname: string]: Express.Multer.File[];
  } | Express.Multer.File[];
}