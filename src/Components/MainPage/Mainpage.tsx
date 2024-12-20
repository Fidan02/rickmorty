"use client";
import React from 'react';
import Card from "@/Components/Card/Card";
import styles from './page.module.css';
import Loading from '@/Components/Loading/Loading';
import { useQuery } from "@apollo/client";
import { GetAllCharacters } from "@/Utils/Queries/AllCharacters";

const Mainpage = () => {
  const { loading, error, data } = useQuery(GetAllCharacters, {
    variables: { page: 1 },
  });


  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.filterSortContainer}>
        <p>Filter</p>
        <p className={styles.FilterSortBTN}>Filter & Sort</p>
      </div>
      <div className={styles.cardsContainer}>
        {data &&
          data.characters.results.map((characters: Character) => (
            <Card
              key={`${characters.id}`}
              properties={characters}
            />
          ))}
      </div>
      {loading && <p>Loading more...</p>}
    </div>
  );
};

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

export default Mainpage;
