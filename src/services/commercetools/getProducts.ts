import { QueryProducts } from '../../types/interfaces';
import { CTP_API_URL, CTP_PROJECT_KEY } from './credential';

async function getProducts(anonymousToken: string): Promise<QueryProducts> {
    try {
        const response = await fetch(`${CTP_API_URL}/${CTP_PROJECT_KEY}/products/`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${anonymousToken}`,
            },
        });

        if (!response.ok) {
            throw Error(`HTTP error! Status: ${response.status}`);
        }

        const result = (await response.json()) as QueryProducts;
        return result;
    } catch (error) {
        throw Error(`Error fetching get products: ${error as string}`);
    }
}

export default getProducts;
