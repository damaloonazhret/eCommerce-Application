/**
 * @jest-environment jsdom
 */
import Header from '../components/view/header';
import Main from '../components/view/main';
import AccountPageInfo from '../helpers/accountPageInfo';
import AlreadyRegister from '../helpers/alreadyRegisterGenerator';
import ButtonGenerator from '../helpers/buttonSwitchGenerator';
import createNavLink from '../helpers/createNavLink';
import ValidationUtils from '../helpers/formValidator';
import InputGenerator from '../helpers/inputGenerator';
import SuccessRegistration from '../helpers/successRegistratioin';
import PasswordChange from '../helpers/passwordChange';
import Controller from '../components/controller';
import Model from '../components/model';
import Error404 from '../components/view/error404';
import Contact from '../components/view/contact';

describe('View tests', () => {
    it('should create a new instance of Main class', () => {
        const main = new Main();
        expect(main).toBeInstanceOf(Main);
    });

    it("should return a main element with class 'main' and text content 'Main Page' when getLayout() is called", () => {
        const main = new Main();
        expect(main.getLayout().tagName).toBe('MAIN');
        expect(main.getLayout().classList.contains('main')).toBe(true);
        expect(main.getLayout().textContent).toBe('Main Page');
    });

    it('should replace the current content of the main element with the provided element when setContent() is called', () => {
        const main = new Main();
        const newContent = document.createElement('div');
        newContent.textContent = 'New Content';
        main.setContent(newContent);
        expect(main.getLayout().innerHTML).toBe('<div>New Content</div>');
    });

    it('should create Header class with all necessary elements', () => {
        const header = new Header();
        expect(header.getLayout()).toBeDefined();
        expect(header.getLayout().tagName).toBe('HEADER');
        expect(header.getLayout().classList.contains('header')).toBe(true);
        expect(header.getLayout().querySelector('.header__nav')).toBeDefined();
        expect(header.getLayout().querySelector('.header__nav-list')).toBeDefined();
    });

    it('should set active link correctly', () => {
        const header = new Header();
        const path = '/shop';
        header.setActiveLink(path);
        const activeLink = header.getLayout().querySelector('.active');
        expect(activeLink).toBeDefined();
        expect(activeLink?.getAttribute('href')).toBe(path);
    });

    describe('createNavLink', () => {
        it('should create an anchor element with the given href, className, and text', () => {
            const href = 'https://example.com/';
            const className = 'nav-link';
            const text = 'Home';

            const result = createNavLink(href, className, text);

            expect(result.tagName).toBe('A');
            expect(result.href).toBe(href);
            expect(result.className).toBe(className);
            expect(result.textContent).toBe(text);
        });
    });

    describe('SuccessRegistration', () => {
        it('should create a SuccessRegistration instance with valid parameters', () => {
            const className = 'test-class';
            const textTop = 'Test Top';
            const textBottom = 'Test Bottom';

            const successRegistration = new SuccessRegistration(className, textTop, textBottom);
            expect(successRegistration).toBeInstanceOf(SuccessRegistration);
        });
    });
});

describe('ValidationUtils', () => {
    it('should change the input type and hide/show the password switch button when toggling password visibility', () => {
        const passwordInput = document.createElement('input');
        const passwordSwitch = document.createElement('button');

        passwordInput.type = 'password';

        ValidationUtils.togglePasswordVisibility(passwordInput, passwordSwitch);

        expect(passwordInput.type).toBe('text');

        expect(passwordSwitch.classList.contains('hide')).toBe(true);

        ValidationUtils.togglePasswordVisibility(passwordInput, passwordSwitch);

        expect(passwordInput.type).toBe('password');

        expect(passwordSwitch.classList.contains('hide')).toBe(false);
    });

    it('should toggle password visibility and update button class when called', () => {
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        const passwordSwitch = document.createElement('button');
        passwordSwitch.classList.add('hide');

        ValidationUtils.togglePasswordVisibility(passwordInput, passwordSwitch);

        expect(passwordInput.type).toBe('text');
        expect(passwordSwitch.classList.contains('hide')).toBe(true);
    });

    it("should change password visibility back to 'password' when input type is already 'text'", () => {
        const passwordInput = document.createElement('input');
        passwordInput.type = 'text';
        const passwordSwitch = document.createElement('button');
        ValidationUtils.togglePasswordVisibility(passwordInput, passwordSwitch);

        expect(passwordInput.type).toBe('password');
    });

    it("should replace existing error messages when input already has 'not-valid' class", () => {
        const input = document.createElement('input');
        input.classList.add('not-valid');

        const messages = ['Error 1', 'Error 2'];

        const inputParent = document.createElement('div');
        const errorUl = document.createElement('ul');
        errorUl.classList.add('error');
        inputParent.appendChild(errorUl);

        jest.spyOn(input, 'parentElement', 'get').mockReturnValue(inputParent);
        jest.spyOn(inputParent, 'querySelector').mockReturnValue(errorUl);

        ValidationUtils.showError(input, messages);

        expect(input.classList.contains('valid')).toBe(false);
        expect(input.classList.contains('not-valid')).toBe(true);
        expect(errorUl.innerHTML).toBe('<li>Error 1</li><li>Error 2</li>');
    });

    it('should clear error messages when messages array is empty', () => {
        const input = document.createElement('input');
        input.classList.add('not-valid');

        const parent = document.createElement('div');
        parent.appendChild(input);

        const errorUl = document.createElement('ul');
        errorUl.classList.add('error');
        parent.appendChild(errorUl);

        ValidationUtils.showError(input, []);

        expect(errorUl.innerHTML).toBe('');

        expect(input.classList.contains('valid')).toBe(true);
        expect(input.classList.contains('not-valid')).toBe(false);
    });
});

