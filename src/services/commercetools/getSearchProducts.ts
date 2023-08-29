import { GetSearchProducts } from '../../types/interfaces';
import { CTP_API_URL, CTP_PROJECT_KEY } from './credential';

async function getSearchProducts(anonymousToken: string, paramSearch?: string): Promise<GetSearchProducts> {
    try {
        const response = await fetch(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections/search?filter=${paramSearch}`,
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

        const result = (await response.json()) as GetSearchProducts;
        return result;
    } catch (error) {
        throw Error(`Error fetching get products: ${error as string}`);
    }
}

export default getSearchProducts;
