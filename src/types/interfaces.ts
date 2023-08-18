import About from '../components/view/about';
import Contact from '../components/view/contact';
import Error404 from '../components/view/error404';
import Login from '../components/view/login';
import Registration from '../components/view/registration';
import Shop from '../components/view/shop';

export interface Route {
    path: string;
    View: typeof Shop | typeof Login | typeof Registration | typeof Error404 | typeof About | typeof Contact;
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
    ];
}

export interface LoginResult {
    success: boolean;
    message: string;
}

export type RegistrationResult = LoginResult;
