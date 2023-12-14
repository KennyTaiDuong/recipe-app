import { ChangeEvent, FormEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid black;
  flex-direction: column;
  gap: 1rem;
  @media screen and (min-width: 520px) {
    flex-direction: row;
  }
`

const Logo = styled(NavLink)`
  font-size: 1.125rem;
  text-decoration: none;
  color: rgb(0, 0, 0);
  border: 2px solid black;
  padding: 0.25rem  0.5rem;
`

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: rgb(0, 0, 0);
`

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  justify-content: center;
`

const SearchBar = styled.input`
  border: 2px solid black;
  padding: 0.5rem;
  width: 100%;
  max-width: 30rem;

  &:focus {
    outline: none;
  }
`

const SearchButton = styled.button`
  border: 0;
  background-color: black;
  color: white;
  padding: 0.25rem 0.5rem;
`

const StyledButton = styled.button`
  border: 0;
  padding: 0.5rem;
  background: black;
  color: white;
  font-size: 1rem;
`

export const Header = () => {
  const [inputValue, setInputValue] = useState("")
  const navigate = useNavigate()

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    navigate(`/?query=${inputValue}`)
  }

  return (
    <HeaderContainer>
      <Logo to={"/"}>YumYum</Logo>
      <StyledForm onSubmit={(e) => handleFormSubmit(e)}>
        <SearchBar 
          type="text" 
          placeholder="Search for a recipe"
          onChange={(e) => handleSearchChange(e)}
          value={inputValue}
        />
        <SearchButton>Search</SearchButton>
      </StyledForm>
      <NavbarContainer>
        <StyledNavLink to={"/"}>Browse</StyledNavLink>
        <StyledButton>Post Recipe</StyledButton>
      </NavbarContainer>
    </HeaderContainer>
  )
}