describe('ButtonGenerator', () => {
    it('should generate a button with default text when no buttonText is provided', () => {
        const buttonGenerator = new ButtonGenerator();

        const button = buttonGenerator.createButtonWithCheckbox('test-button', '', 'Checkbox Text');

        expect(button.textContent).toBe('Checkbox TextDefault');
    });

    it("should generate a button without a checkbox when checkboxText is 'none'", () => {
        const buttonGenerator = new ButtonGenerator();

        const result = buttonGenerator.createButtonWithCheckbox('test', 'Button', 'none');

        expect(result.querySelector('.test_checkbox')).toBeNull();
    });

    it('should set the class name of the container div to the provided className', () => {
        const buttonGenerator = new ButtonGenerator();
        const className = 'test-class';
        const buttonText = 'Button Text';
        const checkboxText = 'Checkbox Text';

        const container = buttonGenerator.createButtonWithCheckbox(className, buttonText, checkboxText);

        expect(container.classList.contains(className)).toBe(true);
    });

    it('should generate a button with empty buttonText', () => {
        const buttonGenerator = new ButtonGenerator();

        const button = buttonGenerator.createButtonWithCheckbox('test-button', '', 'Checkbox');

        expect(button).toBeDefined();
        expect(button.tagName).toBe('DIV');
        expect(button.classList.contains('test-button')).toBe(true);

        const buttonContainer = button.querySelector('.test-button_btn');
        expect(buttonContainer).toBeDefined();

        const generatedButton = buttonContainer?.querySelector('button');
        expect(generatedButton).toBeDefined();
        expect(generatedButton?.textContent).toBe('Default');

        const buttonSpan = buttonContainer?.querySelector('span');
        expect(buttonSpan).toBeDefined();
        expect(buttonSpan?.textContent).toBe('');

        const checkboxContainer = button.querySelector('.test-button_checkbox');
        expect(checkboxContainer).toBeDefined();
    });

    it('should generate a button with a checkbox when checkboxText is provided', () => {
        const buttonGenerator = new ButtonGenerator();
        const className = 'test-button';
        const buttonText = 'Click me';
        const checkboxText = 'Check me';

        const result = buttonGenerator.createButtonWithCheckbox(className, buttonText, checkboxText);

        expect(result).toBeInstanceOf(HTMLDivElement);
        expect(result.classList.contains(className)).toBe(true);

        const buttonContainer = result.querySelector(`.${className}_btn`);
        expect(buttonContainer).not.toBeNull();

        const button = buttonContainer?.querySelector('button');
        expect(button).not.toBeNull();
        expect(button?.textContent).toBe('Default');

        const buttonSpan = buttonContainer?.querySelector('span');
        expect(buttonSpan).not.toBeNull();
        expect(buttonSpan?.textContent).toBe(buttonText);

        const checkboxContainer = result.querySelector(`.${className}_checkbox`);
        expect(checkboxContainer).not.toBeNull();

        const checkbox = checkboxContainer?.querySelector('input[type="checkbox"]');
        expect(checkbox).not.toBeNull();
        expect(checkbox?.id).toBe(`${className}-checkbox`);

        const checkboxSpan = checkboxContainer?.querySelector('span');
        expect(checkboxSpan).not.toBeNull();
        expect(checkboxSpan?.textContent).toBe(checkboxText);
    });

    it('should generate a button with empty checkboxText', () => {
        const buttonGenerator = new ButtonGenerator();

        const result = buttonGenerator.createButtonWithCheckbox('test', 'Button', '');

        expect(result).toBeDefined();
        expect(result.tagName).toBe('DIV');
        expect(result.classList.contains('test')).toBe(true);

        const buttonContainer = result.querySelector('.test_btn');
        expect(buttonContainer).toBeDefined();

        const button = buttonContainer?.querySelector('button');
        expect(button).toBeDefined();
        expect(button?.textContent).toBe('Default');

        const buttonSpan = buttonContainer?.querySelector('span');
        expect(buttonSpan).toBeDefined();
        expect(buttonSpan?.textContent).toBe('Button');

        const checkboxContainer = result.querySelector('.test_checkbox');
        expect(checkboxContainer).toBeDefined();
    });

    it("should generate a button with checkboxText equal to 'none' when a className is provided", () => {
        const buttonGenerator = new ButtonGenerator();
        const className = 'test-class';
        const buttonText = 'Button Text';
        const checkboxText = 'none';

        const result = buttonGenerator.createButtonWithCheckbox(className, buttonText, checkboxText);

        expect(result.classList.contains(className)).toBe(true);
        expect(result.querySelector('.test-class_btn button')?.textContent).toBe('Default');
        expect(result.querySelector('.test-class_btn span')?.textContent).toBe(buttonText);
        expect(result.querySelector('.test-class_checkbox')).toBeNull();
    });

    it("should generate a button without a checkbox when checkboxText is 'none'", () => {
        const buttonGenerator = new ButtonGenerator();
        const className = 'test-button';
        const buttonText = 'Click me';
        const checkboxText = 'none';

        const result = buttonGenerator.createButtonWithCheckbox(className, buttonText, checkboxText);

        expect(result.tagName).toBe('DIV');
        expect(result.classList.contains(className)).toBe(true);
        expect(result.querySelectorAll('button').length).toBe(1);
        expect(result.querySelectorAll('input[type="checkbox"]').length).toBe(0);
        expect(result.querySelector('button')?.textContent).toBe('Default');
        expect(result.querySelector('span')?.textContent).toBe(buttonText);
    });

    it('should set the text content of the checkbox span when checkboxText is provided', () => {
        const buttonGenerator = new ButtonGenerator();
        const className = 'test-button';
        const buttonText = 'Click me';
        const checkboxText = 'Check me';

        const button = buttonGenerator.createButtonWithCheckbox(className, buttonText, checkboxText);

        const checkboxSpan = button.querySelector(`.${className}_checkbox span`);
        expect(checkboxSpan?.textContent).toBe(checkboxText);
    });

    it("should generate a button with custom checkbox text content when checkboxText is not 'none'", () => {
        const buttonGenerator = new ButtonGenerator();
        const className = 'test-button';
        const buttonText = 'Click me';
        const checkboxText = 'Check me';

        const result = buttonGenerator.createButtonWithCheckbox(className, buttonText, checkboxText);

        expect(result).toBeInstanceOf(HTMLDivElement);
        expect(result.classList.contains(className)).toBe(true);

        const buttonContainer = result.querySelector(`.${className}_btn`);
        expect(buttonContainer).not.toBeNull();

        const button = buttonContainer?.querySelector('button');
        expect(button).not.toBeNull();
        expect(button?.textContent).toBe('Default');

        const buttonSpan = buttonContainer?.querySelector('span');
        expect(buttonSpan).not.toBeNull();
        expect(buttonSpan?.textContent).toBe(buttonText);

        const checkboxContainer = result.querySelector(`.${className}_checkbox`);
        expect(checkboxContainer).not.toBeNull();

        const checkbox = checkboxContainer?.querySelector('input[type="checkbox"]');
        expect(checkbox).not.toBeNull();
        expect(checkbox?.id).toBe(`${className}-checkbox`);

        const checkboxSpan = checkboxContainer?.querySelector('span');
        expect(checkboxSpan).not.toBeNull();
        expect(checkboxSpan?.textContent).toBe(checkboxText);
    });

    it("should generate a button with multiple classes in the checkbox div when checkboxText is not 'none'", () => {
        const buttonGenerator = new ButtonGenerator();
        const className = 'test-class';
        const buttonText = 'Test Button';
        const checkboxText = 'Test Checkbox';

        const result = buttonGenerator.createButtonWithCheckbox(className, buttonText, checkboxText);

        expect(result).toBeInstanceOf(HTMLDivElement);
        expect(result.classList.contains(className)).toBe(true);

        const buttonContainer = result.querySelector(`.${className}_btn`);
        expect(buttonContainer).not.toBeNull();

        const button = buttonContainer?.querySelector('button');
        expect(button).not.toBeNull();
        expect(button?.textContent).toBe('Default');

        const buttonSpan = buttonContainer?.querySelector('span');
        expect(buttonSpan).not.toBeNull();
        expect(buttonSpan?.textContent).toBe(buttonText);

        const checkboxContainer = result.querySelector(`.${className}_checkbox`);
        expect(checkboxContainer).not.toBeNull();

        const checkbox = checkboxContainer?.querySelector('input[type="checkbox"]');
        expect(checkbox).not.toBeNull();
        expect(checkbox?.id).toBe(`${className}-checkbox`);

        const checkboxSpan = checkboxContainer?.querySelector('span');
        expect(checkboxSpan).not.toBeNull();
        expect(checkboxSpan?.textContent).toBe(checkboxText);
    });

    it('should set the id of the checkbox to $ {className}-checkbox when checkboxText is provided', () => {
        const buttonGenerator = new ButtonGenerator();

        const className = 'test';
        const buttonText = 'Button';
        const checkboxText = 'Checkbox';
        const buttonWithCheckbox = buttonGenerator.createButtonWithCheckbox(className, buttonText, checkboxText);

        const checkbox = buttonWithCheckbox.querySelector('input[type="checkbox"]');

        expect(checkbox?.id).toBe(`${className}-checkbox`);
    });

    it("should set button text content to 'Default'", () => {
        const buttonGenerator = new ButtonGenerator();

        const buttonWithCheckbox = buttonGenerator.createButtonWithCheckbox(
            'test-class',
            'Test Button',
            'Test Checkbox'
        );

        expect(buttonWithCheckbox.querySelector('button')?.textContent).toBe('Default');
    });

    it('should set the text content of the button span to the provided buttonText', () => {
        const buttonGenerator = new ButtonGenerator();

        const buttonText = 'Test Button';

        const buttonWithCheckbox = buttonGenerator.createButtonWithCheckbox('test-class', buttonText, 'none');

        const buttonSpan = buttonWithCheckbox.querySelector('.test-class_btn span');

        expect(buttonSpan?.textContent).toBe(buttonText);
    });

    it('should generate a button with multiple classes in the button div when called with the specified parameters', () => {
        const buttonGenerator = new ButtonGenerator();

        const className = 'test-button';
        const buttonText = 'Click me';
        const checkboxText = 'Check me';
        const buttonDiv = buttonGenerator.createButtonWithCheckbox(className, buttonText, checkboxText);

        expect(buttonDiv.classList.contains(className)).toBe(true);
        const buttonElement = buttonDiv.querySelector('button');
        expect(buttonElement).not.toBeNull();
        expect(buttonElement?.textContent).toBe('Default');

        const buttonSpan = buttonDiv.querySelector('span');
        expect(buttonSpan).not.toBeNull();
        const checkboxDiv = buttonDiv.querySelector(`.${className}_checkbox`);
        expect(checkboxDiv).not.toBeNull();
        expect(checkboxDiv?.classList.contains(`${className}_checkbox`)).toBe(true);

        const checkboxInput = checkboxDiv?.querySelector('input');
        expect(checkboxInput).not.toBeNull();
        expect(checkboxInput?.type).toBe('checkbox');
        expect(checkboxInput?.id).toBe(`${className}-checkbox`);

        const checkboxSpan = checkboxDiv?.querySelector('span');
        expect(checkboxSpan).not.toBeNull();
        expect(checkboxSpan?.textContent).toBe(checkboxText);
    });
});

