import React, { createContext, useEffect, useState } from 'react'
import api from '../services/axios';

export const CartContext = createContext()


const ContextCart = ({ children }) => {
  const [count, setCount] = useState(0);


  useEffect(() => {
    async function getter() {
      try {
        
        const responce = await api.get('/cart')
        console.log("the one", responce.data);
        const length = responce?.data?.items?.length || 0;
        setCount(length);

      } catch (error) {
        console.log(error);
        setCount(0)
      }
    }
    getter();
  }, [])


  const increment = () => {
    setCount(prev => prev + 1)
  }

  const decrement = () => {
    setCount(prev => (prev > 0 ? prev - 1 : 0))
  }


  return (
    <div>
      <CartContext.Provider
        value={{ count, increment, decrement }}
      >
        {children}

      </CartContext.Provider>

    </div>
  )
}

export default ContextCart