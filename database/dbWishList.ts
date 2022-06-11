export const getFavorites = async (id: string) => {
  const response = await fetch(`${process.env.HOST_NAME}/api/wishlist?userId=${id}`);
  const data = await response.json();

  return data;
};
