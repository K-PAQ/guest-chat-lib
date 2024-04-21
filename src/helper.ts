import { BASE_URL } from "./store/constants"

export const validateApiKey = async (key: string): Promise<{ appId: string, apiKey: string, isActive: string }> => {
    const api = await fetch(`${BASE_URL}/keys/validate`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            apiKey: key
        })
    })

    const response = await api.json()

    if (!response.status) throw new Error(response.error)

    return {
        appId: response.data.appId,
        apiKey: response.data.apiKey,
        isActive: response.data.isActive
    }
}