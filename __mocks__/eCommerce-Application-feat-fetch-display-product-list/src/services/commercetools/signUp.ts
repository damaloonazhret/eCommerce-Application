import { AccessTokenResponse, Customer, UserRegistrationData } from '../../types/interfaces';

async function signUp(token: string, userData: UserRegistrationData): Promise<AccessTokenResponse | Customer> {
    const response = await fetch(
        `${process.env.CTP_API_URL as string}/${process.env.CTP_PROJECT_KEY as string}/me/signup`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }
    );

    if (!response.ok) {
        const result = (await response.json()) as AccessTokenResponse;
        return result;
    }

    return (await response.json()) as Customer;
}

export default signUp;
