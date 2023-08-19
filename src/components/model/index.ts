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

export default class Model {
    public async signIn(UserData: UserLoginData): Promise<LoginResult> {
        const token = getToken();
        const response = await signIn((await token).access_token, UserData);

        return this.returnFormError(response);
    }

    public async signUp(userData: UserRegistrationData): Promise<RegistrationResult> {
        const token = getToken();
        const response = await signUp((await token).access_token, userData);

        return this.returnFormError(response);
    }

    private returnFormError(response: AccessTokenResponse | Customer): LoginResult | RegistrationResult {
        const result = { success: false, message: '' };

        if (response.statusCode === 400) {
            result.message = response.message as string;
            return result;
        }

        result.success = true;
        return result;
    }
}
