import { CustomerResponse } from '../../types/interfaces';
import getToken from './getToken';

const baseApiUrl = process.env.CTP_API_URL as string;
const projectKey = process.env.CTP_PROJECT_KEY as string;
const changeEmailEndpoint = 'customers/';
const apiUrl = `${baseApiUrl}/${projectKey}/${changeEmailEndpoint}`;
const token = getToken();
async function getCustomer(id: string): Promise<CustomerResponse> {
    const headers = {
        Authorization: `Bearer ${(await token).access_token}`,
    };

    const response = await fetch(`${apiUrl}${id}`, {
        method: 'GET',
        headers,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const customerData = (await response.json()) as CustomerResponse;
    return customerData;
}

export default getCustomer;
