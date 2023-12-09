import * as quizService from "../../services/quizService.js";

const listTopics = async({render}) => {
    const topicsData = {
      topics: await quizService.listTopics(),
    };
    render("quiz.eta", topicsData);
};

const listQuestion = async({render, params, response}) => {
    const question = await quizService.listQuestion(params.tId);
    if (question) {
    const redirectURL = `/quiz/${question.topic_id}/questions/${question.id}`;
    response.redirect(redirectURL);
    }
    else {
    render("quizwithoutquestion.eta");
    }
};

const listQuestionAndOption = async({render, params}) => {
    const question = await quizService.listQuestionByQuestionId(params.qId);
    render("questionandoptionsforquiz.eta", {
        question: question,
        options: await quizService.listOptions(params.qId),
    });
};

const answerQuestion = async({render, params, response, user}) => {
    const question = await quizService.listQuestionByQuestionId(params.qId);
    await quizService.answerQuestion(user.id, params.qId, params.oId);
    const isCorrect = await quizService.checkAnswer(params.oId);
    if (isCorrect.is_correct === true) {
        const redirectURL = `/quiz/${question.topic_id}/questions/${question.id}/correct`;
        response.redirect(redirectURL);
    } 
    else {
        const redirectURL = `/quiz/${question.topic_id}/questions/${question.id}/incorrect`;
        response.redirect(redirectURL);
    }
}

const correct = async({render, params}) => {
    render("correct.eta", {
        question: await quizService.listQuestion(params.tId),
    })
}

const incorrect = async({render, params}) => {
    render("incorrect.eta", {
        question: await quizService.listQuestion(params.tId),
        correct_answer: await quizService.correctAnswer(),
    })
}

export {
    listTopics,
    listQuestion,
    listQuestionAndOption,
    answerQuestion,
    correct,
    incorrect,
};


