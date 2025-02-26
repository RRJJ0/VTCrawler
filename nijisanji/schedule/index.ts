
import axios from 'axios';
import * as cheerio from 'cheerio'; 
import { Content, ContentRow } from '../../shareModel/schedule';
import * as fs from 'fs';
import { delay, getUserAgent } from '../../shareModel/prevent';
import { ScheduleData } from './model/scheduel';

const base = "https://www.nijisanji.jp"

const scheduleUrl = base + "/streams" // 網頁預設 offset -3 ~ 6

const scheduleApi = base + "/api/streams?day_offset=" // :) day_offset 今天往前 -  今天往後+

const scheduleRowDetailApi = base + "/api/streams-detail?id=" // 上面 api 裡面Row id


enum OffsetUnit {
    Day = 0,
    Month = 1,
    Year = 2
}
 

async function main() { 

    for (let i = -3; i < 7; i++) {
        const content = new Content(getOffsetDateString(i), []);
        // get schedule api
        console.log('Get Schedule: ' + content.date);
        await delay();
        const res = await axios.get<ScheduleData>(scheduleApi + i, {
            headers: getUserAgent()
        });
        
        for(const row of res.data.data) {
            const hours = String(new Date(row.attributes.start_at).getHours()).padStart(2, '0');
            const minutes = String(new Date(row.attributes.start_at).getMinutes()).padStart(2, '0');
            const contentRow = new ContentRow(
                row.attributes.title,
                [],
                row.attributes.url,
                row.attributes.thumbnail_url,
                hours + ":" + minutes
            );

            const index = res.data.included.findIndex(inc => inc.id === row.relationships.youtube_channel.data.id);
            if (index !== -1) {
                contentRow.artists.push(res.data.included[index].attributes.thumbnail_url!);
            }
            content.contents.push(contentRow);
        } 

        // output
        fs.mkdirSync('nijisanji//schedule//output', { recursive: true });
        fs.writeFileSync('nijisanji//schedule//output//' + content.date.replace(/\//g, "-") + '.json', JSON.stringify(content.contents, null, 4));
    }

    console.log('done');
}

const getOffsetDateString = (offset: number, unit: OffsetUnit = OffsetUnit.Day, date: Date = new Date()): string => {
 
    const newDate = new Date(date);

    switch (unit) {
        case OffsetUnit.Day:
            newDate.setDate(newDate.getDate() + offset);
            break;
        case OffsetUnit.Month:
            newDate.setMonth(newDate.getMonth() + offset);
            break;
        case OffsetUnit.Year:
            newDate.setFullYear(newDate.getFullYear() + offset);
            break;
    }

    return newDate.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

main();