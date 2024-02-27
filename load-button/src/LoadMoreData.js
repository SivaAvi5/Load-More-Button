import React, { useEffect, useState } from 'react'
import './style.css'

const LoadMoreData = () => {
   

    const[loading,setLoading] = useState(false)
    const[products,setProducts] = useState([])
    const[count,setCount] = useState(0)
    const [disableButton,setDisableButton] = useState(false)

    useEffect(() =>{
        const fetchProducts = async() =>{
            try{
                setLoading(true)
                const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${
                    count === 0 ? 0 : count * 20
                  }`)
                const result = await response.json()
                if (result && result.products && result.products.length) {
                    setProducts((prevData) => [...prevData, ...result.products]);
                    setLoading(false);
                }
            }catch(e){
                console.log(e)
                setLoading(false)
            }
        } 
        fetchProducts()
    },[count])

    useEffect(() => {
        if (products && products.length === 100) setDisableButton(true);
      }, [products]);

    if(loading){
        return <div>Loading Items ...</div>
    }
   
    console.log(products)
    console.log(count)
    
  return (
    <div className='load-more-container'>
        <div className='product-container'>
            {
                products && products.length ? 
                products.map((item,index) =>(
                    <div className='product' key={index}>
                        <img
                        src={item.thumbnail}
                        alt={item.title}
                        />
                        <p>{item.title}</p>
                    </div>
                ))
                : <p>no data</p>
            }
 
        </div>
        <div className='button-container'>
            <button 
            disabled = {disableButton}
            onClick={() => setCount(count+1)}>Load  More Products</button>
            {disableButton? <p> You have reached to 100 product</p>:null}
        </div>

    </div>
  )
}

export default LoadMoreData