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

export const signIn = async (email: string, password: string): Promise<any> => {
  const response = await fetch('http://localhost:3000/api/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
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

export const getProducts = async (category: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/getProducts?category=${category}`, {
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
    console.error('Error fetching user products:', error);
    throw error;
  }
};