describe('AccountPageInfo', () => {
    it('should set accountInfoContainer when name is empty', () => {
        const accountPageInfo = new AccountPageInfo('', 'text', 'className');
        expect(accountPageInfo.getContainer()).toBeDefined();
    });
    it('should set disabled attribute to false when creating an element', () => {
        const accountPageInfo = new AccountPageInfo('element', 'text', 'class');
        const container = accountPageInfo.getContainer();
        expect(container.getAttribute('disabled')).toBe(null);
    });
    it('should create a header element with valid text and class name', () => {
        const text = 'Header Text';
        const className = 'header-class';
        const accountPageInfo = new AccountPageInfo('info', text, className);
        const container = accountPageInfo.getContainer();
        expect(container.tagName).toBe('DIV');
        expect(container.classList.contains(className)).toBe(true);
        expect(container.childElementCount).toBe(1);
        const headerText = container.querySelector('span');
        expect(headerText?.innerText).toBe(text);
    });
    it('should return an instance of the class with the correct container element when creating a new AccountPageInfo object with valid parameters', () => {
        const name = 'box';
        const text = 'Some text';
        const className = 'container';
        const accountPageInfo = new AccountPageInfo(name, text, className);
        expect(accountPageInfo).toBeInstanceOf(AccountPageInfo);
        expect(accountPageInfo.getContainer()).toBeInstanceOf(HTMLDivElement);
        expect(accountPageInfo.getContainer().classList.contains(className)).toBe(true);
    });
    it('should return a container div with the correct class name when creating a new AccountPageInfo object with name "box"', () => {
        const accountPageInfo = new AccountPageInfo('box', '', 'container');
        const container = accountPageInfo.getContainer();
        expect(container.tagName).toBe('DIV');
        expect(container.classList.contains('container')).toBe(true);
    });
    it('should return a container div with the correct class name and header text when creating a new AccountPageInfo object with name "info"', () => {
        const accountPageInfo = new AccountPageInfo('info', 'Header Text', 'container');
        const container = accountPageInfo.getContainer();
        expect(container.tagName).toBe('DIV');
        expect(container.classList.contains('container')).toBe(true);
        const headerText = container.querySelector('span');
        expect(headerText?.innerText).toBe('Header Text');
    });
    it('should return a container div with the correct class name, button text, and button class when creating a new AccountPageInfo object with name "button"', () => {
        const accountPageInfo = new AccountPageInfo('button', 'Button Text', 'button-class');
        const container = accountPageInfo.getContainer();
        expect(container.classList.contains('button-class')).toBe(true);
        expect(container.children.length).toBe(1);
        const buttonText = container.querySelector('button');
        expect(buttonText).not.toBeNull();
        expect(buttonText?.innerText).toBe('Button Text');
        expect(buttonText?.classList.contains('button-class_btn')).toBe(true);
    });

    it('should return the correct container element when called', () => {
        const accountPageInfo = new AccountPageInfo('box', 'text', 'className');
        const container = accountPageInfo.getContainer();
        expect(container).toBeInstanceOf(HTMLDivElement);
        expect(container.classList.contains('className')).toBe(true);
    });
    it('should return a container div with the correct class name, name, and info span elements when creating a new AccountPageInfo object with an invalid name', () => {
        const name = 'invalid';
        const text = 'Some text';
        const className = 'container';
        const accountPageInfo = new AccountPageInfo(name, text, className);
        const container = accountPageInfo.getContainer();
        expect(container.classList.contains(className)).toBe(true);
        expect(container.children.length).toBe(2);
        const spanName = container.querySelector(`.${className}_name`) as HTMLElement;
        expect(spanName).not.toBeNull();
        expect(spanName?.innerText).toBe(name);
        const spanInfo = container.querySelector(`.${className}_info`) as HTMLElement;
        expect(spanInfo).not.toBeNull();
        expect(spanInfo?.innerText).toBe(text);
        expect(spanInfo?.getAttribute('disabled')).toBe('true');
    });
    it('should return container div with correct elements when className is invalid', () => {
        const name = 'invalid';
        const text = 'Some text';
        const className = 'invalid-class';
        const accountPageInfo = new AccountPageInfo(name, text, className);
        const container = accountPageInfo.getContainer();
        expect(container.classList.contains(className)).toBe(true);
        const spanName = container.querySelector(`.${className}_name`) as HTMLElement;
        expect(spanName).not.toBeNull();
        expect(spanName?.innerText).toBe(name);
        const spanInfo = container.querySelector(`.${className}_info`) as HTMLElement;
        expect(spanInfo).not.toBeNull();
        expect(spanInfo?.innerText).toBe(text);
    });
    it('should return a div element with the correct class name, button text, and button class when createButton is called', () => {
        const accountPageInfo = new AccountPageInfo('button', 'Click me', 'btn');
        const result = accountPageInfo.getContainer();
        expect(result.tagName).toBe('DIV');
        expect(result.classList.contains('btn')).toBe(true);
        const buttonText = result.querySelector('button')?.innerText;
        expect(buttonText).toBe('Click me');
        expect(result.querySelector('button')?.classList.contains('btn_btn')).toBe(true);
    });
});

