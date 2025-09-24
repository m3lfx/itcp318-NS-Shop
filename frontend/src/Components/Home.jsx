import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
// import Pagination from 'react-js-pagination'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Product from './Product/Product'
import MetaData from './Layout/MetaData'
import Loader from './Layout/Loader'

const Home = () => {
    const [products, setProducts] = useState([])
    const [productsCount, setProductsCount] = useState(0)
    const [resPerPage, setResPerPage] = useState(0)
    const [filteredProductsCount, setFilteredProductsCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    let { keyword } = useParams();

    let count = productsCount;

    if (keyword) {
        count = filteredProductsCount
    }

    // function setCurrentPageNo(pageNumber) {
    //     setCurrentPage(pageNumber)
    // }

    const getProducts = async (keyword = '', page = 1) => {
        let link = `http://localhost:4001/api/v1/products?keyword=${keyword}&page=${page}`

        let res = await axios.get(link)
        console.log(res)
        setProducts(res.data.products)
        setProductsCount(res.data.productsCount)

        setResPerPage(res.data.resPerPage)
        setFilteredProductsCount(res.data.filteredProductsCount)
        setLoading(false)
    }

    useEffect(() => {
        getProducts(keyword, currentPage)
    }, [keyword, currentPage]);
    return (
        <>
            <MetaData title={'Buy Best Products Online'} />
            {loading ? <Loader /> : (<div className="container container-fluid">
                <h1 id="products_heading">Latest Products</h1>
                <section id="products" className="container mt-5">
                    <div className="row">
                        {products && products.map(product => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>
                    {/* <div className="row">
                        {keyword ? (
                            <>
                                <div className="col-6 col-md-3 mt-5 mb-5">
                                    <div className="px-5">
                                        <Range
                                            marks={{
                                                1: `$1`,
                                                1000: `$1000`
                                            }}
                                            min={1}
                                            max={1000}
                                            defaultValue={[1, 1000]}
                                            tipFormatter={value => `$${value}`}
                                            tipProps={{
                                                placement: "top",
                                                visible: true
                                            }}
                                            value={price}
                                            onChange={price => setPrice(price)}
                                        />
                                        <hr className="my-5" />
                                        <hr className="my-5" />
                                        <div className="mt-5">
                                            <h4 className="mb-3">
                                                Categories
                                            </h4>

                                        </div>


                                    </div>
                                </div>

                                <div className="col-6 col-md-9">
                                    <div className="row">
                                        {products.map(product => (
                                            <Product key={product._id} product={product} />
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            products.map(product => (
                                <Product key={product._id} product={product} />
                            ))
                        )}

                    </div> */}

                </section>

                {resPerPage < count && (
                    <div className="d-flex justify-content-center mt-5">
                        <Stack spacing={2}>
                            <Pagination
                                count={Math.ceil(count / resPerPage)}
                                page={currentPage}
                                onChange={(event, value) => setCurrentPage(value)}
                                // onChange={setCurrentPageNo}
                                color="primary"
                                variant="outlined"
                                showFirstButton
                                showLastButton
                            />
                        </Stack>
                    </div>
                )}


            </div>)}

        </>

    )
}

export default Home