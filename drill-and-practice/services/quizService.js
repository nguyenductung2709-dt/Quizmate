import { sql } from "../database/database.js";

const listTopics = async() => {
    const rows = await sql `SELECT * FROM topics ORDER BY name`;
    return rows;
};

const listQuestion = async (topic_id) => {
    const question = await sql`SELECT * FROM questions WHERE topic_id = ${topic_id} ORDER BY RANDOM()`;
    return question[0];
}

const listQuestionByQuestionId = async (question_id) => {
    const question = await sql `SELECT * FROM questions WHERE id = ${question_id}`;
    return question[0];
}

const listRandomQuestion = async() => {
    const question = await sql`SELECT * FROM questions ORDER BY RANDOM()`;
    return question[0];
}

const listOptions = async(question_id) => {
    const rows = await sql `SELECT * FROM question_answer_options WHERE question_id = ${question_id}`;
    return rows;
};
const listOptionsForAPI = async(question_id) => {
    const rows = await sql `SELECT id, option_text FROM question_answer_options WHERE question_id = ${question_id}`;
    return rows;
};

const answerQuestion = async(user_id, question_id, option_id) => {
    await sql `INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES (${user_id}, ${question_id}, ${option_id})`;
};

const checkAnswer = async(option_id) => {
    const isCorrect = await sql `SELECT is_correct FROM question_answer_options WHERE id = ${option_id}`;
    return isCorrect[0];
}

const correctAnswer = async () => {
    const correct_answer = await sql `
        SELECT * FROM question_answer_options WHERE is_correct = true LIMIT 1
    `;
    return correct_answer[0];
};

export {
    listTopics,
    listQuestion,
    listOptions,
    listQuestionByQuestionId,
    listRandomQuestion,
    listOptionsForAPI,
    answerQuestion,
    checkAnswer,
    correctAnswer,
};