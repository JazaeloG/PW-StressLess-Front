describe('Prueba E2E - Navegación a Chat', () => {
    it('Realiza el flujo de iniciar sesion y navegar a la ventana de Chat', () => {

        cy.visit('/login');
        cy.wait(1000);

        cy.get('ion-input[formControlName="usuario_Correo"]').type('prueba1@gmail.com');

        cy.get('ion-input[formControlName="usuario_Password"]').type('prueba1');
        cy.wait(1000);

        cy.get('ion-button[type="submit"]').click();
        cy.wait(2000);
        
        cy.get('ion-tab-button[tab="chat"]').click();
        cy.wait(2000);

    });
});