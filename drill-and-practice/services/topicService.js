import { sql } from "../database/database.js";

const listTopics = async() => {
    const rows = await sql `SELECT * FROM topics ORDER BY name`;
    return rows;
};

const addTopics = async (user_id, name) => {
    await sql`INSERT INTO topics (user_id, name) VALUES (${user_id}, ${name})`;
};

const deleteTopics = async (id) => {
    await sql`DELETE FROM question_answers WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${id})`;
    await sql`DELETE FROM question_answer_options WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${id})`;
    await sql`DELETE FROM questions WHERE topic_id = ${id}`;
    await sql`DELETE FROM topics WHERE id = ${id}`;
};

export {
    listTopics,
    addTopics,
    deleteTopics,
}