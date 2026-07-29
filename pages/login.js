export class LoginPage {

    constructor(page) {
        this.page = page;

        this.username = page.locator('#id_username');
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async login(username, password) {
        await this.page.goto('https://test-vartul.satmace.com/login/');

        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}