import { Card, CardContent, Typography } from "@mui/material"

export type ShareDescriptionProps = {
    title: string,
    description: string,
}

export const ShareDescription: React.FC<ShareDescriptionProps> = ({ title, description }) => {
    return (
        <div>
            <div style={{ width: '100%', margin: 'auto', overflow: 'hidden', display: 'flex' }}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ flexGrow: 1, wordWrap: 'break-word', wordBreak: 'break-word', color: "white" }}>
                    {title}
                </Typography>
            </div>
            <Typography
                variant="body2"
                color="text.secondary"
                style={{ wordWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'pre-line', color: "white" }}
            >
                {description}
            </Typography>
        </div>
    );
}