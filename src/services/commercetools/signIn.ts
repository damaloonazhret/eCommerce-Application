import { AccessTokenResponse, Customer, UserLoginData } from '../../types/interfaces';

async function signIn(token: string, userData: UserLoginData): Promise<AccessTokenResponse | Customer> {
    const response = await fetch(
        `${process.env.CTP_API_URL as string}/${process.env.CTP_PROJECT_KEY as string}/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        }
    );

    if (!response.ok) {
        const result = (await response.json()) as AccessTokenResponse;
        return result;
    }
    const customerData = (await response.json()) as Customer;
    sessionStorage.setItem('userData', JSON.stringify(customerData));
    return customerData;
}

export default signIn;
