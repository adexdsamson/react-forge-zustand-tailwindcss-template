import { Link } from "react-router-dom";

export const DashboardPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Forge Components</h2>
          <p className="text-gray-600 mb-4">
            Explore the different components and features available in the Forge library.
          </p>
          <Link
            to="/dashboard/wizard"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Try Wizard Form Example
          </Link>
        </div>
      </div>
    </div>
  )
}