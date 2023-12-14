import { NavLink } from "react-router-dom";
import styled from "styled-components";

const LinkContainer = styled(NavLink)`
  border: 1px solid rgb(175, 175, 175);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  row-gap: 1rem;
  padding: 1rem;
  text-decoration: 0;
  color: black;
`

const TextContainer = styled.div`
  grid-column: 1 / -1;
  padding: 0;

  @media screen and (min-width: 520px) {
    grid-column: 2;
    padding: 0 1rem;
  }
`

const RecipeName = styled.p`
  font-weight: 500;
  font-size: 1.5rem;
`

const RecipeImage = styled.img`
  width: 100%;
  grid-column: 1 / -1;

  @media screen and (min-width: 520px) {
    grid-column: 1;
  }
`

const IngredientList = styled.ul`
  list-style: none;
`

const IngredientItem = styled.li`
  
`

interface CardProps {
  name: string,
  ingredients: {
    name: string,
    measurement: string
  }[],
  image: string,
  id: number
}

export const RecipeCard = ({ id, name, ingredients, image}: CardProps) => {
  const IngredientElements = ingredients?.map((item, index) => {
    return (
      <IngredientItem key={index}>
        <strong>{item.measurement}</strong> {item.name}
      </IngredientItem>
    )
  })

  return (
    <LinkContainer to={`/recipes/${id}`} >
      <RecipeImage src={image} />
      <TextContainer>
        <RecipeName>{name}</RecipeName>
        <IngredientList>
          {IngredientElements}
        </IngredientList>
      </TextContainer>
    </LinkContainer>
  )
}