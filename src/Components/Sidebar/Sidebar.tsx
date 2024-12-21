import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';
import { useQuery } from '@apollo/client';
import { GetAllSpecies } from '@/Utils/Queries/AllSpecies';

type SidebarProps = {
  display: boolean;
  toggleSideBar: () => void;
  filters: { status: string[]; species: string[] };
  setFilters: React.Dispatch<React.SetStateAction<{ status: string[]; species: string[] }>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
};

const Sidebar: React.FC<SidebarProps> = ({ display, toggleSideBar, filters, setFilters, sortOption, setSortOption }) => {
  const [speciesList, setSpeciesList] = useState<string[]>([]);

  const { loading, error, data, fetchMore } = useQuery(GetAllSpecies, {
    variables: { page: 1 },
    onCompleted: (data) => {
      if (data?.characters?.results) {
        const initialSpecies = data.characters.results.map((char: { species: string }) => char.species);
        setSpeciesList((prev) => Array.from(new Set([...prev, ...initialSpecies])));
      }
    },
  });

  useEffect(() => {
    const fetchAllSpecies = async () => {
      let nextPage = data?.characters?.info?.next;
      while (nextPage) {
        const { data: nextData } = await fetchMore({
          variables: { page: nextPage },
        });
        if (nextData?.characters?.results) {
          const newSpecies = nextData.characters.results.map((char: { species: string }) => char.species);
          setSpeciesList((prev) => Array.from(new Set([...prev, ...newSpecies])));
          nextPage = nextData.characters.info.next;
        } else {
          nextPage = null; // Stop if no next page
        }
      }
    };

    if (data?.characters?.info?.next) {
      fetchAllSpecies();
    }
  }, [data, fetchMore]);

  const handleFilterChange = (filterType: "status" | "species", value: string) => {
    setFilters((prev) => {
      const currentFilter = prev[filterType];
      if (currentFilter.includes(value)) {
        return { ...prev, [filterType]: currentFilter.filter((item) => item !== value) };
      } else {
        return { ...prev, [filterType]: [...currentFilter, value] };
      }
    });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortOption(event.target.value);
  };

  if (loading) return <p>Loading species...</p>;
  if (error) return <p>Error loading species</p>;

  return (
    <div className={`${display ? styles.filterContainerSideBar : styles.displayNone}`}>
      <div className={styles.filterSideBar}>
        <p>Filter: </p>
        <div className={styles.speciesStatus}>
          <div className={styles.statusFilter}>
            <p>Status: </p>
            {['Alive', 'Dead', 'unknown'].map((status) => (
              <div key={status}>
                <label>{status}</label>
                <input
                  type="checkbox"
                  name={status}
                  id={status}
                  checked={filters.status.includes(status)}
                  onChange={() => handleFilterChange('status', status)}
                />
              </div>
            ))}
          </div>
          <div className={styles.SpeciesFilter}>
            <p>Species: </p>
            {speciesList.map((species, index) => (
              <div key={index}>
                <label>{species}</label>
                <input
                  type="checkbox"
                  name={species}
                  id={species}
                  checked={filters.species.includes(species)}
                  onChange={() => handleFilterChange('species', species)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.speciesStatus}>
          <div className={styles.statusFilter}>
            <p>Sort By: </p>
            <div>
              <label>Default</label>
              <input
                  type="radio"
                  value="default"
                  checked={sortOption === 'default'}
                  onChange={handleSortChange}
                />
            </div>
            <div>
              <label>Name</label>
              <input
                  type="radio"
                  value="name"
                  checked={sortOption === 'name'}
                  onChange={handleSortChange}
                />
            </div>
            <div>
              <label>Origin</label>
              <input
                  type="radio"
                  value="origin"
                  checked={sortOption === 'origin'}
                  onChange={handleSortChange}
                />
            </div>
          </div>
        </div>
      </div>
      <p className={styles.doneBTN} onClick={toggleSideBar}>
        DONE
      </p>
    </div>
  );
};

export default Sidebar;
