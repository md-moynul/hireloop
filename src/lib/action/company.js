'use client'
import { serverMutation } from "../core/server"

export const createCompany = async(companyData) => {
    return serverMutation('/api/companies',companyData)
}