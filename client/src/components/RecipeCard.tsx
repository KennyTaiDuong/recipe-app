import styled from "styled-components";

const Container = styled.div`
  border: 1px solid rgb(175, 175, 175);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  padding: 1rem;
`

const TextContainer = styled.div`
  grid-column: 2;
  padding: 1rem;
`

const RecipeName = styled.p`
  font-weight: 500;
  font-size: 1.5rem;
`

const RecipeImage = styled.img`
  width: 100%;
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
  image: string
}

export const RecipeCard = ({ name, ingredients, image}: CardProps) => {
  const IngredientElements = ingredients?.map((item, index) => {
    return (
      <IngredientItem key={index}>
        <strong>{item.measurement}</strong> {item.name}
      </IngredientItem>
    )
  })

  return (
    <Container>
      <RecipeImage src={image} />
      <TextContainer>
        <RecipeName>{name}</RecipeName>
        <IngredientList>
          {IngredientElements}
        </IngredientList>
      </TextContainer>
    </Container>
  )
}