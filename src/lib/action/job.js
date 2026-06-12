'use client'

import { serverMutation } from "../core/server"

export const Base_url = process.env.NEXT_PUBLIC_BASE_URL

export const addNewJob = async (newJobData) => {
    return serverMutation('/api/jobs',newJobData)
}