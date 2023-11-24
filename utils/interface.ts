import { Document } from "mongoose";

export interface iAuth {
  email: string;
  password: string;
  verify: boolean;
  token: string;
  secretKey: string;
  profile: {}[];
  bagHistory: {}[];
  feeHistory: {}[];
}

export interface iProfile {
  address: string;
  fullName: string;
  phoneNumber: number;
  balance: number;
  avatar: string;
  avatarID: string;
  schoolName: string;
  gender: string;
  motivation: string;
  user:{}
}

interface iFee {
    ammountPaid: number;
}

export interface iBag {
  bag: number;
  cash: number;
  studentID: string;
}

export interface iAuthData extends iAuth, Document {}
export interface iBagData extends iBag, Document {}
export interface iProfileData extends iProfile, Document {}
export interface iFeeData extends iFee, Document {}
