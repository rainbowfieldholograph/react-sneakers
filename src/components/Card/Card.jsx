import React, { useContext, useState } from 'react'
import styles from './Card.module.scss'
import ContentLoader from 'react-content-loader'
import AppContext from '../../Context'

const Card = ({
  id,
  title,
  price,
  img,
  onPlus,
  onAddToFavorite,
  favorited = false,
  loading = false,
}) => {
  const { isItemAdded } = useContext(AppContext)
  const [isFavorite, setIsFavorite] = useState(favorited)
  const obj = { id, parentId: id, title, img, price }

  const onClickFavorite = () => {
    onAddToFavorite(obj)
    setIsFavorite(!isFavorite)
  }

  const onClickPlus = () => {
    onPlus(obj)
  }

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={180}
          height={220}
          viewBox="0 0 160 270"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="160" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="160" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onAddToFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                src={isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'}
                alt="Unlinked"
              />
            </div>
          )}
          <img width={'100%'} height={135} src={img} alt="Sneaker"></img>
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center mt-5">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price}</b>
            </div>
            {onPlus && (
              <button className="button" onClick={onClickPlus}>
                <img
                  src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                  alt="Plus"
                />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Card
