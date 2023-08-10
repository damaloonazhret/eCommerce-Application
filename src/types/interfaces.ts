import Login from '../components/view/login';
import Registration from '../components/view/registration';
import Shop from '../components/view/shop';

export interface Route {
    path: string;
    View: typeof Shop | typeof Login | typeof Registration;
}

export interface RequestOptions {
    method: string;
    headers: HeadersInit;
    body: string;
}

export interface AccessTokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token: string;
    anonymous_id?: string;
    customer_id?: string;
}

export interface Customer {
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
}
