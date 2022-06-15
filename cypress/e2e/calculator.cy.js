// https://docs.cypress.io/api/introduction/api.html
const totalShardsSelector = '#total-shards-display';

describe('Calculator Testing', () => {
    it('verifying page load', () => {
        cy.visit('/')
        cy.contains('h1', 'Enlightenment Shard Calculator')
    })

    it('test for initial state of total shards', () => {
        cy.visit('/')
        cy.get(totalShardsSelector)
            .should('have.text', '0')
    });

    it('should show correct total shards after clicking the max all button', () => {
        cy.visit('/')
        cy.get('#max_all_gates').click()
        cy.get(totalShardsSelector)
            .should('have.text', '770')
    });
    it('should show correct total shards after clicking the clear all button', () => {
        cy.visit('/')
        cy.get('#max_all_gates').click()
        cy.get('#clear_all_gates').click()
        cy.get(totalShardsSelector)
            .should('have.text', '0')
    })
    it('should show correct total count after setting the config to 2/0', () => {
        cy.visit('/')
        cy.get('#gateSelect1').select('2')
        cy.get(totalShardsSelector)
            .should('have.text', '15')
    })
    it('should show correct total shards after setting the config to 2/5/2/2/5/0', () => {
        cy.visit('/')
        cy.get('#gateSelect1').select('2')
        cy.get('#gateSelect2').select('5')
        cy.get('#gateSelect3').select('2')
        cy.get('#gateSelect4').select('2')
        cy.get('#gateSelect5').select('5')
        cy.get(totalShardsSelector)
            .should('have.text', '245')
    })
    it('should show correct total shards after setting the config to 2/5/2/2/5/0 and then changing the 2nd gate to 0', () => {
        cy.visit('/')
        cy.get('#gateSelect1').select('2')
        cy.get('#gateSelect2').select('5')
        cy.get('#gateSelect3').select('2')
        cy.get('#gateSelect4').select('2')
        cy.get('#gateSelect5').select('5')
        cy.get(totalShardsSelector)
            .should('have.text', '245')
        
        cy.get('#gateSelect2').select('0')
        cy.get(totalShardsSelector)
            .should('have.text', '15')
       
    })
    it('should correctly set previous gates to min steps when changing a later gate', () => {
        cy.visit('/')
        cy.get('#gateSelect5').select('5')
        cy.get(totalShardsSelector)
            .should('have.text', '160')
        
        cy.get('#gateSelect1 option:selected').should('have.text', '2')
        cy.get('#gateSelect2 option:selected').should('have.text', '2')
        cy.get('#gateSelect3 option:selected').should('have.text', '2')
        cy.get('#gateSelect4 option:selected').should('have.text', '2')
        cy.get('#gateSelect5 option:selected').should('have.text', '5')
        cy.get('#gateSelect6 option:selected').should('have.text', '0')
        cy.get('#gateSelect7 option:selected').should('have.text', '0')
    })
})
