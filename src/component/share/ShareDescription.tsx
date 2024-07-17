import { Card, CardContent, Typography } from "@mui/material"

export type ShareDescriptionProps = {
    title: string,
    description: string,
}

export const ShareDescription: React.FC<ShareDescriptionProps> = ({title, description}) => {
    return (
        <Card sx={{
            maxWidth: 700,
        }}>
            <CardContent>
                <div style={{  width: '100%', maxWidth: '500px', margin: 'auto', overflow: 'hidden'  }}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ flexGrow: 1, wordWrap: 'break-word', wordBreak: 'break-word' }}>
                        {title}
                    </Typography>
                </div>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ wordWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'normal' }}
                >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}