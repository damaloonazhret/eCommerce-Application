import { LoginResult, RegistrationResult, UserLoginData, UserRegistrationData } from '../../types/interfaces';
import Model from '../model';

export default class Controller {
    private model: Model;

    constructor(model: Model) {
        this.model = model;
    }

    public async signIn(userData: UserLoginData): Promise<LoginResult> {
        console.log(userData);
        return this.model.signIn(userData);
    }

    public async signUp(userData: UserRegistrationData): Promise<RegistrationResult> {
        return this.model.signUp(userData);
    }
}
