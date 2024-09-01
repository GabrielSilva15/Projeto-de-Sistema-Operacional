import jwt from "jsonwebtoken";

export async function verifyTokenUser(req, res, next) {
    //Pegando o token
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({message: "Acesso restrito!"});
    }

    try {
        //Pegando o segredo do token e comparando com o token
        const secret = process.env.SECRET;

        if(!secret){
            throw new Error('JWT secret não está definido!');
        }

        let {email, sub} = jwt.verify(token, secret);

        req.id_User = sub; //Settando o id do funcionário
    } catch (error) {
        console.log(error);

        //Tratamento de error de expiração
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token expirado!" });
        }

        //Erro de token inválido
        return res.status(401).json({ message: "Token inválido!" });
    }

    next();
}