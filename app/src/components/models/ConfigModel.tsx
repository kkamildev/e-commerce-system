



export type ConfigTypeModel = {
    id:number,
    storeName:string,
    storeDescription:string,
    mainPageTitle:string,
    mainPageSubtitle:string,
    onUpdate?:(model : ConfigTypeModel) => Promise<void>,
}