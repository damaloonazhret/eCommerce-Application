import { AccessTokenResponse, UserLoginData } from '../../types/interfaces';
import { CTP_AUTH_URL, CTP_CLIENT_ID, CTP_CLIENT_SECRET, CTP_PROJECT_KEY, CTP_SCOPES } from './credential';

async function signIn(userData: UserLoginData): Promise<AccessTokenResponse> {
    const response = await fetch(`${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/customers/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`)}`,
        },
        body: `grant_type=password&username=${userData.email}&password=${userData.password}&scope=${CTP_SCOPES}`,
    });

    const result = (await response.json()) as AccessTokenResponse;

    if (!response.ok) {
        return result;
    }

    const scopeParts = result.scope.split(' ');
    const customerIdPart = scopeParts.find((part) => part.startsWith('customer_id:')) || '';

    const output = {
        ...result,
        customer_id: customerIdPart.split(':')[1],
    };

    return output;
}

export default signIn;
