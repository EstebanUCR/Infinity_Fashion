const { supabase } = require('./supabaseClient');

// Obtener historial de compras por user_id
const getPurchaseHistoryByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('purchase_histories')
    .select('*')
    .eq('user_id', userId); // Filtra por user_id

  if (error) {
    console.error('Error fetching purchase history by user_id:', error);
    throw error;
  }

  return data;
};

// Obtener historial de compras por shopping_cart_id
const getPurchaseHistoryByCartId = async (shoppingCartId) => {
  const { data, error } = await supabase
    .from('purchase_histories')
    .select('*')
    .eq('shopping_cart_id', shoppingCartId); // Filtra por shopping_cart_id

  if (error) {
    console.error('Error fetching purchase history by shopping_cart_id:', error);
    throw error;
  }

  return data;
};

// Crear un nuevo historial de compras
const createPurchaseHistory = async (purchaseData) => {
  const { data, error } = await supabase
    .from('purchase_histories')
    .insert(purchaseData)
    .single(); // Inserta un nuevo registro

  if (error) {
    console.error('Error creating purchase history:', error);
    throw error;
  }

  return data;
};

// Actualizar un historial de compras existente
const updatePurchaseHistory = async (id, updates) => {
  const { data, error } = await supabase
    .from('purchase_histories')
    .update(updates)
    .eq('id', id); // Actualiza el registro donde el ID coincida

  if (error) {
    console.error('Error updating purchase history:', error);
    throw error;
  }

  return data;
};

// Eliminar un historial de compras
const deletePurchaseHistory = async (id) => {
  const { error } = await supabase
    .from('purchase_histories')
    .delete()
    .eq('id', id); // Elimina el registro donde el ID coincida

  if (error) {
    console.error('Error deleting purchase history:', error);
    throw error;
  }

  return true;
};

module.exports = {
  getPurchaseHistoryByUserId,
  getPurchaseHistoryByCartId,
  createPurchaseHistory,
  updatePurchaseHistory,
  deletePurchaseHistory,
};