describe('AlreadyRegister', () => {
    it('should return a div container with the message and link elements', () => {
        const alreadyRegister = new AlreadyRegister('test', 'Not registered yet?', 'Register');
        const container = alreadyRegister.getContainer();
        expect(container.tagName).toBe('DIV');
        expect(container.classList.contains('test__already')).toBe(true);
        const span = container.querySelector('span');
        expect(span?.innerText).toBe('Not registered yet?');
        expect(span?.classList.contains('test__already_message')).toBe(true);
        const link = container.querySelector('a');
        expect(link?.getAttribute('href')).toBe('/registration');
        expect(link?.getAttribute('data-route')).toBe('');
        expect(link?.innerText).toBe('Register');
        expect(link?.classList.contains('test__already_link')).toBe(true);
    });
    it('should create a container div with the specified class name, message text, and link text', () => {
        const className = 'testClass';
        const text = 'Test message';
        const linkText = 'Test link';
        const expectedClassName = `${className}__already`;
        const expectedMessageText = text;
        const expectedLinkText = linkText;
        const alreadyRegister = new AlreadyRegister(className, text, linkText);
        const container = alreadyRegister.getContainer();
        expect(container.classList.contains(expectedClassName)).toBe(true);
        expect(container.querySelector('span')?.innerText).toBe(expectedMessageText);
        expect(container.querySelector('a')?.innerText).toBe(expectedLinkText);
    });
    it('should set data-route attribute to an empty string when text is "Not registered yet?"', () => {
        const className = 'test';
        const text = 'Not registered yet?';
        const linkText = 'Register';
        const alreadyRegister = new AlreadyRegister(className, text, linkText);
        const container = alreadyRegister.getContainer();
        const link = container.querySelector('a');
        expect(link?.getAttribute('data-route')).toBe('');
    });
    it("should set href attribute to '/login' when message text is not 'Not registered yet?'", () => {
        const alreadyRegister = new AlreadyRegister('test', 'Already registered?', 'Login');
        const container = alreadyRegister.getContainer();
        const link = container.querySelector('a');
        expect(link?.getAttribute('href')).toBe('/login');
    });
    it('should create a container div with the provided class name, message text, and link text', () => {
        const className = 'test-class';
        const text = 'Test message';
        const linkText = 'Test link';
        const alreadyRegister = new AlreadyRegister(className, text, linkText);
        const container = alreadyRegister.getContainer();
        expect(container.classList.contains(`${className}__already`)).toBe(true);
        expect(container.children.length).toBe(2);
        const span = container.querySelector('span');
        expect(span?.innerText).toBe(text);
        expect(span?.classList.contains(`${className}__already_message`)).toBe(true);
        const link = container.querySelector('a');
        expect(link?.getAttribute('href')).toBe('/login');
        expect(link?.getAttribute('data-route')).toBe('');
        expect(link?.innerText).toBe(linkText);
        expect(link?.classList.contains(`${className}__already_link`)).toBe(true);
    });
    it('should create a container div with the specified class name, message text, and link text', () => {
        const className = 'test-class';
        const text = 'Test message';
        const linkText = 'Test link';
        const alreadyRegister = new AlreadyRegister(className, text, linkText);
        const container = alreadyRegister.getContainer();
        expect(container.classList.contains(`${className}__already`)).toBe(true);
        expect(container.querySelector('span')?.innerText).toBe(text);
        expect(container.querySelector('a')?.innerText).toBe(linkText);
    });
    it('should create a container div with the specified class name, message text, and link text', () => {
        const className = 'testClass';
        const text = 'Test message';
        const linkText = 'Test link';
        const alreadyRegister = new AlreadyRegister(className, text, linkText);
        const container = alreadyRegister.getContainer();
        expect(container.classList.contains(`${className}__already`)).toBe(true);
        expect(container.querySelector('span')?.innerText).toBe(text);
        expect(container.querySelector('a')?.innerText).toBe(linkText);
    });
});

