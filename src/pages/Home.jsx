import React, { useState } from 'react'
import Card from '../components/Card/Card'

import searchImg from '../img/search.svg'
import removeImg from '../img/btn-remove.svg'

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
        onAddToFavorite={(obj) => onAddToFavorite(obj)}
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
          <img src={searchImg} alt="Search" />
          <input maxLength={30} onChange={onChangeInput} value={search} placeholder="Поиск..." />
          {search && (
            <img onClick={onClickRemove} className="removeBtn cu-p" src={removeImg} alt="Remove" />
          )}
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  )
}

export default Home
