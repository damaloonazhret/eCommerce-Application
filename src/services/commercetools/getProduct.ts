import { ProductAll } from '../../types/interfaces';
import { CTP_API_URL, CTP_PROJECT_KEY } from './credential';

async function getProduct(anonymousToken: string, productKey: string): Promise<ProductAll> {
    try {
        const response = await fetch(`${CTP_API_URL}/${CTP_PROJECT_KEY}/products/key=${productKey}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${anonymousToken}`,
            },
        });

        if (!response.ok) {
            throw Error(`HTTP error! Status: ${response.status}`);
        }

        const result = (await response.json()) as ProductAll;
        console.log('result', result);
        return result;
    } catch (error) {
        throw Error(`Error fetching get products: ${error as string}`);
    }
}

export default getProduct;
