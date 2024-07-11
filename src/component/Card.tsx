import '../css/Card.css';
import { OutlinedButton } from "./OutlinedButton";
import { Stack } from "@mui/material";

export const Card = () => {
    return (
        <div className='cards'>
            <div className="cards__container">
                <Stack direction="column" spacing={2}>
                    <OutlinedButton
                        text="패스 하기"
                        onClick={(e) => console.log(e)}
                    />
                    <OutlinedButton
                        text="시뮬레이션"
                        onClick={(e) => console.log(e)}
                    />
                    <OutlinedButton
                        text="다음 시퀀스"
                        onClick={(e) => console.log(e)}
                    />
                </Stack>
            </div>
        </div>
    )
}