import React, { useContext, useState } from 'react'
import Nav from '../components/Nav'
import Categories from '../Category'
import Card from '../components/Card'
import { food_items } from '../food'
import { dataContext } from '../context/UserContext'
import { RxCross2 } from "react-icons/rx";
import Card2 from '../components/Card2'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Home() {

    const { foodList, setFoodList, input, showCart, setShowCart } = useContext(dataContext)

    function filter(categoryName) {
        // console.log(categoryName)
        if (categoryName === "All") {
            setFoodList(food_items)
        } else {
            let newList = food_items.filter((item) => item.food_category == categoryName)
            setFoodList(newList)
            // console.log(newList)
        }
    }

    const items = useSelector(state => state.cart)
    // console.log(items)

    const subTotal = items.reduce((total, item) => total + item.qty * item.price, 0)
    // console.log(subTotal)
    const deliveryFee = 20;
    const taxes = subTotal * 0.5 / 100;
    const total = Math.floor(subTotal + deliveryFee + taxes)
    // console.log(total)

    return (
        <div className='w-full bg-slate-200 min-h-screen'>
            {/*  first */}
            <Nav />

            {/* second || Categories div*/}
            {
                //(!input => if input box not contains anything then dispay/map categories and if input box contains something then don't display/map categories...)
                !input ? <div className='flex justify-center items-center flex-wrap gap-5 w-[100%]'>
                    {
                        Categories.map((item) => {
                            return <div className='bg-white w-[140px] h-[150px] rounded-lg shadow-lg flex flex-col items-center gap-4 p-5 text-[17px] font-semibold text-gray-600 hover:bg-green-300 cursor-pointer transition-all duration-500' onClick={() => filter(item.name)}>
                                {item.icon}
                                {item.name}
                            </div>
                        })
                    }
                </div> : null
            }

            {/* third || Card div*/}
            < div className='w-full flex flex-wrap gap-5 justify-center items-center px-5 pt-8 pb-8'>
                {
                    foodList.length > 1 ?
                        foodList.map((item) => (
                            <div id={item.id}>
                                < Card name={item.food_name} image={item.food_image} price={item.price} id={item.id} type={item.food_type} />
                            </div>
                        ))
                        : <div className='text-2xl text-center text-green-500 font-semibold pt-5'>No Dish Found...</div>
                }

            </div>

            {/* foutrh || Cart div*/}
            <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shadow-2xl p-6 transition-all duration-400 flex flex-col items-center overflow-auto ${showCart ? "translate-x-0" : "translate-x-full"}`}>
                <header className=' w-[100%] flex justify-between items-center'>
                    <span className='text-green-500 text-[18px] font-semibold'>Order items</span>
                    <RxCross2 className='w-[30px] h-[30px] text-green-500 font-semibold cursor-pointer hover:text-gray-400' onClick={() => setShowCart(false)} />
                </header>

                {/* card2  */}
                {
                    items.length > 0 ? <>
                        <div className='w-full mt-9 flex flex-col gap-8'>
                            {
                                items.map((item) => {
                                    return <div id={item.id}>
                                        <Card2 name={item.name} price={item.price} image={item.image} id={item.id} qty={item.qty} />
                                    </div>
                                })
                            }
                        </div>

                        <div className='w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-2 p-8'>

                            <div className='w-full flex justify-between items-center'>
                                <span className='text-lg text-gray-600 font-semibold'>Subtotal</span>
                                <span className='text-lg text-green-400 font-semibold'>Rs. {subTotal}/-</span>
                            </div>

                            <div className='w-full flex justify-between items-center'>
                                <span className='text-lg text-gray-600 font-semibold'>Delivery Fee</span>
                                <span className='text-lg text-green-400 font-semibold'>Rs. {deliveryFee}/-</span>
                            </div>

                            <div className='w-full flex justify-between items-center'>
                                <span className='text-lg text-gray-600 font-semibold'>Taxes</span>
                                <span className='text-lg text-green-400 font-semibold'>Rs. {taxes}/-</span>
                            </div>

                        </div>

                        <div className='w-full flex justify-between items-center p-9'>
                            <span className='text-2xl text-gray-600 font-semibold'>Total</span>
                            <span className='text-2xl text-green-400 font-semibold'>Rs. {total}/-</span>
                        </div>

                        <button className='w-[50%] p-3 rounded-lg bg-green-400 text-white text-[18px] font-semibold hover:bg-green-500 transition-all duration-400 cursor-pointer' onClick={() => toast.success("Order placed")}>Place Order</button>
                    </> :
                        <div className='text-center text-2xl text-green-500 font-semibold pt-5'>Empty cart</div>
                }

            </div>
        </div >
    )
}
export default Home