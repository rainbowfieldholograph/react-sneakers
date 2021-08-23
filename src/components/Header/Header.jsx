import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

const Header = (props) => {
  const { totalPrice } = useCart()

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center cu-p">
          <img width={40} height={40} src="img/logo.png" alt="Logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={props.onClickCart}>
          <img width={18} height={18} src="img/cart.svg" alt="Cart" />
          <span>{totalPrice} руб.</span>
        </li>
        <Link to="/favorites">
          <li className="mr-10">
            <img width={20} height={20} src="img/heart.svg" alt="Favorites" />
          </li>
        </Link>
        <Link to="/orders">
          <li>
            <img width={18} height={18} src="img/user.svg" alt="User" />
          </li>
        </Link>
      </ul>
    </header>
  )
}

export default Header
