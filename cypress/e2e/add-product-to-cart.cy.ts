describe("add product to cart", () => {
  it("should be able to navigate to the product page and add it to the cart", () => {
    cy.visit("http://localhost:3000");

    cy.get("a[href^='/product']").first().click();

    cy.location("pathname").should("match", /\/product\/.+/);
    cy.contains("Adicionar ao carrinho").should("be.visible");
    cy.contains("Adicionar ao carrinho").click();

    cy.contains("Cart (1)").should("be.visible");
  });

  it("should not count duplicated products on cart", () => {
    cy.visit("http://localhost:3000");

    cy.get("a[href^='/product']").first().click();

    cy.location("pathname").should("match", /\/product\/.+/);
    cy.contains("Adicionar ao carrinho").should("be.visible");
    cy.contains("Adicionar ao carrinho").click();
    cy.contains("Adicionar ao carrinho").click();

    cy.contains("Cart (1)").should("be.visible");
  });

  it("should be able to search for a product and add it to the cart", () => {
    cy.visit("http://localhost:3000");

    cy.get("input[name='q']").type("camiseta").parent().submit();

    cy.wait(1000);

    cy.get("a[href^='/product']").first().click();
    cy.location("pathname").should("match", /\/product\/.+/);
    cy.contains("Adicionar ao carrinho").should("be.visible");
    cy.contains("Adicionar ao carrinho").click();
    cy.contains("Cart (1)").should("be.visible");
  });
});
