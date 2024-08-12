export interface Tarefa {
    id:number,
    titulo:string,
    descricao:string
}

export interface CriarTarefa{
    titulo: string|null|undefined,
    descricao: string|null|undefined
}