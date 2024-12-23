const { supabase } = require('./supabaseClient');

// Fetch all products
const getProducts  = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, description, price, categories (id, name), discount, is_exclusive, arrival_date');
  if (error) return null;
  return data;
};

// Fetch products by category (not in use)
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
    .eq('products_id', product_id);

    console.log(data)

  if (error) return null;
  return data;
};

const getNewestProducts  = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, description, price, categories (id, name), discount, is_exclusive, arrival_date')
    .order('arrival_date', { ascending: false })
    .limit(8);
  if (error) return null;
  return data;
};

// Update stock by size
const updateStockBySize = async (product_id, quantity) => {
  const { data, error } = await supabase
    .from('sizes')
    .update({ stock: supabase.raw('stock - ?', [quantity]) })  // Decrease the stock by the quantity
    .eq('products_id', product_id);
  if (error) throw error;
  return data;
};

module.exports = {
  getProducts,
  getProductsByCategory,
  getImagesByProduct,
  getSizesByProduct,
  getNewestProducts,
  updateStockBySize
};
