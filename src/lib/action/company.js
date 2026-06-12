'use client'
import { serverMutation } from "../core/server"
import { Base_url } from "./job"

export const createCompany = async(companyData) => {
    return serverMutation('/api/companies',companyData)
}