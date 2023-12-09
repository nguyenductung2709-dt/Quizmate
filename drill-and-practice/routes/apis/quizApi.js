import * as quizService from "../../services/quizService.js";

const listRandomQuestion = async ({ response }) => {
    const question = await quizService.listRandomQuestion();
    if (question) {
        const options = await quizService.listOptionsForAPI(question.id);
        const formattedOptions = options.map(option => ({
            optionId: option.id,
            optionText: option.option_text
        }));
        response.body = {
            questionId: question.id,
            questionText: question.question_text,
            answerOptions: formattedOptions
        };
    } else {
        response.body = {};
    }
};


const handleAnswers = async ({request, response}) => {
    const body = request.body({ type: "json" });
    const content = await body.value;
    const isCorrect = await quizService.checkAnswer(content.optionId);
    response.body = {
        correct: isCorrect.is_correct,
    }
}

export {
    listRandomQuestion,
    handleAnswers,
}