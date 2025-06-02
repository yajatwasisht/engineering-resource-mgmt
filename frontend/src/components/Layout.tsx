import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4 text-white flex justify-between">
        <div className="font-bold">Engineering RMS</div>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </div>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
