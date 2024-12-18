describe('Prueba E2E - Realizar Test', () => {
    it('Realiza el flujo de iniciar sesion y realizar el test correctamente', () => {

        cy.visit('/login');
        cy.wait(1000);

        cy.get('ion-input[formControlName="usuario_Correo"]').type('prueba1@gmail.com');

        cy.get('ion-input[formControlName="usuario_Password"]').type('prueba1');
        cy.wait(1000);

        cy.get('ion-button[type="submit"]').click();
        cy.wait(3000);

        cy.get('ion-button.answer-button').click();
        cy.wait(3000);

        cy.get('.action-button').find('ion-button.custom-button-1').click();
        cy.wait(3000);
        
    });
});