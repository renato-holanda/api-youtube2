import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Youtuber {
    subscribers: number;
    subs: string;
    name: string;
    channelId: string;
    avatar: string;
    link: string;
}
interface BasicCardProps {
    youtuber: Youtuber
    loading: boolean;
    index: number;
}

export default function BasicCard({ youtuber, index }: BasicCardProps) {

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start'}}>
                <Typography sx={{ color: '#000', fontSize: '1.5rem', fontWeight: '700', backgroundColor: '#fff'}}>{`${index + 1}º`}</Typography>
                <iframe width={350} height={200} src={youtuber.link} ></iframe>
            </Box> 
            
        </>
    );
}