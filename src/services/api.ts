const apiKey = 'AIzaSyCGWX4FpkpOgCSU4FVkT3QpbPBLjvLA_CQ';

export async function getYoutuber(channelId: string) {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`);
        const data = await response.json();
        const subscriberCount = parseInt(data.items[0].statistics.subscriberCount);
        const formattedSubscriberCount = subscriberCount.toLocaleString();
        
        return {
            subscriberCount, formattedSubscriberCount
            
        };
    } catch (error) {
        console.error('Ocorreu um erro ao obter os dados do canal:', error);
        throw error;
    }
}

