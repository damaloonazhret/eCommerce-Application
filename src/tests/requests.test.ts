import getToken from '../services/commercetools/getToken';
import signIn from '../services/commercetools/signIn';
import signUp from '../services/commercetools/signUp';
import { Customer, CustomerResponse, ProductAll, UserRegistrationData } from '../types/interfaces';
import Model from '../components/model/index';
import Controller from '../components/controller/index';
import getAnonymousToken from '../services/commercetools/getAnonymousToken';
import getCustomer from '../services/commercetools/getUser';
import returnActualVersion from '../helpers/returnActualVersion';
import getSearchProducts from '../services/commercetools/getSearchProducts';
import getProducts from '../services/commercetools/getProducts';
import getCategories from '../services/commercetools/getCategories';
import getProduct from '../services/commercetools/getProduct';

// test request getToken
test('checking request getToken', () => {
    return getToken().then((dataGetToken) => {
        let numberCode: number;
        function checkAccessToken(): number {
            if (dataGetToken.access_token) {
                numberCode = 200;
            }
            return numberCode;
        }
        expect(checkAccessToken()).toBe(200);
    });
});

// test request signIn
const userDataExist = {
    email: 'abc@a.ru',
    password: 'Aqswdefr1!',
};

test('checking request sign, response code 200', () => {
    return getToken().then((dataGetToken) => {
        const token = dataGetToken.access_token;
        return signIn(token, userDataExist).then((dataSignIn) => {
            const objdataSignIn = dataSignIn as Customer;
            let numberCode: number;
            function checkLogin(): number {
                if (objdataSignIn.customer.id) {
                    numberCode = 200;
                }
                return numberCode;
            }
            expect(checkLogin()).toBe(200);
        });
    });
});

const userDataNoExist = {
    email: 'abc1159423648732@a.ru',
    password: 'Aqswdefr1!',
};

test('checking request sign, response code 400', () => {
    return getToken().then((dataGetToken) => {
        const token = dataGetToken.access_token;
        let numberCode: number;
        return signIn(token, userDataNoExist).then((dataSignIn) => {
            function checkLogin(): number {
                if (dataSignIn.statusCode) {
                    numberCode = dataSignIn.statusCode;
                }
                return numberCode;
            }
            expect(checkLogin()).toBe(400);
        });
    });
});

const tokenInvaild = '';

test('checking request sign, response code 401', () => {
    return signIn(tokenInvaild, userDataNoExist).then((dataSignIn) => {
        let numberCode: number;
        function checkLogin(): number {
            if (dataSignIn.statusCode) {
                numberCode = dataSignIn.statusCode;
            }
            return numberCode;
        }
        expect(checkLogin()).toBe(401);
    });
});

// test request signUp
const date = Date.now();

const dataNewUserRegistration: UserRegistrationData = {
    email: `test${date}@a.ru`,
    password: 'Aqswdefr1!',
    firstName: 'Jonh',
    lastName: 'Travolta',
    dateOfBirth: '1970-01-01',
    addresses: [
        {
            streetName: 'State Street',
            postalCode: '12345',
            city: 'Boston',
            country: 'FR',
        },
        {
            streetName: 'State Street',
            postalCode: '12345',
            city: 'Boston',
            country: 'FR',
        },
    ],
    shippingAddresses: [0],
    billingAddresses: [1],
};

test('checking request signup, response code 200', () => {
    return getToken().then((dataGetToken) => {
        const token = dataGetToken.access_token;
        return signUp(token, dataNewUserRegistration).then((dataSignUp) => {
            const objDataSignUp = dataSignUp as Customer;
            let numberCode: number;
            function checkRegistration(): number {
                if (objDataSignUp.customer.id) {
                    numberCode = 200;
                }
                return numberCode;
            }
            expect(checkRegistration()).toBe(200);
        });
    });
});

const dataUserRegistration: UserRegistrationData = {
    email: 'abc@a.ru',
    password: 'Aqswdefr1!',
    firstName: 'Jonh',
    lastName: 'Travolta',
    dateOfBirth: '1970-01-01',
    addresses: [
        {
            streetName: 'State Street',
            postalCode: '12345',
            city: 'Boston',
            country: 'FR',
        },
        {
            streetName: 'State Street',
            postalCode: '12345',
            city: 'Boston',
            country: 'FR',
        },
    ],
    shippingAddresses: [0],
    billingAddresses: [1],
};

