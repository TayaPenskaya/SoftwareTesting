import {isValid} from "../components/Register";

describe('Unit tests for checking password', () => {
    test('bad small password', () => {
        expect(isValid('12')).toBe(false);
    });

    test('valid password', () => {
        expect(isValid('taya12')).toBe(true);
    });

    test('must be one digit in password', () => {
        expect(isValid('taya')).toBe(false);
    });

    test('must be one letter in password', () => {
        expect(isValid('1234')).toBe(false);
    });
});