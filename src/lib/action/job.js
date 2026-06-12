'use client'

import { serverMutation } from "../core/server"


export const addNewJob = async (newJobData) => {
    return serverMutation('/api/jobs',newJobData)
}