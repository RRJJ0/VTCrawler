import axios from 'axios';
import * as cheerio from 'cheerio';
import { Artist, RelatedLink } from './model/artist';
import * as fs from 'fs';

const artistUrl = "https://hololive.hololivepro.com/talents"

// main 內有三個區域 1 標題 2 選項 3 內容
// 1. div.in_tit_box pink fade_t isPlay_t
// 2. section#nav_tag
// 3. div.in_talent fade_b isPlay_b

/* li sample
<li style="height: 235px;">
    <a href="https://hololive.hololivepro.com/talents/tokino-sora/" style="height: 235px;">
        <figure>
            <img 
                width="340" 
                height="340" 
                src="https://hololive.hololivepro.com/wp-content/uploads/2021/05/tokino_sora_thumb.png" 
                class="attachment-large size-large wp-post-image" 
                alt="" decoding="async" 
                fetchpriority="high" 
                srcset="https://hololive.hololivepro.com/wp-content/uploads/2021/05/tokino_sora_thumb.png 340w, 
                https://hololive.hololivepro.com/wp-content/uploads/2021/05/tokino_sora_thumb-300x300.png 300w, 
                https://hololive.hololivepro.com/wp-content/uploads/2021/05/tokino_sora_thumb-150x150.png 150w" 
                sizes="(max-width: 340px) 100vw, 340px">
        </figure>
        <h3 style="height: 42px;">
            ときのそら
            <span>Tokino Sora</span>
        </h3>
    </a>
</li>
*/
axios.get(artistUrl).then(async res => { 
    const $ = cheerio.load(res.data);   
    const mainContent = $('body.in').children('div#container').children('main');
    const liGroup = mainContent.children('div.in_talent.fade_b').children('div.container').children('ul.talent_list').children('li');
    
    for (let i = 0; i < liGroup.length; i++) {
        const li = liGroup.eq(i);
        const a = li.children('a');
        const detailUrl = a.attr('href');   
        const avatar = a.children('figure').children('img').attr('src');  
        const name = a.children('h3').text().replace(/\s/g, "");
        const detail = await getArtistDetail(i + 1, avatar ?? "", detailUrl!);
        fs.writeFileSync('hololive//artist//output//' + name + '.json', JSON.stringify(detail, null, 4));
    }


    console.log('done');
   
}).catch(err => {
    console.log(err);
    process.exit(1);
});




