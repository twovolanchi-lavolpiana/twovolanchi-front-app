import { Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { Board } from "./Board";

interface ShareComponentProps {
    darkMode: boolean;
    onThemeChange: () => void;
}

interface ShareKeyParams {
    shareKey: string
  }

const ShareComponent = (props: ShareComponentProps) => {
    const { shareKey } = useParams<keyof ShareKeyParams>() as ShareKeyParams;
    console.log("shareKey = ", shareKey);

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
        </Box>
        </>
};

export default ShareComponent;