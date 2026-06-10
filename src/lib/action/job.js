'use client'
export const Base_url = process.env.NEXT_PUBLIC_BASE_URL

export const addNewJob = async (newJobData) => {
    const res = await fetch(`${Base_url}/api/jobs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newJobData)
    }
    )
    return res.json()
}