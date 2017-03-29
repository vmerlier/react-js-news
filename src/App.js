/* ROOT Component of your App  */

import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import defaultPicture from './components/img/default.jpg'

const Materialize = window.Materialize

const APP_TITLE = 'News App'
//update document title (displayed in the opened browser tab)
document.title = APP_TITLE

//web api utils
import { get, ENDPOINTS, NEWS_API_KEY } from './utils/api'
import { getNews, addNews } from './utils/webstorage'




//components
import NewsCard from './components/NewsCard'

class App extends Component {

    /* React state initialization DOCUMENTATION : https://facebook.github.io/react/docs/react-without-es6.html#setting-the-initial-state */

    constructor( props ) {
        super( props )
        this.state = {
            news: undefined,
            search: '',
        }
    }


    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1>{ APP_TITLE }</h1>
                    <img src={ logo } className="App-logo" alt="logo" />
                </div>

                <div className="App-content">
                    <div className="center-align">

                        <form onSubmit={ this.fetchNews }>

                            <button type="submit" className="waves-effect waves-light btn">
                                Get some news!
                            </button>
                            <div className="input-field ">
                                <input id="recherche" type="text" class="validate" value={ this.state.search } onChange={ this.handleChange } />
                                <label for="recherche"> Search some news </label>
                            </div>
                        </form>

                    </div>

                    <div className="row" style={ { marginTop: 20 } } >

                        { this.getCards() }

                    </div>
                </div>

            </div>
        )
    }


    //method triggered by onSubmit event of the form or by onClick event of the "Get some news!" button
    /* Arrow function syntax used for Autobinding, see details here : https://facebook.github.io/react/docs/react-without-es6.html#autobinding */
    handleChange = ( event ) => {
        this.setState( { search: event.target.value });
    }
    fetchNews = async ( event ) => {

        event.preventDefault()

        /* ASYNC - AWAIT DOCUMENTATION : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/await */

        try {
            addNews( this.state.search )
            let _news = await get( ENDPOINTS.NEWS_API_URL, {
                //YOU NEED TO PROVIDE YOUR "APIXU" API KEY HERE, see /utils/api.js file to grab the DOCUMENTATION file
                apiKey: NEWS_API_KEY,
                source: 'techcrunch'
            })

            this.setState( {
                news: _news
            })



        }
        catch ( error ) {
            Materialize.toast( error, 8000, 'error-toast' )
            console.log( 'Failed fetching data: ', error )
        }

    }


    //handle display of the received news object
    getCards = () => {

        const news = this.state.news
        /*data looks like that

            {
                "status": "ok",
                "source": "",
                "sortBy": "",
                "articles": [
                    {
                        "author": "TNW Deals",
                        "title": "Get 2TB of cloud storage for life — for under $50",
                        "description": "Cleaning up your computer is more than simple aesthetics. Years of accumulated pictures, videos and assorted files on your hard drive don’t just create piles of extra stuff on your system — they actually contribute to slowing down your computer significantly. You can clear out that file glut and get your computer back to top performance …",
                        "url": "https://thenextweb.com/offers/2017/03/10/get-2tb-cloud-storage-life-50/",
                        "urlToImage": "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2017/03/sale_7030_image_wide.png",
                        "publishedAt": "2017-03-09T11:36:57Z"
                    },
                    {
                        "author": "Abhimanyu Ghoshal",
                        "title": "Windows 10 is bringing shitty ads to File Explorer, here's how to turn them off",
                        "description": "Don't want crappy OneDrive ads in File Explorer? You can turn them off with just a few clicks - just follow our simple guide.",
                        "url": "https://thenextweb.com/apps/2017/03/10/windows-10-is-bringing-shitty-ads-to-file-explorer-heres-how-to-turn-them-off/",
                        "urlToImage": "https://cdn2.tnwcdn.com/wp-content/blogs.dir/1/files/2017/03/Windows-10-ads.jpg",
                        "publishedAt": "2017-03-10T08:00:38Z"
                        },
                    {
                        "author": "Napier Lopez",
                        "title": "Google takes on Slack with new Hangouts 'Chat' and 'Meet' apps",
                        "description": "Ever since Google launched Allo and Duo, we’ve known that Hangouts would be making the transition from a consumer-focused product to a business one. That change begins today with the announcement of Hangouts Chat and Hangouts Meet. While the standard Hangouts app will stick around for a while, it’s essentially being replaced by Chat and Meet. …",
                        "url": "https://thenextweb.com/google/2017/03/09/google-takes-slack-new-hangouts-chat-meet-apps/",
                        "urlToImage": "https://cdn2.tnwcdn.com/wp-content/blogs.dir/1/files/2017/03/d-inscreen-01-room_1-1.png",
                        "publishedAt": "2017-03-09T19:43:35Z"
                    }
                ]
            }
            */

        if ( news ) {
            console.log( news )



            return news.articles.filter( article => {
                return article.title.toLowerCase().indexOf( this.state.search.toLowerCase() ) != -1
            }).map(
                article => {

                    return (
                        <NewsCard picture={ article.urlToImage } text={ article.description } title={ article.title } url={ article.url } />
                    )
                }
                )
        }



    }

}

export default App
