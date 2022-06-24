export const getFavorites = async (id: string) => {
  const response = await fetch(`${process.env.VERCEL_URL}api/wishlist?userId=${id}`);
  const data = await response.json();

  return data;
};
