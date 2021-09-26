import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

import logoImg from '../../img/logo.png'
import cartImg from '../../img/cart.svg'
import heartImg from '../../img/heart.svg'
import userImg from '../../img/user.svg'

const Header = (props) => {
  const { totalPrice } = useCart()

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to={process.env.PUBLIC_URL + '/'}>
        <div className="d-flex align-center cu-p">
          <img width={40} height={40} src={logoImg} alt="Logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={props.onClickCart}>
          <img width={18} height={18} src={cartImg} alt="Cart" />
          <span>{totalPrice} руб.</span>
        </li>
        {/* <Link to={process.env.PUBLIC_URL + '/favorites'}>
          <li className="mr-10">
            <img width={20} height={20} src={heartImg} alt="Favorites" />
          </li>
        </Link> */}
        <Link to={process.env.PUBLIC_URL + '/orders'}>
          <li>
            <img width={18} height={18} src={userImg} alt="User" />
          </li>
        </Link>
      </ul>
    </header>
  )
}

export default Header
