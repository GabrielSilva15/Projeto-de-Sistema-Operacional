import {z} from "zod";

//Objeto contendo as validações do dados obtidos pela a requisição
export const userSchema = z.object({
    name: z.string().min(3).max(255).refine(data => !!data, { message: 'The name is mandatory' }),
    password: z.string().min(6).refine(data => !!data, { message: 'The password is mandatory' }),
    email: z.string()
        .email({ message: 'Invalid email address' })
        .refine(data => !!data, { message: 'The email is mandatory' }),
});

//Objeto contendo a validação do formulário de login
export const userLoginSchema = z.object({
    name: z.string().min(3).max(255).refine(data => !!data, { message: 'The name is mandatory' }),
    password: z.string().min(6).refine(data => !!data, { message: 'The password is mandatory' }),
    email: z.string()
        .email({ message: 'Invalid email address' })
        .refine(data => !!data, { message: 'The email is mandatory' }),
});