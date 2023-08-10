import { Customer } from '../../types/interfaces';
import { CTP_API_URL, CTP_PROJECT_KEY } from './credential';

async function signUp(
    token: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    dateOfBirth: string,
    country: string,
    city: string,
    streetName: string,
    postalCode: string
): Promise<Customer> {
    const response = await fetch(`${CTP_API_URL}/${CTP_PROJECT_KEY}/me/signup`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            firstName,
            lastName,
            password,
            dateOfBirth,
            addresses: [{ streetName, country, postalCode, city }],
        }),
    });

    if (!response.ok) {
        throw Error(`HTTP error! Status: ${response.status}`);
    }

    const result = (await response.json()) as Customer;

    return result;
}

export default signUp;
