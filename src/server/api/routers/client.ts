import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";


export const clientRouter = createTRPCRouter({
    password: publicProcedure.input(z.object({
        email: z.string().email(),
        password: z.string().min(8).max(32)
    })).query(({input})=>passwordHandler(input.password))
})


function passwordHandler(password: string){
    return password.toLocaleUpperCase()
}