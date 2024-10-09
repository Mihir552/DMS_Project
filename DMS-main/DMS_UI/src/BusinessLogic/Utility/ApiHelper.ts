export const JsonHeader  = {
    headers: {"Content-Type": "application/json"},
    mode: 'cors',
}

export const PostWithBody = (body: any): RequestInit => {
    return {
        ...JsonHeader,
        method: 'POST',
        body: JSON.stringify(body)
    } as RequestInit
}