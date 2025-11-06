import React,{createContext, useContext,useState,useEffect} from "react"

import {toast} from 'react-hot-toast'

const Context= createContext();



export  const StateContext=({children})=>{
    const [showCart,setShowCart]= useState(false);

    const [cartItems,setCartItems] = useState([]);

    const [totalPrice,setTotalPrice] = useState(0);

    const [totalQuantities,setTotalQuanitites] = useState(0);

    const [qty,setQty] = useState(1);

    let foundProduct;

    let index;

    const onAdd=(product,quantity)=>{
        const checkProductInCart=cartItems.find((item)=>item._id===product._id);

        setTotalPrice((prevTotalPrice)=>prevTotalPrice+product.price*quantity);

        setTotalQuanitites((prevQuantities)=>prevQuantities+quantity);

        if(checkProductInCart){
            

            const updatedCartItems = cartItems.map((cartProduct)=>{
                if(cartProduct._id === product._id) {
                        return {...cartProduct,
                            quantity:cartProduct.quantity+ quantity
                        }
                }
            })

            setCartItems(updatedCartItems)
            
        }
        else{

            product.quantity=quantity;
            setCartItems([...cartItems,{...product}])

        }
        toast.success(`${qty} ${product.name} added to the cart`)
    }

   

    const toggleCartItemQuantity=(id,value) =>{

        foundProduct = cartItems.find((item)=>item._id===id)

        index = cartItems.findIndex((product)=> product._d===id)




        const newCartItems = cartItems
  

        if(value==='inc'){  
            
            newCartItems.find((item)=>{
                if(item._id==id){
                    item.quantity+=1;
               
                }
            })
            setCartItems([...newCartItems])

            setTotalPrice((prev)=>prev+foundProduct.price)

            setTotalQuanitites((prev)=>prev+1)

        }else if(value==='dec'){

            if(foundProduct.quantity>1){
                newCartItems.find((item)=>{
                    if(item._id==id){
                        item.quantity-=1;
                      
                    }
                })
                setCartItems([...newCartItems])
    
                setTotalPrice((prev)=>prev-foundProduct.price)
    
                setTotalQuanitites((prev)=>prev-1)
            }

        }
    }

    const removeCartItem=(id) =>{

        foundProduct = cartItems.find((item)=>item._id===id)

        index = cartItems.findIndex((product)=> product._d===id)

        const newCartItems = cartItems.filter((item)=>item._id!==id)


        setCartItems([...newCartItems])

        
        setTotalPrice((prev)=>{
            if(cartItems.length>=1){
                return prev=prev-(foundProduct.price*foundProduct.quantity)
            }
            else{
                return 0;
            }
        })
    
        setTotalQuanitites((prev)=>{
            if(cartItems.length>=1){
                return prev=prev-foundProduct.quantity
            }
            else{
                return 0;
            }
        })

    }

    const incQty = () =>{
        setQty((prevQty)=>{
           return  prevQty+1;
        })
    }

    const decQty = () =>{
        setQty((prevQty)=>{
            if(prevQty-1<0){
                return 1;
            }
            return prevQty-1;
        })
    }

    return(
    <Context.Provider
        value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            setShowCart,
            toggleCartItemQuantity,
            removeCartItem,
            setCartItems,
            setTotalPrice,
            setTotalQuanitites
        }}
        >

        {children}

    </Context.Provider>)
};

export const useStateContext=()=>useContext(Context);