describe('AlreadyRegister', () => {
    it('should return a div container with the message and link elements', () => {
        const alreadyRegister = new AlreadyRegister('test', 'Not registered yet?', 'Register');
        const container = alreadyRegister.getContainer();
        expect(container.tagName).toBe('DIV');
        expect(container.classList.contains('test__already')).toBe(true);
        const span = container.querySelector('span');
        expect(span?.innerText).toBe('Not registered yet?');
        expect(span?.classList.contains('test__already_message')).toBe(true);
        const link = container.querySelector('a');
        expect(link?.getAttribute('href')).toBe('/registration');
        expect(link?.getAttribute('data-route')).toBe('');
        expect(link?.innerText).toBe('Register');
        expect(link?.classList.contains('test__already_link')).toBe(true);
    });
    it('should create a container div with the specified class name, message text, and link text', () => {
        const className = 'testClass';
        const text = 'Test message';
        const linkText = 'Test link';
        const expectedClassName = `${className}__already`;
        const expectedMessageText = text;
        const expectedLinkText = linkText;
        const alreadyRegister = new AlreadyRegister(className, text, linkText);
        const container = alreadyRegister.getContainer();
        expect(container.classList.contains(expectedClassName)).toBe(true);
        expect(container.querySelector('span')?.innerText).toBe(expectedMessageText);
        expect(container.querySelector('a')?.innerText).toBe(expectedLinkText);
    });
    it('should set data-route attribute to an empty string when text is "Not registered yet?"', () => {
        const className = 'test';
        const text = 'Not registered yet?';
        const linkText = 'Register';
        const alreadyRegister = new AlreadyRegister(className, text, linkText);
        const container = alreadyRegister.getContainer();
        const link = container.querySelector('a');
        expect(link?.getAttribute('data-route')).toBe('');
    });
    it("should set href attribute to '/login' when message text is not 'Not registered yet?'", () => {
        const alreadyRegister = new AlreadyRegister('test', 'Already registered?', 'Login');
        const container = alreadyRegister.getContainer();
        const link = container.querySelector('a');
        expect(link?.getAttribute('href')).toBe('/login');
    });
    it('should create a container div with the provided class name, message text, and link text', () => {
        const className = 'test-class';
        const text = 'Test message';
        const linkText = 'Test link';
        const alreadyRegister = new AlreadyRegister(className, text, linkText);
        const container = alreadyRegister.getContainer();
        expect(container.classList.contains(`${className}__already`)).toBe(true);
        expect(container.children.length).toBe(2);
        const span = container.querySelector('span');
        expect(span?.innerText).toBe(text);
        expect(span?.classList.contains(`${className}__already_message`)).toBe(true);
        const link = container.querySelector('a');
        expect(link?.getAttribute('href')).toBe('/login');
        expect(link?.getAttribute('data-route')).toBe('');
        expect(link?.innerText).toBe(linkText);
        expect(link?.classList.contains(`${className}__already_link`)).toBe(true);
    });
    it('should create a container div with the specified class name, message text, and link text', () => {
        const className = 'test-class';
        const text = 'Test message';
        const linkText = 'Test link';
        const alreadyRegister = new AlreadyRegister(className, text, linkText);
        const container = alreadyRegister.getContainer();
        expect(container.classList.contains(`${className}__already`)).toBe(true);
        expect(container.querySelector('span')?.innerText).toBe(text);
        expect(container.querySelector('a')?.innerText).toBe(linkText);
    });
    it('should create a container div with the specified class name, message text, and link text', () => {
        const className = 'testClass';
        const text = 'Test message';
        const linkText = 'Test link';
        const alreadyRegister = new AlreadyRegister(className, text, linkText);
        const container = alreadyRegister.getContainer();
        expect(container.classList.contains(`${className}__already`)).toBe(true);
        expect(container.querySelector('span')?.innerText).toBe(text);
        expect(container.querySelector('a')?.innerText).toBe(linkText);
    });
});

