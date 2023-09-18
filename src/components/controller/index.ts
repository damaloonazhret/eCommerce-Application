import {
    ProductAll,
    Address,
    AddressAddResult,
    CustomerResponse,
    EmailChangeResult,
    LoginResult,
    NameUpdateResult,
    PasswordChange,
    PasswordChangeResult,
    RegistrationResult,
    UserLoginData,
    UserRegistrationData,
    CartData,
} from '../../types/interfaces';
import Model from '../model';

export default class Controller {
    public model: Model;

    constructor(model: Model) {
        this.model = model;
    }

    public async signIn(userData: UserLoginData): Promise<LoginResult> {
        return this.model.signIn(userData);
    }

    public async getVersion(userId: string): Promise<CustomerResponse> {
        return this.model.getVersion(userId);
    }

    public async changeEmail(email: string, version: number, id: string): Promise<EmailChangeResult> {
        return this.model.changeEmail(email, version, id);
    }

    public async addAddress(addressDate: Address, version: number): Promise<AddressAddResult> {
        return this.model.addAddress(addressDate, version);
    }

    public async removeAddress(id: string, customerId: string, version: number): Promise<AddressAddResult> {
        return this.model.removeAddress(id, customerId, version);
    }

    public async updateAddress(addressDate: Address, version: number, addressId: string): Promise<AddressAddResult> {
        return this.model.updateAddress(addressDate, version, addressId);
    }

    public async changePassword(data: PasswordChange, version: number): Promise<PasswordChangeResult> {
        return this.model.changePassword(data, version);
    }

    public async updateName(
        name: string,
        version: number,
        action: string,
        setValue: string,
        id: string
    ): Promise<NameUpdateResult> {
        return this.model.updateName(name, version, action, setValue, id);
    }

    public async signUp(userData: UserRegistrationData): Promise<RegistrationResult> {
        return this.model.signUp(userData);
    }

    public async getProduct(productKey: string): Promise<ProductAll> {
        console.log(this.model.getProduct(productKey));
        return this.model.getProduct(productKey);
    }

    public async creatAnonimousCart(): Promise<CartData> {
        return this.model.creatCartModel();
    }

    public async addAnonimousShippng(): Promise<void> {
        return this.model.addAnonymousShippingModel();
    }

    public async addLineItem(idCar: string): Promise<void> {
        return this.model.addLineItemModel(idCar);
    }

    public async getCart(): Promise<CartData | undefined> {
        return this.model.getCartModel();
    }
}
