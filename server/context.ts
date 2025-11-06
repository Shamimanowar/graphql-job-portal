import {PrismaClient} from "@prisma/client"
import { Request, Response } from "express"
import jwt from "jsonwebtoken";
import {z} from "zod";


// constants
const JWT_SECRET = 'your_super_secret_key'

/*
 1. Context is the way to share data between resolvers
 2. Here, I will use the context for 2 purpose
        2.1 To access the Database
        2.2 To do the authentication related tasks
 3. Context takes place in every request
*/


export interface Context {
    prisma: PrismaClient;
    auth: {
        user: {id: string, isAdmin: boolean} | null,
        login: (args: {id: string, isAdmin: boolean}) => void,
        logout: () => void
    }
}

const parseToken = (token: string) => {
    const parsedToken = token ? jwt.verify(token, JWT_SECRET) : null
    if (!parseToken) {
        return null
    }

    const payload = z.object({
        id: z.string(),
        isAdmin: z.boolean()
    })
    .safeParse(parsedToken)

    return payload.success ? payload.data : null;
}

const prisma = new PrismaClient();

// create the context
const createContext = async ({req, res} : {req: Request, res: Response}): Promise<Context> => {
    const token = req.cookies?.token;
    const user = parseToken(token);

    return {
        prisma: prisma,
        auth: {
            user,
            login: (args: {id: string, isAdmin: boolean}) => {
                const token = jwt.sign(args, JWT_SECRET);
                res.cookie("token", token, {
                    domain: "localhost",
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days in milliseconds
                    httpOnly: true,
                })
            },
            logout: () => {
                res.clearCookie("token")
            }
        }
    }
}

export default createContext;