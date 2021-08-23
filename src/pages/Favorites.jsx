import React, { useContext } from 'react'
import Card from '../components/Card/Card'
import AppContext from '../Context'

const Favorites = () => {
  const { favorites, onAddToFavorite } = useContext(AppContext)
  return (
    <div className="p-40">
      <h1>Мои закладки</h1>
      <div className="d-flex flex-wrap mt-40">
        {favorites.map((item, index) => {
          return <Card key={index} favorited={true} onAddToFavorite={onAddToFavorite} {...item} />
        })}
      </div>
    </div>
  )
}

export default Favorites
