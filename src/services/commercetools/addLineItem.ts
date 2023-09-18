async function addLineItem(token: string, idCar: string, idCart: string, versionCart: number): Promise<void> {
    const data = {
        version: versionCart,
        actions: [
            {
                action: 'addLineItem',
                productId: idCar,
                variantId: 1,
                quantity: 1,
                supplyChannel: {
                    typeId: 'channel',
                    id: '5b4eafcc-71c1-467e-8391-159628c3d53b',
                },
                distributionChannel: {
                    typeId: 'channel',
                    id: '5b4eafcc-71c1-467e-8391-159628c3d53b',
                },
                taxMode: {
                    name: 'StandardExternalTaxRate',
                    amount: 0.19,
                    country: 'DE',
                    state: 'Bavaria',
                },
                shippingDetails: {
                    targets: [
                        {
                            addressKey: 'exampleKey',
                            quantity: 2,
                        },
                    ],
                },
            },
        ],
    };

    try {
        const response = await fetch(
            `${process.env.CTP_API_URL as string}/${process.env.CTP_PROJECT_KEY as string}/carts/${idCart}`,
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

        const result = (await response.json()) as void;
        console.log(result);
        return result;
    } catch (error) {
        throw new Error(`Error creat cart: ${error as string}`);
    }
}

export default addLineItem;
