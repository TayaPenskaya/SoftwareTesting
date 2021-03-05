let playwright = require('playwright');

const delay = (ms) => new Promise(res => setTimeout(res, ms));

describe('Playwright tests', function () {
    let browser;
    let page;

    beforeEach(async () => {
        browser = await playwright['chromium'].launch();
        page = await browser.newPage();
    });

    afterEach(async () => {
        await browser.close();
    });

    it('successfully loads', async () => {
        await page.goto('http://localhost:3000');
    });

    it('successfully login', async () => {
        await page.goto('http://localhost:3000');
        await page.fill('#login-id', 'taya');
        await page.fill('#password-id', 'taya');
        await page.click('#submit-id');
        await delay(100);
        expect(await page.url()).toBe('http://localhost:3000/tables');
    });

    it('login fail', async () => {
        await page.goto('http://localhost:3000');
        await page.fill('#login-id', 'taya');
        await page.fill('#password-id', 'loh');
        await page.click('#submit-id');
        await delay(100);
        expect(await page.url()).toBe('http://localhost:3000/error');
    });

    it('registration after login page', async () => {
        await page.goto('http://localhost:3000');
        await page.click('#register-id');
        await delay(100);
        expect(await page.url()).toBe('http://localhost:3000/users/register');
    });
});