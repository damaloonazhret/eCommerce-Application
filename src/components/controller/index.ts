import { Customer } from '../../types/interfaces';
import Model from '../model';

export default class Controller {
    private model: Model;

    constructor(model: Model) {
        this.model = model;
    }

    public async signIn(login: string, password: string): Promise<boolean> {
        return this.model.signIn(login, password);
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
        return this.model.signUp(
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
    }
}
