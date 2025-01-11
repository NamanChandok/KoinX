'use client';
import Navbar from "@/components/Navbar"
import { faAngleDoubleRight, faAngleLeft, faAngleRight, faArrowRight, faArrowTrendUp, faCaretDown, faCaretUp, faCircleInfo, faNewspaper, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import TradingViewWidget from "@/components/TradingViewWidget";
import TeamMember from "@/components/TeamMember";
import CoinPrice from "@/interfaces/CoinPrice";
import CoinInfo from "@/interfaces/CoinInfo";
import Coin from "@/interfaces/Coin";

const apiKey = "CG-rRQDcm1zLtTA85CHzB3NtMQj";

export default function Home() {

  const [trendingCoins, setTrendingCoins] = useState<Coin[]>([])
  const [coinPrice, setcoinPrice] = useState<CoinPrice>({inr: 0, usd: 0, inr_24h_change: 0, usd_24h_change: 0})
  const [coinInfo, setcoinInfo] = useState<CoinInfo>({name: '', symbol: '', market_data: {market_cap: {usd: 0}, market_cap_rank: 0, total_volume: {usd: 0}, high_24h: {usd: 0}, low_24h: {usd: 0}, current_price: {usd: 0}, atl: {usd: 0}, ath: {usd: 0}, fully_diluted_valuation: {usd: 0}}, image: {thumb: '', small: '', large: ''}})

  useEffect(() => {

    fetch(`https://api.coingecko.com/api/v3/search/trending`, {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': apiKey}
    }).then(res => res.json())
    .then(data => {
      setTrendingCoins(data.coins)
    })
    .catch(err => console.error(err))

    fetch (`https://api.coingecko.com/api/v3/coins/bitcoin`, {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': apiKey}
    }).then(res => res.json())
    .then(data => {
      setcoinInfo(data)
    })
    .catch(err => console.error(err))

    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr,usd&include_24hr_change=true`, {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': apiKey}
    }).then(res => res.json())
    .then(data => {
      setcoinPrice(data.bitcoin)
    })
    .catch(err => console.error(err))


    const mayAlso = document.getElementById('scroller1') as HTMLElement;
    const trending = document.getElementById('scroller2') as HTMLElement;
    const left1 = document.getElementById('scrollLeft1') as HTMLElement;
    const right1 = document.getElementById('scrollRight1') as HTMLElement;
    const left2 = document.getElementById('scrollLeft2') as HTMLElement;
    const right2 = document.getElementById('scrollRight2') as HTMLElement;
    const mayAlsoSmall = document.getElementById('scroller3') as HTMLElement;
    const trendingSmall = document.getElementById('scroller4') as HTMLElement;
    const left3 = document.getElementById('scrollLeft3') as HTMLElement;
    const right3 = document.getElementById('scrollRight3') as HTMLElement;
    const left4 = document.getElementById('scrollLeft4') as HTMLElement;
    const right4 = document.getElementById('scrollRight4') as HTMLElement;

    left1?.addEventListener('click', () => {
      mayAlso.scrollLeft -= 272;
    });
    right1?.addEventListener('click', () => {
      mayAlso.scrollLeft += 272;
    });
    left2?.addEventListener('click', () => {
      trending.scrollLeft -= 272;
    });
    right2?.addEventListener('click', () => {
      trending.scrollLeft += 272;
    });
    left3?.addEventListener('click', () => {
      mayAlsoSmall.scrollLeft -= 208;
    });
    right3?.addEventListener('click', () => {
      mayAlsoSmall.scrollLeft += 208;
    });
    left4?.addEventListener('click', () => {
      trendingSmall.scrollLeft -= 208;
    });
    right4?.addEventListener('click', () => {
      trendingSmall.scrollLeft += 208;
    });

    return () => {
      left1?.removeEventListener('click', () => {});
      right1?.removeEventListener('click', () => {});
      left2?.removeEventListener('click', () => {});
      right2?.removeEventListener('click', () => {});
      left3?.removeEventListener('click', () => {});
      right3?.removeEventListener('click', () => {});
      left4?.removeEventListener('click', () => {});
      right4?.removeEventListener('click', () => {});
    }

  }, [])

  return (
    <>
    <main className="min-h-screen bg-background text-foreground p-6 md:px-8 pt-14">
      <Navbar />
      <h1 className="text-gray py-3 text-sm">Cryptocurrencies <FontAwesomeIcon icon={faAngleDoubleRight} /> <span className="font-medium text-foreground">Bitcoin</span></h1>
      
      <div className="flex md:flex-row flex-col gap-5">

        <div className="flex flex-col gap-5 md:w-7/10">

          {/* HERO */}

          <div className="bg-white p-6 md:p-8 rounded-lg h-max">
            {coinInfo.name && <h1 className="font-semibold text-2xl flex items-center gap-2">
              <img className="h-8 w-8 rounded-full" src={coinInfo.image.thumb} alt={coinInfo.name} /> 
              {coinInfo.name}
              <span className="text-base text-light_gray uppercase">{coinInfo.symbol}</span>
              <span className="bg-light_gray ml-4 p-2 rounded-md text-sm text-white font-base">Rank #{coinInfo.market_data.market_cap_rank}</span>
              </h1>
            }
            {coinPrice.usd && <div className="flex items-center gap-4 pt-4">
              <h3 className="text-3xl font-semibold">${coinPrice.usd.toLocaleString()}</h3>
              {coinPrice.usd_24h_change > 0 ? 
                <div className="text-stock_green font-medium text-sm bg-stock_green_bg px-2 py-1 rounded-sm space-x-1">
                  <FontAwesomeIcon icon={faCaretUp} />
                  <span>{coinPrice.usd_24h_change.toFixed(2)}%</span>
                </div> : 
                <div className="text-stock_red font-medium text-sm bg-stock_red_bg px-2 py-1 rounded-sm space-x-1">
                  <FontAwesomeIcon icon={faCaretDown} />
                  <span>{(coinPrice.usd_24h_change*-1).toFixed(2)}%</span>
                </div>
              }
              <span className="text-light_gray text-sm font-medium">(24H)</span>
            </div>
            }
            <p className="font-medium">₹{coinPrice?.inr?.toLocaleString()}</p>
            <hr className="my-4 border-gray/20" />
            <div className="h-96">
              <h3 className="font-semibold">Bitcoin Price Chart (USD)</h3>
              <TradingViewWidget />
            </div>
          </div>

          {/* NAV */}

          <div className="overflow-x-auto text-nowrap border-b-2 space-x-6 h-10 border-gray/20">
            <a className="text-bluer font-semibold inline-block border-b-2 h-full border-bluer">Overview</a>
            <a className="text-light_gray h-full inline-block font-medium">Fundamentals</a>
            <a className="text-light_gray h-full inline-block font-medium">News Insights</a>
            <a className="text-light_gray h-full inline-block font-medium">Sentiments</a>
            <a className="text-light_gray h-full inline-block font-medium">Team</a>
            <a className="text-light_gray h-full inline-block font-medium">Technicals</a>
            <a className="text-light_gray h-full inline-block font-medium">Tokenomics</a>
          </div>

          {/* PERFORMANCE */}

          <div className="bg-white p-3 md:p-8 space-y-4 rounded-lg">
            <h1 className="font-semibold text-2xl">Performance</h1>
            {coinInfo.name && 
            <div className="flex justify-between gap-4 pt-4 items-center">
              <div className="grid gap-2">
                <span className="text-sm text-nowrap text-light_gray">Today&apos;s Low</span>
                <span className="text-gray">${coinInfo.market_data.low_24h.usd.toLocaleString()}</span>
              </div>
              <div className="h-1 rounded-md w-24 md:w-7/10 relative bg-gradient-red-green">
                <FontAwesomeIcon className="absolute top-1" style={{
                  left: `${((coinInfo.market_data.current_price.usd - coinInfo.market_data.low_24h.usd) / (coinInfo.market_data.high_24h.usd - coinInfo.market_data.low_24h.usd)) * 100}%`
                }} icon={faCaretUp} />
              </div>
              <div className="grid gap-2 text-right">
                <span className="text-sm text-nowrap text-gray">Today&apos;s High</span>
                <span className="text-gray">${coinInfo.market_data.high_24h.usd.toLocaleString()}</span>
              </div>
            </div>
            }
            {coinInfo.name && 
            <div className="flex justify-between gap-4 pb-4 items-center">
              <div className="grid gap-2">
                <span className="text-sm text-nowrap text-light_gray">All Time Low</span>
                <span className="text-gray">${coinInfo.market_data.atl.usd.toLocaleString()}</span>
              </div>
              <div className="h-1 rounded-md w-24 md:w-7/10 bg-gradient-red-green relative">
              <FontAwesomeIcon className="absolute top-1" style={{
                  left: `${((coinInfo.market_data.current_price.usd - coinInfo.market_data.atl.usd) / (coinInfo.market_data.ath.usd - coinInfo.market_data.atl.usd)) * 100}%`
                }} icon={faCaretUp} /></div>
              <div className="grid gap-2 text-right">
                <span className="text-sm text-nowrap text-gray">All Time High</span>
                <span className="text-gray">${coinInfo.market_data.ath.usd.toLocaleString()}</span>
              </div>
            </div>
            }
            <h2 className="font-semibold text-xl text-gray">Fundamentals <FontAwesomeIcon className="text-light_gray" icon={faCircleInfo} /></h2>
            {coinInfo.name && 
            <div className="flex md:flex-row md:gap-4 flex-col justify-between">
            <div className="grid md:w-96">
              <div className="py-4 flex justify-between border-b-2 border-light_gray/30">
                <span className="text-sm font-medium text-light_gray">Bitcoin Price</span>
                <span className="text-sm font-medium">${coinInfo.market_data.current_price.usd.toLocaleString()}</span>
              </div>
              <div className="py-4 flex justify-between border-b-2 border-light_gray/30">
                <span className="text-sm font-medium text-light_gray">24H Low / 24H High</span>
                <span className="text-sm font-medium">${coinInfo.market_data.low_24h.usd.toLocaleString()} / ${coinInfo.market_data.high_24h.usd.toLocaleString()}</span>
              </div>
              <div className="py-4 flex justify-between border-b-2 border-light_gray/30">
                <span className="text-sm font-medium text-light_gray">ATL / ATH</span>
                <span className="text-sm font-medium">${coinInfo.market_data.atl.usd.toLocaleString()} / ${coinInfo.market_data.ath.usd.toLocaleString()}</span>
              </div>
              <div className="py-4 flex justify-between border-b-2 border-light_gray/30">
                <span className="text-sm font-medium text-light_gray">Trading Volume</span>
                <span className="text-sm font-medium">${coinInfo.market_data.total_volume.usd.toLocaleString()}</span>
              </div>
            </div>
              <div className="grid md:w-96">
                <div className="py-4 flex justify-between border-b-2 border-light_gray/30">
                  <span className="text-sm font-medium text-light_gray">Market Cap Rank</span>
                  <span className="text-sm font-medium">#{coinInfo.market_data.market_cap_rank}</span>
                </div>
                <div className="py-4 flex justify-between border-b-2 border-light_gray/30">
                  <span className="text-sm font-medium text-light_gray">Market Cap</span>
                  <span className="text-sm font-medium">${coinInfo.market_data.market_cap.usd.toLocaleString()}</span>
                </div>
                <div className="py-4 flex justify-between border-b-2 border-light_gray/30">
                  <span className="text-sm font-medium text-light_gray">Fully Diluted Valuation</span>
                  <span className="text-sm font-medium">${coinInfo.market_data.fully_diluted_valuation.usd.toLocaleString()}</span>
                </div>
                <div className="py-4 flex justify-between border-b-2 border-light_gray/30">
                  <span className="text-sm font-medium text-light_gray">Volume / Market Cap</span>
                  <span className="text-sm font-medium">{coinInfo.market_data.total_volume.usd / coinInfo.market_data.market_cap.usd}</span>
                </div>
              </div>
            </div>
            }
          </div>

          {/* SENTIMENT */}

          <div className="rounded-lg p-3 md:p-8 space-y-4 bg-white">
            <h1 className="font-semibold text-2xl">Sentiment</h1>
            <h2 className="font-semibold text-xl text-gray">Key Events <FontAwesomeIcon className="text-light_gray" icon={faCircleInfo} /></h2>
            <div className="overflow-x-auto pb-3 text-nowrap space-x-4">
              <div className="inline-block bg-blue-50 p-3 pb-6 w-96 rounded-md">
                <div className="flex gap-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center bg-blue-400">
                    <FontAwesomeIcon className="text-white" icon={faNewspaper} />
                  </div>
                  <div className="text-wrap">
                    <h3 className="font-semibold text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio at quaerat temporibus.</h3>
                    <p className="pt-1 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eos corporis nulla numquam nam? Voluptas quam doloribus dolorum maxime vero voluptate officia in evenie.</p>
                  </div>
                </div>
              </div>
              <div className="inline-block bg-green-50 p-3 pb-6 w-96 rounded-md">
                <div className="flex gap-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center bg-green-400">
                    <FontAwesomeIcon className="text-white" icon={faArrowTrendUp} />
                  </div>
                  <div className="text-wrap">
                    <h3 className="font-semibold text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio at quaerat temporibus.</h3>
                    <p className="pt-1 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eos corporis nulla numquam nam? Voluptas quam doloribus dolorum maxime vero voluptate officia in evenie.</p>
                  </div>
                </div>
              </div>
              <div className="inline-block bg-red-50 p-3 pb-6 w-96 rounded-md">
                <div className="flex gap-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center bg-red-400">
                    <FontAwesomeIcon className="text-white" icon={faWarning} />
                  </div>
                  <div className="text-wrap">
                    <h3 className="font-semibold text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio at quaerat temporibus.</h3>
                    <p className="pt-1 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eos corporis nulla numquam nam? Voluptas quam doloribus dolorum maxime vero voluptate officia in evenie.</p>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="font-semibold text-xl text-gray">Analyst Estimates <FontAwesomeIcon className="text-light_gray" icon={faCircleInfo} /></h2>
            <div className="flex gap-4 items-center">
              <div className="h-24 w-24 bg-stock_green/10 rounded-full flex justify-center items-center text-stock_green font-semibold text-2xl">76%</div>
              <div className="grid gap-2">
                <span className="text-light_gray text-sm font-medium">Buy</span>
                <span className="text-light_gray text-sm font-medium">Hold</span>
                <span className="text-light_gray text-sm font-medium">Sell</span>
              </div>
              <div className="grid md:w-96 w-32 gap-2">
                <div className="flex gap-4 items-center"><div className="w-[76%] h-1.5 bg-stock_green rounded-md"></div><span className="text-light_gray text-sm">76%</span></div>
                <div className="flex gap-4 items-center"><div className="w-[8%] h-1.5 bg-light_gray rounded-md"></div><span className="text-light_gray text-sm">8%</span></div>
                <div className="flex gap-4 items-center"><div className="w-[16%] h-1.5 bg-stock_red rounded-md"></div><span className="text-light_gray text-sm">16%</span></div>
              </div>
            </div>
          </div>

          {/* ABOUT BITCOIN */}

          <div className="rounded-lg p-3 md:p-8 space-y-4 bg-white">
            <h1 className="font-semibold text-2xl">About Bitcoin</h1>
            <h3 className="text-lg font-bold">What is Bitcoin?</h3>
            <p className="text-gray">Bitcoin&apos;s price today is US$16,951.82, with a 24-hour trading volume of $19.14 B. BTC is +0.36% in the last 24 hours. It is currently -7.70% from its 7-day all-time high of $18,366.66, and 3.40% from its 7-day all-time low of $16,394.75. BTC has a circulating supply of 19.24 M BTC and a max supply of 21 M BTC.</p>
            <hr className="border-gray/20" />
            <h3 className="text-lg font-bold">Lorem ipsum dolor sit amet</h3>
            <p className="text-gray">Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit lobortis tristique pharetra. Diam id et lectus urna et tellus aliquam dictum at. Viverra diam suspendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus. Ultricies urna volutpat pendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus.  
              <br /><br />
              Diam praesent massa dapibus magna aliquam a dictumst volutpat. Egestas vitae pellentesque auctor amet. Nunc sagittis libero adipiscing cursus felis pellentesque interdum. Odio cursus phasellus velit in senectus enim dui. Turpis tristique placerat interdum sed volutpat. Id imperdiet magna eget eros donec cursus nunc. Mauris faucibus diam mi nunc praesent massa turpis a. Integer dignissim augue viverra nulla et quis lobortis phasellus. Integer pellentesque enim convallis ultricies at.
              <br /><br />
              Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam massa vel convallis duis ac. Mi adipiscing semper scelerisque porttitor pulvinar nunc risus. Fermentum potenti iaculis lacinia congue ipsum fames amet dui. Purus ultrices tincidunt volutpat in eget. Ullamcorper dui</p>
            <hr className="border-gray/20" />
            <h1 className="font-semibold text-2xl">Already Holding Bitcoin?</h1>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg gap-4 flex p-2 bg-gradient-to-tl from-blue-500 to-cyan-300">
                <img src="/about_1.jpeg" className="rounded-md h-28 aspect-square object-cover" alt="Calculate your profits" />
                <div className="space-y-4 pt-2">
                  <h1 className="font-bold text-white text-xl">Calculate your Profits</h1>
                  <button className="px-3 text-sm py-1 space-x-2 bg-white rounded-md font-semibold"><span>Check Now</span><FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
              </div>
              <div className="rounded-lg gap-4 flex p-2 bg-gradient-to-tl from-red-400 to-orange-300">
                <img src="/about_2.jpeg" className="rounded-md h-28 aspect-square object-cover" alt="Calculate your tax liability" />
                <div className="space-y-4 pt-2">
                  <h1 className="font-bold text-white text-xl">Calculate your tax liability</h1>
                  <button className="px-3 text-sm py-1 space-x-2 bg-white rounded-md font-semibold"><span>Check Now</span><FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
              </div>
            </div>
            <p className="text-gray">Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam massa vel convallis duis ac. Mi adipiscing semper scelerisque porttitor pulvinar nunc risus. Fermentum potenti iaculis lacinia congue ipsum fames amet dui. Purus ultrices tincidunt volutpat in eget. Ullamcorper dui</p>
          </div>

          {/* TOKENOMICS */}

          <div className="bg-white rounded-lg md:p-8 p-3 space-y-4">
            <h1 className="font-semibold text-2xl">Tokenomics</h1>
            <h3 className="text-lg font-semibold">Initial Distribution</h3>
            <img src="/tokenomics.png" className="md:w-96 w-full" alt="initial distribution" />
            <p className="text-gray">Lorem ipsum dolor sit amet consectetur. Cras aliquet tristique ornare vestibulum nunc dignissim vel consequat. Leo etiam nascetur bibendum amet enim sit eget leo amet. At metus orci augue fusce eleifend lectus eu fusce adipiscing. Volutpat ultrices nibh sodales massa habitasse urna felis augue. Gravida aliquam fermentum augue eu. Imperdiet bibendum amet aliquam donec. Eget justo dui metus odio rutrum. Vel ipsum eget in at curabitur sem posuere facilisis vitae. Sed lorem sit mauris id eget arcu ut. Vulputate ipsum aliquet odio nisi eu ac risus.</p>
          </div>

          {/* TEAM */}

          <div className="bg-white rounded-lg md:p-8 p-3 space-y-4">
            <h1 className="font-semibold text-2xl">Team</h1>
            <p className="text-gray">Lorem ipsum dolor sit amet consectetur. Id consequat adipiscing arcu nibh. Eget mattis in mi integer sit egestas. Proin tempor id pretium quam. Facilisis purus convallis quam augue.</p>
            <TeamMember name="John Smith" image="/team_1.png" />
            <TeamMember name="Elina Williams" image="/team_2.png" />
            <TeamMember name="John Smith" image="/team_3.png" />

            {/* YOU MAY ALSO LIKE FOR SMALL SCREEN */}
            <div className="md:hidden">
              <h1 className="font-semibold text-2xl">You May Also Like</h1>
              <div className="relative">
                <button id="scrollLeft3" className="h-8 w-8 bg-white shadow-md absolute -left-2 top-1/2 -translate-y-1/2 rounded-full flex justify-center items-center">
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <button id="scrollRight3" className="h-8 w-8 bg-white shadow-md absolute -right-2 top-1/2 -translate-y-1/2 rounded-full flex justify-center items-center">
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
                <div className="overflow-x-auto text-nowrap space-x-4 py-4 scroll-smooth" id="scroller3">
                {trendingCoins.map((coin:Coin, index:number) => (
                    <div key={index} className="w-48 inline-block rounded-lg border-2 border-light_gray/20 p-3">
                      <div className="flex items-center gap-2">
                        <img className="h-6 w-6 rounded-full" src={coin.item.thumb} alt={coin.item.name} /> 
                        <span className="text-gray text-sm">{coin.item.symbol}</span>
                        {coin.item.data.price_change_percentage_24h.usd > 0 ? 
                        <span className="text-stock_green font-medium text-xs bg-stock_green_bg p-1 rounded-sm space-x-1 ">
                          +{coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                        </span> : 
                        <span className="text-stock_red font-medium text-xs bg-stock_red_bg p-1 rounded-sm space-x-1">
                          {coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                        </span>
                        }
                      </div>
                      <h2 className="font-semibold text-lg py-4">${coin.item.data.price.toLocaleString()}</h2>
                      <img src={coin.item.data.sparkline} className="w-9/10" alt="graph" />
                    </div>
                ))}
                </div>
              </div>
              
              <h1 className="font-semibold text-2xl">Trending Coins</h1>
              <div className="relative">
                <button id="scrollLeft4" className="h-8 w-8 bg-white shadow-md absolute -left-2 top-1/2 -translate-y-1/2 rounded-full flex justify-center items-center">
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <button id="scrollRight4" className="h-8 w-8 bg-white shadow-md absolute -right-2 top-1/2 -translate-y-1/2 rounded-full flex justify-center items-center">
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
                <div className="overflow-x-auto text-nowrap space-x-4 py-4 scroll-smooth" id="scroller4">
                {trendingCoins.map((coin:Coin, index:number) => (
                    <div key={index} className="w-48 inline-block rounded-lg border-2 border-light_gray/20 p-3">
                      <div className="flex items-center gap-2">
                        <img className="h-6 w-6 rounded-full" src={coin.item.thumb} alt={coin.item.name} /> 
                        <span className="text-gray text-sm">{coin.item.symbol}</span>
                        {coin.item.data.price_change_percentage_24h.usd > 0 ? 
                        <span className="text-stock_green font-medium text-xs bg-stock_green_bg p-1 rounded-sm space-x-1 ">
                          +{coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                        </span> : 
                        <span className="text-stock_red font-medium text-xs bg-stock_red_bg p-1 rounded-sm space-x-1">
                          {coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                        </span>
                        }
                      </div>
                      <h2 className="font-semibold text-lg py-4">${coin.item.data.price.toLocaleString()}</h2>
                      <img src={coin.item.data.sparkline} className="w-9/10" alt="graph" />
                    </div>
                ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-5 md:w-3/10">

          {/* GET STARTED */}

          <div className="bg-blue_dark p-8 h-max md:px-12 rounded-lg text-center flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Get Started with KoinX<br /> for FREE</h1>
            <p className="text-sm font-medium text-[#f2f2f2]">With our range of features that you can equip for free, KoinX allows you to be more educated and aware of your tax reports.</p>
            <img src="/get_started.svg" alt="Get Started" className="h-44 w-44" />
            <button className="bg-white px-5 py-2 font-semibold space-x-2 rounded-lg w-max"><span>Get Started for FREE</span> <FontAwesomeIcon icon={faArrowRight} /></button>
          </div>

          {/* TRENDING 3 FOR LARGE SCREEN */}

          <div className="bg-white p-8 rounded-lg h-max md:block hidden">
            <h1 className="font-semibold text-2xl">Trending Coins (24h)</h1>
            <div className="grid gap-4 pt-4 relative">
            {trendingCoins.slice(0,3).map((coin:Coin, index:number) => (
              <div key={index} className="flex gap-2 font-medium items-center">
                <img className="h-8 w-8 rounded-full" src={coin.item.thumb} alt={coin.item.name} /> 
                <span className="truncate max-w-24">{coin.item.name}</span> ({coin.item.symbol})
                {coin.item.data.price_change_percentage_24h.usd > 0 ? 
                <div className="text-stock_green font-medium text-sm bg-stock_green_bg px-2 py-1 rounded-sm space-x-1 right-0 absolute">
                  <FontAwesomeIcon icon={faCaretUp} />
                  <span>{coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%</span>
                </div> : 
                <div className="text-stock_red font-medium text-sm bg-stock_red_bg px-2 py-1 rounded-sm space-x-1 right-0 absolute">
                  <FontAwesomeIcon icon={faCaretDown} />
                  <span>{(coin.item.data.price_change_percentage_24h.usd*-1).toFixed(2)}%</span>
                </div>
                }
              </div>
            ))}
            </div>
          </div>

        </div>
      </div>

    </main>


    {/* MAY ALSO LIKE FOR LARGE SCREEN */}

    <div className="bg-white p-16 md:block hidden">

      <h1 className="font-semibold text-2xl">You May Also Like</h1>
      <div className="relative">
        <button id="scrollLeft1" className="h-8 w-8 bg-white shadow-md absolute -left-4 top-1/2 -translate-y-1/2 rounded-full flex justify-center items-center">
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button id="scrollRight1" className="h-8 w-8 bg-white shadow-md absolute -right-4 top-1/2 -translate-y-1/2 rounded-full flex justify-center items-center">
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <div className="overflow-x-auto text-nowrap space-x-4 py-4 scroll-smooth" id="scroller1">
        {trendingCoins.map((coin:Coin, index:number) => (
            <div key={index} className="w-64 inline-block rounded-lg border-2 border-light_gray/20 p-3">
              <div className="flex items-center gap-2">
                <img className="h-6 w-6 rounded-full" src={coin.item.thumb} alt={coin.item.name} /> 
                <span className="text-gray text-sm">{coin.item.symbol}</span>
                {coin.item.data.price_change_percentage_24h.usd > 0 ? 
                <span className="text-stock_green font-medium text-xs bg-stock_green_bg p-1 rounded-sm space-x-1 ">
                  +{coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                </span> : 
                <span className="text-stock_red font-medium text-xs bg-stock_red_bg p-1 rounded-sm space-x-1">
                  {coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                </span>
                }
              </div>
              <h2 className="font-semibold text-lg py-4">${coin.item.data.price.toLocaleString()}</h2>
              <img src={coin.item.data.sparkline} className="w-9/10" alt="graph" />
            </div>
        ))}
        </div>
      </div>
      
      <h1 className="font-semibold text-2xl">Trending Coins</h1>
      <div className="relative">
        <button id="scrollLeft2" className="h-8 w-8 bg-white shadow-md absolute -left-4 top-1/2 -translate-y-1/2 rounded-full flex justify-center items-center">
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button id="scrollRight2" className="h-8 w-8 bg-white shadow-md absolute -right-4 top-1/2 -translate-y-1/2 rounded-full flex justify-center items-center">
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <div className="overflow-x-auto text-nowrap space-x-4 py-4 scroll-smooth" id="scroller2">
        {trendingCoins.map((coin:Coin, index:number) => (
            <div key={index} className="w-64 inline-block rounded-lg border-2 border-light_gray/20 p-3">
              <div className="flex items-center gap-2">
                <img className="h-6 w-6 rounded-full" src={coin.item.thumb} alt={coin.item.name} /> 
                <span className="text-gray text-sm">{coin.item.symbol}</span>
                {coin.item.data.price_change_percentage_24h.usd > 0 ? 
                <span className="text-stock_green font-medium text-xs bg-stock_green_bg p-1 rounded-sm space-x-1 ">
                  +{coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                </span> : 
                <span className="text-stock_red font-medium text-xs bg-stock_red_bg p-1 rounded-sm space-x-1">
                  {coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                </span>
                }
              </div>
              <h2 className="font-semibold text-lg py-4">${coin.item.data.price.toLocaleString()}</h2>
              <img src={coin.item.data.sparkline} className="w-9/10" alt="graph" />
            </div>
        ))}
        </div>
      </div>
      
    </div>

    {/* TRENDING 3 FOR SMALL SCREEN */}
    
    <div className="bg-white p-6 md:hidden">
      <h1 className="font-semibold text-2xl">Trending Coins (24h)</h1>
      <div className="grid gap-4 pt-4 relative">
      {trendingCoins.slice(0,3).map((coin:Coin, index:number) => (
        <div key={index} className="flex gap-2 font-medium items-center">
          <img className="h-8 w-8 rounded-full" src={coin.item.thumb} alt={coin.item.name} /> 
          <span className="truncate max-w-24">{coin.item.name}</span> ({coin.item.symbol})
          {coin.item.data.price_change_percentage_24h.usd > 0 ? 
          <div className="text-stock_green font-medium text-sm bg-stock_green_bg px-2 py-1 rounded-sm space-x-1 right-0 absolute">
            <FontAwesomeIcon icon={faCaretUp} />
            <span>{coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%</span>
          </div> : 
          <div className="text-stock_red font-medium text-sm bg-stock_red_bg px-2 py-1 rounded-sm space-x-1 right-0 absolute">
            <FontAwesomeIcon icon={faCaretDown} />
            <span>{(coin.item.data.price_change_percentage_24h.usd*-1).toFixed(2)}%</span>
          </div>
          }
        </div>
      ))}
      </div>
    </div>
    </>
  );
}
