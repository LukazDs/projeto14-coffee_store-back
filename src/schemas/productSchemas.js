import joi from "joi";

export const productSchema = joi.object({
    quantity: joi.number().required(),
    productId: joi.number().required(),
});
