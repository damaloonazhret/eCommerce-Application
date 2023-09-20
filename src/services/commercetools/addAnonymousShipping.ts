async function addAnonymousShipping(token: string, idCart: string, versionCart: number): Promise<void> {
    const data = {
        version: versionCart,
        actions: [
            {
                action: 'addItemShippingAddress',
                address: {
                    key: 'exampleKey',
                    title: 'My Address',
                    salutation: 'Mr.',
                    firstName: 'Example',
                    lastName: 'Person',
                    streetName: 'Example Street',
                    streetNumber: '4711',
                    additionalStreetInfo: 'Backhouse',
                    postalCode: '80933',
                    city: 'Exemplary City',
                    region: 'Exemplary Region',
                    state: 'Exemplary State',
                    country: 'DE',
                    company: 'My Company Name',
                    department: 'Sales',
                    building: 'Hightower 1',
                    apartment: '247',
                    pOBox: '2471',
                    phone: '+49 89 12345678',
                    mobile: '+49 171 2345678',
                    email: 'email@example.com',
                    fax: '+49 89 12345679',
                    additionalAddressInfo: 'no additional Info',
                    externalId: 'Information not needed',
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

export default addAnonymousShipping;
