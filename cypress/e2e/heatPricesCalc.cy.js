///<reference types = "Cypress"/>

import {currentHeating} from "../fixtures/currentHeatingSystem.json";
import {newHeating} from "../fixtures/newHeatingSystem.json";

describe("Saving calculators - locations test", () => {

  const selectStories = 'select[name="stories"]';
  const selectSqF = 'select[name="squarefeet"]';
  const homeAge = 'input[name="houseage"]';

  beforeEach("should navigate to calculators page", () => {
    cy.visit("savings-calculator/");
    cy.url().should(
      "eq",
      "https://consumersenergymanagement.ca/savings-calculator/"
    );
    cy.contains("Savings Calculator").click();
  });

  it("should verify all fields in Step 1 Tell Us About Your Home", () => {
    cy.get(selectStories).should("be.visible");
    cy.get(selectSqF).should("be.visible");
    cy.get(homeAge).should("be.visible");
  });

  it("should populate rendom Provice and City", () => {
    cy.get('select[name="nastates"]').select("Alberta");
    cy.get('select[name="stage2"]')
      .find("option")
      .should("have.length.greaterThan", 2);
    cy.get('select[name="stage2"]').select(1);

    cy.get('select[name="stories').select(2);
    cy.get('select[name="squarefeet"]').select(2);
    cy.get('input[name="houseage"]').type(10, { force: true });

    let currentHeatingCost = "$0.00";
    let newHeatingCost = "$0.00";
    let annualSavings = "$0.00";
    let totalSavings = "$0.00";
    let total10YearsSavings = "$0.00";

    currentHeating.forEach((heater) => {
      cy.get("select#heattype").select(heater);
      cy.get("select#heattype").should("have.value", heater);

      cy.get("div#CHC").then(($el) => {
        const text = $el.text();

        expect(text).to.not.equal(currentHeatingCost);
        currentHeatingCost = text;
      });

      newHeating.forEach((newHeater) => {
        if (
          heater === newHeater ||
          (newHeater === "bNaturalGas" && heater === "aNaturalGas")
        ) {
        } else {
          cy.get("select[name='heatingtype']").select(newHeater);
          cy.get("select[name='heatingtype']").should("have.value", newHeater);
          cy.get("div#NHC").then(($el) => {
            const text = $el.text();
            expect(text).to.not.equal(newHeatingCost);
            newHeatingCost = text;
          });

          cy.get("div#NHC").then(($el) => {
            const text = $el.text();
            expect(text).to.not.equal("");
            expect(text).to.not.equal("$0.00");
            expect(text).to.not.equal(annualSavings);
            annualSavings = text;
          });

          cy.get("div#VTAS").then(($el) => {
            const text = $el.text();
            expect(text).to.not.equal("");
            expect(text).to.not.equal("$0.00");
            expect(text).to.not.equal(totalSavings);
            totalSavings = text;
          });

          cy.get("div#VTAS").then(($el) => {
            const text = $el.text();
            expect(text).to.not.equal("");
            expect(text).to.not.equal("$0.00");
            expect(text).to.not.equal(total10YearsSavings);
            total10YearsSavings = text;
          });
        }
      });
    });
  });
});
