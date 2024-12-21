import React from 'react'

const Newsitem =(props)=> {
    
    
    
        let{title,description,imageurl,newsurl,author,date}=props;
        return (
            <div className="my-3">
                <div className="card" >
                    <img src={!imageurl?"https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F0b93fa3d-f79d-40f6-9c1e-77cc1402ae9e.jpg?source=next-barrier-page":imageurl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}...</p>
                            <p className="card-text"><small class="text-muted">By {!author?"unknown":author}on {date}</small></p>
                            <a href={newsurl}target="_blank" className="btn btn-sm btn-dark">Read more</a>
                        </div>
                </div>
            </div>
        )
    
}
export default Newsitem