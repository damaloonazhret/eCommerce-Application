import { AccessTokenResponse, Customer, UserRegistrationData } from '../../types/interfaces';
import { CTP_API_URL, CTP_PROJECT_KEY } from './credential';

async function signUp(token: string, userData: UserRegistrationData): Promise<AccessTokenResponse | Customer> {
    const response = await fetch(`${CTP_API_URL}/${CTP_PROJECT_KEY}/me/signup`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const result = (await response.json()) as AccessTokenResponse;
        return result;
    }

    return (await response.json()) as Customer;
}

export default signUp;
