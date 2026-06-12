 const Base_url = process.env.NEXT_PUBLIC_BASE_URL

export const serverMutation = async (path,data) => {
    const res = await fetch(`${Base_url}${path}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    )
    return res.json()
}