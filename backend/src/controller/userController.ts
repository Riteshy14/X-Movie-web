import type {Request,Response} from 'express';
import z from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import {Prisma} from '../db/prisma.js'
import dotenv from 'dotenv';

const userType = z.object({
    name:z.string(),
    email:z.string().email().refine((email)=> email.endsWith("@gmail.com"),{
        message:"Email must contain @gmail.com"
    }),
    password:z.string().min(6)
})

dotenv.config();

const signup = async (req:Request,res:Response)=>{
    const schema = userType.safeParse(req.body);

    if(!schema.success){
        return res.json({
            message:"Enter correct inputs"
        })
    }

    try {
        const {name , email,password} = req.body;
        console.log("db",process.env.DATABASE_URL)
        const exist = await Prisma.user.findUnique({where:{email}})
        if(exist){
            return res.json({
                message:"user already exist with this email"
            })
        }

        const hashPassword = await bcrypt.hash(password,10)

        const user = await Prisma.user.create({
            data:{
                name,
                email,
                password:hashPassword,
            }
        })

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET!)

        return res.json({
            token
        })

    } catch (error:any) {
        console.log("erro", error)
        return res.json({
            message:"server error",
            error: error.message
        })
    }
}

const signintype = z.object({
    email:z.string().email().refine((email)=> email.endsWith("@gmail.com"),{
        message:"Email must contain @gmail.com"
    }),
    password:z.string().min(6)
})

const signin = async (req:Request,res:Response)=>{
    const schema = signintype.safeParse(req.body);
    if(!schema.success){
        return res.json({
            message:"enter correct inputs"
        })
    }

    try {
        const {email, password} = req.body;
        const user = await Prisma.user.findUnique({where:{email}})

        if(!user){
            return res.json({
                message:"user not found"
            })
        }

        const matchPassword = bcrypt.compare(password,user.password)
        if(!matchPassword){
            return res.json({
                message:"Incorrect password"
            })
        }

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET!)

        return res.json({
            token,
            id:user.id,
            plan:user.Subscriptions
        })

    } catch (error:any) {
        console.log("error", error.message)
        return res.json({
            message:"server error",
            error:error.message
        })
    }
}

const getUser = async (req:Request,res:Response)=>{
    const id = req.user?.id;

    if(!id){
        return res.json({
            message:"user ID is required"
        })
    }

    try {
        const user = await Prisma.user.findFirst({where:{id}})
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }

        return res.status(200).json({
            user
        })
    } catch (error:any) {
        console.log("error", error)
        return res.status(500).json({
            message: error.message
        })
    }
}

export {
    signup,
    signin,
    getUser
}