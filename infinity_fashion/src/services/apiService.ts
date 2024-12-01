import { userData } from "../types/types";

export const signUp = async (email: string, password: string, name: string): Promise<any> => {
  const response = await fetch('http://localhost:3000/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });
  return response.json();
};

export const signIn = async (email: string, password: string, isGoogleAuth: boolean): Promise<any> => {
  const response = await fetch('http://localhost:3000/api/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
      isGoogleAuth: isGoogleAuth
    }),
  });
      console.log("dentro de signIn");
  return response.json();
};

export const signOut = async (): Promise<any> => {
  const response = await fetch('http://localhost:3000/api/signout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
};

export const getUserProfile = async (email: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/getProfile?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};


export const getExistingUsers = async (): Promise<userData[]> => {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }

  return response.json(); // Devuelve los datos como `userData[]`
};


export const updateUserProfile = async (userData: any) => {
  const response = await fetch('http://localhost:3000/api/updateProfile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const getProducts = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/getProducts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductImages = async (product_id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/getProductImages?product_id=${product_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product images: ${response.statusText}`);
    }

    console.log(response)

    return await response.json();
  } catch (error) {
    console.error('Error fetching product images:', error);
    throw error;
  }
};

export const getProductSizesAndStock = async (product_id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/getSizesAndStock?product_id=${product_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product sizes: ${response.statusText}`);
    }

    console.log(response)

    return await response.json();
  } catch (error) {
    console.error('Error fetching product sizes:', error);
    throw error;
  }
};

export const getNewestProducts = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/getNewestProducts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch newest products: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching newest products:', error);
    throw error;
  }
};