import React, { useContext } from 'react'
import AppContext from '../../Context'

import arrowImg from '../../img/arrow.svg'

const Info = ({ img, title, description }) => {
  const { setCartOpened } = useContext(AppContext)

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120px" src={img} alt="Empty cart" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button
        onClick={() => {
          setCartOpened(false)
        }}
        className="greenButton"
      >
        <img src={arrowImg} alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  )
}

export default Info