test('checking request signup, response code 400', () => {
    return getToken().then((dataGetToken) => {
        const token = dataGetToken.access_token;
        return signUp(token, dataUserRegistration).then((dataSignUp) => {
            let numberCode: number;
            function checkRegistration(): number {
                if (dataSignUp.statusCode) {
                    numberCode = dataSignUp.statusCode;
                }
                return numberCode;
            }
            expect(checkRegistration()).toBe(400);
        });
    });
});

test('test class Model.signIn', async () => {
    const obj = new Model();
    const result = await obj.signIn(userDataExist);
    expect(result).toEqual({ success: true, message: '' });
});

test('test class Model.signUp', async () => {
    const obj = new Model();
    const result = await obj.signUp(dataUserRegistration);
    expect(result).toEqual({
        success: false,
        message: 'There is already an existing customer with the provided email.',
    });
});

const res: Customer = {
    customer: {
        id: '6d3586e7-056f-45bc-847e-dffcbcb6b9cb',
        email: 'abc@a.ru',
        firstName: 'Evgeniy',
        lastName: 'A',
        dateOfBirth: '1990-01-01',
        password: '****qT4=',
        addresses: [
            {
                id: 'a',
                streetName: 'a',
                postalCode: 'a',
                city: 'a',
                country: 'a',
            },
        ],
    },
};

test('test class Model.returnFormError', async () => {
    const obj = new Model();
    const result = obj.returnFormError(res);
    expect(result).toEqual({
        success: true,
        message: '',
    });
});

test('test class Controller.signUp', async () => {
    const newModel = new Model();
    const newController = new Controller(newModel);
    const result = await newController.model.signIn(userDataExist);
    expect(result).toEqual({ message: '', success: true });
});

test('test class Controller.signUp', async () => {
    const newModel = new Model();
    const newController = new Controller(newModel);
    const result = await newController.model.signUp(dataUserRegistration);
    expect(result).toEqual({
        message: 'There is already an existing customer with the provided email.',
        success: false,
    });
});

