class QuestionSet {
  constructor({ question, answer, type, description, link, about }) {
    this.question = question;
    this.answer = answer;
    this.type = type;
    this.description = description;
    this.link = link;
    this.about = about;
  }
}

module.exports = QuestionSet;
