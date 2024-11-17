const { supabase } = require('./supabaseClient');

const getTokens = async () => {
  const { data, error } = await supabase
    .from('tokens')
    .select('*');
  if (error) throw error;
  return data;
};

const createToken = async (tokenData) => {
  const { data, error } = await supabase
    .from('tokens')
    .insert(tokenData)
    .single();
  if (error) throw error;
  return data;
};

const deleteToken = async (id) => {
  const { error } = await supabase
    .from('tokens')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
};

module.exports = {
  getTokens,
  createToken,
  deleteToken,
};
