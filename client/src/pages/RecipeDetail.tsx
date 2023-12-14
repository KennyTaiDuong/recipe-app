import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import { RecipeProps } from "./Home";

const RecipeContainer = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const StyledImg = styled.img`
  width: 100%;
`

const RecipeName = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
`

const Subheading = styled.p`
  text-decoration: underline;
  margin-bottom: 0.5rem;
`

const IngredientList = styled.ul`
  list-style: none;
`

const IngredientItem = styled.li`
  
`

export const RecipeDetail = () => {
  const { id } = useParams()
  const { recipes }: RecipeProps = useOutletContext()

  const specifiedRecipe = recipes.filter((recipe) => {
    if (`${recipe.id}` === id) {
      return recipe
    }
  })

  const IngredientElements = specifiedRecipe[0]?.ingredients?.map((item, index) => {
    return (
      <IngredientItem key={index}>
        <strong>{item.measurement}</strong> {item.name}
      </IngredientItem>
    )
  })

  return (
    <RecipeContainer>
      <StyledImg src={specifiedRecipe[0]?.image} />
      <TextContainer>
        <RecipeName>{specifiedRecipe[0]?.name}</RecipeName>
        <IngredientList>
          <Subheading>Here is what you need to make it:</Subheading>
          {IngredientElements}
        </IngredientList>
      </TextContainer>
    </RecipeContainer>
  )
}