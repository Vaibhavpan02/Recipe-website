import React from 'react'
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
function Searched() {

    const[searchedRecipes, setSearchedRecipes]=useState([]);
    let params=useParams();
    const getSearched = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=e11956ddb9b7411282fe789b241b4aab&number=16&query=${name}`);
        const recipes = await data.json();
        setSearchedRecipes(recipes.results);
      };

      useEffect(()=>{
            getSearched(params.search);
      },[params.search]);

  return (
    <Grid>
        {searchedRecipes.map((item)=>{
            return(
                <Card key={item.id}>
                  <Link to={'/recipe/'+item.id}>
                    <img src={item.image} alt=""/>
                    <h4>{item.title}</h4>
                </Link>
                </Card>
            )
        })}

    </Grid>
  )

}
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  grid-gap: 2rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  h4 {
    text-align: center;
    padding: 0rem;
  }
`;

export default Searched