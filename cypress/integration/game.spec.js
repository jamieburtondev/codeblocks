import {
  startGame,
  languages,
  correctAnswer,
  incorrectAnswer,
} from "../support";
describe("Game", () => {
  beforeEach(() => cy.visit("http://localhost:8080/"));

  languages.forEach((language) => {
    it(`checks that a question for ${language} is shown`, () => {
      startGame(language);

      cy.get("#question-type")
        .invoke("text")
        .should("equal", language.toUpperCase());

      cy.visit("http://localhost:8080/");
    });
  });

  it("checks that solo starts correctly", () => {
    startGame();

    cy.get("#turn").invoke("text").should("equal", "PRACTICE");
  });

  it("checks that versus starts correctly", () => {
    startGame("html", true);

    cy.get("#turn").invoke("text").should("equal", "PLAYER 1");
    cy.get("#input-answer").type(incorrectAnswer);
    cy.get("#guess").click();
    cy.get("#continue").click();
    cy.get("#turn").invoke("text").should("equal", "PLAYER 2");
  });

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
