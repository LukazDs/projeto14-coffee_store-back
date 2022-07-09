import { db } from '../dbStrategy/mongo.js';
import bcrypt from 'bcrypt';
import { registerUserSchema } from "../schemas/userSchemas.js";


export async function createUser(req, res) {

    const user = req.body;

    const validation = registerUserSchema.validate(user, { abortEarly: true });

    if (validation.error) {
        res.status(422).send("Email ou senha invalidos!");
        return;
    }

    try {

        const passwordHash = bcrypt.hashSync(user.password, 10);
        const userDb = await db.collection('users').findOne({ email: user.email });

        if (userDb) {
            res.status(409).send("Email ou nome já utilizado!");
            return;
        }

        if (user.confirmPassword !== user.password) {
            res.status(409).send("Erro ao confirmar senha!");
            return;
        }

        await db.collection("users").insertOne({ ...user, password: passwordHash });

        res.sendStatus(201);

    } catch (error) {
        res.status(500).send("Problema de cadastramento!");
    }
}
