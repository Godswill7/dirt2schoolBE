import { Document } from "mongoose"

export interface iAuth {
    email:string
    password:string
    verify:boolean
    token:string
    secretKey:string
    profile:{}[],
}

export interface iAuthData extends iAuth, Document{}