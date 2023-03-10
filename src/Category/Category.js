import React from 'react'
import './Category.css'
import {Link} from 'react-router-dom';

export default function Category(props) {
    const categoryArr = [
        {
            src:'/assets/shared/desktop/image-category-thumbnail-headphones.png',
            name:'Headphones',
        },
        {
            src:'/assets/shared/desktop/image-category-thumbnail-speakers.png',
            name:'Speakers',
        },
        {
            src:'/assets/shared/desktop/image-category-thumbnail-earphones.png',
            name:'Earphones',
        }
    ]
  return (
    <div id='category'>
        {
            categoryArr.map((ele,i) =>{return(<div key={i} className='categoryMain'><img src={ele.src} className='categoryImg' alt=''/> <h2 className='categoryTitle'>{ele.name}</h2> <Link style={{textDecoration:'none',color:'white'}} to={`/${ele.name}`}><button className='categoryButon'>SHOP <img src='/assets/shared/desktop/icon-arrow-right.svg' alt='' /></button></Link> </div>)})
        }
      </div>
  )
}
