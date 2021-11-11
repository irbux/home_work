export function jsonToObject(data: string) {
    try{
        const obj = JSON.parse(data);
        return obj;
    } catch(e){
        return {};
    }
}