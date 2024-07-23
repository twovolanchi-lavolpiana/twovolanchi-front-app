import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import Navbar from "../Navbar";
import background from '../../image/board.webp';
import boardImage from "../../image/board-background.jpg"
import { useTranslation } from "react-i18next";

export interface NotFoundComponentProps {
    darkMode: boolean;
    onThemeChange: () => void;
}

const NotFoundPage: React.FC<NotFoundComponentProps> = (props) => {
    const { t } = useTranslation();
    return <div className="App">
        <div className="App-container">
            <Navbar darkMode={props.darkMode} onThemeChange={props.onThemeChange} />
            <div className="second" style={{ overflow: 'hidden' }}>
                <img src={background} style={{
                    overflow: 'hidden'
                }} />
            </div>
            <div className="third">
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color={'white'}
                    style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                    {t('Not Found Message 1')}
                    <br/>
                    {t('Not Found Message 2')}
                </Typography>
            </div>

        </div>
    </div>
}

export default NotFoundPage;