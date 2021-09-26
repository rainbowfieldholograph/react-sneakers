import axios from 'axios'
import React, { useState } from 'react'
import { useCart } from '../../hooks/useCart'
import Info from '../Info/Info'
import styles from './Drawer.module.scss'

import removeImg from '../../img/btn-remove.svg'
import arrowImg from '../../img/arrow.svg'
import completeImg from '../../img/complete-order.jpg'
import emptyCartImg from '../../img/empty-cart.jpg'

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

const Drawer = ({ onRemoveItem, onClose, items = [], opened }) => {
  const { cartItems, setCartItems, totalPrice } = useCart()
  const [orderId, setOrderId] = useState(null)
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('https://611bc63922020a00175a4708.mockapi.io/orders', {
        items: cartItems,
      })
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i]
        await axios.delete('https://611bc63922020a00175a4708.mockapi.io/cart/' + item.id)
        await delay(1000)
      }
    } catch (error) {
      alert('Ошибка при создании заказа :(')
    }
    setIsLoading(false)
  }

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`} onClick={onClose}>
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className={styles.drawer}
      >
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img onClick={onClose} className="removeBtn cu-p" src={removeImg} alt="Remove" />
        </h2>
        {items.length > 0 ? (
          <>
            <div className={styles.items}>
              {items.map((obj) => {
                return (
                  <div key={obj.id} className="cartItem d-flex align-center mb-20">
                    <div
                      style={{ backgroundImage: `url(${obj.img})` }}
                      className="cartItemImg"
                    ></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.title}</p>
                      <b>{obj.price}</b>
                    </div>
                    <img
                      onClick={() => {
                        onRemoveItem(obj.id)
                      }}
                      className="removeBtn"
                      src={removeImg}
                      alt="Remove"
                    />
                  </div>
                )
              })}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{totalPrice * 0.05} руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} className="greenButton" onClick={onClickOrder}>
                Оформить заказ <img src={arrowImg} alt="Arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'
            }
            img={isOrderComplete ? completeImg : emptyCartImg}
          />
        )}
      </div>
    </div>
  )
}

export default Drawer
