/**
 * @jest-environment jsdom
 */
import Main from '../components/view/main';
import Header from '../components/view/header';

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

    it('should set active link and update UI when clicking on a nav link', () => {
        const header = new Header();
        const path = '/shop';
        const navLink = header.getLayout().querySelector('.header__shop a') as HTMLAnchorElement;
        navLink.click();
        const activeLink = header.getLayout().querySelector('.active');
        expect(activeLink).toBeDefined();
        expect(activeLink?.getAttribute('href')).toBe(path);
    });
});
