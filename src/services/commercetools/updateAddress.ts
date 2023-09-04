import { Address, CustomerResponse } from '../../types/interfaces';

const baseApiUrl = process.env.CTP_API_URL as string;
const projectKey = process.env.CTP_PROJECT_KEY as string;
const changeEmailEndpoint = 'customers/';
const apiUrl = `${baseApiUrl}/${projectKey}/${changeEmailEndpoint}`;

async function updateAddress(
    dataUser: Address,
    userVersion: number,
    addressId: string,
    token: string
): Promise<CustomerResponse> {
    const data = {
        version: userVersion,
        actions: [
            {
                action: 'changeAddress',
                addressId,
                address: {
                    streetName: dataUser.streetName,
                    postalCode: dataUser.postalCode,
                    city: dataUser.city,
                    country: dataUser.country,
                },
            },
        ],
    };

    const response = await fetch(`${apiUrl}${dataUser.id}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        return (await response.json()) as CustomerResponse;
    }

    return (await response.json()) as CustomerResponse;
}

export default updateAddress;
