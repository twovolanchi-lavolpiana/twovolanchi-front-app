import { AppBar, Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, CssBaseline, Divider, Drawer, Grid, IconButton, IconButtonProps, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
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
import { ExpandMoreOutlined, FavoriteOutlined, GitHub, InboxOutlined, MailOutline, MoreVertOutlined, ShareOutlined } from "@mui/icons-material";
import AddPlayer from '../../image/guide-add-player.png'
import AddBall from '../../image/guide-add-ball.png'
import PlayerMove from '../../image/guide-player-move.png'
import PlayerBack from '../../image/guide-player-back.png'
import PlayerRemove from '../../image/guide-player-remove.png'
import Recommend from '../../image/guide-recommend.png'
import PlayerList from '../../image/guide-player-list.png'
import PlayerEdit from '../../image/guide-player-edit.png'
import SimulationVideo from '../../image/guide-simulation.mp4';
import Share from '../../image/guide-share.png'
import EditTactics from '../../image/guide-edit-tactics.png'
import SharedTactics from '../../image/guide-shared-tactics.png'
import EditTitle from '../../image/guide-edit-title.png'


interface MainComponentProps {
    darkMode: boolean;
    onThemeChange: () => void;
}

const GuidePage = (props: MainComponentProps) => {
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

    const drawerWidth = 240;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar darkMode={props.darkMode} onThemeChange={props.onThemeChange} />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {[
                            'Add Player',
                            'Add Ball',
                            'Player Move',
                            'Player Back',
                            'Player Stop',
                            'Player Remove',
                            'Edit Title',
                            'Recommend',
                            'Ground Reset',
                            'Player List',
                            'Player Edit',
                            'Simulation',
                            'Share',
                            'Edit Tactics',
                            'Shared Tactics',
                        ].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography paragraph sx={{paddingBottom: 5}}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={AddPlayer}
                            alt="Add Player"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                Add Player
                            </Typography>
                            <Typography variant="body2" color="text.secondary"  sx={{ lineHeight: 2 }}>
                                You can add players by clicking on the Home Team Player or Away Team Player.
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{paddingBottom: 5}}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={AddBall}
                            alt="Add Ball"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                Add Ball
                            </Typography>
                            <Typography variant="body2" color="text.secondary"  sx={{ lineHeight: 2 }}>
                                You can add a soccer ball by clicking on the Ball. <br />
                                Only one ball can be placed on the ground at a time. <br />
                                If you want to add a new ball, please remove the existing one first and then add the new one.
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{paddingBottom: 5}}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={PlayerMove}
                            alt="Player Move"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                Player Move
                            </Typography>
                            <Typography variant="body2" color="text.secondary"  sx={{ lineHeight: 2 }}>
                                After selecting a player, <br />
                                you can choose the desired position on the ground by clicking when the light appears. <br />
                                When you run the simulation, the player will move to the selected positions. <br />
                                You can see the selected positions connected by lines. To stop the movement, <br />
                                click on Player Stop. Ball Move works similarly for the ball.
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{paddingBottom: 5}}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={PlayerBack}
                            alt="Player Back"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                Player Back
                            </Typography>
                            <Typography variant="body2" color="text.secondary"  sx={{ lineHeight: 2 }}>
                                If you want to correct a player's movement, <br />
                                click on the player and then click on Player Back to return to the previous position. <br />
                                Ball Back works similarly for the ball.
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{paddingBottom: 5}}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={PlayerRemove}
                            alt="Player Remove"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                Player Remove
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                To delete a player, click on the player and then select Remove. <br />
                                Ball Remove works similarly for the ball.
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{paddingBottom: 5}}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={EditTitle}
                            alt="Edit itle"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                Edit Title
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                You can edit the title and description of your tactics. <br />
                                Please describe your amazing tactics, coach.
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{paddingBottom: 5}}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={Recommend}
                            alt="Recommend"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                Recommend
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                Clicking on Recommend Formation will quickly set up recommended tactics and a recommended team.
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{paddingBottom: 5}}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={PlayerList}
                            alt="Player List"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                Player List
                            </Typography>
                            <Typography variant="body2" color="text.secondary"  sx={{ lineHeight: 2 }}>
                                After adding players, you can check the Player List.
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{paddingBottom: 5}}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={PlayerEdit}
                            alt="Player Edit"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                Player Edit
                            </Typography>
                            <Typography variant="body2" color="text.secondary"  sx={{ lineHeight: 2 }}>
                                Double-click on a player to edit their name, number, and position.
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{paddingBottom: 5}}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia>
                            <video
                                src={SimulationVideo}
                                style={{ width: '100%', height: 'auto' }} // 비디오 스타일링 추가
                                controls
                            />
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                Simulation
                            </Typography>
                            <Typography variant="body2" color="text.secondary"  sx={{ lineHeight: 2 }}>
                                You can run the simulation if you have set at least one movement for a player or the ball.
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{paddingBottom: 5}}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={Share}
                            alt="Share"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                Share
                            </Typography>
                            <Typography variant="body2" color="text.secondary"  sx={{ lineHeight: 2 }}>
                                The Share function provides a link to share your tactics. <br />
                                Edit URL allows you to modify the simulation. <br />
                                Share URL allows you to replay the simulation. <br />
                                Since there is no login feature, please remember your Edit URL and Share URL. <br />
                                If you lose them, please contact koseyundeploy@gmail.com
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{paddingBottom: 5}}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={EditTactics}
                            alt="Edit Tactics"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                Edit Tactics
                            </Typography>
                            <Typography variant="body2" color="text.secondary"  sx={{ lineHeight: 2 }}>
                                When you go to the Edit URL, your saved tactics will be displayed.  <br />
                                After modifying your tactics,  <br />
                                click Save to update them.  <br />
                                The Share URL and Edit URL will remain the same even if you modify the simulation,  <br />
                                so you can use them permanently.
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={SharedTactics}
                            alt="Shared Tactics"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                Shared Tactics
                            </Typography>
                            <Typography variant="body2" color="text.secondary"  sx={{ lineHeight: 2 }}>
                                When you go to the Share URL, you can simulate the tactics created by the coach.  <br />
                                Shall we start creating tactics now?  <br />
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
            </Box>
        </Box >
    );
}

export default GuidePage;