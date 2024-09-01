// Importações 
import prismaClient from "../db/index.js";
import bcryptjs from "bcryptjs";
import {z, ZodError} from "zod";

// Importando função do jwt para gerar um token para o usuario
import jwt from "jsonwebtoken";

// Importando funções de validação do usuario e do seu login
import {userSchema,userLoginSchema} from "../validations/userValidation.js";


// Controladores

// Método parar criar um Usuário
export const createUser = async(req,res)=>{
    try {
        const {email,name,password} =  userSchema.parse(req.body);

        //Verificando se o email passado pelo usuário ja existe;

        const existEmail = await prismaClient.user.findUnique({
            where:{
                email
            }
        })

        if(existEmail){
            return res.status(409).json({error:"Já existe um usuário com esse e-mail cadastrado"});
        }

        //Criptografando a senha passada do usuário para segurança
        const salt = await bcryptjs.genSalt(15);
        const hashPassword = await bcryptjs.hash(password,salt);

        //Criando usuario
        const newUser = await prismaClient.user.create({
            data:{
                email,
                name,
                password:hashPassword
            }
        });

        //Retornando usuário criado

        return res.status(201).json(newUser);

    } catch (error) {
         //Retornando erro caso haja
         if (error instanceof ZodError) { //Erro vindo do zod
            const errorDetails = error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            }));

            return res.status(400).json({ error: 'Validação falhou!', details: errorDetails });
        } else {
            console.error('Error retrieving users: ', error);
            return res.status(500).json({ error: 'Erro interno do servidor!' });
        }
    }
}

// Método para edição de usuário
export const updateUser = async(req,res)=>{
    try {
        const idUser = req.id_User;
        const { email,name,password } = userSchema.parse(req.body);

        //Verificando se existe um usuario com o ID passado
        const existUser = await prismaClient.user.findUnique({
            where: {
                id: idUser
            }
        })  

        if(!existUser){
            return res.status(404).json({ error: "Usuário nao existe" });
        }

        const existEmailUser = await prismaClient.user.findFirst({
            where:{
                email,
                id:{
                    not:idUser
                }
            }
        })

        if(existEmailUser){
            return res.status(409).json({ error: "E-mail já existe" });
        }

        //Criptografando a senha do usuário

        const salt = await bcryptjs.genSalt(15);
        const hashPassword = await bcryptjs.hash(password,salt);


        const updateUser = await prismaClient.user.update({
            where:{
                id:idUser
            },
            data:{
                name,
                email,
                password:hashPassword
            }
        })

        return res.status(201).json({ message: "Usuário atualizado com Sucesso", updateUser });

    } catch (error) {
        if (error instanceof ZodError) { //Erro vindo do zod
            const errorDetails = error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            }));

            return res.status(400).json({ error: 'Validação falhou', details: errorDetails });
        } else {
            console.error('Error retrieving users: ', error);
            return res.status(500).json({ error: 'Erro interno do servidor!' });
        }

    }
}

// Método para listar todos os usuários

export const allUsers = async (req,res)=>{
    try {
        const users = await prismaClient.user.findMany();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: "Error ao tentar listar todos os usuários!" });
    }
}



// Método para deletar usuário do sistema

export const deleteUser = async (req,res)=>{

    try {
        
        //Pegando o id do usuário a ser deletado
        const idUser = req.id_User;

        const userExist = await prismaClient.user.findUnique({
            where:{
                id:idUser
            }
        })

        if(!userExist){
            return res.status(404).json({ error: "Usuário não existe" });
        }

        await prismaClient.user.delete({
            where:{
                id:idUser
            }
        })
        res.status(200).json({ message: "Usuário deletado com sucesso!" });

    } catch (error) {
        console.error('Error retrieving users: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}

// Método para autenticação do usuário

export const authenticateUser = async (req,res)=>{
    try {
        const {email,name,password} = userLoginSchema.parse(req.body);

        // Validação da existencia do usuário
        const existUser =  await prismaClient.user.findUnique({
            where:{
                email
            }
        })

        if(!existUser){
            return res.status(404).json({ error: "Staff does not exist" });
        }

        const checkPassword =  await bcryptjs.compare(password,existUser.password);
        const checkEmail =  existUser.email === email;

        if(!checkPassword || !checkEmail){
            return res.status(400).json({ error: "E-mail ou a senha estão incorretos!" });
        } 

        const secret =  process.env.SECRET;

        if(!secret){
            throw new Error("JWT secret não está definido!");
        }

        const token = jwt.sign({ email:existUser.email },secret,{
            expiresIn:"1d",
            subject:existUser.id.toString(),
        })

        return res.status(200).json({ message: "Login feito com sucesso!", token });
    } catch (error) {
        //Retornando erro caso haja
        if (error instanceof ZodError) { 
            const errorDetails = error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            }));

            return res.status(400).json({ error: 'Validation failed', details: errorDetails });
        } else {
            console.error('Error retrieving users: ', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
