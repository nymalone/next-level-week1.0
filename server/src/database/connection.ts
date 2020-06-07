import knex from 'knex';
import path from 'path';  

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite') //arquivo que vou armazenar banco de dados.
    },
    useNullAsDefault: true,
});

export default connection; 