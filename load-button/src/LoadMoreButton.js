import React, { useEffect, useState } from 'react'
import './style.css'

const LoadMoreButton = () => {

    const URL = 'https://picsum.photos/v2/list?page=1&limit=90'

    const [images,setImages] = useState([])
    const [count,setCount] = useState(1)

    useEffect(() =>{
        const fetchImages = async(getURL) =>{
            try{
                const response = await fetch(getURL)
                const data = await response.json()
                setImages(data)
            }catch(e){
                console.log(e)
            }
        }
        fetchImages(URL)
    },[])
console.log(count*20 >= images.length)
console.log(count)
console.log(images)




    console.log(count)
  return (
    <div>
        <h2>Image Gallery</h2>
        <div className='container'>
        {
            images.filter((_,index) => (count === 1? index <= 20: index <= count*20)).map((filterImageItems) =>(

                <img
                key={filterImageItems.id}
                alt= {filterImageItems.download_url}
                src={filterImageItems.download_url}
                style={{
                    height:'300px',
                    width:'400px',
                }}
                />
                
            ))
        }
        </div>
        <div className='load-btn'>
            <h1>Hello</h1>
            {
    
          <button onClick={() => setCount(count+1)}
            disabled={count*20 >= images.length}
          >Load More</button>
            }
        </div>

    </div>
  )
}

export default LoadMoreButton
