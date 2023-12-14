import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { RecipeCard } from "../components/RecipeCard";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  max-width: 50rem;
  padding: 1rem;
`

const Heading = styled.h2`

`

interface RecipeProps {
  recipes: {
    id: number,
    image: string,
    ingredients: {
      name: string,
      measurement: string
    }[],
    name: string
  }[]
}

export const Home = () => {
  const { recipes }:RecipeProps = useOutletContext()

  const RecipeCards = recipes.map((recipe) => {
    const { id, image, ingredients, name } = recipe

    return (
      <RecipeCard key={id} id={id} image={image} ingredients={ingredients} name={name} />
    )
  })

  return (
    <HomeContainer>
      <Heading>View YumYum's Recipes</Heading>
      {RecipeCards}
    </HomeContainer>
  )
}