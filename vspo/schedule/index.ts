import axios from "axios";
import * as cheerio from "cheerio";
import { Content, ContentRow } from "../../shareModel/schedule"; 
import * as fs from 'fs';
import { VSPOJson } from "./model/json";
import { delay } from '../../shareModel/prevent';
import { getOffsetDateString } from '../../shareModel/dateOffset';

 //https://www.vspo-schedule.com/ja/schedule/
const base = "https://www.vspo-schedule.com"
const scheduleUrl = base + "/ja/schedule/" // 後面接日期 yyyy-mm-dd 網頁預設 offset -5 ~ 1
const ytLink = 'https://www.youtube.com/watch?v=' // json livestream id

async function main() {
    for(let i = -5; i < 2; i++) {
        delay();
        const data = await getDetail(getOffsetDateString(i));
        fs.mkdirSync('vspo//schedule//output//' , { recursive: true });
        fs.writeFileSync('vspo//schedule//output//' + data.date.replace(/\//g, "-") + '.json', JSON.stringify(data.contents, null, 4));
    }

    console.log('done');
}


const getDetail = async (date: string): Promise<Content> => { 
    console.log("Get Schedule: " + date);
    const res = await axios.get(scheduleUrl + date.replace(/\//g, "-"))

    const $ = cheerio.load(res.data);
    const data = $('#__NEXT_DATA__').text() 
    const json = JSON.parse(data) as VSPOJson;
    var output = new Content(date, []);
    for(const stram of json.props.pageProps.livestreams){
        var dt = new Date(stram.scheduledStartTime);
        var row = new ContentRow(
            stram.title,
            [
                stram.iconUrl
            ],
            ytLink + stram.id,
            stram.thumbnailUrl,
            new String(dt.getHours()).padStart(2, '0') + ":" + new String(dt.getMinutes()).padStart(2, '0')
        )
        output.contents.push(row);
    }

    return output;
}

main()