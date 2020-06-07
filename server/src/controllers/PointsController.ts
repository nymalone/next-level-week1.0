import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {
  // ---------------------------  INDEX C/ FILTRO -------------------------- //
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    // buscando no banco de dados
    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image_url: `http://localhost:3333/uploads/${point.image}`,
      };
    });

    return res.json(serializedPoints);
  }

  // ---------------------------  SHOW -------------------------- //
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex("points").where("id", id).first(); //sei que o id é unico, entao posso usar o metodo first p/ retorno.

    if (!point) {
      return res.status(400).json({ message: "Point not found! Try Again!" });
    }

    const serializedPoint = {
      ...point,
      image_url: `http://localhost:3333/uploads/${point.image}`,
    };
    /**
     * SELECT * FROM items
     *   JOIN point_items ON items.id = point_items.item_id
     * WHERE point_items.point_id = { id }
     */

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id) // --> ISSO VAI ME RETORNAR TODOS OS ITEMS RELACIONADOS AO POINT QUE INDICAMOS
      .select("items.title");

    return res.json({ point: serializedPoint, items });
  }

  // ---------------------------  CREATE -------------------------- //
  async create(req: Request, res: Response) {
    //vou buscar do meu req.body - utilizando o destructuring
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const trx = await knex.transaction();

    const point = {
      image: req.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx("points").insert(point);

    //relacionamento com a tabela de items
    const point_id = insertedIds[0];
    const pointItems = items
      .split(",")
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          point_id,
        };
      });

    await trx("point_items").insert(pointItems); //com o trx aqui se falhar, a primeira não vai executar

    await trx.commit(); //esse commit que faz os inserts na base de dados

    return res.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointsController;
