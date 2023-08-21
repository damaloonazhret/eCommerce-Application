import { AccessTokenResponse, Customer, UserLoginData } from '../../types/interfaces';
import { CTP_API_URL, CTP_PROJECT_KEY } from './credential';

async function signIn(token: string, userData: UserLoginData): Promise<AccessTokenResponse | Customer> {
    const response = await fetch(`${CTP_API_URL}/${CTP_PROJECT_KEY}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const result = (await response.json()) as AccessTokenResponse;
        return result;
    }

    return (await response.json()) as Customer;
}

export default signIn;
