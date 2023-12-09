import { sql } from "../database/database.js";

const listQuestions = async(topic_id) => {
    const rows = await sql `SELECT * FROM questions WHERE topic_id = ${topic_id}`;
    return rows;
};

const addQuestions = async(user_id, topic_id, question_text) => {
    await sql `INSERT INTO questions (user_id, topic_id, question_text) VALUES (${user_id}, ${topic_id}, ${question_text})`;
};

const listQuestion = async(question_id) => {
    const question = await sql `SELECT * FROM questions WHERE id = ${question_id}`;
    return question[0];
};

const deleteQuestion = async(question_id) => {
    await sql `DELETE FROM questions WHERE id = ${question_id}`;
};

export {
    listQuestion,
    listQuestions,
    addQuestions,
    deleteQuestion,
}