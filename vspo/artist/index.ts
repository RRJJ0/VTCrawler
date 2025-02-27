import axios from "axios";
import * as cheerio from "cheerio";
import { Artist, RelatedLink } from "../../shareModel/artist"; 
import * as fs from 'fs';

const memberUrl = "https://vspo.jp/member/"

axios.get(memberUrl).then(res => {
    const $ = cheerio.load(res.data);
    const detailArea = $('body').children('div#member-new')
                                .children('div.inner.pages__inner.member__inner')
                                .children('div.pages__content.member__content');

    detailArea.children('div#member-single').each((i, el) => {
        const memberArea = $(el).children('ul.swiper-wrapper.member__single__list')
        const gourp = $(el).attr('data-id')?.replace(/-/g, "");

        memberArea.children('li').each((j, ele) => {
            const id = $(ele).attr('data-id')!;
            console.log("Get Artist Detail: " + id);
            const artist = new Artist(
                id,
                "",
                "",
                "",
                "",
                "",
                [],
                "",
                "",
                []
            )
            const profile = $(ele).children('div.member__profile')
            const info = profile.children('div.member__info').children('div.member__info__inner')
            const visual = profile.children('div.member__visual')

            artist.jpName = info.children('p.member__name').children('img').attr('alt')!
            artist.enName = info.children('p.member__name-en').text().replace(/\s/g, "")
            artist.introduction = info.children('p.member__text').text().replace(/\s/g, "")
            info.children('ul.member__sns').children('li.member__sns__item').each((k, e) => {
                const link = $(e).children('a').attr('href')
                if(link?.includes("twitter") || link?.includes("x.com")) {
                    artist.relatedLinks.push(new RelatedLink("x", link!))
                }else if (link?.includes("youtube")){
                    artist.relatedLinks.push(new RelatedLink("youtube", link!))
                }else {
                    artist.relatedLinks.push(new RelatedLink("", link!))
                }
            })

            artist.avatar = visual.children('div.member__visual__sd').children('img').attr('src')!
            visual.children('ul.member__visual__list').children('li.member__visual__item').each((k, e) => {
                const img = $(e).children('img').attr('src')
                if(img) {
                    artist.style.push(img!)
                }   
            })
            fs.mkdirSync('vspo//artist//output//' + gourp, { recursive: true });
            fs.writeFileSync('vspo//artist//output//' + gourp + '//'+ artist.jpName + '.json', JSON.stringify(artist, null, 4));
        })

         
    })
    
    console.log('done');

}).catch(err => {
    console.log(err);
    process.exit(1);
})