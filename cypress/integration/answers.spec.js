import { startGame, correctAnswer, incorrectAnswer } from "../support";
describe("Answers", () => {
  beforeEach(() => cy.visit("/"));
  
  it("says the user is correct when they answer correctly", () => {
    startGame("html");
    cy.get("#input-answer").type(correctAnswer);
    cy.get("#guess").click();
    cy.get("#answer-type").invoke("text").should("equal", "CORRECT!");

    cy.get("#continue").click();
    cy.get("#player-1-block-1")
      .should("have.attr", "style")
      .and("contain", "background-image")
      .and("contain", "background-size");
  });

  it("says the user is incorrect when they answer incorrectly", () => {
    startGame("html");
    cy.get("#input-answer").type(incorrectAnswer);
    cy.get("#guess").click();
    cy.get("#answer-type").invoke("text").should("equal", "INCORRECT");
  });
});
