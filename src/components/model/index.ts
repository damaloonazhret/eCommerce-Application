import signIn from '../../services/commercetools/signIn';

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
}
