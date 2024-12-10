import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type PokemonDetail = {
    id: string;
    name: string;
    number: string;
    weight: {
      minimum: string | undefined;
      maximum: string | undefined
    };
    height: {
      minimum: string | undefined;
      maximum: string | undefined
    };
    classification: string;
    types: string;
    image: string;
  };
  

const GET_POKEMON_DETAILS = gql`
query pokemon($id: String, $name: String){
  pokemon(id: $id, name: $name){
    id
    number
    name
    weight{
      minimum
      maximum
    }
    height{
      minimum
      maximum
    }
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
  }
}
`;

export const useGetPokemonDetail = (postId: string | undefined) => {

    const { data } = useQuery(GET_POKEMON_DETAILS, {
        variables: { id:  postId},
      });

    const pokemon: PokemonDetail = useMemo(() => data?.pokemon || [], [data]);
  
    return { pokemon };
  };
