import { gql } from '@apollo/client';

export const GetAllSpecies = gql`
    query GetSpecies($page: Int) {
        characters(page: $page) {
            results {
                species
            }
            info {
                next
            }
        }
    }
`