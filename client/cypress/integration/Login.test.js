describe('The Login Page', () => {
    beforeEach(() => {
        // reset and seed the database prior to every test
        cy.exec('npm start')
    });

    it('successfully loads', () => {
        cy.visit('/')
    });

    it('successfully login', () => {
        cy.visit('/');
        cy.get('#login-id')
            .invoke('attr', 'value', 'taya')
            .trigger('change');
        cy.get('#password-id')
            .invoke('attr', 'value', 'taya')
            .trigger('change');
        cy.get('#submit-id').click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/tables')
        });
    });

    it('fail login', () => {
        cy.visit('/');
        cy.get('#login-id')
            .invoke('attr', 'value', 'taya')
            .trigger('change');
        cy.get('#password-id')
            .invoke('attr', 'value', 'loh')
            .trigger('change');
        cy.get('#submit-id').click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/error')
        });
    });

    it('go to registration', () => {
        cy.visit('/');
        cy.get('#register-id').click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/users/register')
        });
    });

});