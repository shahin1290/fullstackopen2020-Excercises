describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user1 = {
      name: 'Shahin Patowary',
      username: 'shahin',
      password: 'password',
    }

    const user2 = {
      name: 'Fawziyha Begum',
      username: 'fawziyha',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user1)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'shahin', password: 'password' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Canonical string reduction')
      cy.get('#author').type('Edsger W. Dijkstra')
      cy.get('#url').type(
        'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
      )
      cy.get('#create-button').click()

      cy.contains('Canonical string reduction')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog on cypress',
          author: 'kona',
          blogUrl: 'http://www.test.com',
        })
      })

      it('user can like the blog', function () {
        cy.contains('another blog on cypress')
        cy.contains('show').click()
        cy.contains('like').click()

        cy.contains('likes 1')
      })

      it('user who created the blog can delete it', function () {
        cy.contains('another blog on cypress')
        cy.contains('show').click()
        cy.contains('remove').click()

        cy.get('html').should('not.contain', 'another blog on cypress')
      })

      it('user other than the creator of the blog can not delete it', function () {
        cy.contains('logout').click()
        cy.login({ username: 'fawziyha', password: 'password' })
        cy.contains('another blog on cypress')
        cy.contains('show').click()
        cy.get('html').should('not.contain', 'remove')
      })
    })
  })
})
