const { supabase } = require('./supabaseClient');

const getCartItems = async () => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*');
  if (error) throw error;
  return data;
};

const getCartItemsByCartId = async (shoppingCartId) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*')
    .eq('shopping_cart_id', shoppingCartId); // Filtra por carrito
  if (error) throw error;
  return data;
};

const getCartItemsByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      shopping_carts(user_id)
    `)
    .eq('shopping_carts.user_id', userId); // Filtra por usuario
  if (error) throw error;
  return data;
};

const createCartItem = async (cartItem) => {
  try {
    const { data, error } = await supabase
    .from('cart_items')
    .insert(cartItem)
    .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error)
  }
};

const updateCartItem = async (id, updates) => {
  const { data, error } = await supabase
    .from('cart_items')
    .update(updates)
    .eq('id', id);
  if (error) throw error;
  return data;
};

const deleteCartItem = async (id) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
};

module.exports = {
  getCartItems,
  createCartItem,
  updateCartItem,
  deleteCartItem,
  getCartItemsByCartId,
  getCartItemsByUserId,
};
