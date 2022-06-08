export const getFavorites = async (userId: string) => {
  const params = new URLSearchParams({
    userId,
  });
  const response = await fetch(`${process.env.HOST_NAME}/api/wishlist?${params}`);
  const data = await response.json();

  return data;
};
