import Knex from 'knex';

export async function up(knex: Knex) { // quando eu falo que o meu tipo do knex é o Knex o TS já qual é o formato e eu ganho acesso a toda a inteligencia da IDE
    return knex.schema.createTable('points', table => {
        table.increments('id').primary(); //chave primária da tabela
        table.string('image').notNullable(); 
        table.string('name').notNullable(); 
        table.string('email').notNullable(); 
        table.string('whatsapp').notNullable(); 
        table.decimal('latitude').notNullable(); 
        table.decimal('longitude').notNullable(); 
        table.string('city').notNullable(); 
        table.string('uf', 2).notNullable(); 
    })
}; 

export async function down(knex: Knex) {
    return knex.schema.dropTable('points');
}; 