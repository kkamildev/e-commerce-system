import { useEffect, useState, type FC } from "react";
import SearchInput from "../../components/inputs/SearchInput";
import { useAdminPanelRequest } from "../../utils/useAdminPanelRequest";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft, faPlus, faRefresh } from "@fortawesome/free-solid-svg-icons";
import type { ProductTypeModel } from "../../components/models/ProductModel";
import ProductModel from "../../components/models/ProductModel";
import CreateProductForm from "../../components/forms/product/CreateProductForm";


type Props = {

}

const ProductsPanel : FC<Props> = ({}) => {

    const adminPanelRequest = useAdminPanelRequest();
    const [searchParams] = useSearchParams();

    const [products, setProducts] = useState<ProductTypeModel[]>([]);
    const [form, setForm] = useState<string>(null);
    const [editProduct, setEditProduct] = useState<ProductTypeModel>(null);


    const searchQuery = searchParams.get('s') || "";

    useEffect(() => {
        getProducts()
    }, [searchQuery])


    const getProducts = async () => {
        const result = await adminPanelRequest("GET", "/api/products?fullName=" + searchQuery, {timeout:5000});
        if(result.ok) {
            setProducts(result.data.products);
        }
    }

    return (
        <section className="overflow-y-scroll h-full pb-10 flex-1 min-h-0">
            <section className={`${form && "hidden"} m-5 mb-10`}>
                <section className="flex flex-col-reverse lg:flex-row justify-between gap-y-4">
                    <section className="flex flex-col">
                        <h1 className="font-bold text-3xl text-zinc-800">Store Products</h1>
                        <h2 className="font-bold text-xl text-zinc-600">Found: {products.length}</h2>
                    </section>
                    <section className="flex flex-col">
                        <SearchInput id="search" searchParamName="s" placeholder="Search..."/>
                    </section>
                    <section>
                        <button onClick={() => setForm("create")} className="primary-btn"><FontAwesomeIcon icon={faPlus}/> Create new</button>
                        <button onClick={getProducts} className="primary-btn"><FontAwesomeIcon icon={faRefresh}/> Refresh</button>
                    </section>
                </section>
                <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-15 mx-5 gap-x-10 gap-y-15">
                    {
                        products.map((product) => <ProductModel key={product.id} id={product.id} fullname={product.fullname} productVariants={product.productVariants}
                            createdAt={product.createdAt} categoryString={product.categoryString} sellCount={product.sellCount} deliveryNote={product.deliveryNote}
                            description={product.description}
                        />)
                    }
                </section>
            </section>
            {
                form &&
                <section className="m-5 mb-10">
                    <section className="flex flex-col lg:flex-row justify-between gap-y-4">
                        <section className="flex flex-col">
                            <button onClick={() => setForm(null)} className="deny-btn text-xl"><FontAwesomeIcon icon={faCircleLeft}/> Back</button>
                        </section>
                        <section>
                            
                        </section>
                    </section>
                    <section className="flex justify-center items-center mt-10">
                        {
                            form == "create" && 
                            <CreateProductForm onSubmit={async () => {
                                return {ok:true, message:"Hello world", serverError:false}
                            }}/>
                        }
                    </section>
                </section>
            }
        </section>
    )
}

export default ProductsPanel;