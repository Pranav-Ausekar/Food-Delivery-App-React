import React, { useContext, useEffect, useState } from 'react'
import { MdFastfood } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { food_items } from '../food';
import { dataContext } from '../context/UserContext';
import { useSelector } from 'react-redux';

function Nav() {

    const { input, setInput, foodList, setFoodList, showCart, setShowCart } = useContext(dataContext)

    useEffect(() => {
        const newList = food_items.filter((item) => item.food_name.toLowerCase().includes(input.toLowerCase()))
        setFoodList(newList)
    }, [input])

    const items = useSelector(state => state.cart)
    // console.log(items)

    return (
        <div className='w-full h-[100px] flex justify-between items-center px-5 md:px-8'>

            {/* Logo  */}
            <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-lg cursor-pointer  hover:bg-green-200 transition-all duration-700'>
                <MdFastfood className='w-[30px] h-[30px] text-green-500' />
            </div>

            {/* Search option  */}
            <form className='w-[50%] h-[60px] bg-white flex items-center px-2 gap-3 shadow-lg rounded-md md:w-[70%] md:gap-5 md:px-5' onSubmit={(e) => e.preventDefault()}>
                <IoSearch className='text-green-500 w-[20px] h-[20px] cursor-pointer' />
                <input
                    type="text"
                    placeholder='Search Items'
                    value={input}
                    className='w-[100%] outline-none text-[16px] md:text-[20px]'
                    onChange={(e) => setInput(e.target.value)}
                />
            </form>

            {/* Cart icon  */}
            <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl relative cursor-pointer  hover:bg-green-200 transition-all duration-700' onClick={() => setShowCart(true)}>
                <span className='absolute top-0 right-2 text-green-500 font-bold text-[18px]'>{items.length}</span>
                <LuShoppingBag className='w-[30px] h-[30px] text-green-500' />
            </div>
        </div>
    )
}

export default Nav