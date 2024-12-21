import React, {useEffect,useState} from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



const News=(props)=> {
   const [articles,setArticles] = useState([])
   const [loading,setLoading] = useState(true)
   const [page,setPage] = useState(1)
   const [totalResults,settotalResults] = useState(0)
  

    // articles = [

    //     {
    //         "source": {
    //             "id": "usa-today",
    //             "name": "usA Today"
    //         },
    //         "author": "Paul Myerberg",
    //         "title": "Colorado's Travis Hunter, Boise State's Ashton Jeanty lead usA TODAY Sports All-America team",
    //         "description": "There were many outstandusg performances durusg the college football season. usA TODAY Sports honors the best players with our All-America team.",
    //         "url": "https://www.usatoday.com/story/sports/ncaaf/2024/12/12/college-football-all-american-team/76928339007/",
    //         "urlToImage": "https://www.usatoday.com/gcdn/authorusg/authorusg-images/2024/12/12/usAT/76936452007-usatsi-24349568.jpg?crop=3753,2111,x623,y208&width=3200&height=1800&format=pjpg&auto=webp",
    //         "publishedAt": "2024-12-12T11:08:27+00:00",
    //         "content": "Oregon quarterback Dillon Gabriel earns first-team honors ahead of Miamis Cam Ward, and teams us the College Football Playoff are heavily represented on the usA TODAY Sports All-America teams for the… [+6243 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "bbc-sport",
    //             "name": "BBC Sport"
    //         },
    //         "author": null,
    //         "title": "Bill Belichick: New England Patriots legend becomes University of North Carolusa coach",
    //         "description": "Legendary American football coach Bill Belichick returns to the game after a year out but not as a coach us the NFL.",
    //         "url": "http://www.bbc.co.uk/sport/american-football/articles/cwy37496vgxo",
    //         "urlToImage": "https://ichef.bbci.co.uk/ace/branded_sport/1200/cpsprodpb/334c/live/827ca070-b81e-11ef-865f-bfe8ffde0e5f.jpg",
    //         "publishedAt": "2024-12-12T08:07:22.3207517Z",
    //         "content": "Legendary American football coach Bill Belichick has returned to the game after a year out but not as a coach us the NFL.\r\nThe 72-year-old, who won a record six Super Bowls with the New England Patri… [+1733 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "usa-today",
    //             "name": "usA Today"
    //         },
    //         "author": "Jarrett Bell",
    //         "title": "us boltusg to UNC, Bill Belichick rejects NFL before it can reject him – agaus",
    //         "description": "Bill Belichick's decision to become UNC's next football coach was a stunner. But the NFL world made clear there was no place left for the legend.",
    //         "url": "https://www.usatoday.com/story/sports/nfl/columnist/bell/2024/12/11/bill-belichick-unc-coach-nfl-jobs/76934084007/",
    //         "urlToImage": "https://www.usatoday.com/gcdn/authorusg/authorusg-images/2024/12/12/usAT/76936368007-usatsi-19649723.jpg?crop=7993,4498,x0,y233&width=3200&height=1801&format=pjpg&auto=webp",
    //         "publishedAt": "2024-12-12T04:29:47+00:00",
    //         "content": "Bill Belichicks motivation runs a lot deeper than chasusg Don Shula. \r\nus wavusg farewell to the NFL and resumusg his coachusg career at the University of North Carolusa, Belichick, 72, provided what… [+5244 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "fox-sports",
    //             "name": "Fox Sports"
    //         },
    //         "author": null,
    //         "title": "College football transfer portal tracker: QB Thomas Castellanos heads to Florida State",
    //         "description": "Transfer season is us full swusg agaus us college football, and some standout players are already on the move. Here's what we know.",
    //         "url": "https://www.foxsports.com/stories/college-football/2024-college-football-transfer-portal-tracker",
    //         "urlToImage": "https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2024/12/1408/814/2024-12-02_cfb-portaltracker-16x9-1.jpg?ve=1&tl=1",
    //         "publishedAt": "2024-12-12T02:29:38Z",
    //         "content": "Transfer season is us full swusg us college football\r\n, agaus, and some standout players are already on the move.\r\nThe portal officially opened Monday and closes on Dec. 28. \r\nPlayers on teams that c… [+10213 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "fox-sports",
    //             "name": "Fox Sports"
    //         },
    //         "author": null,
    //         "title": "2025 NFL Draft tracker: Michigan's Will Johnson, Mason Graham declare early",
    //         "description": "Here's a list of the college football players who have declared for the 2025 NFL Draft and could hear their names called early.",
    //         "url": "https://www.foxsports.com/stories/college-football/2025-nfl-draft-tracker-underclassmen-declare",
    //         "urlToImage": "https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2024/12/1408/814/f702c8d6-2024-12-02_cfb-draft.jpg?ve=1&tl=1",
    //         "publishedAt": "2024-12-12T00:32:59Z",
    //         "content": null
    //     },
    //     {
    //         "source": {
    //             "id": "bbc-sport",
    //             "name": "BBC Sport"
    //         },
    //         "author": null,
    //         "title": "World Cup 2034: What will a Saudi tournament look like?",
    //         "description": "The men's football World Cup will take place us Saudi Arabia us 2034 with the promise of \"one of a kusd\" stadiums and organisers ussistusg everyone is welcome - but what will it look like?",
    //         "url": "http://www.bbc.co.uk/sport/football/articles/cn4xy2el3jno",
    //         "urlToImage": "https://ichef.bbci.co.uk/ace/branded_sport/1200/cpsprodpb/eba6/live/3f4a60c0-b7d9-11ef-a0f2-fd81ae5962f4.jpg",
    //         "publishedAt": "2024-12-11T23:22:19.8675137Z",
    //         "content": "Saudi Arabia has been criticised for its human rights violations, women's rights abuses, the crimusalisation of homosexuality, the restriction of free speech and the war us Yemen.\r\nNon-governmental o… [+1396 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "talksport",
    //             "name": "TalkSport"
    //         },
    //         "author": "Liam Hoofe",
    //         "title": "Best bettusg sites UK | Top bettusg site offers for October 2024...",
    //         "description": "Sports bettors us the UK are spoiled for choice among the best bettusg sites: If you want us-depth football bettusg markets, there is a bookmaker for you; if you want to bet on esports or TV events…",
    //         "url": "https://talksport.com/bettusg/1760032/best-bettusg-sites-uk/",
    //         "urlToImage": "https://talksport.com/wp-content/uploads/sites/5/2024/08/talksport-best-bettusg-sites-uk-op.jpg?strip=all&quality=100&w=1920&h=1080&crop=1",
    //         "publishedAt": "2024-10-04T08:45:00Z",
    //         "content": "Sports bettors us the UK are spoiled for choice among the best bettusg sites: If you want us-depth football bettusg markets, there is a bookmaker for you; if you want to bet on esports or TV events, … [+17381 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "bleacher-report",
    //             "name": "Bleacher Report"
    //         },
    //         "author": "David Kenyon",
    //         "title": "Unique Stats from the 2023 College Football Regular Season",
    //         "description": "Numbers are an ustegral part of college football. Whether you're previewusg games, rankusg teams or pickusg an award wusner, statistics help shape the story.…",
    //         "url": "https://bleacherreport.com/articles/10100739-unique-stats-from-the-2023-college-football-regular-season",
    //         "urlToImage": "https://media.bleacherreport.com/image/upload/c_fill,g_faces,w_3800,h_2000,q_95/v1702319871/sdx1wjlqkcqz3anqfabp.jpg",
    //         "publishedAt": "2023-12-12T12:00:00Z",
    //         "content": "Zach Bolusger/Icon Sportswire via Getty Images\r\nSpeakusg of Iowa...\r\nWhat makes the Hawkeyes' stellar defensive season even more impressive is how much the team desperately needed it.\r\nAmong the many… [+711 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "espn-cric-usfo",
    //             "name": "ESPN Cric usfo"
    //         },
    //         "author": null,
    //         "title": "Five famous people (and one cat) you didn't know have ESPNcricusfo profiles | ESPNcricusfo.com",
    //         "description": "Why do a footballer, a Nobel laureate and a prime musister (no, not Imran Khan) fusd themselves us the ESPNcricusfo player database? | ESPNcricusfo.com",
    //         "url": "http://www.espncricusfo.com/story/_/id/29102695/five-famous-people-one-cat-know-espncricusfo-profiles",
    //         "urlToImage": "https://a.espncdn.com/i/cricket/cricusfo/1221668_1296x1296.gif",
    //         "publishedAt": "2020-04-27T07:20:43Z",
    //         "content": "Why do a cat, a footballer, a Nobel laureate and a prime musister fusd themselves us the ESPNcricusfo database? Here are six player profiles you wouldn't have expected we had.\r\nPeter the catThe only … [+5504 chars]"
    //     }

    // ]

    
    const capitalizeFirstLetter = (str) => {
        return str[0].toUpperCase() + str.slice(1);
    }
   const updateNews =async()=> {
         props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?&country=${ props.country}&category=${ props.category}&apiKey=be4e6c8bd69b47a9b9bad916f7af1f22 &page=${page}&pageSize=${ props.pageSize}`;
        setLoading(true)
         props.setProgress(30);
        let data = await fetch(url);
        let parsedData = await data.json();
         props.setProgress(70);
        console.log(parsedData);
        setArticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setLoading(false)
       
         props.setProgress(100);
    }

    useEffect(()=>{
        document.title = `${capitalizeFirstLetter( props.category)} - NewsMonkey`;
        updateNews();
    },[])
    

   const handlePreviousClick = async () => {

    //     // let url = `https://newsapi.org/v2/top-headlines?&country=${ props.country}&category=${ props.category}&apiKey=be4e6c8bd69b47a9b9bad916f7af1f22 &page=${this.state.page - 1}&pageSize=${ props.pageSize}`;
    //     // this.setState({ loading: true });
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // console.log(parsedData);


    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // })

        
        setPage(page-1)
        updateNews();
    }
   const handleNextClick = async () => {
    //     //     if (this.state.page + 1 > Math.ceil(this.state.totalResults /  props.pageSize)) {

    //     //     }
    //     //     else {
    //     //         // let url = `https://newsapi.org/v2/top-headlines?&country=${ props.country}&category=${ props.category}&apiKey=be4e6c8bd69b47a9b9bad916f7af1f22&page=${this.state.page + 1}&pageSize=${ props.pageSize}`;
    //     //         // this.setState({ loading: true });
    //     //         // let data = await fetch(url);
    //     //         // let parsedData = await data.json();
    //     //         // console.log(parsedData);


    //     //         // this.setState({
    //     //         //     page: this.state.page + 1,
    //     //         //     articles: parsedData.articles,
    //     //         //     loading: false
    //     //         // })
    //     //     }
       setPage(page+1)
        updateNews();
    }
    const fetchMoreData = async() => {
         const url = `https://newsapi.org/v2/top-headlines?&country=${ props.country}&category=${ props.category}&apiKey=be4e6c8bd69b47a9b9bad916f7af1f22 &page=${page+1}&pageSize=${ props.pageSize}`;
         setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json();
       setArticles(articles.concat(parsedData.articles))
       settotalResults(parsedData.totalResults)
       
        
      };

   
        return (
            <>
                <h1 className="text-center" style={{ margin: '25px 0px',marginTop:'90px' }}>NewsMonkey-Top  {capitalizeFirstLetter( props.category)} Headline </h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                >
                 <div className="container">
                    <div className="row">
                        { articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} />
                            </div>
                        })}

                     
                   </div>
                   </div>

                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults /  props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}


            </>
        )
    
}
News.defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    catrgory: PropTypes.string,
}
export default News 
