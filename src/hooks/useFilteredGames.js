import { useMemo } from 'react';

/**
 *
 * @param {Array<Object>} games 
 * @param {string} search 
 * @returns {Array<Object>}
 */
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