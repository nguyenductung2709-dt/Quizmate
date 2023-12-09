import * as optionService from "../../services/optionService.js";
import * as questionsService from "../../services/questionsService.js";
import { validasaur } from "../../deps.js";

const optionValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)],
  };

const getOptionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
      option_text: params.get("option_text"),
    }
  };
  
const addOptions = async ({ request, response, render, user, params }) => {
    const body = request.body({ type: "form" });
    const formData = await body.value;
    const optionData = await getOptionData(request);
    const [passes, errors] = await validasaur.validate(
      optionData,
      optionValidationRules,
    );
        
    if (!passes) {
      console.log(errors);
      optionData.validationErrors = errors;
      optionData.question = await questionsService.listQuestion(params.qId),
      optionData.options = await optionService.listOptions(params.qId),
      render("question.eta", optionData);
    }
    else {
      if (formData.get("is_correct")) {
        var isCorrect = true;
      }
      else {
        isCorrect = false;
      }
      await optionService.addOptions(params.qId, optionData.option_text, isCorrect);
      const redirectURL = `/topics/${params.id}/questions/${params.qId}`;
      response.redirect(redirectURL);
    }
  };

const listQuestionAndOption = async({render, params}) => {
  render("question.eta", {
    question: await questionsService.listQuestion(params.qId),
    options: await optionService.listOptions(params.qId),
  });
}

const deleteOption = async({params, response}) => {
  await optionService.deleteOption(params.oId);
  const redirectURL = `/topics/${params.tId}/questions/${params.qId}`;
  response.redirect(redirectURL);
};

const deleteQuestion = async({params, response}) => {
  await questionsService.deleteQuestion(params.qId);
  const redirectURL = `/topics/${params.tId}`;
  response.redirect(redirectURL); 
};

export {
    addOptions,
    listQuestionAndOption,
    deleteOption,
    deleteQuestion,
};