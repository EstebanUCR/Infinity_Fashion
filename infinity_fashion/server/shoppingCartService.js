const { supabase } = require('./supabaseClient');

const getShoppingCarts = async () => {
  const { data, error } = await supabase
    .from('shopping_carts')
    .select('*');
  if (error) throw error;
  return data;
};

const createShoppingCart = async (shoppingCart) => {
  const { data, error } = await supabase
    .from('shopping_carts')
    .insert(shoppingCart)
    .single();
  if (error) throw error;
  return data;
};

module.exports = {
  getShoppingCarts,
  createShoppingCart,
};
