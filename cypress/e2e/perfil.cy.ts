describe('Prueba E2E - Navegacion a Perfil', () => {
    it('Realiza el flujo de iniciar sesion y navegar a la ventana de perfil', () => {

        cy.visit('/login');
        cy.wait(1000);

        cy.get('ion-input[formControlName="usuario_Correo"]').type('prueba1@gmail.com');

        cy.get('ion-input[formControlName="usuario_Password"]').type('prueba1');
        cy.wait(1000);

        cy.get('ion-button[type="submit"]').click();
        cy.wait(2000);
        
        cy.get('ion-tab-button[tab="info-usuario"]').click();
        cy.wait(2000);

        cy.contains('ion-button', 'Cerrar sesión').click();

    });
});