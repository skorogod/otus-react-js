import React from "react";
import { createRandomProduct } from "src/helpers/createProduct";
import { useEffect, useState } from "react";
import { TProduct } from "src/interfaces/product.interface";
import { ProductsList } from "src/shared/productList/ProductList";


export const ProductsListExample = () => {
    const [products, setProducts] = useState<TProduct[] | never[]>([])

    const getNextProducts = (count: number = 10) => {
        const nextProducts: Array<TProduct> = []
        for (let i=0; i<count; i++) {
            nextProducts.push(createRandomProduct(new Date().toLocaleDateString('ru')))
        }
        setProducts([...products, ...nextProducts])
    }

    useEffect(() => {
        getNextProducts(10)
    }, [])

    return (
        <ProductsList
            products={products}
            getNextProducts={getNextProducts}
        />
    )
}