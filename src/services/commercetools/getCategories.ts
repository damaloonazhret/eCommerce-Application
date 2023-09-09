import { GetCategories } from '../../types/interfaces';
/* import { CTP_API_URL, CTP_PROJECT_KEY } from './credential'; */

async function getCategories(anonymousToken: string): Promise<GetCategories> {
    try {
        const response = await fetch(
            `${process.env.CTP_API_URL as string}/${process.env.CTP_PROJECT_KEY as string}/categories/`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${anonymousToken}`,
                },
            }
        );

        if (!response.ok) {
            throw Error(`HTTP error! Status: ${response.status}`);
        }

        const result = (await response.json()) as GetCategories;
        return result;
    } catch (error) {
        throw Error(`Error fetching get products: ${error as string}`);
    }
}

export default getCategories;
