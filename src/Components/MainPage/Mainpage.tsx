import React, { useEffect, useState, useRef, useCallback } from 'react';
import Card from "@/Components/Card/Card";
import styles from './page.module.css';
import Loading from '@/Components/Loading/Loading';
import { useQuery } from "@apollo/client";
import { GetAllCharacters } from "@/Utils/Queries/AllCharacters";
import Sidebar from '../Sidebar/Sidebar';

interface Character {
  id: string;
  name: string;
  status: string;
  gender: string;
  image: string;
  species: string;
  origin: {
    name: string;
  };
}

const Mainpage = () => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [filters, setFilters] = useState({
    status: [] as string[],
    species: [] as string[],
  });

  const pageRef = useRef(1);
  const allCharactersRef = useRef<Character[]>([]);

  const toggleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  const { loading, error, fetchMore } = useQuery(GetAllCharacters, {
    variables: { page: 1, status: filters.status.join(','), species: filters.species.join(',') },
    onCompleted: (data) => {
      if (data?.characters?.results) {
        setAllCharacters(data.characters.results);
        setFilteredCharacters(data.characters.results);
        allCharactersRef.current = data.characters.results;
      }
    },
  });

  const nextBatch = useCallback(() => {
    if (isFetching) return;

    setIsFetching(true);
    const nextPage = pageRef.current + 1;

    fetchMore({
      variables: { page: nextPage, status: filters.status.join(','), species: filters.species.join(',') },
    }).then(({ data: fetchMoreResult }) => {
        if (fetchMoreResult?.characters?.results) {
          const uniqueCharacters = fetchMoreResult.characters.results.filter(
            (newCharacter: Character) =>
              !allCharactersRef.current.some(
                (existing) => existing.id === newCharacter.id
              )
          );

          setAllCharacters((prev) => {
            const updated = [...prev, ...uniqueCharacters];
            allCharactersRef.current = updated;
            return updated;
          });

          pageRef.current = nextPage;
        }
        setIsFetching(false);
      })
      .catch((err) => {
        console.error("FetchMore error:", err);
        setIsFetching(false);
      });
  }, [fetchMore, isFetching, filters]);

  const checkBottom = useCallback(() => {
    if (isFetching || loading) return;

    const scrollPos = window.scrollY + window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollPos + 100 >= docHeight) {
      nextBatch();
    }
  }, [isFetching, loading, nextBatch]);

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;
    const handleScroll = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        checkBottom();
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [checkBottom]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = allCharacters;

      if (filters.status.length > 0) {
        filtered = filtered.filter((char) => filters.status.includes(char.status));
      }

      if (filters.species.length > 0) {
        filtered = filtered.filter((char) => filters.species.includes(char.species));
      }

      setFilteredCharacters(filtered);
    };

    applyFilters();
  }, [filters, allCharacters]);

  if (loading && allCharacters.length === 0) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.filterSortContainer}>
        <p>Filter</p>
        <p className={styles.FilterSortBTN} onClick={toggleSidebar}>Filter & Sort</p>
      </div>
      <Sidebar
        display={sidebar}
        toggleSideBar={toggleSidebar}
        filters={filters}
        setFilters={setFilters}
      />
      <div className={styles.cardsContainer}>
        {filteredCharacters.map((character: Character) => (
          <Card key={character.id} properties={character} />
        ))}
      </div>
      {isFetching && <p className={styles.loadingMoreAfter}>Loading more...</p>}
    </div>
  );
};

export default Mainpage;
