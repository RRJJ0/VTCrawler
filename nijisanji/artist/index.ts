import axios from 'axios';
import * as cheerio from 'cheerio'; 
import { Artist } from '../../shareModel/artist';
import { NUJIJson } from './model/json';
import { delay, getUserAgent } from '../../shareModel/prevent';
import { RelatedLink } from '../../shareModel/artist';
import * as fs from 'fs';

const base = "https://www.nijisanji.jp"
const artistUrl = base + "/talents?filter=nijisanji"
const artistJson = base + "/_next/data/_v-AX7HkMUtNEj0TXCJmU/ja/talents.json"  // 不知道這個啥時會不能用 :)

const detail = base + "/talents/l/" // 最後面帶入 json 的 slug 

var dataSet: Record<string, Array<Artist>> = {
    'にじさんじ': [],
    'NIJISANJI EN': [],     
    'VirtuaReal': []
}
axios.get<NUJIJson>(artistJson).then(async res => {   
    
    for (var i = 0; i < res.data.pageProps.allLivers.length; i++) {
        const liver = res.data.pageProps.allLivers[i];
        await delay(2000, 5000); 
        const art = await getDetail(-1, base + liver.images.head.url, liver.slug)
        if (art) {
            dataSet[liver.profile.affiliation[0]].push(art);
        }
    } 

    // create output folder
    fs.mkdirSync('nijisanji//artist//output', { recursive: true });
    for (const [key, value] of Object.entries(dataSet)) {
        fs.mkdirSync('nijisanji//artist//output//' + key, { recursive: true });
        value.forEach(art => {
            fs.writeFileSync('nijisanji//artist//output//' + key + '//'+ art.jpName + '.json', JSON.stringify(art, null, 2));
        });
    }



    console.log('done');
})

const getDetail = async (id: number, avatar: string, slug: string): Promise<Artist> => {
    console.log('Get Artist Detail: ' + slug);
    const art = new Artist(id, avatar, "", "", "", "", [], "", "", []);
    
    const response = await axios.get(detail + slug, {
        headers: getUserAgent()
    });
    
    const $ = cheerio.load(response.data);
    const mainContent = $('body#body').children('div#__next').children('div[class*=layout_layout]').children('main');
    const detailDiv = mainContent.children('div[class*=layout_inner]').children('div[class*=talents-detail_talentDetail]')
    const textContent = detailDiv.children('div[class*=talents-detail_upperParts]')
                                    .children('div[class*=talents-detail_contentsWrap]')
                                    .children('div[class*=talents-detail_textContents]')

    art.jpName = textContent.children('h1').text().replace(/\s/g, "");
    art.enName = textContent.children('p[class*=talents-detail_liverEnName]').text()
    art.introduction = textContent.children('p[class*=talents-detail_liverDescription]').text().replace(/\s/g, "");
 
    const section = detailDiv.children('section[class*=gallery-modal_galleryModal]')
                                .children('div.swiper')
                                .children('div.swiper-wrapper')  
    const indexTemp: Array<number> = [] 
    section.children('div[class*=gallery-modal_swiperSlide]').each((i, el) => {
        const index = Number($(el).attr('data-swiper-slide-index')); 
        if (indexTemp.indexOf(index) == -1) {  
            const img = $(el).children('span').children('noscript').text();
            const src = $(img).attr('src')
            if(src && src.startsWith("https://")) {
                indexTemp.push(index);
                art.style.push(src);
            }
        }
    })

    const video = textContent.children('div[class*=talents-detail_youtube]').children('iframe').attr('src');
    if (video) {
        art.video = video;
    }

    // relate link

    const links = detailDiv.children('div[class*=talents-detail_lowerParts]')
                            .children('div[class*=talents-detail_account]')
                            .children('div').not('div[class*=talents-detail_accountTitle]')
                            .children('div[class*=talent-sns-links_snsLinks]')
    links.children('div').each((i, el) => {
        $(el).children('a').each((i, e) => {
            const link = $(e).attr('href');
            const text = $(e).children('p').text();
            if(link && text) {
                const related = new RelatedLink(text, link);
                if(link.startsWith("/")) {
                    related.url = base + link;
                }
                art.relatedLinks.push(related);
            }
        })
    })

    return art;
}

 