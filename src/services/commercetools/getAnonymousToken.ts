import { AccessTokenResponse } from '../../types/interfaces';

async function getAnonymousToken(): Promise<AccessTokenResponse> {
    try {
        const response = await fetch(
            `${process.env.CTP_AUTH_URL as string}/oauth/${
                process.env.CTP_PROJECT_KEY as string
            }/anonymous/token?grant_type=client_credentials`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${btoa(`n36--8oKb-pyMGmqPJyS0xx4:hPw_vT3yy2iLqUJuwAQ1Gotqe2csB6Fc`)}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=client_credentials&scope=view_payments:commercetools-team-project view_categories:commercetools-team-project view_product_selections:commercetools-team-project view_products:commercetools-team-project manage_orders:commercetools-team-project create_anonymous_token:commercetools-team-project view_orders:commercetools-team-project`,
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = (await response.json()) as AccessTokenResponse;
        const scopeParts = result.scope.split(' ');
        const anonymousIdPart = scopeParts.find((part) => part.startsWith('anonymous_id:')) || '';

        const output = {
            ...result,
            anonymous_id: anonymousIdPart.split(':')[1],
        };
        return output;
    } catch (error) {
        throw new Error(`Error fetching anonymous access token: ${error as string}`);
    }
}

export default getAnonymousToken;
