export interface LoginResult {
    token:string,
    nome:string,
}

export interface Credenciais{
    email?:string,
    senha?:string
}

export interface CredenciaisCadastro{
    nome?:string,
    email:string,
    senha:string
}