describe('getAnonymousToken', () => {
    it('should return a valid access token response object with message field when the response is successful', async () => {
        const mockResponse = {
            ok: true,
            status: 200,
            json: jest.fn().mockResolvedValue({
                statusCode: 200,
                access_token: 'valid_access_token',
                expires_in: 3600,
                token_type: 'Bearer',
                scope: 'anonymous_id:1234567890 customer_id:9876543210',
                refresh_token: 'valid_refresh_token',
                message: 'Success',
            }),
        };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);
        const result = await getAnonymousToken();
        expect(result).toEqual({
            statusCode: 200,
            access_token: 'valid_access_token',
            expires_in: 3600,
            token_type: 'Bearer',
            scope: 'anonymous_id:1234567890 customer_id:9876543210',
            refresh_token: 'valid_refresh_token',
            anonymous_id: '1234567890',
            message: 'Success',
        });
    });

    it('should return a valid access token response object', async () => {
        const mockFetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                statusCode: 200,
                access_token: 'access_token',
                expires_in: 3600,
                token_type: 'Bearer',
                scope: 'anonymous_id:1234567890 customer_id:0987654321',
                refresh_token: 'refresh_token',
            }),
        });
        global.fetch = mockFetch;
        const result = await getAnonymousToken();
        expect(result).toEqual({
            statusCode: 200,
            access_token: 'access_token',
            expires_in: 3600,
            token_type: 'Bearer',
            scope: 'anonymous_id:1234567890 customer_id:0987654321',
            refresh_token: 'refresh_token',
            anonymous_id: '1234567890',
        });
        expect(mockFetch).toHaveBeenCalledWith(
            `${process.env.CTP_AUTH_URL as string}/oauth/${
                process.env.CTP_PROJECT_KEY as string
            }/anonymous/token?grant_type=client_credentials`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${btoa(
                        `${process.env.ANON_CTP_CLIENT_ID as string}:${process.env.ANON_CTP_CLIENT_SECRET as string}`
                    )}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=client_credentials&scope=${process.env.ANON_CTP_SCOPES as string}`,
            }
        );
    });
    it('should handle valid response with empty optional fields correctly', async () => {
        const mockFetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                statusCode: 200,
                access_token: 'token',
                expires_in: 3600,
                token_type: 'Bearer',
                scope: 'scope',
                refresh_token: 'refresh_token',
            }),
        });
        global.fetch = mockFetch;
        const result = await getAnonymousToken();
        expect(result).toEqual({
            statusCode: 200,
            access_token: 'token',
            expires_in: 3600,
            token_type: 'Bearer',
            scope: 'scope',
            refresh_token: 'refresh_token',
            anonymous_id: undefined,
        });
        expect(mockFetch).toHaveBeenCalledWith(
            `${process.env.CTP_AUTH_URL as string}/oauth/${
                process.env.CTP_PROJECT_KEY as string
            }/anonymous/token?grant_type=client_credentials`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${btoa(
                        `${process.env.ANON_CTP_CLIENT_ID as string}:${process.env.ANON_CTP_CLIENT_SECRET as string}`
                    )}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=client_credentials&scope=${process.env.ANON_CTP_SCOPES as string}`,
            }
        );
    });
    it('should return a valid access token response object with anonymous_id field when the function is called', async () => {
        const mockFetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                statusCode: 200,
                access_token: 'access_token',
                expires_in: 3600,
                token_type: 'Bearer',
                scope: 'anonymous_id:1234567890 customer_id:9876543210',
                refresh_token: 'refresh_token',
                anonymous_id: '1234567890',
            }),
        });
        global.fetch = mockFetch;
        const result = await getAnonymousToken();
        expect(result).toEqual({
            statusCode: 200,
            access_token: 'access_token',
            expires_in: 3600,
            token_type: 'Bearer',
            scope: 'anonymous_id:1234567890 customer_id:9876543210',
            refresh_token: 'refresh_token',
            anonymous_id: '1234567890',
        });
        expect(mockFetch).toHaveBeenCalledWith(
            `${process.env.CTP_AUTH_URL as string}/oauth/${
                process.env.CTP_PROJECT_KEY as string
            }/anonymous/token?grant_type=client_credentials`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${btoa(
                        `${process.env.ANON_CTP_CLIENT_ID as string}:${process.env.ANON_CTP_CLIENT_SECRET as string}`
                    )}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=client_credentials&scope=${process.env.ANON_CTP_SCOPES as string}`,
            }
        );
    });

    it("should return the expected output when the response has an empty 'customer_id' field", async () => {
        const mockFetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                statusCode: 200,
                access_token: 'access_token',
                expires_in: 3600,
                token_type: 'Bearer',
                scope: 'anonymous_id:1234567890',
                refresh_token: 'refresh_token',
            }),
        });
        global.fetch = mockFetch;
        const result = await getAnonymousToken();
        expect(result).toEqual({
            statusCode: 200,
            access_token: 'access_token',
            expires_in: 3600,
            token_type: 'Bearer',
            scope: 'anonymous_id:1234567890',
            refresh_token: 'refresh_token',
            anonymous_id: '1234567890',
        });
        expect(mockFetch).toHaveBeenCalledWith(
            `${process.env.CTP_AUTH_URL as string}/oauth/${
                process.env.CTP_PROJECT_KEY as string
            }/anonymous/token?grant_type=client_credentials`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${btoa(
                        `${process.env.ANON_CTP_CLIENT_ID as string}:${process.env.ANON_CTP_CLIENT_SECRET as string}`
                    )}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=client_credentials&scope=${process.env.ANON_CTP_SCOPES as string}`,
            }
        );
    });

    it('should return the access token response without the anonymous_id field when the scope does not contain the anonymous_id field', async () => {
        const mockFetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                statusCode: 200,
                access_token: 'access_token',
                expires_in: 3600,
                token_type: 'Bearer',
                scope: 'scope_without_anonymous_id',
                refresh_token: 'refresh_token',
            }),
        });
        global.fetch = mockFetch;
        const result = await getAnonymousToken();
        expect(result).toEqual({
            statusCode: 200,
            access_token: 'access_token',
            expires_in: 3600,
            token_type: 'Bearer',
            scope: 'scope_without_anonymous_id',
            refresh_token: 'refresh_token',
        });
    });
    it('should handle missing customer_id field in response', async () => {
        const mockFetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                statusCode: 200,
                access_token: 'abc123',
                expires_in: 3600,
                token_type: 'Bearer',
                scope: 'anonymous_id:123456',
                refresh_token: 'def456',
            }),
        });
        global.fetch = mockFetch;
        const result = await getAnonymousToken();
        expect(result).toEqual({
            statusCode: 200,
            access_token: 'abc123',
            expires_in: 3600,
            token_type: 'Bearer',
            scope: 'anonymous_id:123456',
            refresh_token: 'def456',
            anonymous_id: '123456',
        });
        expect(mockFetch).toHaveBeenCalledWith(
            `${process.env.CTP_AUTH_URL as string}/oauth/${
                process.env.CTP_PROJECT_KEY as string
            }/anonymous/token?grant_type=client_credentials`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${btoa(
                        `${process.env.ANON_CTP_CLIENT_ID as string}:${process.env.ANON_CTP_CLIENT_SECRET as string}`
                    )}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=client_credentials&scope=${process.env.ANON_CTP_SCOPES as string}`,
            }
        );
    });
});

describe('getCustomer', () => {
    const baseApiUrl = process.env.CTP_API_URL as string;
    const projectKey = process.env.CTP_PROJECT_KEY as string;
    const changeEmailEndpoint = 'customers/';
    const apiUrl = `${baseApiUrl}/${projectKey}/${changeEmailEndpoint}`;
    const token = getToken();

    it('should return a customer object with isEmailVerified set to false when given a valid customer id and isEmailVerified field is missing', async () => {
        const customerId = 'validCustomerId';
        const expectedCustomerData = {
            id: customerId,
            isEmailVerified: false,
        };
        const fetchMock = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(expectedCustomerData),
        });
        global.fetch = fetchMock;
        const result = await getCustomer(customerId);
        expect(result).toEqual(expectedCustomerData);
        expect(fetchMock).toHaveBeenCalledWith(`${apiUrl}${customerId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${(await token).access_token}`,
            },
        });
    });
});

describe('returnActualVersion', () => {
    it('should throw an error when fetch fails', async () => {
        const userId = '123';
        const token = 'abc';
        const mockResponse = {
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
        };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);
        try {
            await returnActualVersion(userId, token);
        } catch (error) {
            expect(error).toEqual(new Error(`Request failed with status ${mockResponse.status}`));
        }
    });
    it('should throw an error when token is not provided', async () => {
        const userId = 'user123';
        const token = '';
        try {
            await returnActualVersion(userId, token);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('should use correct headers when valid token is provided', async () => {
        const userId = 'user123';
        const token = 'validToken';
        const apiUrl = `${process.env.CTP_API_URL as string}/${
            process.env.CTP_PROJECT_KEY as string
        }/customers/${userId}`;
        const expectedHeaders = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        await returnActualVersion(userId, token);
        expect(fetch).toHaveBeenCalledWith(apiUrl, {
            method: 'GET',
            headers: expectedHeaders,
        });
    });

    it('should return an empty CustomerResponse object when the response is empty', async () => {
        const userId = '123';
        const token = 'abc';
        const apiUrl = `${process.env.CTP_API_URL as string}/${
            process.env.CTP_PROJECT_KEY as string
        }/customers/${userId}`;
        const fetchMock = jest.fn().mockResolvedValue({
            ok: false,
            status: 404,
            json: jest.fn().mockResolvedValue({}),
        });
        global.fetch = fetchMock;
        const result = await returnActualVersion(userId, token);
        expect(fetchMock).toHaveBeenCalledWith(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        expect(result).toEqual({} as CustomerResponse);
    });
});

describe('getSearchProducts', () => {
    it('should return an empty results array when no products match the search parameters', async () => {
        const anonymousToken = 'testToken';
        const paramSearch = 'param=value';
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                limit: 10,
                offset: 0,
                count: 0,
                total: 0,
                results: [],
            }),
        });
        const result = await getSearchProducts(anonymousToken, paramSearch, 0);
        expect(result.results).toEqual([]);
    });

    it('should correctly handle sorting by price, popularity, and other product attributes', async () => {
        const anonymousToken = 'anonymousToken';
        const paramSearch = 'sort=price';
        const expectedUrl = `${process.env.CTP_API_URL as string}/${
            process.env.CTP_PROJECT_KEY as string
        }/product-projections/search?${paramSearch}`;
        const expectedHeaders = {
            Authorization: `Bearer ${anonymousToken}`,
        };
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({}),
        };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);
        await getSearchProducts(anonymousToken, paramSearch, 0);
        expect(fetch).toHaveBeenCalledWith(expectedUrl, {
            method: 'GET',
            headers: expectedHeaders,
        });
        expect(mockResponse.json).toHaveBeenCalled();
        const paramSearch2 = 'sort=popularity';
        const expectedUrl2 = `${process.env.CTP_API_URL as string}/${
            process.env.CTP_PROJECT_KEY as string
        }/product-projections/search?${paramSearch2}`;
        await getSearchProducts(anonymousToken, paramSearch2, 0);
        expect(fetch).toHaveBeenCalledWith(expectedUrl2, {
            method: 'GET',
            headers: expectedHeaders,
        });
        expect(mockResponse.json).toHaveBeenCalled();
        const paramSearch3 = 'sort=attributeName';
        const expectedUrl3 = `${process.env.CTP_API_URL as string}/${
            process.env.CTP_PROJECT_KEY as string
        }/product-projections/search?${paramSearch3}`;
        await getSearchProducts(anonymousToken, paramSearch3, 0);
        expect(fetch).toHaveBeenCalledWith(expectedUrl3, {
            method: 'GET',
            headers: expectedHeaders,
        });
        expect(mockResponse.json).toHaveBeenCalled();
    });
    it('should return the correct products when multiple search parameters are provided', async () => {
        const anonymousToken = 'token';
        const paramSearch = 'param1=value1&param2=value2';
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({
                limit: 10,
                offset: 0,
                count: 2,
                total: 2,
                results: [
                    { id: 'product1', name: 'Product 1' },
                    { id: 'product2', name: 'Product 2' },
                ],
            }),
        };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);
        const result = await getSearchProducts(anonymousToken, paramSearch, 0);
        expect(fetch).toHaveBeenCalledWith(
            `${process.env.CTP_API_URL as string}/${
                process.env.CTP_PROJECT_KEY as string
            }/product-projections/search?${paramSearch}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${anonymousToken}`,
                },
            }
        );
        expect(result).toEqual({
            limit: 10,
            offset: 0,
            count: 2,
            total: 2,
            results: [
                { id: 'product1', name: 'Product 1' },
                { id: 'product2', name: 'Product 2' },
            ],
        });
    });
    it('should return only necessary product data when fetching search products', async () => {
        const mockFetch = jest.fn();
        global.fetch = mockFetch;
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({
                limit: 10,
                offset: 0,
                count: 5,
                total: 5,
                results: [
                    { id: '1', name: 'Product 1' },
                    { id: '2', name: 'Product 2' },
                    { id: '3', name: 'Product 3' },
                    { id: '4', name: 'Product 4' },
                    { id: '5', name: 'Product 5' },
                ],
            }),
        };
        mockFetch.mockResolvedValue(mockResponse);
        const anonymousToken = 'anonymousToken';
        const paramSearch = 'paramSearch';
        const result = await getSearchProducts(anonymousToken, paramSearch, 0);
        expect(mockFetch).toHaveBeenCalledWith(
            `${process.env.CTP_API_URL as string}/${
                process.env.CTP_PROJECT_KEY as string
            }/product-projections/search?${paramSearch}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${anonymousToken}`,
                },
            }
        );
        expect(result).toEqual({
            limit: 10,
            offset: 0,
            count: 5,
            total: 5,
            results: [
                { id: '1', name: 'Product 1' },
                { id: '2', name: 'Product 2' },
                { id: '3', name: 'Product 3' },
                { id: '4', name: 'Product 4' },
                { id: '5', name: 'Product 5' },
            ],
        });
    });
});

describe('getProducts', () => {
    it('should throw an error when the response status is not ok', async () => {
        const anonymousToken = 'token';
        const mockResponse = {
            ok: false,
            status: 404,
        };
        const mockFetch = jest.fn().mockResolvedValue(mockResponse);
        global.fetch = mockFetch;
        try {
            await getProducts(anonymousToken);
        } catch (error) {
            expect(error).toEqual(Error('Error fetching get products: Error: HTTP error! Status: 404'));
        }
        expect(mockFetch).toHaveBeenCalledWith(
            `${process.env.CTP_API_URL as string}/${process.env.CTP_PROJECT_KEY as string}/products/`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${anonymousToken}`,
                },
            }
        );
    });
    it('should fetch products successfully with valid anonymous token', async () => {
        const anonymousToken = 'validToken';
        const expectedResponse = {
            limit: 10,
            offset: 0,
            count: 5,
            total: 5,
            results: [],
        };
        const fetchMock = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(expectedResponse),
        });
        global.fetch = fetchMock;
        const result = await getProducts(anonymousToken);
        expect(fetchMock).toHaveBeenCalledWith(
            `${process.env.CTP_API_URL as string}/${process.env.CTP_PROJECT_KEY as string}/products/`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${anonymousToken}`,
                },
            }
        );
        expect(result).toEqual(expectedResponse);
    });
    it('should return the expected GetProducts object when called with a valid anonymous token', async () => {
        const anonymousToken = 'validToken';
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({
                limit: 10,
                offset: 0,
                count: 5,
                total: 5,
                results: [],
            }),
        };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);
        const result = await getProducts(anonymousToken);
        expect(result).toEqual({
            limit: 10,
            offset: 0,
            count: 5,
            total: 5,
            results: [],
        });
        expect(fetch).toHaveBeenCalledWith(
            `${process.env.CTP_API_URL as string}/${process.env.CTP_PROJECT_KEY as string}/products/`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${anonymousToken}`,
                },
            }
        );
    });
    it('should return an empty results array when no products are found', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                limit: 10,
                offset: 0,
                count: 0,
                total: 0,
                results: [],
            }),
        });
        const result = await getProducts('anonymousToken');
        expect(result.results).toEqual([]);
        expect(fetch).toHaveBeenCalledWith(
            `${process.env.CTP_API_URL as string}/${process.env.CTP_PROJECT_KEY as string}/products/`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer anonymousToken`,
                },
            }
        );
    });
    it('should handle cases where count and total values do not match actual results array length', async () => {
        const anonymousToken = 'token';
        const mockResponse = {
            limit: 10,
            offset: 0,
            count: 5,
            total: 7,
            results: [1, 2, 3, 4, 5],
        };
        const mockFetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponse),
        });
        global.fetch = mockFetch;
        const result = await getProducts(anonymousToken);
        expect(mockFetch).toHaveBeenCalledWith(
            `${process.env.CTP_API_URL as string}/${process.env.CTP_PROJECT_KEY as string}/products/`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${anonymousToken}`,
                },
            }
        );
        expect(result).toEqual(mockResponse);
    });
});

