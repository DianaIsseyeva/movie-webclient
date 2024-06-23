export const toggleFavorite = (id: number): number[] => {
  const favorites = localStorage.getItem('favorites');
  let updatedFavorites = favorites ? JSON.parse(favorites) : [];

  if (updatedFavorites.includes(id)) {
    updatedFavorites = updatedFavorites.filter((favId: number) => favId !== id);
  } else {
    updatedFavorites.push(id);
  }

  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  return updatedFavorites;
};
