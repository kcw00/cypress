describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Chaewon Kim',
      username: 'chaewon',
      password: 'thisispw'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Made by React')
  })

  it('login form can be opened', function () {
    cy.contains('log in').click()
  })

  it('user can log in', function () {
    cy.contains('log in').click()
    cy.get('#username').type('chaewon')
    cy.get('#password').type('thisispw')
    cy.get('#login-button').click()

    cy.contains('Chaewon Kim logged in')
  })

  it.only('login fails with wrong password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('chaewon')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Chaewon Kim logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'chaewon', password: 'thisispw' })
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: true
        })
      })

      it('it can be made not important', function () {
        cy.contains('another note cypress')
          .contains('make not important')
          .click()
        cy.contains('another note cypress')
          .contains('make important')
      })
    })
  })
})