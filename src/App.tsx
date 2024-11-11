import { getAuth, useHeaders } from './components/Shared/account-manager'
import { useEffect, useState } from 'react'
import './App.css'
import { Navigate, useRoutes } from 'react-router-dom'
import { Loading } from './components/UI/Loading/loading'
import Home from './pages/Home/Home'
import Authorization from './pages/Authorization/Authorization'

const ProtectedRoute = ({ element }: any) => {
	const [checked, setChecked] = useState(false)
	const [authorized, setAuthorized] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const headers = useHeaders()

	useEffect(() => {
		const authenticate = async () => {
			setAuthorized(await getAuth(headers))
			setIsLoading(false)
			setChecked(true)
		}
		authenticate()
	}, [])

	return isLoading ? (
		<Loading />
	) : (
		checked && (authorized ? element : <Navigate to='/auth' replace />)
	)
}

const routes = [
	{
		path: '/',
		protected: true,
		element: <Home />,
	},
	{
		path: '/auth',
		protected: false,
		element: <Authorization />,
	},
]

export const App = () => {
	const routing = useRoutes(
		routes.map(route => ({
			...route,
			element: route.protected ? (
				<ProtectedRoute element={route.element} />
			) : (
				route.element
			),
		}))
	)

	return <>{routing}</>
}
