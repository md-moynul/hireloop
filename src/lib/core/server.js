const base_url = process.env.NEXT_PUBLIC_BASE_URL

export const serverFetch = async (path) => {
    const res = await fetch(`${base_url}${path}`)
    return res.json()
}
export const serverMutation = async (path, data) => {
    const res = await fetch(`${base_url}${path}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    )
    return res.json()
}