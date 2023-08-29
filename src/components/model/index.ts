import getToken from '../../services/commercetools/getToken';
import signIn from '../../services/commercetools/signIn';
import signUp from '../../services/commercetools/signUp';
import {
    Customer,
    UserRegistrationData,
    UserLoginData,
    LoginResult,
    RegistrationResult,
    AccessTokenResponse,
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
}
