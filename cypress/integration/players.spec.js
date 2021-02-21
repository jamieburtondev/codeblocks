import {
  startGame,
  correctAnswer,
} from "../support";
describe("Players", () => {
  beforeEach(() => cy.visit("/"));

  it("checks that solo starts correctly", () => {
    startGame();

    cy.get("#turn").invoke("text").should("equal", "PRACTICE");
  });

  it("checks that versus starts correctly", () => {
    startGame("html", true);

    cy.get("#turn").invoke("text").should("equal", "PLAYER 1");
    cy.get("#input-answer").type(correctAnswer);
    cy.get("#guess").click();
    cy.get("#continue").click();
    cy.get("#turn").invoke("text").should("equal", "PLAYER 2");
  });
});
