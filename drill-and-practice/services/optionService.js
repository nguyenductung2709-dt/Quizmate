import { sql } from "../database/database.js";

const listOptions = async(question_id) => {
    const rows = await sql `SELECT * FROM question_answer_options WHERE question_id = ${question_id}`;
    return rows;
};

const addOptions = async(question_id, option_text, is_correct) => {
    await sql `INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${question_id}, ${option_text}, ${is_correct})`;
};

const deleteOption = async(option_id) => {
    await sql`DELETE FROM question_answers WHERE question_answer_option_id IN (SELECT id FROM question_answer_options WHERE id = ${option_id})`;
    await sql `DELETE FROM question_answer_options WHERE id = ${option_id}`;
};

export {
    listOptions,
    addOptions,
    deleteOption
}
