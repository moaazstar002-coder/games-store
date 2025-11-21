import { useMemo } from 'react';

const useFilteredGames = (games, search) => {
  const filteredGames = useMemo(() => {
    if (!search || search.trim() === '') {
      return games; 
    }

    const lowerCaseSearch = search.toLowerCase();

    return games.filter((game) =>
      game.name.toLowerCase().includes(lowerCaseSearch)
    );
  }, [games, search]);

  return filteredGames;
};

export default useFilteredGames;