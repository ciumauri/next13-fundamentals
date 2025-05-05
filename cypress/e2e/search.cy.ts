describe("add product to cart", () => {
  it("should be able to search for products", () => {
    cy.visit("/");

    cy.get("input[name='q']").type("camiseta").parent().submit();

    cy.wait(1000);

    cy.location("pathname").should("match", /\/search/);
    cy.location("search").should("match", /q=camiseta/);

    cy.get("a[href^='/product']").should("have.length.greaterThan", 0);
  });

  it("should not be able to visit search page withouth a search query", () => {
    cy.on("uncaught:exception", () => {
      return false;
    });

    cy.visit("/search");
    cy.location("pathname").should("equal", "/");
  });
});
