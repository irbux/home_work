export interface Route {
    [index: string]: (response: any, request: any,) => Promise<any>
  }

export interface Routers {
    get: (path: string, controller: ( ) => { (response: any, request: any): Promise<any>}) => any
}