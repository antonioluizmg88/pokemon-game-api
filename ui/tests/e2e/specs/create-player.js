describe('Welcome screen', () => {
  it('Redirect new user to create player screen', () => {
    cy.visit('/')
    cy.url().should('match', /create-player/)
  })

  it('Create a new player', () => {
    cy.visit('/create-player')
    cy.get('[name="name"]').type('Test user')
    cy.get('[name="gender"]').select('X')
    cy.get('[name="age"]').type('22')
    cy.get('.button').click()
    cy.url().should('match', /pokemon-selection/)
  })
})
