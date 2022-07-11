import { db} from '../dbStrategy/mongo.js';
import dayjs from "dayjs";
import { productSchema } from '../schemas/productSchemas.js';

export async function putProduct(req, res) {
    
    const body = req.body;

    const validation = productSchema.validate(body);

    if (validation.error) {
        return res.status(422).send("Valores inválidos!");
    }

    try {

        await db.collection('products-user').insertOne({
            ...body,
            ...infoProduct,
            userId: session.userId,
            date: dayjs().format("DD/MM")
        });

        res.status(201).send('Produto inserido com sucesso');

    } catch (error) {
        res.status(500).send("Erro de Requisição!")
    }
}

export async function getProducts(_req, res) {

    const session = res.locals.session;

    try {
        const data = await db
            .collection('products-user')
            .find({ userId: session.userId })
            .toArray();

        res.send({ data });

    } catch (error) {
        res.status(500).send("Problemas para puxar dados!");
    }
}
