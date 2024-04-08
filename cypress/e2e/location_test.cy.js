///<reference types = "Cypress"/>

import {provinces} from "../fixtures/canadian_provinces.json";

describe("Saving calculators - locations test", () => {

  beforeEach("should navigate to calculators page", () => {
    cy.visit("savings-calculator/");
    cy.url().should(
      "eq",
      "https://consumersenergymanagement.ca/savings-calculator/"
    );
    cy.contains("Savings Calculator").click();
  });

  it("should select all the Canadian provinces from dropdown", () => {

    provinces.forEach((province) => {
      let provinceValue = province;
      //TODO: "British Columbia", //TODO: Inconsistancy Bug => write a ticket.
      if (province.includes(" ") && province != "British Columbia") {
        let space = province.indexOf(" ");
        provinceValue =
          province.substring(0, space) + province.substring(space + 1);
      }
      console.log(province);
      console.log(provinceValue);
    
      cy.get('p>select[name="nastates"][class="Slcst"]').select(provinceValue);
      cy.get('select[name="nastates"] option').contains(province).should("be.visible");
      cy.get('p>select[name="nastates"][class="Slcst"]').should("have.value",provinceValue);

      const canadianCity = 'select[name="stage2"]';
      cy.get(canadianCity).find('option').should('have.length.greaterThan', 2)
      cy.get(canadianCity).select(1);
    });
  });
});

