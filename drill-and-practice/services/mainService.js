import { sql } from "../database/database.js";

const numberOfQuestions = async () => {
    const result = await sql`SELECT COUNT(*) AS total_questions FROM questions`;
    return result[0].total_questions;
};

const numberOfQuestionAnswers = async () => {
    const result = await sql`SELECT COUNT(*) AS total_question_answers FROM question_answers`;
    return result[0].total_question_answers;
};

export {
    numberOfQuestions,
    numberOfQuestionAnswers,
};
