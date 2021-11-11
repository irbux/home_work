export interface Error {
    message: string
}


export interface Handler<T> {
    [index: string]: (data: any, status: any) => Promise<T> | Promise<Error>
}