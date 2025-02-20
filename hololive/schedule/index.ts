import axios from 'axios';
import * as cheerio from 'cheerio';
import { Artist } from './model/artist';
import { Content, ContentRow } from './model/content';
import * as fs from 'fs';



const dateSet = new Array<Content>();
const artists = new Array<Artist>();

const scheduleUrl = "https://schedule.hololive.tv/lives"
// 日期下面  有4個時間區段 jsp 00:00~05:59 06:00~11:59 12:00~17:59 18:00~23:59
// cookie 放timezone 預設 Asia/Tokyo
// 如何區別日期 按照 div來看 不是日期的 第一個 div  col-12 col-sm-12 col-md-12  style padding-left:5px;padding-right: 5px; 裡面都會放div.navbar.navbar-inverse
// 直到遇到下一個日期前 該container 都是同一日期
// container 下面有3個row 1 時間 / br  2 主要內容 3 廣告
axios.get(scheduleUrl).then(res => { 
    const $ = cheerio.load(res.data);
    const mainSchedule = $('div#all').children('div.container'); 
    for (let i = 0; i < mainSchedule.length; i++) {
        const ch = mainSchedule.eq(i).children('div.row').eq(0).children('div.col-12.col-sm-12.col-md-12');
        const findDate = ch.eq(0).find('div.navbar.navbar-inverse');
        if(findDate.length > 0){
            const text = findDate.eq(0).children('div.holodule.navbar-text').text().replace(/\s/g, "");
            // deal time     
            dateSet.push(new Content(formatDate(text), []));
        }

        // deal main content
        const timeIndex = dateSet.length - 1;
        const mainContent = ch.eq(1).children('div.row').children('div.col-6.col-sm-4.col-md-3');
        for (let j = 0; j < mainContent.length; j++) {
            const a = mainContent.eq(j).children('a');
            const url = a.attr('href');

            const c = a.children('div.container').children('div.row').children('div.col-12.col-sm-12.col-md-12');
          
            // name and time

            const are1 = c.eq(0).children('div.row.no-gutters').children('div');
            const time = are1.eq(0).text().replace(/\s/g, "");
            const name = are1.eq(1).text().replace(/\s/g, "");

            //yt image
            const ytImg = c.eq(1).children('img').attr('src'); 

            // vt image
            const vtImg = c.eq(2).children('div.row.no-gutters.justify-content-between').children('div').children('img').attr('src');
            
            var artistId = findArtistId(name);
            if (artistId == -1) {
                artistId = artists.length + 1;
                artists.push(new Artist(artistId, name, vtImg ?? ""));
            }
            dateSet[timeIndex].contents.push(new ContentRow(artistId, url ?? "", ytImg ?? "", time));
        }
    }

    // exort json file
    fs.writeFileSync('hololive//schedule//output//artists.json', JSON.stringify(artists, null, 4));
    fs.writeFileSync('hololive//schedule//output//data.json', JSON.stringify(dateSet, null, 4));
 
    console.log('done');
}).catch(err => {
    console.log(err);
    process.exit(1);
});




const formatDate = (input: string): string => { 
    const match = input.match(/^(\d{2})\/(\d{2})/);
    if (!match) return '格式錯誤';
  
    const [, month, day] = match;
  
    // 取得當前年份，組成完整日期
    const year = new Date().getFullYear();
    const date = new Date(`${year}-${month}-${day}`);
  
    // 使用 Intl.DateTimeFormat 轉換日期
    const formattedDate = new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  
    return formattedDate;
  };
  


const findArtistId = (name: string): number => {
    for (let i = 0; i < artists.length; i++) {
        if (artists[i].name === name) {
            return artists[i].id;
        }
    }
    return -1;
}   