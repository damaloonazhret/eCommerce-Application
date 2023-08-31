import getToken from '../../services/commercetools/getToken';
import signIn from '../../services/commercetools/signIn';
import signUp from '../../services/commercetools/signUp';
import getProducts from '../../services/commercetools/getProducts';
import getProduct from '../../services/commercetools/getProduct';
import getCategories from '../../services/commercetools/getCategories';
import getAnonymousToken from '../../services/commercetools/getAnonymousToken';
import getSearchProducts from '../../services/commercetools/getSearchProducts';
import {
    Customer,
    UserRegistrationData,
    UserLoginData,
    LoginResult,
    RegistrationResult,
    AccessTokenResponse,
    GetProducts,
    GetCategories,
    GetSearchProducts,
    ProductAll,
} from '../../types/interfaces';
import Header from '../view/header';

export default class Model {
    private header?: Header;

    constructor(header?: Header) {
        this.header = header || undefined;
    }

    public async signIn(UserData: UserLoginData): Promise<LoginResult> {
        const token = getToken();
        const response = await signIn((await token).access_token, UserData);
        this.header?.setLoggedLayout();
        return this.returnFormError(response);
    }

    public async signUp(userData: UserRegistrationData): Promise<RegistrationResult> {
        const token = getToken();
        const response = await signUp((await token).access_token, userData);
        return this.returnFormError(response);
    }

    public returnFormError(response: AccessTokenResponse | Customer): LoginResult | RegistrationResult {
        const result = { success: false, message: '' };

        if (response.statusCode === 400) {
            result.message = response.message as string;
            return result;
        }

        result.success = true;
        return result;
    }

    public async getProducts(): Promise<GetProducts> {
        const anonymousToken = getAnonymousToken();
        const response = await getProducts((await anonymousToken).access_token);
        return response;
    }

    public async getCategories(): Promise<GetCategories> {
        const anonymousToken = getAnonymousToken();
        const response = await getCategories((await anonymousToken).access_token);
        return response;
    }

    public async getSearchProducts(paramSearch: string): Promise<GetSearchProducts> {
        const anonymousToken = getAnonymousToken();
        const response = await getSearchProducts((await anonymousToken).access_token, paramSearch);
        return response;
    }

    public async getProduct(productKey: string): Promise<ProductAll> {
        const anonymousToken = getAnonymousToken();
        const response = await getProduct((await anonymousToken).access_token, productKey);
        return response;
    }
}
