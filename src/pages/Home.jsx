import React, { useState } from 'react'
import Card from '../components/Card/Card'

const Home = ({ items, onAddToCart, onAddToFavorite, isLoading }) => {
  const [search, setSearch] = useState('')

  const onChangeInput = (e) => {
    setSearch(e.target.value)
  }

  const onClickRemove = () => {
    setSearch('')
  }

  const renderItems = () => {
    return (
      isLoading
        ? [...Array(8)]
        : items.filter((item) => item.title.toUpperCase().includes(search.toUpperCase()))
    ).map((item, index) => (
      <Card
        key={index}
        onPlus={(obj) => onAddToCart(obj)}
        onAddToFavorite={onAddToFavorite}
        loading={isLoading}
        {...item}
      />
    ))
  }

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>{search ? `Поиск по запросу: ${search}` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search"></img>
          <input maxLength={30} onChange={onChangeInput} value={search} placeholder="Поиск..." />
          {search && (
            <img
              onClick={onClickRemove}
              className="removeBtn cu-p"
              src="/img/btn-remove.svg"
              alt="Remove"
            />
          )}
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  )
}

export default Home
