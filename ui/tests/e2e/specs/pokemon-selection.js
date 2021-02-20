describe('Pokemon Selection', () => {
  it('Select up to 6 pokemons', () => {
    cy.createPlayer()
    cy.url().should('match', /pokemon-selection/)

    for (let i = 1; i <= 6; i++) {
      cy.get(`ul > :nth-child(${i})`).click()
      cy.wait(300)
    }

    cy.get('.pokemon-sprite').should('have.length', 6)
    cy.get('[name="btn-next"]').click()
    cy.url().should('match', /player\/[\w\d]+$/)
  })
})
