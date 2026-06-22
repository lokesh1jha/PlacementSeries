import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useTheme } from '../../../../part-5/divFinder/src/context/ThemeContext'
function RootLayout() {
    const { darkMode } = useTheme();

    return (
        <div style={{
            minHeight: "100vh",
            background: darkMode ? "#0D1117" : "#F6F8FA",
            color: darkMode ? "#E6EDF3" : "#1F2328",
            transition: "background 0.2s, color 0.2s"
        }}>

            <NavBar />
            <main style={{ padding: "32px 24px", maxWidth: "960px", margin: "0 auto" }}>
                <Outlet />
            </main>
        </div>
    )
}

export default RootLayout