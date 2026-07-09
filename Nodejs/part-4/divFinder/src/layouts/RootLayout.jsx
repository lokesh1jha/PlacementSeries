import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

function RootLayout() {
    return (
        <>
            <NavBar />
            <main style={{ padding: "24px" }} >
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout