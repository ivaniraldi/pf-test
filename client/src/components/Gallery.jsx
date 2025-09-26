import React from 'react'

export default function Gallery({products}) {
 
  return (
    <div className='p-20 gallery'>
        {products?.map((p, i) =>{
            return(
                <div key={i} className="card bg-base-100  shadow-sm">
  <figure>
    <img
      src={p.image}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{p.title}</h2>
    <p>{p.description}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">${p.price}</button>
    </div>
  </div>
</div>
            )
        })}
    </div>
  )
}
