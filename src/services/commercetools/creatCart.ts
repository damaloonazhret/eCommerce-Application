import { CartData } from '../../types/interfaces';

async function creatCart(token: string): Promise<CartData> {
    const data = {
        currency: 'EUR',
    };

    try {
        const response = await fetch(
            `${process.env.CTP_API_URL as string}/${process.env.CTP_PROJECT_KEY as string}/carts`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = (await response.json()) as CartData;

        return result;
    } catch (error) {
        throw new Error(`Error creat cart: ${error as string}`);
    }
}

export default creatCart;
