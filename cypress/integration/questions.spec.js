import { startGame, languages } from "../support";
describe("Questions", () => {
  beforeEach(() => cy.visit("/"));

  languages.forEach((language) => {
    it(`checks that a question for ${language} is shown`, () => {
      startGame(language);

      cy.get("#question-type")
        .invoke("text")
        .should("equal", language.toUpperCase());

      cy.visit("/");
    });
  });
});