describe('InputGenerator', () => {
    it('should create an input of type text with a placeholder and a class name', () => {
        const type = 'text';
        const placeholder = 'Enter your name';
        const className = 'input-field';
        const inputGenerator = new InputGenerator(type, placeholder, className, 'input');
        const inputContainer = inputGenerator.getInputContainer();
        const inputElement = inputContainer.querySelector('input');
        expect(inputElement).toBeDefined();
        expect(inputElement?.type).toBe('text');
        expect(inputElement?.placeholder).toBe(placeholder);
        expect(inputContainer.classList.contains(className)).toBe(true);
    });
    it('should return the input container element when called', () => {
        const inputGenerator = new InputGenerator('text', 'Enter text', 'input-container', 'input');
        const inputContainer = inputGenerator.getInputContainer();
        expect(inputContainer).toBeInstanceOf(HTMLDivElement);
    });

    it('should create an input of type password with a placeholder and a class name, and an attribute', () => {
        const type = 'password';
        const placeholder = 'Enter password';
        const className = 'password-input';
        const attr = 'disabled';
        const inputGenerator = new InputGenerator(type, placeholder, className, 'password-input', attr);
        const inputContainer = inputGenerator.getInputContainer();
        const input = inputContainer.querySelector('input');
        expect(input?.type).toBe(type);
        expect(input?.placeholder).toBe(placeholder);
        expect(input?.getAttribute('disabled')).toBe('true');
    });

    it('should create an input of type email with the specified placeholder, class name, and attribute', () => {
        const type = 'email';
        const placeholder = 'Enter your email';
        const className = 'email-input';
        const attr = 'disabled';
        const id = 'emailInput';
        const inputGenerator = new InputGenerator(type, placeholder, className, id, attr);
        const inputContainer = inputGenerator.getInputContainer();
        const input = inputContainer.querySelector('input');
        expect(input?.type).toBe('email');
        expect(input?.placeholder).toBe(placeholder);
        expect(input?.getAttribute('disabled')).toBe('true');
    });
    it('should create an input of type email with the specified placeholder, class name, and id', () => {
        const type = 'email';
        const placeholder = 'Enter your email';
        const className = 'email-input';
        const id = 'emailInput';
        const inputGenerator = new InputGenerator(type, placeholder, className, id);
        const inputContainer = inputGenerator.getInputContainer();
        const input = inputContainer.querySelector('input');
        expect(input).toBeDefined();
        expect(input?.type).toBe(type);
        expect(input?.placeholder).toBe(placeholder);
        expect(input?.id).toBe(id);
    });

    it('should create an input of type text with the specified placeholder, class name, and id, and append it to a container element', () => {
        const container = document.createElement('div');
        const inputGenerator = new InputGenerator('text', 'Enter text', 'input-container', 'input-id');
        const inputContainer = inputGenerator.getInputContainer();
        container.appendChild(inputContainer);
        expect(inputContainer.children.length).toBe(2);
        const input = inputContainer.querySelector('input');
        expect(input).not.toBeNull();
        expect(input?.type).toBe('text');
        expect(input?.placeholder).toBe('Enter text');
        expect(input?.id).toBe('input-id');
    });
});

