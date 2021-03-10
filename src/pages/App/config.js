export function reducer(state, action) {
  let cart = state.cart;
  let itemExist = cart.find(
    (item) => item.product.id === action.payload.product.id
  );

  switch (action.type) {
    // add to cart first time or increase quantity
    case 'ADD_TO_CART':
      if (itemExist) {
        let newCart = cart.filter(
          (item) => item.product.id !== action.payload.product.id
        );
        let newQuantity = itemExist.itemQuantity + 1;
        let newProduct = {
          product: {
            ...action.payload.product,
          },
          itemQuantity: newQuantity,
        };
        let finalCart = newCart.concat([newProduct]);
        return {
          ...state,
          cart: finalCart,
        };
      }

      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    // for increasing cart quantity
    case 'INCREASE_ITEM':
      const objIndex = cart.findIndex(
        (obj) => obj.product.id === action.payload.product.id
      );
      const updatedObj = {
        ...cart[objIndex],
        itemQuantity: cart[objIndex].itemQuantity + 1,
      };
      const increasedProduct = [
        ...cart.slice(0, objIndex),
        updatedObj,
        ...cart.slice(objIndex + 1),
      ];

      return {
        ...state,
        cart: [...increasedProduct],
      };

    // for reducing cart quantity
    case 'DECREASE_ITEM':
      let _newCart = cart.filter(
        (item) => item.product.id !== action.payload.product.id
      );
      let reducedQty = itemExist.itemQuantity - 1;

      // when quantity is zero
      if (reducedQty <= 0) {
        return {
          ...state,
          cart: _newCart,
        };
      }

      const deleteIndex = cart.findIndex(
        (obj) => obj.product.id === action.payload.product.id
      );
      const deletedObj = {
        ...cart[deleteIndex],
        itemQuantity: cart[deleteIndex].itemQuantity - 1,
      };
      const reducedProduct = [
        ...cart.slice(0, deleteIndex),
        deletedObj,
        ...cart.slice(deleteIndex + 1),
      ];

      return {
        ...state,
        cart: [...reducedProduct],
      };

    // delete from cart when CloseButton is clicked
    case 'REMOVE_FROM_CART':
      let filteredCart = cart.filter(
        (item) => item.product.id !== action.payload.product.id
      );
      return {
        ...state,
        cart: filteredCart,
      };

    default:
      return state;
  }
}

// state for useReducer
export const initialState = {
  cart: [],
};
