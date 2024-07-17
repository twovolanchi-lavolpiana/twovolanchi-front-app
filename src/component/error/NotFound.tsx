import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import Navbar from "../Navbar";

export interface NotFoundComponentProps {
    darkMode: boolean;
    onThemeChange: () => void;
}

const NotFoundPage: React.FC<NotFoundComponentProps> = (props) => {
    return (
        <Box minHeight="100vh" display="flex" flexDirection="column">
            <Box>
                <Navbar darkMode={props.darkMode} onThemeChange={props.onThemeChange} />
            </Box>
            <Box display="flex" flexGrow={1} alignItems="center" justifyContent="center">
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                        <Card sx={{ maxWidth: 800, textAlign: "center" }}>
                            <CardContent>
                                <div style={{ width: '100%', maxWidth: '500px', margin: 'auto' }}>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                                        Sorry, the URL you have entered is incorrect. <br /> Please check the link and try again. 😊
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default NotFoundPage;