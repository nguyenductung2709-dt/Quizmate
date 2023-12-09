import * as questionsService from "../../services/questionsService.js";
import { validasaur } from "../../deps.js";

const questionsValidationRules = {
  question_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionsData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    question_text: params.get("question_text"),
  }
};

const addQuestions = async ({ request, response, render, user, params }) => {
  const questionsData = await getQuestionsData(request);
  const [passes, errors] = await validasaur.validate(
    questionsData,
    questionsValidationRules,
  );

  if (!passes) {
    console.log(errors);
    questionsData.validationErrors = errors;
    questionsData.questions = await questionsService.listQuestions(params.id),
    render("questions.eta", questionsData);
  }
  else {
    await questionsService.addQuestions(user.id, params.id, questionsData.question_text);
    const redirectURL = `/topics/${params.id}`;
    response.redirect(redirectURL);
  }
};

const listQuestions = async({render, params}) => {
  render("questions.eta", {
    questions: await questionsService.listQuestions(params.id),
    id: params.id,
  });
}


export {
  listQuestions,
  getQuestionsData,
  addQuestions,
};