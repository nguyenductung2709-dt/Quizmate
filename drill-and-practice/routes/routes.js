import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionsController from "./controllers/questionsController.js";
import * as optionController from "./controllers/optionController.js";
import * as quizController from "./controllers/quizController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizApi from "./apis/quizApi.js";


const router = new Router();

router.get("/", mainController.showMain);
router.get("/topics", topicController.listTopics);
router.post("/topics", topicController.addTopics);
router.post("/topics/:id/delete", topicController.deleteTopics);
router.get("/topics/:id", questionsController.listQuestions);
router.post("/topics/:id/questions", questionsController.addQuestions);
router.get("/topics/:id/questions/:qId", optionController.listQuestionAndOption);
router.post("/topics/:id/questions/:qId/options", optionController.addOptions);
router.post("/topics/:tId/questions/:qId/options/:oId/delete", optionController.deleteOption);
router.post("/topics/:tId/questions/:qId/delete", optionController.deleteQuestion);
router.get("/quiz", quizController.listTopics);
router.get("/quiz/:tId", quizController.listQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.listQuestionAndOption);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.answerQuestion);
router.get("/quiz/:tId/questions/:qId/correct", quizController.correct);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.incorrect);
router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);
router.get("/api/questions/random", quizApi.listRandomQuestion);
router.post("/api/questions/answer", quizApi.handleAnswers);

export { router };
