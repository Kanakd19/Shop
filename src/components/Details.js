import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import currencyFormatter from "currency-formatter";
import {BsDash, BsPlus} from "react-icons/bs";
const Details = () => {
    const [quantity, setQuantity] = useState(1);
    const {id} = useParams();
    // const[product,setProduct]= useState("")
    const dispatch = useDispatch();
    const {product} = useSelector(state => state.ProductsReducer);
    useEffect(() => {
       dispatch({type: 'PRODUCT', id})
    }, [id])
    const decQuantity = () => {
        if(quantity > 1) {
            setQuantity(quantity-1)
        }
    }
    return (
        <div className="container mt-100">
            <div className="row">
                <div className="col-6">
                <div className="details__image">
                    <img src={`/images/${product.image}`} alt=""/>
                </div>
                </div>
                <div className="col-6">
                <div className="details__name">
                    {product.name}
                </div>
                <div className="details__prices">
    <div className="details__name">₹{product.price}</div>
   

                </div>
                <div className="details__info">
                    <div className="details__incDec">
                    <span className="dec" onClick={decQuantity}><BsDash /></span>
    <span className="quantity">{quantity}</span>
    <span className="inc" onClick={() => setQuantity(quantity+1)}><BsPlus/></span>
    <button className="btn-default" onClick={() => dispatch({type: 'ADD_TO_CART', payload: {product, quantity} })}>add to cart</button>
    </div>
                </div>
                <div className="details__p">
                    <h4>Details</h4>
                    {product.desc}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Details
