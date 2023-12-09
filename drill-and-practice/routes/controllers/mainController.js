import * as mainService from "../../services/mainService.js";

const showMain = async({ render }) => {
  render("main.eta", {
    numberOfQuestions: await mainService.numberOfQuestions(),
    numberOfQuestionsAnswers: await mainService.numberOfQuestionAnswers(),
  });
};

export { showMain };


