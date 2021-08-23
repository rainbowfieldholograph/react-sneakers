import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../components/Card/Card'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function q() {
      try {
        setIsLoading(true)
        const { data } = await axios.get('https://611bc63922020a00175a4708.mockapi.io/orders')
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
        setIsLoading(false)
      } catch (error) {
        alert(error)
      }
    }
    q()
  }, [])

  return (
    <div className="p-40">
      <h1>Мои заказы</h1>
      <div className="d-flex flex-wrap mt-40">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => {
          return <Card key={index} loading={isLoading} {...item} />
        })}
      </div>
    </div>
  )
}

export default Orders