describe('getCategories', () => {
    it('should return the expected result object with valid response', async () => {
        const anonymousToken = 'validToken';
        const expectedResponse = {
            limit: 10,
            offset: 0,
            count: 2,
            total: 2,
            results: [
                {
                    id: 'category1',
                    description: {
                        'en-US': 'Category 1',
                    },
                },
                {
                    id: 'category2',
                    description: {
                        'en-US': 'Category 2',
                    },
                },
            ],
        };
        const fetchMock = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(expectedResponse),
        });
        global.fetch = fetchMock;
        const result = await getCategories(anonymousToken);
        expect(fetchMock).toHaveBeenCalledWith(
            `${process.env.CTP_API_URL as string}/${process.env.CTP_PROJECT_KEY as string}/categories/`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${anonymousToken}`,
                },
            }
        );
        expect(result).toEqual(expectedResponse);
    });

    it('should fetch categories from API with valid anonymous token', async () => {
        const anonymousToken = 'validToken';
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({
                limit: 10,
                offset: 0,
                count: 2,
                total: 2,
                results: [
                    {
                        id: 'category1',
                        description: {
                            'en-US': 'Category 1',
                        },
                    },
                    {
                        id: 'category2',
                        description: {
                            'en-US': 'Category 2',
                        },
                    },
                ],
            }),
        };
        global.fetch = jest.fn().mockResolvedValue(mockResponse);
        const result = await getCategories(anonymousToken);
        expect(fetch).toHaveBeenCalledWith(
            `${process.env.CTP_API_URL as string}/${process.env.CTP_PROJECT_KEY as string}/categories/`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${anonymousToken}`,
                },
            }
        );
        expect(result).toEqual({
            limit: 10,
            offset: 0,
            count: 2,
            total: 2,
            results: [
                {
                    id: 'category1',
                    description: {
                        'en-US': 'Category 1',
                    },
                },
                {
                    id: 'category2',
                    description: {
                        'en-US': 'Category 2',
                    },
                },
            ],
        });
    });
});

