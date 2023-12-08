// Code from Real World App (RWA)
const randomEmail = Math.random().toString(36).substring(2, 15)
                  + Math.random().toString(36).substring(2, 15) 
                  + '@gmail.com'

describe('Signup/Login page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Should redirect us to the login page', () => {
    cy.url().should('include', '/login')
  })

  it('Should be able to continue to signin page', () => {
    cy.get('input').type('lol@gmail.com')
    cy.get('.login_getStarted').click()
    cy.get('h1').should('have.text', 'Sign In')
  })

  it('Show invalid email on signup', () => {
    cy.get('.login_getStarted').click()  
    cy.get('.signin').find('input').eq(0).type('abcdefg')
    cy.get('.signin').find('input').eq(1).type('test')
    cy.get('.signin').find('.signin_link').click()
    cy.get('.signin_error').should('have.text', 'Invalid email or password.')
  })

  it('Show invalid password on signup', () => {
    cy.get('.login_getStarted').click()  
    cy.get('.signin').find('input').eq(0).type('test@gmail.com')
    cy.get('.signin').find('input').eq(1).type('abc')
    cy.get('.signin').find('.signin_link').click()
    cy.get('.signin_error').should('have.text', 'Invalid email or password.')
  })

  it('Should be able to signup', () => {
    cy.get('.login_getStarted').click()    
    cy.get('.signin').find('input').eq(0).clear().type(randomEmail)
    cy.get('.signin').find('input').eq(1).clear().type('test')
    cy.get('.signin').find('.signin_link').click()
    cy.get('#navigational-bar').should('have.be.visible')
  })

  it('Show invalid email on login', () => {
    cy.get('.login_getStarted').click()  
    cy.get('.signin').find('input').eq(0).type('abcdefg')
    cy.get('.signin').find('input').eq(1).type('test')
    cy.get('.signin').find('.signin_link').click()
    cy.get('.signin_error').should('have.text', 'Invalid email or password.')
  })

  it('Show invalid password on login', () => {
    cy.get('.login_getStarted').click()  
    cy.get('.signin').find('input').eq(0).type(randomEmail)
    cy.get('.signin').find('input').eq(1).type('abc')
    cy.get('.signin').find('.signin_link').click()
    cy.get('.signin_error').should('have.text', 'Invalid email or password.')
  })
  
  it('Should be able to login', () => {
    cy.get('.login_getStarted').click()
    cy.get('.signin').find('input').eq(0).clear().type(randomEmail);
    cy.get('.signin').find('input').eq(1).clear().type('test')
    cy.get('.signin').find('button').eq(0).click()
    cy.get('#navigational-bar').should('have.be.visible')
  })

  it('login', () => {
    cy.login('test@gmail.com', 'test') 
  })
})