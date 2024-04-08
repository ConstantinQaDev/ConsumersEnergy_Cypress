///<reference types = "Cypress"/>

describe("sanity test for tabs on the main page", () => {
  beforeEach("should naviage to home page", () => {
    cy.visit("/");
    cy.url().should("eq", "https://consumersenergymanagement.ca/");
  });

  it("should naviage to About page", () => {
    cy.contains("About").should("be.visible");
    cy.contains("About").click();
    cy.url().should("contain", "about-us/");
    cy.get("h1").should("contain", "About Consumers Energy Management Inc.");
  });

  it("should naviage to Products page", () => {
    cy.contains("Products").should("be.visible");
    cy.contains("Products").click();
    cy.url().should("contain", "products/");
    cy.get("h1").should("contain", "Products");
  });

  it("should naviage to Services page", () => {
    cy.contains("Services").should("be.visible");
    cy.contains("Services").click();
    cy.url().should("contain", "services/");
    cy.get("h1").should("contain", "Services");
  });

  it("should naviage to Tools page", () => {
    cy.contains("Tools").should("be.visible");
    cy.contains("Tools").click();
    cy.url().should("contain", "tools-resources/");
    cy.get("h1").should("contain", "Tools & Resources");
  });

  it("should naviage to Promotions page", () => {
    cy.contains("Promotions").should("be.visible");
    cy.contains("Promotions").click();
    cy.url().should("contain", "promotions/");
    cy.get("h1").should("contain", "Promotions");
  });

  //TODO: prettyPhoto is not a function Error
  it("should naviage to Careers page", () => {
    const searchCareerBox = ".orig";
    const searchInputBox = ".autocomplete";

    cy.contains("Careers").should("be.visible");
    cy.contains("Careers").click();
    cy.url()
      .should("contain", "careers/")
      .then(() => {
        cy.get(searchInputBox).should("exist");
        cy.get(searchCareerBox)
          .invoke("val", "job")
          .trigger("change", { force: true });
        cy.get("h1").should("contain", "Careers");
      });
  });

  it("should naviage to Blog page", () => {
    cy.contains("Blog").should("be.visible");
    cy.contains("Blog").click();
    cy.url().should("contain", "blog/");
    cy.get("h1").should("contain", "Blog");
  });

  it("should naviage to FAQs page", () => {
    cy.contains("FAQs").should("be.visible");
    cy.contains("FAQs").click();
    cy.url().should("contain", "faq/");
    cy.get("h1").should("contain", "Frequently Asked Questions");
  });

  it("should naviage to Contact page", () => {
    cy.contains("Contact").should("be.visible");
    cy.contains("Contact").click();
    cy.url().should("contain", "contact-us/");
    cy.get("h1").should("contain", "Contact Us");
  });
});
