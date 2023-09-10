import About from '../components/view/about';
import Contact from '../components/view/contact';
import Error404 from '../components/view/error404';
import Home from '../components/view/home';
import Login from '../components/view/login';
import Product from '../components/view/product';
import Registration from '../components/view/registration';
import Shop from '../components/view/shop';
import Account from '../components/view/account';
import Cart from '../components/view/cart';

export interface Route {
    path: string;
    View:
        | typeof Home
        | typeof Shop
        | typeof Login
        | typeof Account
        | typeof Registration
        | typeof Error404
        | typeof About
        | typeof Contact
        | typeof Product
        | typeof Cart;
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

export interface ProductAll {
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
    key: string;
}

export interface ProductOne {
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
    key: string;
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

export interface CaracteristicProduct {
    forEach(arg0: (el: CaracteristicProductString | CaracteristicProductObject) => void): unknown;
    [index: number]: { name: string; value: string };
}

export interface CaracteristicProductString {
    name: string;
    value: string;
}

export interface CaracteristicProductObject {
    name: string;
    value: {
        key: string;
        label: string;
    };
}

export type EmailChangeResult = LoginResult;

export type PasswordChangeResult = LoginResult;

export type AddressAddResult = LoginResult;

export type VersionGetResult = LoginResult;

export type NameUpdateResult = LoginResult;

export interface Address {
    id: string;
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
}

export interface UserInfo {
    customer: {
        id: string;
        version: number;
        versionModifiedAt: string;
        lastMessageSequenceNumber: number;
        createdAt: string;
        lastModifiedAt: string;
        lastModifiedBy: {
            clientId: string;
            isPlatformClient: boolean;
        };
        createdBy: {
            clientId: string;
            isPlatformClient: boolean;
        };
        email: string;
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        password: string;
        addresses: Address[];
        shippingAddressIds: string[];
        billingAddressIds: string[];
        isEmailVerified: boolean;
        stores: string[];
        authenticationMode: string;
    };
}

export interface CustomerResponse {
    statusCode?: number;
    id: string;
    version: number;
    createdAt: string;
    lastModifiedAt: string;
    lastModifiedBy: {
        clientId: string;
        isPlatformClient: boolean;
    };
    createdBy: {
        clientId: string;
        isPlatformClient: boolean;
    };
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    addresses: Address[];
    shippingAddressIds: string[];
    billingAddressIds: string[];
    isEmailVerified: boolean;
    stores: string[];
    authenticationMode: string;
    message?: string;
}

export interface PasswordChange {
    id: string;
    currentPassword: string;
    newPassword: string;
}

export interface ErrorResponse {
    statusCode: number;
    message: string;
    errors: ErrorDetail[];
}

interface ErrorDetail {
    code: string;
    message: string;
    currentVersion: number;
}
