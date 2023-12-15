import React, { useState } from "react";
import styled from "styled-components";
import { RecipeProps } from "../pages/Home";

const DarkContainer = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 2;

  @media screen and (max-width: 520px) {
    padding: 0;
  }
`

const Container = styled.div`
  z-index: 3;
  width: 100%;
  max-width: 48rem;
  max-height: 80vh;
  background-color: white;
  padding: 1rem;
  border: 1px solid rgb(200, 200, 200);
  overflow: scroll;
`

const CloseButton = styled.button`
  background: 0;
  border: 0;
`

const Heading = styled.p`
  font-weight: 700;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const StyledLabel = styled.label`
  display: flex; 
  flex-direction: column;
  width: 100%;
`

const StyledInput = styled.input`
  padding: 0.5rem;
`

const StyledButton = styled.button`
  background: black;
  color: white;
  width: 100%;
  border: 0;
  padding: 0.5rem;
`

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const IngredientCounter = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

const CounterButton = styled.button`
  background: none;
  border: 0;
  font-size: 1.25rem;
`

const Counter = styled.p`

`

const IngredientListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const IngredientContent = styled.div`
  display: flex;
  gap: 1rem;
`

interface AddRecipeFormProps {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
  recipes: RecipeProps
}

interface Ingredient {
  name: string,
  measurement: string
}

export const AddRecipeForm = ({ setIsFormOpen, recipes }: AddRecipeFormProps) => {
  const [recipeName, setRecipeName] = useState("")
  const [imageLink, setImageLink] = useState("")
  const [ingredientCount, setIngredientCount] = useState(1)
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([])

  const IngredientElements = new Array(ingredientCount).fill(null).map((_, index) => {
    return (
      <IngredientContent key={index}>
        <StyledLabel htmlFor={`name-${index}`}>
          Ingredient Name
          <StyledInput 
            type="text"
            name={`name-${index}`}
            id={`name-${index}`}
            required
            onChange={(e) => {handleIngredientChange(e, index)}}
          />
        </StyledLabel>
        <StyledLabel htmlFor={`measurement-${index}`}>
          Amount
          <StyledInput 
            type="text"
            name={`measurement-${index}`}
            id={`measurement-${index}`}
            required
            onChange={(e) => {handleIngredientChange(e, index)}}
          />
        </StyledLabel>
      </IngredientContent>
    )
  })

  function handleIngredientChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const { name, value } = e.target;

    setIngredientList(prevList => {
      const updatedList = [...prevList];
      updatedList[index] = {
        ...updatedList[index],
        [name.split("-")[0]]: value,
      };
      return updatedList;
    });
  }

  async function postRecipe(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    
    const newRecipe = {
      id: recipes.recipes.length + 1,
      name: recipeName,
      image: imageLink,
      ingredients: ingredientList,
    }

    try {
      await fetch("http://localhost:3001/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe)
      })

      clearTextInputs()
      setIsFormOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  function clearTextInputs() {
    setRecipeName("")
    setImageLink("")
    setIngredientCount(1)
    setIngredientList([])
  }

  return (
    <DarkContainer onClick={() => setIsFormOpen(false)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => setIsFormOpen(false)}><strong>X</strong></CloseButton>
        <Heading>Add a recipe</Heading>
        <StyledForm>
          <StyledLabel htmlFor="name">
            Recipe Name
            <StyledInput 
              type="text"
              name="name"
              value={recipeName}
              required
              onChange={(e) => {setRecipeName(e.target.value)}}
            />
          </StyledLabel>
          <StyledLabel htmlFor="image">
            Image Link
            <StyledInput 
              type="text"
              name="image"
              value={imageLink}
              required
              onChange={(e) => {setImageLink(e.target.value)}}
            />
          </StyledLabel>
          <LabelContainer>
            <Heading>Ingredients</Heading>
            <IngredientCounter>
              <CounterButton 
                onClick={(e) => {
                  setIngredientCount(prev => prev === 1 ? 1 : prev - 1)
                  e.preventDefault()
                }}
              >
                -
              </CounterButton>

              <Counter>{ingredientCount}</Counter>

              <CounterButton 
                onClick={(e) => {
                  setIngredientCount(prev => prev + 1)
                  e.preventDefault()
                }}
              >
                +
              </CounterButton>
            </IngredientCounter>
          </LabelContainer>
          <IngredientListContainer>
            {IngredientElements}
          </IngredientListContainer>
          <StyledButton onClick={(e) => postRecipe(e)}>Submit Recipe</StyledButton>
        </StyledForm>
      </Container>
    </DarkContainer>
  )
}
