import { Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

interface EditComponentProps {
    darkMode: boolean;
    onThemeChange: () => void;
}

const EditComponent = (props: EditComponentProps) => {
    const { editKey } = useParams();

    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column">
        <div className="App">
            <div className="App-container">
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Navbar darkMode={props.darkMode} onThemeChange={props.onThemeChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <div> editKey </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    </Box>
};

export default EditComponent;