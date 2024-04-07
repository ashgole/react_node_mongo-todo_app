import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
    <Outlet/>
    <div>Footer</div>
    </>
  )
}

export default Layout