import { CartData } from '../../types/interfaces';

async function getCart(anonymousToken: string, idCart: string): Promise<CartData> {
    try {
        const response = await fetch(
            `${process.env.CTP_API_URL as string}/${process.env.CTP_PROJECT_KEY as string}/carts/${idCart}`,
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

        const result = (await response.json()) as CartData;

        return result;
    } catch (error) {
        throw Error(`Error fetching get products: ${error as string}`);
    }
}

export default getCart;
