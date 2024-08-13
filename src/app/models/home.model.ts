export interface Tarefa {
    id:number,
    titulo:string,
    descricao:string
}

export interface CriarTarefa{
    titulo: string|null|undefined,
    descricao: string|null|undefined
}

export interface Notificacao{
    Notificacao:boolean|undefined,
    NotificacaoCheck:boolean|undefined,
    NotificacaoMsg:string|undefined
}