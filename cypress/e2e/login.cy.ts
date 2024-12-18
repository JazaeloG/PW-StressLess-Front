describe('Prueba E2E - Inicio de Sesión de usuario', () => {
    it('Realiza el flujo de iniciar sesion correctamente', () => {

        cy.visit('/login');
        cy.wait(1000);

        cy.get('ion-input[formControlName="usuario_Correo"]').type('prueba1@gmail.com');

        cy.get('ion-input[formControlName="usuario_Password"]').type('prueba1');

        cy.get('ion-button[type="submit"]').click();

    });
});