import React, { useContext } from 'react'
import Card from '../components/Card/Card'
import AppContext from '../Context'

const Favorites = ({ onAddToFavorite, onAddToCart }) => {
  const { favorites } = useContext(AppContext)
  return (
    <div className="p-40">
      <h1>Мои закладки</h1>
      <div className="d-flex flex-wrap mt-40">
        {favorites.map((item, index) => {
          console.log(item)
          return (
            <Card
              key={index}
              onPlus={(obj) => onAddToCart(obj)}
              onAddToFavorite={(obj) => onAddToFavorite(obj)}
              {...item}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Favorites
