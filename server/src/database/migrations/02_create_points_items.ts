import Knex from 'knex';

export async function up(knex: Knex) { // quando eu falo que o meu tipo do knex é o Knex o TS já qual é o formato e eu ganho acesso a toda a inteligencia da IDE
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary(); //chave primária da tabela

        table.integer('point_id') //crio uma chave estrangeira na tabela points...aqui eu estou referenciando as duas tabalas
        .notNullable()
        .references('id')
        .inTable('points'); 

        table.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('items'); 
    })
}; 

export async function down(knex: Knex) {
    return knex.schema.dropTable('point_items');
}; 