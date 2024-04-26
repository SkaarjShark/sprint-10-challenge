import React, { useReducer } from 'react'
import { useCreateOrdersMutation } from '../state/pizzaApi'
import { slice } from '../state/pizzaSlice'

const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'

const initialFormState = { // suggested
  fullName: '',
  size: '',
  toppings: [],
}

let failureText = ''

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { name, value } = action.payload
      return { ...state, [name]: value }
    }
    default:
      return state
  }
}

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState)
  const [createOrder, { isLoading, isError, isSuccess }] = useCreateOrdersMutation()
  const onChange = ({ target: {name, value } }) => {
    dispatch({ type: CHANGE_INPUT, payload: { name, value } })
  }
  const resetForm = () => {
    dispatch({ type: RESET_FORM })
  }
  const checkboxFunction = evt => {
    const id = evt.target.name
    // console.log(id)
    if (state.toppings.includes(id)) {
      let indexId = state.toppings.indexOf(id)
      state.toppings.splice(indexId, 1)
      // console.log(state.toppings)
    } else {
      state.toppings.push(id)
      // console.log(state.toppings)
    }      
  }
  async function onSubmit(evt) {
    evt.preventDefault()
    try {
      await createOrder(state).unwrap()
      resetForm()
    } catch (err) {
      console.log(err)
      if (err.data) failureText = err.data.message
    }
  }

  return (
    <form>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {isError && <div className='failure'>Order failed: {failureText}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            onChange={onChange}
            value={state.fullName}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select value={state.size} onChange={onChange} data-testid="sizeSelect" id="size" name="size">
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" onClick={checkboxFunction} />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" onClick={checkboxFunction} />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" onClick={checkboxFunction} />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" onClick={checkboxFunction} />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" onClick={checkboxFunction} />
          Ham<br /></label>
      </div>
      <input 
        data-testid="submit" 
        type="submit" 
        onClick={onSubmit}
      />
    </form>
  )
}
