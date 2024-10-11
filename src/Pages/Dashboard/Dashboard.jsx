import { useEffect } from "react"
import { useTools } from "../../Hooks/useTools"

export const Dashboard = () => {
  const { navigate } = useTools()
  useEffect(() => {

    navigate("/category")
  },[])
  return (
    <div>Dashboard</div>
  )
}
