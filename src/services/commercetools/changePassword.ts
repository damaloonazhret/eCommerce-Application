import { AccessTokenResponse, PasswordChange } from '../../types/interfaces';

const apiUrl = `${process.env.CTP_API_URL as string}/${process.env.CTP_PROJECT_KEY as string}/customers/password`;

async function changePassword(data: PasswordChange, token: string, userVersion: number): Promise<AccessTokenResponse> {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: data.id,
            version: userVersion,
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        }),
    });

    if (!response.ok) {
        return (await response.json()) as AccessTokenResponse;
    }

    return (await response.json()) as AccessTokenResponse;
}

export default changePassword;
