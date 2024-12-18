describe('Prueba E2E - Registro de usuario', () => {
  it('Realiza el flujo de registro correctamente', () => {
    
    cy.visit('/login'); 
    cy.wait(1000);

    cy.get('ion-button[routerLink="/registro"]').click();
    cy.wait(1000);

    cy.get('ion-input[formControlName="usuario_Nombre"] input').type('Krystian');
    cy.wait(1000);

    cy.get('ion-input[formControlName="usuario_Apellido"] input').type('Castro');
    cy.wait(1000);

    cy.get('ion-input[formControlName="usuario_Correo"] input').eq(1).type('prueba02@gmail.com');
    cy.wait(1000);

    cy.get('ion-select[formControlName="usuario_Sexo"]').click();
    cy.wait(1000);
    
    cy.get('.alert-radio-group button').contains('MASCULINO').click();
    cy.wait(1000);
    cy.get('ion-alert button').contains('OK').click();
    cy.wait(1000);

    cy.get('ion-input[formControlName="usuario_FechaNacimiento"] input').type('04/01/2003');
    cy.wait(1000);

    cy.get('ion-input[formControlName="usuario_Password"] input').eq(1).type('prueba01');
    cy.wait(1000);

    cy.get('ion-button.register-btn[type="submit"]').click();
    cy.wait(1000);

    cy.get('ion-alert button').contains('OK').click();
    cy.wait(1000);
  });
});
