import React, { useState, useEffect } from 'react'
import Carousel from '../components/Carousel'
import axios from 'axios'

const Home = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios
        .get("http://localhost:8000/products")
        .then((response) => {
            setProducts(response.data)
        })
  }, [products]);

  return (
    <div className="w-full h-screen text-2xl bg-[yellow]">
        <div className='flex pt-5 pl-5'>
            <div>
            <img 
            src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/beautiful-mcdonald%27s-logo-design-template-79ecda437387a6cd29e212e10b95e83b_screen.jpg?ts=1668146898' 
            alt=''
            className='w-16'
            />
            </div>
            <div>
            <p className='pt-4 pl-4'>Mcdelivery</p>

            </div>
        
        </div>
        <div className='h-full bg-[#f7f7f7] text-center pt-20 px-56'>
            <div className='h-auto'>
                <Carousel />
            </div>
            <div className='text-left pt-5'>
                <p className='text-3xl font-bold'>Good day!</p>
                <p className='text-xl pt-2'>Say "YES" to your craving and tap to order now!</p>   
            </div>
            <div className='flex gap-5'>
                {products.map(product => {
                    return (
                <button 
                    className='mt-5 w-56 h-80 bg-[#ffffff]'
                    key={product.pd_id}>
                    <div className='h-44'>
                        <img
                            className='w-[93%] h-full'
                            src={product.product_img}
                            alt=''
                            />
                    </div>
                    <div className='text-left text-lg h-20 mx-5 mt-2'>
                        <p>{product.name}</p>
                    </div>
                    <div className='font-bold text-lg text-left mx-5'>
                        <p>P{product.price}.00</p>
                    </div>
                </button>
                    )
                })}
            </div>
            
        </div>

    </div>
  )
}

export default Home