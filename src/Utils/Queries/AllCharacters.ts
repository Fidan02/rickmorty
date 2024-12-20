import { gql } from '@apollo/client';

export const GetAllCharacters = gql`
    query GetCharacters($page: Int){
        characters(page: $page){
            results{
                id, name, status, species, gender, image,
                origin{
                    name
                },
            }
        }
    }
`

