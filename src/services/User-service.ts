import { CredentialResponse } from "@react-oauth/google"
import apiClient from "./Api-client"

export interface IUser {
    email: string,
    password?: string,
    phone?: string,
    imgUrl?: string,
    _id?: string,
    accessToken?: string,
    refreshToken?: string
}

function baseAuth(funcUrl : string, user : IUser) {
    return new Promise<IUser>((resolve, reject) => {
        console.log(funcUrl + " user...")
        console.log(user)
        apiClient.post("/auth/" + funcUrl, user).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const registrUser = (user: IUser) => {
    return baseAuth("register", user);
}

export const logInUser = (user: IUser) => {
    return baseAuth("login", user);
}

export const googleSignin = (credentialResponse: CredentialResponse) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log("googleSignin ...")
        apiClient.post("/auth/google", credentialResponse).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}