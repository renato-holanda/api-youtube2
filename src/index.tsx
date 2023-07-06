import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import BasicCard from "./components/BasicCard";
import { getYoutuber } from "./services/api";
import { useEffect, useState } from 'react'
import youtubers from './services/youtubers.json'
import useMediaQuery from '@mui/material/useMediaQuery';

interface Data {
    subscribers: number;
    subs: string;
    name: string;
    channelId: string;
    avatar: string;
    link: string;
}


export default function Home() {

    const [youtubersArray, setYoutubersArray] = useState<Data[]>([])
    const [loading, setLoading] = useState(false)

    const matches = useMediaQuery('(min-width:720px)');



    const fetchData = async () => {
        setLoading(true)
        try {
            const updatedYoutubers = [];

            for (const youtuber of youtubers) {
                const data = await getYoutuber(youtuber.channelId);
                const updatedYoutuber = {
                    ...youtuber,
                    subscribers: data.subscriberCount,
                    subs: data.formattedSubscriberCount
                };
                updatedYoutubers.push(updatedYoutuber);
                updatedYoutubers.sort((a, b) => b.subscribers - a.subscribers);
            }
            setYoutubersArray(updatedYoutubers);
            setLoading(false)

        } catch (error) {
            console.error('Ocorreu um erro ao buscar os dados dos youtubers:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const startInterval = () => {
        const intervalId = setInterval(() => {
            fetchData();
        }, 50000);

        return intervalId;
    };

    useEffect(() => {
        const intervalId = startInterval();

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <Box sx={{ backgroundColor: '#525252', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
           {matches ? (
             <Typography sx={{ color: '#fff', fontSize: '2.5rem', fontWeight: '700' }}>Top 15 Youtube Sub Count</Typography>
           ) : (
            <Typography sx={{ color: '#fff', fontSize: '1.5rem', fontWeight: '700' }}>Top 15 Youtube Sub Count</Typography>
           )}
            <Grid container padding={3} marginTop={5} spacing={2} columns={{ xs: 4, sm: 4, md: 9, xl:10 }}>
                {youtubersArray.slice(0, 15).map((youtuber, index) => {
                    return (
                        <Grid item xs={4} sm={2} md={3}  xl={2} key={index}>
                            <BasicCard youtuber={youtuber} loading={loading} index={index} />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    )
}