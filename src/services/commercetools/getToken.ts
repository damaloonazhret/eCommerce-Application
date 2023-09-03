import { AccessTokenResponse } from '../../types/interfaces';

async function getToken(): Promise<AccessTokenResponse> {
    try {
        const response = await fetch(`${process.env.CTP_AUTH_URL as string}/oauth/token`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${btoa(
                    `${process.env.CTP_CLIENT_ID as string}:${process.env.CTP_CLIENT_SECRET as string}`
                )}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=client_credentials&scope=${process.env.CTP_SCOPES as string}`,
        });

        if (!response.ok) {
            throw Error(`HTTP error! Status: ${response.status}`);
        }

        const result = (await response.json()) as AccessTokenResponse;
        sessionStorage.setItem('token', JSON.stringify(result));

        return result;
    } catch (error) {
        throw Error(`Error fetching access token: ${error as string}`);
    }
}

export default getToken;