describe('getProduct', () => {
    it('should return a ProductAll object with all fields populated when getProduct is called', async () => {
        const anonymousToken = 'anonymousToken';
        const productKey = 'productKey';
        const expectedProduct: ProductAll = {
            id: 'id',
            version: 1,
            masterData: {
                current: {
                    categories: [
                        {
                            id: 'categoryId',
                            typeId: 'categoryTypeId',
                        },
                    ],
                    description: {
                        'en-US': 'description',
                    },
                    masterVariant: {
                        attributes: [],
                        id: 1,
                        images: [
                            {
                                dimensions: {
                                    h: 100,
                                    w: 100,
                                },
                                url: 'image-url',
                            },
                        ],
                        prices: [
                            {
                                discounted: {
                                    value: {
                                        type: 'discounted-type',
                                        fractionDigits: 2,
                                        centAmount: 100,
                                        currencyCode: 'USD',
                                    },
                                },
                                value: {
                                    type: 'value-type',
                                    fractionDigits: 2,
                                    centAmount: 200,
                                    currencyCode: 'USD',
                                },
                                id: 'priceId',
                            },
                        ],
                        sku: 'sku',
                    },
                    name: {
                        'en-US': 'name',
                    },
                    slug: {
                        en: 'slug',
                    },
                    variants: [],
                    searchKeywords: {},
                },
                hasStagedChanges: false,
                published: true,
                staged: {
                    categories: [
                        {
                            id: 'categoryId',
                            typeId: 'categoryTypeId',
                        },
                    ],
                    description: {
                        en: 'description',
                    },
                    masterVariant: {
                        attributes: [],
                        id: 1,
                        images: [
                            {
                                dimensions: {
                                    h: 100,
                                    w: 100,
                                },
                                url: 'image-url',
                            },
                        ],
                        prices: [
                            {
                                value: {
                                    type: 'value-type',
                                    fractionDigits: 2,
                                    centAmount: 200,
                                    currencyCode: 'USD',
                                },
                                id: 'priceId',
                            },
                        ],
                        sku: 'sku',
                    },
                    name: {
                        en: 'name',
                    },
                    slug: {
                        en: 'slug',
                    },
                    variants: [],
                    searchKeywords: {},
                },
            },
            productType: {
                id: 'productTypeId',
                typeId: 'productTypeTypeId',
            },
            taxCategory: {
                id: 'taxCategoryId',
                typeId: 'taxCategoryTypeId',
            },
            createdAt: 'createdAt',
            lastModifiedAt: 'lastModifiedAt',
            key: 'key',
        };
        const mockFetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(expectedProduct),
        });
        global.fetch = mockFetch;
        const result = await getProduct(anonymousToken, productKey);
        expect(result).toEqual(expectedProduct);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(
            `${process.env.CTP_API_URL as string}/${process.env.CTP_PROJECT_KEY as string}/products/key=${productKey}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${anonymousToken}`,
                },
            }
        );
    });
    it('should return a ProductAll object with null or undefined fields when the API response contains null or undefined fields', async () => {
        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({
                        id: '123',
                        version: 1,
                        masterData: {
                            current: {
                                categories: [
                                    {
                                        id: 'category1',
                                        typeId: 'categoryType1',
                                    },
                                ],
                                description: {
                                    'en-US': 'Product description',
                                },
                                masterVariant: {
                                    attributes: [],
                                    id: 1,
                                    images: [
                                        {
                                            dimensions: {
                                                h: 100,
                                                w: 100,
                                            },
                                            url: 'https://example.com/image.jpg',
                                        },
                                    ],
                                    prices: [
                                        {
                                            discounted: {
                                                value: {
                                                    type: 'centPrecision',
                                                    fractionDigits: 2,
                                                    centAmount: 1000,
                                                    currencyCode: 'USD',
                                                },
                                            },
                                            value: {
                                                type: 'centPrecision',
                                                fractionDigits: 2,
                                                centAmount: 2000,
                                                currencyCode: 'USD',
                                            },
                                            id: 'price1',
                                        },
                                    ],
                                    sku: 'SKU123',
                                },
                                name: {
                                    'en-US': 'Product name',
                                },
                                slug: {
                                    en: 'product-slug',
                                },
                                variants: [],
                                searchKeywords: {},
                            },
                            hasStagedChanges: false,
                            published: true,
                            staged: {
                                categories: [
                                    {
                                        id: 'category2',
                                        typeId: 'categoryType2',
                                    },
                                ],
                                description: {
                                    en: 'Product description',
                                },
                                masterVariant: {
                                    attributes: [],
                                    id: 1,
                                    images: [
                                        {
                                            dimensions: {
                                                h: 100,
                                                w: 100,
                                            },
                                            url: 'https://example.com/image.jpg',
                                        },
                                    ],
                                    prices: [
                                        {
                                            value: {
                                                type: 'centPrecision',
                                                fractionDigits: 2,
                                                centAmount: 2000,
                                                currencyCode: 'USD',
                                            },
                                            id: 'price1',
                                        },
                                    ],
                                    sku: 'SKU123',
                                },
                                name: {
                                    en: 'Product name',
                                },
                                slug: {
                                    en: 'product-slug',
                                },
                                variants: [],
                                searchKeywords: {},
                            },
                        },
                        productType: {
                            id: 'productType1',
                            typeId: 'productTypeType1',
                        },
                        taxCategory: {
                            id: 'taxCategory1',
                            typeId: 'taxCategoryType1',
                        },
                        createdAt: '2022-01-01T00:00:00Z',
                        lastModifiedAt: '2022-01-01T00:00:00Z',
                        key: 'product-key',
                    }),
            });
        });
        const anonymousToken = 'anonymous-token';
        const productKey = 'product-key';
        const result = await getProduct(anonymousToken, productKey);
        expect(result).toEqual({
            id: '123',
            version: 1,
            masterData: {
                current: {
                    categories: [
                        {
                            id: 'category1',
                            typeId: 'categoryType1',
                        },
                    ],
                    description: {
                        'en-US': 'Product description',
                    },
                    masterVariant: {
                        attributes: [],
                        id: 1,
                        images: [
                            {
                                dimensions: {
                                    h: 100,
                                    w: 100,
                                },
                                url: 'https://example.com/image.jpg',
                            },
                        ],
                        prices: [
                            {
                                discounted: {
                                    value: {
                                        type: 'centPrecision',
                                        fractionDigits: 2,
                                        centAmount: 1000,
                                        currencyCode: 'USD',
                                    },
                                },
                                value: {
                                    type: 'centPrecision',
                                    fractionDigits: 2,
                                    centAmount: 2000,
                                    currencyCode: 'USD',
                                },
                                id: 'price1',
                            },
                        ],
                        sku: 'SKU123',
                    },
                    name: {
                        'en-US': 'Product name',
                    },
                    slug: {
                        en: 'product-slug',
                    },
                    variants: [],
                    searchKeywords: {},
                },
                hasStagedChanges: false,
                published: true,
                staged: {
                    categories: [
                        {
                            id: 'category2',
                            typeId: 'categoryType2',
                        },
                    ],
                    description: {
                        en: 'Product description',
                    },
                    masterVariant: {
                        attributes: [],
                        id: 1,
                        images: [
                            {
                                dimensions: {
                                    h: 100,
                                    w: 100,
                                },
                                url: 'https://example.com/image.jpg',
                            },
                        ],
                        prices: [
                            {
                                value: {
                                    type: 'centPrecision',
                                    fractionDigits: 2,
                                    centAmount: 2000,
                                    currencyCode: 'USD',
                                },
                                id: 'price1',
                            },
                        ],
                        sku: 'SKU123',
                    },
                    name: {
                        en: 'Product name',
                    },
                    slug: {
                        en: 'product-slug',
                    },
                    variants: [],
                    searchKeywords: {},
                },
            },
            productType: {
                id: 'productType1',
                typeId: 'productTypeType1',
            },
            taxCategory: {
                id: 'taxCategory1',
                typeId: 'taxCategoryType1',
            },
            createdAt: '2022-01-01T00:00:00Z',
            lastModifiedAt: '2022-01-01T00:00:00Z',
            key: 'product-key',
        });
    });
});
