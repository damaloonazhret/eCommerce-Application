import About from '../components/view/about';
import Contact from '../components/view/contact';
import Error404 from '../components/view/error404';
import Home from '../components/view/home';
import Login from '../components/view/login';
import Registration from '../components/view/registration';
import Shop from '../components/view/shop';

export interface Route {
    path: string;
    View:
        | typeof Home
        | typeof Shop
        | typeof Login
        | typeof Registration
        | typeof Error404
        | typeof About
        | typeof Contact;
}

export interface RequestOptions {
    method: string;
    headers: HeadersInit;
    body: string;
}

export interface AccessTokenResponse {
    statusCode?: number;
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token: string;
    anonymous_id?: string;
    customer_id?: string;
    message?: string;
}

export interface Customer {
    statusCode?: number;
    customer: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        password: string;
        addresses: [
            {
                id: string;
                streetName: string;
                postalCode: string;
                city: string;
                country: string;
            },
        ];
    };
    message?: string;
}

export interface UserLoginData {
    email: string;
    password: string;
}

export interface UserRegistrationData extends UserLoginData {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    addresses: [
        {
            streetName: string;
            postalCode: string;
            city: string;
            country: string;
        },
        {
            streetName: string;
            postalCode: string;
            city: string;
            country: string;
        },
    ];
    shippingAddresses: number[];
    defaultShippingAddress?: number;
    defaultBillingAddress?: number;
    billingAddresses: number[];
}

export interface LoginResult {
    success: boolean;
    message: string;
}

export type RegistrationResult = LoginResult;

export interface Product {
    id: string;
    version: number;
    masterData: {
        current: {
            categories: [
                {
                    id: string;
                    typeId: string;
                },
            ];
            description: {
                'en-US': string;
            };
            masterVariant: {
                attributes: [];
                id: number;
                images: [
                    {
                        dimensions: {
                            h: number;
                            w: number;
                        };
                        url: string;
                    },
                ];
                prices: [
                    {
                        discounted: {
                            value: {
                                type: string;
                                fractionDigits: number;
                                centAmount: number;
                                currencyCode: string;
                            };
                        };
                        value: {
                            type: string;
                            fractionDigits: number;
                            centAmount: number;
                            currencyCode: string;
                        };
                        id: string;
                    },
                ];
                sku: string;
            };
            name: {
                'en-US': string;
            };
            slug: {
                en: string;
            };
            variants: [];
            searchKeywords: object;
        };
        hasStagedChanges: boolean;
        published: boolean;
        staged: {
            categories: [
                {
                    id: string;
                    typeId: string;
                },
            ];
            description: {
                en: string;
            };
            masterVariant: {
                attributes: [];
                id: number;
                images: [
                    {
                        dimensions: {
                            h: number;
                            w: number;
                        };
                        url: string;
                    },
                ];
                prices: [
                    {
                        value: {
                            type: string;
                            fractionDigits: number;
                            centAmount: number;
                            currencyCode: string;
                        };
                        id: string;
                    },
                ];
                sku: string;
            };
            name: {
                en: string;
            };
            slug: {
                en: string;
            };
            variants: [];
            searchKeywords: object;
        };
    };
    productType: {
        id: string;
        typeId: string;
    };
    taxCategory: {
        id: string;
        typeId: string;
    };
    createdAt: string;
    lastModifiedAt: string;
}

export interface GetProducts {
    limit: number;
    offset: number;
    count: number;
    total: number;
    results: [];
}

export interface GetCategories {
    limit: number;
    offset: number;
    count: number;
    total: number;
    results: [
        {
            id: string;
            description: {
                'en-US': string;
            };
        },
    ];
}

export interface GetSearchProducts {
    limit: number;
    offset: number;
    count: number;
    total: number;
    results: [];
}
