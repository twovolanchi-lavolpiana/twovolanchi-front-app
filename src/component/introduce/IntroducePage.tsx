import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, IconButton, IconButtonProps, Typography } from "@mui/material"
import Navbar from "../Navbar"
import { useDispatch } from "react-redux";
import { clearMultiSelectedPlayers, clearSelectedPlayer } from "../../store/PlayerSlice";
import { clearPlayers } from "../../store/PlayersListSlice";
import { clearPlayerViewState } from "../../store/PlayerViewSlice";
import { clearPossiblePlayerMoveState } from "../../store/PossiblePlayerMoveSlice";
import { clearBallSequences, clearPlayerMovingSequence } from "../../store/SequenceSlice";
import { clearSimulationOn, endSimulation } from "../../store/SimulationOnSlice";
import { clearPlayerId } from "../../store/PlayerIdSlice";
import { clearBall } from "../../store/BallSlice";
import { clearPossibleBallMoveState } from "../../store/PossibleBallMoveSlice";
import { useEffect, useState } from "react";
import { ExpandMoreOutlined, FavoriteOutlined, GitHub, MoreVertOutlined, ShareOutlined } from "@mui/icons-material";
import { styled } from '@mui/material/styles';

interface MainComponentProps {
    darkMode: boolean;
    onThemeChange: () => void;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const IntroducePage = (props: MainComponentProps) => {
    const dispatch = useDispatch()

    const handleReset = () => {
        dispatch(clearSelectedPlayer());
        dispatch(clearMultiSelectedPlayers());
        dispatch(clearPlayers());
        dispatch(clearPlayerViewState());
        dispatch(clearPossiblePlayerMoveState());
        dispatch(clearPlayerMovingSequence());
        dispatch(clearSimulationOn());
        dispatch(clearPlayerId());
        dispatch(clearBall());
        dispatch(clearBallSequences());
        dispatch(clearPossibleBallMoveState());
        dispatch(endSimulation())
    }

    useEffect(() => {
        handleReset();
    }, []);  // 빈 배열을 두 번째 인자로 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return <>
        <Box minHeight="100vh" display="flex" flexDirection="column">
            <Navbar darkMode={props.darkMode} onThemeChange={props.onThemeChange} />
            <Box display="flex" flexGrow={1} alignItems="center" justifyContent="center">
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                        <Card sx={{ maxWidth: 600 }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: 'green' }} aria-label="recipe">
                                        K
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertOutlined />
                                    </IconButton>
                                }
                                title="Koseyun"
                                subheader="koseyundeploy@gmail.com"
                            />
                            <CardContent>
                                <Typography variant="body1" color="text.secondary">
                                    Hello! <br /><br />
                                    I'm seyun Ko, a software engineer specializing in backend development. <br />
                                    I hope you enjoy and support my soccer tactics program! <br /><br />
                                    ... And just for fun, love you, 7. Son!
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites" component="a" href="https://github.com/gosekose" target="_blank">
                                    <GitHub />
                                </IconButton>
                                <IconButton aria-label="share" component="a" href="https://gose-kose.tistory.com" target="_blank">
                                    <ShareOutlined />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>

    </>
}

export default IntroducePage;