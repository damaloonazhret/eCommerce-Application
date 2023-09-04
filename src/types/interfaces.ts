import About from '../components/view/about';
import Contact from '../components/view/contact';
import Error404 from '../components/view/error404';
import Home from '../components/view/home';
import Login from '../components/view/login';
import Product from '../components/view/product';
import Registration from '../components/view/registration';
import Shop from '../components/view/shop';
import Account from '../components/view/account';

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
        | typeof Product;
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
