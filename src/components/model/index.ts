import getToken from '../../services/commercetools/getToken';
import signIn from '../../services/commercetools/signIn';
import signUp from '../../services/commercetools/signUp';
import { Customer } from '../../types/interfaces';

export default class Model {
    public async signIn(login: string, password: string): Promise<boolean> {
        const result = await signIn(login, password);
        if (result.access_token) {
            console.log(result);
            return true;
        }

        console.log(result.message);
        return false;
    }

    public async signUp(
        email: string,
        firstName: string,
        lastName: string,
        password: string,
        dateOfBirth: string,
        country: string,
        city: string,
        streetName: string,
        postalCode: string
    ): Promise<Customer | boolean> {
        const token = getToken();
        const result = await signUp(
            (await token).access_token,
            email,
            firstName,
            lastName,
            password,
            dateOfBirth,
            country,
            city,
            streetName,
            postalCode
        );
        if (result) {
            console.log(result);
            return result;
        }

        console.log(result);
        return false;
    }
}
