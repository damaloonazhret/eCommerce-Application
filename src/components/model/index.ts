import getToken from '../../services/commercetools/getToken';
import signIn from '../../services/commercetools/signIn';
import signUp from '../../services/commercetools/signUp';
import { Customer, UserRegistrationData, UserLoginData } from '../../types/interfaces';

export default class Model {
    public async signIn(UserData: UserLoginData): Promise<boolean> {
        const result = await signIn(UserData);
        if (result.access_token) {
            console.log(result);
            return true;
        }

        console.log(result.message);
        return false;
    }

    public async signUp(userData: UserRegistrationData): Promise<Customer | boolean> {
        const token = getToken();
        const result = await signUp((await token).access_token, userData);
        if (result) {
            console.log(result);
            return result;
        }

        console.log(result);
        return false;
    }
}
