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
import { useTranslation } from "react-i18next";


interface MainComponentProps {
    darkMode: boolean;
    onThemeChange: () => void;
}

const GuidePage = (props: MainComponentProps) => {
    const dispatch = useDispatch()
    const { t } = useTranslation();

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
                <Typography paragraph sx={{ paddingBottom: 5 }}>
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
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-add-player-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{ paddingBottom: 5 }}>
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
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-add-ball-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{ paddingBottom: 5 }}>
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
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-player-move-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{ paddingBottom: 5 }}>
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
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-player-back-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{ paddingBottom: 5 }}>
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
                                {t('guide-player-remove-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{ paddingBottom: 5 }}>
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
                                {t('guide-edit-title-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{ paddingBottom: 5 }}>
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
                                {t('guide-recommend-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{ paddingBottom: 5 }}>
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
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-player-list-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{ paddingBottom: 5 }}>
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
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-player-edit-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{ paddingBottom: 5 }}>
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
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-simulation-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{ paddingBottom: 5 }}>
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
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-share-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
                <Typography paragraph sx={{ paddingBottom: 5 }}>
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
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-edit-tactics-description')}
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
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-shared-tactics-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Typography>
            </Box>
        </Box >
    );
}

export default GuidePage;