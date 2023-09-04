import { CustomerResponse } from '../../types/interfaces';

async function returnActualVersion(userId: string, token: string): Promise<CustomerResponse> {
    const apiUrl = `${process.env.CTP_API_URL as string}/${process.env.CTP_PROJECT_KEY as string}/customers/${userId}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return (await response.json()) as CustomerResponse;
    } catch (error) {
        console.error('Error:', (error as Error).message);
        return {} as CustomerResponse;
    }
}

export default returnActualVersion;
