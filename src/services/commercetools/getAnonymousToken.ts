import { AccessTokenResponse } from '../../types/interfaces';

async function getAnonymousToken(): Promise<AccessTokenResponse> {
    try {
        const response = await fetch(
            `${process.env.CTP_AUTH_URL as string}/oauth/${
                process.env.CTP_PROJECT_KEY as string
            }/anonymous/token?grant_type=client_credentials`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${btoa(
                        `${process.env.ANON_CTP_CLIENT_ID as string}:${process.env.ANON_CTP_CLIENT_SECRET as string}`
                    )}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=client_credentials&scope=${process.env.ANON_CTP_SCOPES as string}`,
            }
        );

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
