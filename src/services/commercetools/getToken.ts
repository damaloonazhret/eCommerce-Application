import { AccessTokenResponse } from '../../types/interfaces';
import { CTP_AUTH_URL, CTP_CLIENT_ID, CTP_CLIENT_SECRET, CTP_SCOPES } from './credential';

export async function getToken(): Promise<AccessTokenResponse> {
    try {
        const response = await fetch(`${CTP_AUTH_URL}/oauth/token`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=client_credentials&scope=${CTP_SCOPES}`,
        });

        if (!response.ok) {
            throw Error(`HTTP error! Status: ${response.status}`);
        }

        const result = (await response.json()) as AccessTokenResponse;

        return result;
    } catch (error) {
        throw Error(`Error fetching access token: ${error as string}`);
    }
}

export default getToken;