describe('PasswordChange', () => {
    const model = new Model();

    it('should not trigger any action when "Save new password" button is clicked without entering any input', () => {
        const placeholderCurrentPass = 'Current Password';
        const placeholderRepeatPass = 'New Password';
        const className = 'password-input';
        const buttonText = 'Save new password';
        const version = 1;
        const controller = new Controller(model);
        const passwordChange = new PasswordChange(
            placeholderCurrentPass,
            placeholderRepeatPass,
            className,
            buttonText,
            version,
            controller
        );
        document.body.appendChild(passwordChange.getFormContainer());
        const button = document.querySelector('.password-input_btn') as HTMLButtonElement;
        button.click();
    });
});

describe('Error404', () => {
    it('should instantiate Error404 without errors', () => {
        expect(() => {
            // eslint-disable-next-line no-new
            new Error404();
        }).not.toThrow();
    });
    it('should return an HTMLElement without errors when calling getLayout()', () => {
        const error404 = new Error404();
        const layout = error404.getLayout();
        expect(layout).toBeInstanceOf(HTMLElement);
    });
    it('should return an HTMLElement with the correct text content when getLayout() is called', () => {
        const error404 = new Error404();
        const layout = error404.getLayout();
        expect(layout.textContent).toBe('PAGE NOT FOUND');
    });
    it('should have correct class names and structure when initialized', () => {
        const error404 = new Error404();
        const layout = error404.getLayout();
        expect(layout.classList.contains('error404')).toBe(true);
        const container = layout.querySelector('.error404__container');
        expect(container).not.toBeNull();
        const text = layout.querySelector('.error404__text');
        expect(text).not.toBeNull();
        expect(text?.textContent).toBe('PAGE NOT FOUND');
    });
    it('should create all necessary HTMLElements without errors', () => {
        const error404 = new Error404();
        const layout = error404.getLayout();
        expect(layout).toBeDefined();
        expect(layout.tagName).toBe('SECTION');
        expect(layout.classList.contains('error404')).toBe(true);
        const container = layout.querySelector('.error404__container');
        expect(container).toBeDefined();
        const text = container?.querySelector('.error404__text');
        expect(text).toBeDefined();
        expect(text?.textContent).toBe('PAGE NOT FOUND');
    });
    it('should append all necessary HTMLElements in the correct order without errors', () => {
        const error404 = new Error404();
        const layout = error404.getLayout();
        expect(layout.tagName).toBe('SECTION');
        expect(layout.classList.contains('error404')).toBe(true);
        const container = layout.querySelector('.error404__container');
        expect(container).not.toBeNull();
        const text = container?.querySelector('.error404__text');
        expect(text).not.toBeNull();
        expect(text?.textContent).toBe('PAGE NOT FOUND');
    });
    it('should have correct CSS styles applied when instantiated', () => {
        const error404 = new Error404();
        const layout = error404.getLayout();
        expect(layout.classList.contains('error404')).toBe(true);
        expect(layout.querySelector('.error404__container')).toBeTruthy();
        expect(layout.querySelector('.error404__text')).toBeTruthy();
        expect(layout.querySelector('.error404__text')?.textContent).toBe('PAGE NOT FOUND');
    });
});

