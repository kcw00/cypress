describe('Note app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Made by React')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  it('user can log in', function () {
    cy.contains('log in').click()
    cy.get('#username').type('chaewon')
    cy.get('#password').type('thisispw')
    cy.get('#login-button').click()

    cy.contains('Chaewon Kim logged in')
  })
})