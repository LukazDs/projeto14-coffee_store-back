import { db } from '../dbStrategy/mongo.js';

async function validateProduct(req, res, next) {

    const body = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const session = await db.collection('sessions').findOne({ token });
    const infoProduct = await db.collection("coffees").findOne({ productId: body.productId });

    if (!session) {
        return res.status(401).send("Usuário não encontrado!");
    }

    if (!infoProduct) {
        return res.status(401).send("Produto não encontrado!");
    }

    res.locals = { session, infoProduct };

    next();
}

export default validateProduct;