describe('Contact', () => {
    it('should instantiate Contact class without errors', () => {
        expect(() => new Contact()).not.toThrow();
    });
    it("should return an HTMLElement with class 'about' and text content 'Contact Page' when getLayout is called", () => {
        const contact = new Contact();
        const layout = contact.getLayout();
        expect(layout.classList.contains('about')).toBe(true);
        expect(layout.textContent).toBe('Contact Page');
    });

    it('should create an HTMLElement with the correct class and text content', () => {
        const contact = new Contact();
        const layout = contact.getLayout();
        expect(layout.tagName).toBe('SECTION');
        expect(layout.classList.contains('about')).toBe(true);
        expect(layout.textContent).toBe('Contact Page');
    });
    it("should create an HTMLElement with the class 'about' and the text content 'Contact Us' when called", () => {
        const contact = new Contact();
        const layout = contact.getLayout();
        expect(layout.tagName).toBe('SECTION');
        expect(layout.classList.contains('about')).toBe(true);
        expect(layout.textContent).toBe('Contact Page');
    });

    it('should create an HTMLElement with the correct class and text content', () => {
        const contact = new Contact();
        const layout = contact.getLayout();
        expect(layout.tagName).toBe('SECTION');
        expect(layout.classList.contains('about')).toBe(true);
        expect(layout.textContent).toBe('Contact Page');
    });
});
