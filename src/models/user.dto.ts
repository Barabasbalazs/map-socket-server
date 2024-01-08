import Joi from 'joi';

const userSchema = Joi.object({
    id: Joi.number().min(1).required(),
    name: Joi.string().required(),
    coords: Joi.object({
        lat: Joi.number().required().min(-90).max(90),
        lng: Joi.number().required().min(-180).max(180),
    })
});

export const userArraySchema = Joi.array().items(userSchema);