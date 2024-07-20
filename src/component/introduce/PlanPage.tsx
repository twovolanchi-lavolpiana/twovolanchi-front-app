import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Divider, Grid, Icon, IconButton, IconButtonProps, Typography } from "@mui/material"
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
import { AddOutlined, GitHub, MoreVertOutlined, ShareOutlined } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { useTranslation } from "react-i18next";
import CheckIcon from '@mui/icons-material/Check';

interface PremiumComponentProps {
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

const PlanPage = (props: PremiumComponentProps) => {
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


    const plans = [
        {
            title: "Free Plan",
            price: "$0",
            period: "/ month",
            buttonText: "Active",
            buttonVariant: "contained",
            buttonColor: "error",
            features: [
                "Default Team Color",
                "Default Green Ground",
                "Default Player Icon",
                "3 Team Recommendations",
                "Simulation Play"
            ]
        },
        {
            title: "Premium Plan",
            price: "$3",
            period: "/ month",
            buttonText: "Subscribe",
            buttonVariant: "contained",
            buttonColor: "primary",
            features: [
                "Custom Team Color",
                "10 Special Grounds",
                "Custom Player Image",
                "Recommendations for 50 Teams Including 5 League",
                "Simulation Play & Download",
            ]
        },
    ];

    return <>
        <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Navbar darkMode={props.darkMode} onThemeChange={props.onThemeChange} />

            <Box mt={12} mb={8} width="100%" display="flex" justifyContent="center">
                <Card sx={{ width: '100%', maxWidth: 700 }}>
                    <CardHeader
                        title={t('Exciting New Plans Coming Soon!')}
                        titleTypographyProps={{ align: 'center', fontWeight: 'bold', fontSize: '2.0rem', color: '#3BB26F' }}
                    />
                </Card>
            </Box>

            <Grid container spacing={4} justifyContent="center" alignItems="center">
                {plans.map((plan, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index} display="flex" justifyContent="center">
                        <Card sx={{ width: '100%', maxWidth: 450 }}>
                            <CardHeader
                                title={t(plan.title)}
                                titleTypographyProps={{ align: 'center', fontWeight: 'bold' }}
                            />
                            <CardContent>
                                <Box display="flex" justifyContent="center" alignItems="baseline" mb={2}>
                                    <Typography component="h2" variant="h3" color="text.primary">
                                        {t(plan.price)}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary">
                                        {t(plan.period)}
                                    </Typography>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <Box component="ul" sx={{ listStyleType: 'none', p: 0, m: 0 }}>
                                    {plan.features.map((feature, idx) => (
                                        <Box component="li" display="flex" alignItems="center" mb={1} key={idx}>
                                            <CheckIcon fontSize="small" sx={{ color: 'success.main', mr: 1 }} />
                                            <Typography variant="body2" align="left">
                                                {t(feature)}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    </>
}

export default PlanPage;