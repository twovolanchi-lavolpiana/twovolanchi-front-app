import { Box, Grid } from "@mui/material"
import Navbar from "./Navbar"
import { Board } from "./Board"

interface MainComponentProps {
    darkMode: boolean;
    onThemeChange: () => void;
}

const MainComponent = (props: MainComponentProps) => {
    return <>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column">
            <div className="App">
                <div className="App-container">
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                            <Navbar darkMode={props.darkMode} onThemeChange={props.onThemeChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <Board />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Box></>
}

export default MainComponent;