describe("Home page", () => {
  beforeEach(() => {
    // Assuming your home page URL is "/"
    cy.login("test@gmail.com", "test");
    cy.visit("/");
  });

  it("Show banner", () => {
    cy.get(".banner").should("have.be.visible");
    cy.get(".banner").find("button").eq(0).should("have.text", "Review");
    cy.get(".banner").find("button").eq(1).should("have.text", "My List");
  });

  it("should have searchbar", () => {
    cy.get("#search-and-account").should("have.be.visible");
  });

  it("should link moviecards to moviepages", () => {
    cy.get(".my-carousel")
      .eq(0)
      .find(".movie-card")
      .eq(0)
      .should("have.be.visible");
    cy.get(".my-carousel").eq(0).find(".movie-card").eq(0).find("a").click();
    cy.get(".movie-page").should("have.be.visible");
  });
});
