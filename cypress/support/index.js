export const correctAnswer = "CHEAT";
export const incorrectAnswer = 'Hello, world!';

export const languages = ["html", "css", "javascript"];

export const startGame = (language = "html", versus = false) => {
  cy.get(`input[name="select-questions"][value="${language}"]`).click();

  if (versus) cy.get('input[name="select-players"][value="versus"]').click();

  cy.get("#start").click();
};
