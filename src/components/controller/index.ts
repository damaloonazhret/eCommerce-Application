import Model from '../model';

export default class Controller {
    private model: Model;

    constructor(model: Model) {
        this.model = model;
    }

    public async signIn(login: string, password: string): Promise<boolean> {
        return this.model.signIn(login, password);
    }
}
