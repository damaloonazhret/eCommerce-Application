import { CustomerResponse } from '../../types/interfaces';

const baseApiUrl = process.env.CTP_API_URL as string;

const projectKey = process.env.CTP_PROJECT_KEY as string;

const changeEmailEndpoint = 'customers/';

const apiUrl = `${baseApiUrl}/${projectKey}/${changeEmailEndpoint}`;

async function changeEmail(
    token: string,
    newEmail: string,
    userVersion: number,
    id: string
): Promise<CustomerResponse> {
    console.log(userVersion);
    const response = await fetch(`${apiUrl}${id}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            version: userVersion,
            actions: [
                {
                    action: 'changeEmail',
                    email: newEmail,
                },
            ],
        }),
    });

    if (!response.ok) {
        return (await response.json()) as CustomerResponse;
    }

    return (await response.json()) as CustomerResponse;
}

export default changeEmail;
