import { Document } from "mongoose"

export interface iAuth {
    email:string
    password:string
    verify:boolean
    token:string
    secretKey:string
    profile:{}[],
}
export interface iBag {
    bag: number,
    cash: number,
    studentID: string,
}

export interface iAuthData extends iAuth, Document{}
export interface iBagData extends iBag, Document{}