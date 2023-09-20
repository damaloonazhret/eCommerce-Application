import { GetProducts } from '../../types/interfaces';

async function getSearchProducts(
    anonymousToken: string,
    paramSearch: string,
    numOffset: number,
    paraSort: string
): Promise<GetProducts> {
    try {
        const response = await fetch(
            `${process.env.CTP_API_URL as string}/${
                process.env.CTP_PROJECT_KEY as string
            }/product-projections/search?${paramSearch}&limit=4&offset=${numOffset}&${paraSort}`,
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

        const result = (await response.json()) as GetProducts;
        return result;
    } catch (error) {
        throw Error(`Error fetching get products: ${error as string}`);
    }
}

export default getSearchProducts;
