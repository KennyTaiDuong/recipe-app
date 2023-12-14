import { ChangeEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid black;
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
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: rgb(0, 0, 0);
`

const StyledForm = styled.form`

`

const SearchBar = styled.input`
  border: 0;
  border-radius: 1rem;
  padding: 0.5rem;
  width: 40%;
`

const SearchButton = styled.button`
  border: 0;
  background-color: black;
  color: white;
  padding: 0.25rem 0.5rem;
`

export const Header = () => {
  const [inputValue, setInputValue] = useState("")
  const navigate = useNavigate()

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  function handleSearchSubmit() {
    navigate(`/?query=${inputValue}`)
  }

  return (
    <HeaderContainer>
      <Logo to={"/"}>YumYum</Logo>
      <StyledForm>
        <SearchBar 
          type="text" 
          placeholder="Search for a recipe"
          onChange={(e) => handleSearchChange(e)}
          value={inputValue}
          onSubmit={() => handleSearchSubmit()}
        />
        <SearchButton>Search</SearchButton>
      </StyledForm>
      <NavbarContainer>
        <StyledNavLink to={"/"}>Browse</StyledNavLink>
      </NavbarContainer>
    </HeaderContainer>
  )
}