


export interface Steam {
    id: string;
    title: string;
    description: string;
    channelId: string;
    channelTitle: string;
    thumbnailUrl: string;
    scheduledStartTime: number;
    actualEndTime: number;
    iconUrl: string;
    platform: string;
    twitchName: string;
    twitchPastVideoId: string;
    isTemp: boolean;
    tempUrl: string;
    formattedDateString: string;
    scheduledStartTimeUTC: string;
    scheduledStartTimeString: string;
    liveStatus: string;
}