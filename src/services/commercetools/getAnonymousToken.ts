import { AccessTokenResponse } from '../../types/interfaces';
import {
    CTP_AUTH_URL,
    CTP_PROJECT_KEY,
    ANON_CTP_CLIENT_ID,
    ANON_CTP_CLIENT_SECRET,
    ANON_CTP_SCOPES,
} from './credential';

async function getAnonymousToken(): Promise<AccessTokenResponse | boolean> {
    try {
        const response = await fetch(`${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/anonymous1/token`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${btoa(`${ANON_CTP_CLIENT_ID}:${ANON_CTP_CLIENT_SECRET}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=client_credentials&scope=${ANON_CTP_SCOPES}`,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = (await response.json()) as AccessTokenResponse;
        const scopeParts = result.scope.split(' ');
        const anonymousIdPart = scopeParts.find((part) => part.startsWith('anonymous_id:')) || '';

        const output = {
            ...result,
            anonymous_id: anonymousIdPart.split(':')[1],
        };

        return output;
    } catch (error) {
        throw new Error(`Error fetching anonymous access token: ${error as string}`);
    }
}

export default getAnonymousToken;
