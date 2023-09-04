import { CustomerResponse } from '../../types/interfaces';

const baseApiUrl = process.env.CTP_API_URL as string;

const projectKey = process.env.CTP_PROJECT_KEY as string;

const changeEmailEndpoint = 'customers/';

const apiUrl = `${baseApiUrl}/${projectKey}/${changeEmailEndpoint}`;

async function removeAddress(
    id: string,
    customerId: string,
    version: number,
    token: string
): Promise<CustomerResponse> {
    const response = await fetch(`${apiUrl}${customerId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            version,
            actions: [
                {
                    action: 'removeAddress',
                    addressId: id,
                },
            ],
        }),
    });

    if (!response.ok) {
        return (await response.json()) as CustomerResponse;
    }

    return (await response.json()) as CustomerResponse;
}

export default removeAddress;
