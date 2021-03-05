describe('The Registration Page', () => {
    beforeEach(() => {
        // reset and seed the database prior to every test
        cy.exec('npm start')
    });

    it('successfully loads', () => {
        cy.visit('/users/register')
    });

    it('successfully register', () => {
        const log = 'kukuu';
        const pass = 'kuku1';
        cy.visit('/users/register');
        cy.get('#username-id')
            .invoke('attr', 'value', log)
            .trigger('change');
        cy.get('#password-id')
            .invoke('attr', 'value', pass)
            .trigger('change');
        cy.get('#submit-id').click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/users/login')
        });
        cy.get('#login-id')
            .invoke('attr', 'value', log)
            .trigger('change');
        cy.get('#password-id')
            .invoke('attr', 'value', pass)
            .trigger('change');
        cy.get('#submit-id').click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/tables')
        });
    });

    it('fail register', () => {
        cy.visit('/users/register');
        cy.get('#username-id')
            .invoke('attr', 'value', 'kuku')
            .trigger('change');
        cy.get('#password-id')
            .invoke('attr', 'value', 'ku1')
            .trigger('change');
        cy.get('#submit-id').click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/error')
        });
    });

});