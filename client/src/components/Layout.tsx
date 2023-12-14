import { Outlet } from "react-router"
import { Header } from "./Header"
import { useEffect, useState } from "react"


export const Layout = () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("../../data.json")

        const data = await response.json()

        setRecipes(data.recipes)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Header />
      <Outlet context={{ recipes }} />
    </>
  )
}