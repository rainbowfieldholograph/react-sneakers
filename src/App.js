import './App.scss'
import 'macro-css'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Drawer from './components/Drawer/Drawer'
import Header from './components/Header/Header'
import AppContext from './Context'
import Orders from './pages/Orders'

const App = () => {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [cartOpened, setCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://611bc63922020a00175a4708.mockapi.io/cart/${id}`)
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)))
    } catch (error) {
      alert('Ошибка при удалении из корзины')
      console.log(error)
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://611bc63922020a00175a4708.mockapi.io/cart'),
          axios.get('https://611bc63922020a00175a4708.mockapi.io/favorites'),
          axios.get('https://611bc63922020a00175a4708.mockapi.io/items'),
        ])
        // const cartResponse = await axios.get('https://611bc63922020a00175a4708.mockapi.io/cart')
        // const favoritesResponse = await axios.get(
        //   'https://611bc63922020a00175a4708.mockapi.io/favorites'
        // )
        // const itemsResponse = await axios.get('https://611bc63922020a00175a4708.mockapi.io/items')
        setIsLoading(false)

        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Ошибка при запросе')
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://611bc63922020a00175a4708.mockapi.io/cart/${findItem.id}`)
      } else {
        setCartItems((prev) => [...prev, obj])
        const { data } = await axios.post('https://611bc63922020a00175a4708.mockapi.io/cart', obj)
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              }
            }
            return item
          })
        )
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину')
      console.log(error)
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://611bc63922020a00175a4708.mockapi.io/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      } else {
        //деструктуризация response.data
        const { data } = await axios.post(
          'https://611bc63922020a00175a4708.mockapi.io/favorites',
          obj
        )
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты')
      console.log(error)
    }
  }

  const isItemAdded = (id) => {
    console.log(cartItems)
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <BrowserRouter>
        <div className="wrapper">
          <Header onClickCart={() => setCartOpened(true)} />
          <Route path="/favorites" exact={true}>
            <Favorites />
          </Route>
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemoveItem={onRemoveItem}
            opened={cartOpened}
          />
          <Route path="/" exact={true}>
            <Home
              items={items}
              cartItems={cartItems}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
