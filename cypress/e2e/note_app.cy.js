describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Chaewon Kim',
      username: 'chaewon',
      password: 'thisispw'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
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

  it('login fails with wrong password', function () {
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
    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.login({ username: 'chaewon', password: 'thisispw' })
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of notes can be made important', function () {
        cy.contains('second note')
          .contains('make important')
          .click()
        
        cy.contains('second note')
          .contains('make not important')
      })
  
    })
    })
  })