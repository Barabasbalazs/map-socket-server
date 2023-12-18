import Joi from 'joi';

const userSchema = Joi.object({
    id: Joi.number().min(1).required(),
    name: Joi.string().required(),
    coords: Joi.object({
        lat: Joi.number().required(),
        lng: Joi.number().required(),
    })
});

export const userArraySchema = Joi.array().items(userSchema);