/* detail sample  
<div class="talent_top">
    <div class="container">
        <div class="talent_left" id="talent_figure">
            <div class="img_change">
            <div class="swiper-container swiper-container-initialized swiper-container-vertical">
                <ul class="swiper-wrapper" style="transform: translate3d(0px, -88px, 0px); transition-duration: 0ms;">
                    <li class="swiper-slide swiper-slide-prev" style="height: 88px;">
                        <img width="100" height="107" 
                            src="https://hololive.hololivepro.com/wp-content/uploads/2021/05/１枚目.png" 
                            class="attachment-medium size-medium" alt="" decoding="async">
                    </li>
                    <li class="swiper-slide swiper-slide-active" style="height: 88px;">
                        <img width="100" height="107" 
                            src="https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_megane_07.png" 
                            class="attachment-medium size-medium" alt="" decoding="async">
                    </li>
                    <li class="swiper-slide swiper-slide-next" style="height: 88px;">
                        <img width="100" height="107" 
                            src="https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_megane_06.png" 
                            class="attachment-medium size-medium" alt="" decoding="async">
                    </li>
                    <li class="swiper-slide" style="height: 88px;">
                        <img width="100" height="107" 
                            src="https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_megane_05.png" 
                            class="attachment-medium size-medium" alt="" decoding="async" loading="lazy">
                    </li>
                    <li class="swiper-slide" style="height: 88px;">
                        <img width="100" height="107" src="https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_megane_04.png" 
                            class="attachment-medium size-medium" alt="" decoding="async" loading="lazy">
                    </li>
                    <li class="swiper-slide" style="height: 88px;">
                        <img width="100" height="107" src="https://hololive.hololivepro.com/wp-content/uploads/2024/07/Tokino-Sora_megane_03.png" 
                        class="attachment-medium size-medium" alt="" decoding="async" loading="lazy">
                    </li>
                </ul>
            <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
            <div class="swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide" aria-disabled="false"></div>
            <div class="swiper-button-next swiper-button-disabled" tabindex="0" role="button" aria-label="Next slide" aria-disabled="true"></div>
            </div>
            <figure>
                <img width="556" height="1000" 
                    src="https://hololive.hololivepro.com/wp-content/uploads/2021/04/unnamed-file-6-556x1000.png" 
                    class="" alt="" decoding="async" loading="lazy" 
                    srcset="https://hololive.hololivepro.com/wp-content/uploads/2021/04/unnamed-file-6-556x1000.png 556w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2021/04/unnamed-file-6-167x300.png 167w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2021/04/unnamed-file-6-768x1380.png 768w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2021/04/unnamed-file-6-855x1536.png 855w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2021/04/unnamed-file-6-1139x2048.png 1139w" 
                    sizes="auto, (max-width: 556px) 100vw, 556px">
                <img width="1344" height="1440"
                    src="https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img_07-1344x1440.png" 
                    class="attachment-large size-large active" alt="" decoding="async" loading="lazy" 
                    srcset="https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img_07-1344x1440.png 1344w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img_07-597x640.png 597w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img_07-768x823.png 768w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img_07.png 1400w" sizes="auto, 
                    (max-width: 1344px) 100vw, 1344px">
                <img width="1344" height="1440" 
                    src="https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img06-1344x1440.png" 
                    class="attachment-large size-large" alt="" decoding="async" loading="lazy" 
                    srcset="https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img06-1344x1440.png 1344w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img06-597x640.png 597w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img06-768x823.png 768w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img06.png 1400w" sizes="auto, 
                    (max-width: 1344px) 100vw, 1344px">
                <img width="800" height="1438" 
                    src="https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img05.png" 
                    class="attachment-large size-large" alt="" decoding="async" loading="lazy" 
                    srcset="https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img05.png 800w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img05-356x640.png 356w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img05-768x1380.png 768w" 
                    sizes="auto, (max-width: 800px) 100vw, 800px">
                <img width="1344" height="1440" 
                    src="https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img_04-1344x1440.png" 
                    class="attachment-large size-large" alt="" decoding="async" loading="lazy" 
                    srcset="https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img_04-1344x1440.png 1344w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img_04-597x640.png 597w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img_04-768x823.png 768w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2020/06/Tokino-Sora_pr-img_04.png 1400w" sizes="auto, 
                    (max-width: 1344px) 100vw, 1344px">
                <img width="1344" height="1440" 
                    src="https://hololive.hololivepro.com/wp-content/uploads/2024/07/Tokino-Sora_pr-img_03-1344x1440.png" 
                    class="attachment-large size-large" alt="" decoding="async" loading="lazy" 
                    srcset="https://hololive.hololivepro.com/wp-content/uploads/2024/07/Tokino-Sora_pr-img_03-1344x1440.png 1344w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2024/07/Tokino-Sora_pr-img_03-597x640.png 597w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2024/07/Tokino-Sora_pr-img_03-768x823.png 768w, 
                    https://hololive.hololivepro.com/wp-content/uploads/2024/07/Tokino-Sora_pr-img_03.png 1400w" sizes="auto, 
                    (max-width: 1344px) 100vw, 1344px">
            </figure>
        </div>

        <div class="right_box">
            <div class="bg_box">
                <h1>
                    ときのそら
                    <span>Tokino Sora</span>
                </h1>
                <p class="catch">
                    「そらとものみんなー！元気ー？ときのそらです！」
                </p>
                <p class="txt">
                    2017年9月7日より活動を開始、ホロライブプロダクション初のバーチャルアイドル。歌とホラーゲームが大好きで、活動当初からの夢は「横浜アリーナでライブをすること」。<br>
                    2019年3月にビクターエンタテインメントからメジャーデビュー。一人前のアイドルを目指すために、女優としてTVドラマ『四月一日さん家の』に出演したり、ラジオ『そらあおと！』ではMCを務めるなど、<br>
                    様々なジャンルでアクティブに活動中。2019年10月6日にはときのそら初の単独ライブ「Dream!」を開催、自身の夢に一歩近づいた。<br>
                    <video 
                        src="https://hololive.hololivepro.com/wp-content/uploads/2021/05/0_そら.mp4" 
                        autoplay="" loop="" muted="" playsinline="" width="100%" height="auto" __idm_id__="2613249"></video>
                </p>
                <div class="t_icon">
                </div>
                <ul class="t_sns clearfix">
                    <li>
                        <a href="https://www.youtube.com/channel/UCp6993wxpyDPHUpavwDFqgg?sub_confirmation=1" target="_blank">YouTube</a>
                    </li>
                    <li>
                        <a href="https://twitter.com/tokino_sora" target="_blank">X</a>
                    </li>
                    <li>
                        <a href="https://tokinosora-fc.com/" target="_blank">OFFICIAL FAN CLUB</a>
                    </li>
                    <li>    
                        <a href="https://www.jvcmusic.co.jp/-/Artist/A026407.html" target="_blank">VICTOR ENTERTAINMENT</a>
                    </li>
                    <li>
                        <a href="https://3d.nicovideo.jp/works/td63641" target="_blank">MMD</a>
                    </li>
                    <li>
                        <a href="https://hololive.hololivepro.com/special/1937/" target="_blank">ARアプリ『hololy』で会う</a>
                    </li>
                </ul>
                <p class="voice">
                    <a onclick="sound()">ボイスを再生</a>
                </p>
                <audio id="sound-file" preload="auto" __idm_id__="2613250">
                    <source src="https://hololive.hololivepro.com/wp-content/uploads/2021/04/sora_voice_1.wav" type="audio/wav">
                </audio> 
            </div>
        </div>

        <div class="bg" id="talent_bg">
        <div><img width="1068" height="1920" src="https://hololive.hololivepro.com/wp-content/uploads/2021/04/unnamed-file-6.png" class="attachment-1920x1920 size-1920x1920" alt="" decoding="async" loading="lazy" srcset="https://hololive.hololivepro.com/wp-content/uploads/2021/04/unnamed-file-6.png 3783w, https://hololive.hololivepro.com/wp-content/uploads/2021/04/unnamed-file-6-167x300.png 167w, https://hololive.hololivepro.com/wp-content/uploads/2021/04/unnamed-file-6-556x1000.png 556w, https://hololive.hololivepro.com/wp-content/uploads/2021/04/unnamed-file-6-768x1380.png 768w, https://hololive.hololivepro.com/wp-content/uploads/2021/04/unnamed-file-6-855x1536.png 855w, https://hololive.hololivepro.com/wp-content/uploads/2021/04/unnamed-file-6-1139x2048.png 1139w" sizes="auto, (max-width: 1068px) 100vw, 1068px"></div>
    </div>

</div>
*/
const getArtistDetail = async (id: number, avatar: string, url: string): Promise<Artist> => {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);  
    const mainInfo = $('body.in').children('div#container').children('main');
    const artist = new Artist(
        id,
        avatar,
        '',
        '',
        '',
        '',
        [],
        '',
        '',
        []
    );
    const talentTop = mainInfo.children('article.in_talent.single').children('div.talent_top').children('div.container');
    
    // right_box
    // Get names
    const rightBox = talentTop.children('div.right_box').children('div.bg_box');
    const h1 = rightBox.children('h1'); 
    artist.enName = h1.children('span').text().trim();
    artist.jpName = h1.text().replace(artist.enName, "").trim();
   
    // Get slogan and introduction
    artist.slogan = rightBox.children('p.catch').text().trim();
    artist.introduction = rightBox.children('p.txt').contents().not('video').text().trim();
    
    // Get video URL if exists
    const video = rightBox.find('video');
    artist.video = video.length > 0 ? video.attr('src') || '' : '';
    
    // Get audio URL if exists
    const audio = rightBox.find('audio#sound-file').children('source'); 
    artist.audio = audio.length > 0 ? audio.attr('src') || '' : '';
    
    // Get related links
    artist.relatedLinks = [];
    rightBox.children('ul.t_sns.clearfix').find('li a').each((_, elem) => {
        const link = new RelatedLink(
            $(elem).text().trim(),
            $(elem).attr('href') || ''
        );
        artist.relatedLinks.push(link);
    });
    
    // talent_left
    // Get style 
    const talentLeft = talentTop.children('div.talent_left');
    talentLeft.children('figure').find('img').each((_, elem) => {
        artist.style.push($(elem).attr('src') || '');
    })
 
    return artist;
}