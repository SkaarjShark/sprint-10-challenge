import React from 'react'
import { useGetOrdersQuery } from '../state/pizzaApi'
import { useSelector, useDispatch } from 'react-redux'
import { filterBySize } from '../state/pizzaSlice'

export default function OrderList() {
  const { data: orders } = useGetOrdersQuery()
  const orderFilter = useSelector((slice) => slice.filterState.sizeFilter)
  // console.log(orderFilter)
  const dispatch = useDispatch()
  function handleSelectSize(evt) {
    // console.log(evt.target.innerText)
    dispatch({ type: filterBySize, payload: evt.target.innerText })
  }
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders?.filter((items) => {
            if (orderFilter === "All") return true
            else return items.size === orderFilter
          })
            .map((items) => {
            return (
              <li key={items.id}>
                {items.toppings && <div>
                  {items.customer} ordered a size {items.size} with {items.toppings.length} topping{items.toppings.length !== 1 ? 's' : ''}
                </div>}
                {!items.toppings && <div>
                  {items.customer} ordered a size {items.size} with no toppings
                </div>}
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === orderFilter ? ' active' : ''}`
            return ( 
              <button
                onClick={handleSelectSize}
                data-testid={`filterBtn${size}`}
                className={className}
                key={size}>{size}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}
