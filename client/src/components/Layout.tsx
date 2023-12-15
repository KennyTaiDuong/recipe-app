import { Outlet } from "react-router"
import { Header } from "./Header"
import { useEffect, useState } from "react"
import { AddRecipeForm } from "./AddRecipeForm"


export const Layout = () => {
  const [recipes, setRecipes] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/recipes")

        const data = await response.json()

        setRecipes(data.recipes)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [isFormOpen])

  return (
    <>
      <Header setIsFormOpen={setIsFormOpen} />
      <Outlet context={{ recipes }} />
      {isFormOpen && <AddRecipeForm setIsFormOpen={setIsFormOpen} recipes={{ recipes }} />}
    </>
  )
}