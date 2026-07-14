import type { FC } from "react"



export type ProductVariantTypeModel = {
    id:string,
    name:string,
    stock:number,
    description?:string,
    price:number,
    productId:string,
    orders:{
        id:string
    }
}


export type ProductTypeModel = {
    id:string,
    createdAt:Date,
    sellCount:number,
    fullname:string,
    description?:string,
    deliveryNote?:string,
    categoryString:string,
    productVariants:ProductVariantTypeModel[],
    onDelete?:(id : string) => Promise<void>,
    onUpdate?:(model : ProductTypeModel) => Promise<void>,
}


const ProductModel : FC<ProductTypeModel> = ({}) => {
    return (
        <></>
    )
}

export default ProductModel;