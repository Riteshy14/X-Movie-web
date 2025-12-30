import type {Request,Response} from 'express'
import { Prisma } from '../db/prisma.js';

const upgradeSubscription = async (req:Request, res:Response)=>{
    try {
        const userId = req.user?.id;

        if(!userId){
            return res.status(401).json({
                message:"user not logged in"
            })
        }

        const upgrade = await Prisma.user.update({
            where:{id:userId},
            data:{
                Subscriptions:"PREMIUM"
            }
        })
        return res.json({
            message:"Subscription upgraded to PREMIUM"
        })
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({
            message:"server error",
            error : error instanceof Error ? error.message:"unkown error"
        })
    }
}

export {
    upgradeSubscription
}