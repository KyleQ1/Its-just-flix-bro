describe("Movie page", () => {
  beforeEach(() => {
    cy.login("test@gmail.com", "test");
    cy.get(".movie-list").eq(0).find(".movie-card").eq(0).find("a").click();
    cy.get(".movie-page").should("have.be.visible");
  });

  it("should have title, desc...", () => {
    cy.get(".moviepage-details").should("have.be.visible");
    cy.get(".moviepage-details")
      .find(".moviepage-title")
      .should("have.be.visible");
    cy.get(".moviepage-details")
      .find(".moviepage-genre")
      .should("have.be.visible");
    cy.get(".moviepage-details")
      .find(".moviepage-description")
      .should("have.be.visible");
    cy.get(".moviepage-details")
      .find(".moviepage-release")
      .should("have.be.visible");
  });

  it("should have reviews", () => {
    cy.get(".movie-reviews").should("have.be.visible");
    cy.get(".movie-reviews")
      .find(".review-container")
      .eq(0)
      .find(".rating")
      .should("have.be.visible");
  });

  it("should submit a review", () => {
    cy.get(".review-form").find("#rating").find("button").eq(0).click();
    cy.get(".review-form")
      .find("#review-text")
      .find("textarea")
      .type("cypress test");
    cy.get(".review-form").find("#review-text").find("button").click();
    cy.get(".review-form").should("not.be.visible");
  });
});
