import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// A função hashPassword recebe a senha como um parâmetro,
// se a senha for menor que 8 caracteres é lançado um erro com aviso,
// se for maior que 8 a função segue e retorna a senha com criptografia,

export const hashPassword = (password) => {
  if (password.length < 8) {
    throw new Error("A senha deve ser maior ou igual a 8 caracteres");
  }

  return bcrypt.hashSync(password, 10);
};

// a função generateToken recebe o id e retorna o token,
// com validade de 1 semana, o id recebe o nome de payload,

export const generateToken = (payload) => {
  return jwt.sign({ userId: payload }, "zeppelum");
};

// a função getUserId recebe 2 parâmetros,
// o 1º é a requisição que vem pelo contexto,
// o 2º é um boolano, se é necessário autenticação,
// o header é atribuido dinamicamente,
// dependendo do protocolo da requisição (http ou ws),
// o requiredAuth tem um valor padrão de true,
// se tiver o header ele remove a palavra Bearer e decodifica o token,
// se for necessário autenticação e não for fornecido a função lança um erro,
// caso não tiver um header e for necessário autenticação retorna null

export const getUserId = (request, requiredAuth = true) => {
  const header = request.request
    ? request.request.headers.authorization
    : request.connection.context.Authorization;

  if (header) {
    const token = jwt.verify(header, "zeppelum");
    return token.userId;
  }

  if (requiredAuth) {
    throw new Error("Autenticação nescessária");
  }

  return null;
};
