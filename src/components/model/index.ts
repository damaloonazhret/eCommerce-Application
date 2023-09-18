import getToken from '../../services/commercetools/getToken';
import signIn from '../../services/commercetools/signIn';
import signUp from '../../services/commercetools/signUp';
import getProducts from '../../services/commercetools/getProducts';
import getProduct from '../../services/commercetools/getProduct';
import getCategories from '../../services/commercetools/getCategories';
import getAnonymousToken from '../../services/commercetools/getAnonymousToken';
import getSearchProducts from '../../services/commercetools/getSearchProducts';
import creatCart from '../../services/commercetools/creatCart';
import addAnonymousShipping from '../../services/commercetools/addAnonymousShipping';
import addLineItem from '../../services/commercetools/addLineItem';
import getCart from '../../services/commercetools/getCart';
import {
    Customer,
    UserRegistrationData,
    UserLoginData,
    LoginResult,
    RegistrationResult,
    AccessTokenResponse,
    GetProducts,
    GetCategories,
    ProductAll,
    EmailChangeResult,
    CustomerResponse,
    PasswordChangeResult,
    PasswordChange,
    Address,
    AddressAddResult,
    CartData,
} from '../../types/interfaces';
import Header from '../view/header';
import changeEmail from '../../services/commercetools/updateEmail';
import returnActualVersion from '../../helpers/returnActualVersion';
import updateUserData from '../../services/commercetools/updateUserData';
import changePassword from '../../services/commercetools/changePassword';
import addAddress from '../../services/commercetools/addAddress';
import updateAddress from '../../services/commercetools/updateAddress';
import removeAddress from '../../services/commercetools/removeAddress';

export default class Model {
    private header?: Header;

    constructor(header?: Header) {
        this.header = header || undefined;
    }

    public async signIn(UserData: UserLoginData): Promise<LoginResult> {
        const token = getToken();
        const response = await signIn((await token).access_token, UserData);
        const errorResponse = this.returnFormError(response);
        if (errorResponse.success) {
            this.header?.setLoggedLayout();
        }
        return errorResponse;
    }

    public async changeEmail(email: string, version: number, id: string): Promise<EmailChangeResult> {
        const token = getToken();
        const response = await changeEmail((await token).access_token, email, version, id);
        const errorResponse = this.returnFormError(response);
        return errorResponse;
    }

    public async changePassword(data: PasswordChange, version: number): Promise<PasswordChangeResult> {
        const token = getToken();
        const response = await changePassword(data, (await token).access_token, version);
        const errorResponse = this.returnFormError(response);
        return errorResponse;
    }

    public async addAddress(data: Address, version: number): Promise<AddressAddResult> {
        const token = getToken();
        const response = await addAddress(data, version, (await token).access_token);
        const errorResponse = this.returnFormError(response);
        return errorResponse;
    }

    public async updateAddress(data: Address, version: number, idAddress: string): Promise<AddressAddResult> {
        const token = getToken();
        const response = await updateAddress(data, version, idAddress, (await token).access_token);
        const errorResponse = this.returnFormError(response);
        return errorResponse;
    }

    public async removeAddress(id: string, customerId: string, version: number): Promise<AddressAddResult> {
        const token = getToken();
        const response = await removeAddress(id, customerId, version, (await token).access_token);
        const errorResponse = this.returnFormError(response);
        return errorResponse;
    }

    public async updateName(
        name: string,
        version: number,
        action: string,
        setValue: string,
        id: string
    ): Promise<EmailChangeResult> {
        const token = getToken();
        const response = await updateUserData((await token).access_token, name, version, action, setValue, id);
        const errorResponse = this.returnFormError(response);
        return errorResponse;
    }

    public async getVersion(userId: string): Promise<CustomerResponse> {
        const token = getToken();
        const response = await returnActualVersion(userId, (await token).access_token);
        const errorResponse = this.returnFormError(response);

        if (errorResponse.success) {
            return response;
        }
        throw new Error('Failed to retrieve customer version');
    }

    public async signUp(userData: UserRegistrationData): Promise<RegistrationResult> {
        const token = getToken();
        const response = await signUp((await token).access_token, userData);
        return this.returnFormError(response);
    }

    public returnFormError(
        response: AccessTokenResponse | Customer | CustomerResponse
    ): LoginResult | RegistrationResult | EmailChangeResult {
        const result = { success: false, message: '' };

        if (response.statusCode === 400 || response.statusCode === 409) {
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

    public async getSearchProducts(paramSearch: string): Promise<GetProducts> {
        const anonymousToken = getAnonymousToken();
        const response = await getSearchProducts((await anonymousToken).access_token, paramSearch);
        return response;
    }

    public async getProduct(productKey: string): Promise<ProductAll> {
        const anonymousToken = getAnonymousToken();
        const response = await getProduct((await anonymousToken).access_token, productKey);
        return response;
    }

    public async creatCartModel(): Promise<CartData> {
        const anonymousToken = getAnonymousToken();
        const response = await creatCart((await anonymousToken).access_token);
        return response;
    }

    public async addAnonymousShippingModel(): Promise<void> {
        const anonymousToken = getAnonymousToken();
        const getIdCartFromLocalStorage = localStorage.getItem('idCart');
        if (typeof getIdCartFromLocalStorage === 'string') {
            void getCart((await anonymousToken).access_token, getIdCartFromLocalStorage).then(async (data) => {
                const response = await addAnonymousShipping(
                    (await anonymousToken).access_token,
                    getIdCartFromLocalStorage,
                    data.version
                );
                return response;
            });
        }
    }

    public async addLineItemModel(idCar: string): Promise<void> {
        const anonymousToken = getAnonymousToken();
        const getIdCartFromLocalStorage = localStorage.getItem('idCart');
        if (typeof getIdCartFromLocalStorage === 'string') {
            void getCart((await anonymousToken).access_token, getIdCartFromLocalStorage).then(async (data) => {
                const response = await addLineItem(
                    (await anonymousToken).access_token,
                    idCar,
                    getIdCartFromLocalStorage,
                    data.version
                );
                return response;
            });
        }
    }

    /*     public async getCartModel(): Promise<CartData> {
        const anonymousToken = getAnonymousToken();
        const getIdCartFromLocalStorage = localStorage.getItem('idCart');
        if (typeof getIdCartFromLocalStorage === 'string') {
            const response = getCart((await anonymousToken).access_token, getIdCartFromLocalStorage);
            return response;
        }
    } */

    // eslint-disable-next-line consistent-return
    public async getCartModel(): Promise<CartData | undefined> {
        const anonymousToken = getAnonymousToken();
        const getIdCartFromLocalStorage = localStorage.getItem('idCart');
        if (typeof getIdCartFromLocalStorage === 'string') {
            const response = await getCart((await anonymousToken).access_token, getIdCartFromLocalStorage);
            return response;
        }
    }
}
