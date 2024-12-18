describe('Prueba E2E - Navegación Principal', () => {
    it('Realiza el flujo de iniciar sesion y navegacion principal de la App', () => {

        cy.visit('/login');
        cy.wait(1000);

        cy.get('ion-input[formControlName="usuario_Correo"]').type('prueba1@gmail.com');

        cy.get('ion-input[formControlName="usuario_Password"]').type('prueba1');
        cy.wait(1000);

        cy.get('ion-button[type="submit"]').click();
        cy.wait(2000);
        
        cy.get('ion-tab-button[tab="chat"]').click();
        cy.wait(2000);

        cy.get('ion-tab-button[tab="info-usuario"]').click();
        cy.wait(2000);

        cy.get('ion-tab-button[tab="home"]').click();
        cy.wait(2000);

    });
});