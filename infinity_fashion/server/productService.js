const { supabase } = require('./supabaseClient');

// Fetch products by category
const getProductsByCategory  = async (category) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', category);

  if (error) return null;
  return data;
};

// fetch images by product
const getImagesByProduct  = async (product_id) => {
  const { data, error } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', product_id);

  if (error) return null;
  return data;
};

// fetch sizes and stock by product
const getSizesByProduct  = async (product_id) => {
  const { data, error } = await supabase
    .from('sizes')
    .select('*')
    .eq('product_id', product_id);

  if (error) return null;
  return data;
};

// Update stock by size
// const updateStockBySize = async (product_id, quantity) => {
//   const { data, error } = await supabase
//     .from('sizes')
//     .update()
//     .eq('products_id', product_id);
//   if (error) throw error;
//   return data;
// };

module.exports = {
  getProductsByCategory,
  getImagesByProduct,
  getSizesByProduct,
  // updateStockBySize
};
