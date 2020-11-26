describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Shahin Patowary',
      username: 'shahin',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('blogs')
  })

  it('login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('shahin')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Shahin Patowary logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('shahin')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.danger')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Shahin Patowary logged in')
    })
  })
})
