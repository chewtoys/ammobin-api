import { IVendor, Province } from './graphql-types'
import url from 'url'
export const QUEUE_NAME = 'SCRAPE_QUEUE'

export const VENDORS = [
  {
    name: "Cabela's",
    link: 'http://www.cabelas.ca/',
    logo: '/logos/cabelas-logo.png',
    provinces: ['BC', 'AB', 'SK', 'MB', 'ON'],
    location: 'all over the place',
  } as IVendor,
  {
    name: 'Sail',
    link: 'https://www.sail.ca/',
    logo: '/logos/sail-logo.png',
    provinces: ['ON', 'QC'],
    location: 'all over the place',
  },
  {
    name: 'Firearms Outlet Canada',
    link: 'http://www.firearmsoutletcanada.com/',
    logo: '/logos/foc-logo.jpg',
    provinces: ['ON'],
    location: 'Ajax',
  },
  {
    name: "Al Flaherty's",
    link: 'https://www.alflahertys.com/',
    logo: '/logos/al-flahertys-logo.png',
    provinces: ['ON'],
    location: 'Toronto',
  },
  {
    name: 'Bulls Eye London',
    link: 'http://www.bullseyelondon.com/',
    logo: '/logos/bulls-logo.png',
    provinces: ['ON'],
    location: 'London',
  },
  {
    name: 'Canadian Tire',
    link: 'http://www.canadiantire.ca/en/sports-rec/hunting/ammunition.html',
    logo: '/logos/canadian-tire-logo.png',
    provinces: [
      'YT',
      'NT',
      'BC',
      'AB',
      'SK',
      'MB',
      'ON',
      'QC',
      'NB',
      'PE',
      'NS',
      'NF',
    ],
    location: 'all over the place',
  },
  {
    name: 'Reliable Gun',
    link: 'https://www.reliablegun.com/',
    logo: '/logos/reliable-gun-logo.jpg',
    provinces: ['BC'],
    location: 'Vancover',
  },
  {
    name: 'Tenda',
    link: 'https://www.gotenda.com/',
    logo: '/logos/tenda-logo.png',
    provinces: ['ON'],
    location: 'Richmond Hill',
  },
  {
    name: 'Canada Ammo',
    link: 'https://www.canadaammo.com/',
    logo: '/logos/canada-ammo-logo.jpg',
    provinces: ['BC', 'ON'],
    location: 'all over the place',
  },
  {
    name: 'Wolverine Supplies',
    link: 'https://www.wolverinesupplies.com/',
    logo: '/logos/wolverine-logo.png',
    provinces: ['MB'],
    location: 'Virden',
  },
  {
    name: 'Jo Brook Outdoors',
    link: 'https://www.jobrookoutdoors.com/',
    logo: '/logos/jo-brook-logo.png',
    provinces: ['MB'],
    location: 'Brandon',
  },
  {
    name: 'The Ammo Source',
    link: 'http://www.theammosource.com/',
    logo: '/logos/the-ammo-source-logo.png',
    provinces: ['ON'],
    location: 'Harrowsmith',
  },
  {
    name: 'Hirsch Precision',
    link: 'http://www.hirschprecision.com/',
    logo: '/logos/hirsch-logo.png',
    provinces: ['NS'],
    location: 'Lake Echo',
  },
  {
    name: 'Wild West',
    link: 'https://gun-shop.ca/',
    logo: '/logos/wild.png',
    provinces: ['AB'],
    location: 'Edmonton',
  },
  {
    name: 'Tiger Arms',
    link: 'http://www.tigerarms.ca/',
    logo: '/logos/tigerarms.png',
    provinces: ['BC'],
    location: 'Port Coquitlam',
    background: true,
  },
  {
    name: 'Mag Dump',
    link: 'https://magdump.ca/',
    logo: '/logos/magdump-logo.png',
    provinces: ['AB'],
    location: 'Sherwood Park',
  },
  {
    name: 'Rangeview Sports',
    //link: 'https://www.rangeviewcanada.com/',
    link: 'https://www.rangeviewsports.ca/',
    logo: '/logos/rangeview-sports.png',
    provinces: ['ON'],
    location: 'Newmarket',
  },
  {
    name: 'Trade Ex Canada',
    link: 'https://www.tradeexcanada.com/',
    logo: '/logos/tradex-logo.png',
    provinces: ['ON'],
    location: 'Hawkesburry',
  },
  {
    name: 'Frontier Firearms',
    link: 'http://frontierfirearms.ca/',
    logo: '/logos/frontierfirearms-logo.png',
    provinces: ['SK'],
    location: 'Prince Albert',
  },
  {
    name: 'BV Outdoor Essentials',
    link: 'https://www.bvoutdoors.com/',
    logo: '/logos/bvoutdoors-logo.png',
    provinces: ['BC'],
    location: 'Smithers',
  },
  {
    name: 'NAS Guns & Ammo',
    link: 'https://www.nasgunsandammo.com/',
    logo: '/logos/nas-logo.jpg',
    provinces: ['ON'],
    location: 'Niagara and Sault Ste. Marie',
  },
  {
    name: 'Dante Sports',
    link: 'https://www.dantesports.com/en/',
    logo: '/logos/dante-logo.png',
    provinces: ['QC'],
    location: 'Montréal',
  },
  {
    name: 'Lever Arms',
    link: 'https://www.leverarms.com/',
    logo: '/logos/leverarms-logo.png',
    provinces: ['BC'],
    location: 'Vancouver',
  },
  {
    name: 'Calgary Shooting Center',
    link: 'https://store.theshootingcentre.com/',
    logo: '/logos/shooting-center-logo.jpg',
    provinces: ['AB'],
    location: 'Calgary',
  },
  {
    name: 'Western Metal',
    link: 'https://www.westernmetal.ca/shooting',
    logo: '/logos/westernmetal-logo.png',
    provinces: ['AB'],
    location: 'somewhere',
  },
  {
    name: 'Al Simmons',
    link: 'https://alsimmonsgunshop.com/',
    logo: '/logos/al-simmons-logo.jpg',
    provinces: ['ON'],
    location: 'Hamilton',
  },
  {
    name: 'Vancouver Gun Store',
    link: 'https://vancouvergunstore.ca/',
    logo: '/logos/vancouvergunstore-logo.png',
    provinces: ['BC'],
    location: 'Vancouver',
  },
  {
    name: 'Bartons Big Country',
    link: 'https://www.bartonsbigcountry.ca/',
    logo: '/logos/logo-bartons.png',
    provinces: ['AB'],
    location: 'Grande Prairie',
  },
  {
    name: 'The Shooting Edge',
    link: 'https://theshootingedge.com/',
    logo: '/logos/shootingedge-logo.png',
    provinces: ['AB'],
    location: 'Calgary',
  },
  {
    name: 'Lanz Shooting Supplies',
    link: 'http://www.lanzshootingsupplies.com/',
    logo: '/logos/lanz-logo.png',
    provinces: ['ON'],
    location: 'St Ann',
  },
  {
    name: 'Durham Outdoors',
    link: 'https://durhamoutdoors.ca/',
    logo: '/logos/duram-logo.png',
    provinces: ['ON'],
    location: 'Orono',
  },
  {
    name: 'Soley Outdoors',
    link: 'https://www.solelyoutdoors.com/',
    logo: '/logos/soley-logo.png',
    provinces: ['ON'],
    location: 'Markham',
  },
  {
    name: 'North Pro Sports',
    link: 'http://northprosports.com/',
    logo: '/logos/northpro-logo.png',
    provinces: ['SK'],
    location: 'Saskatoon',
    background: true,
  },
  {
    name: 'Wanstalls',
    link: 'https://www.wanstallsonline.com/',
    logo: '/logos/wanstalls.png',
    provinces: ['BC'],
    location: 'Maple Ridge',
  },
  {
    name: 'Gothic Line Armoury',
    link: 'https://gothiclinearmoury.ca/',
    logo: '/logos/gothic-line-armoury.jpg',
    provinces: ['AB'],
    location: 'Calagary',
  },
  {
    name: 'Rampart',
    link: 'https://rampartcorp.com/',
    logo: '/logos/rampart.png',
    provinces: ['ON'],
    location: 'Ottawa',
    background: true,
  },
  {
    name: 'West Coast Hunting Supplies',
    link: 'https://www.westcoasthunting.ca',
    logo: '/logos/westcoasthunting-logo.png',
    provinces: ['BC'],
    location: 'Richmond',
  },
  {
    name: 'Siwash Sports',
    link: 'https://www.siwashsports.ca/',
    logo: '/logos/siwash-sports-logo.png',
    provinces: ['BC'],
    location: 'Chilliwack',
  },
  {
    name: 'Tillsonburg Gun Shop',
    link: 'https://tillsonburggunshop.com/',
    logo: '/logos/tillsonburg-logo.png',
    provinces: ['ON'],
    location: 'Tillsonburg',
  },
  {
    name: 'CRAFM',
    link: 'https://www.crafm.com/',
    logo: '/logos/crafm-logo.png',
    provinces: ['QC'],
    location: 'Montréal',
  },
  {
    name: 'Northern Elite Firearms',
    link: 'https://www.northernelitefirearms.ca/',
    logo: '/logos/northern-elite-firearms-logo.png',
    provinces: ['SK'],
    location: 'Prince Albert',
  },
  {
    name: 'Canadian GunHub',
    link: 'https://gun-hub.mybigcommerce.com/',
    logo: '/logos/canadian-gunhub-logo.png',
    provinces: [Province.AB],
    location: 'Dunmore',
  },
]

export const SOURCES = VENDORS.map(v =>
  url.parse(v.link).hostname.replace('www.', '')
)

export const PROXY_URL = 'https://ammobin.ca/images'
export const DATE_FORMAT = 'YYYY-MM-DD'
export const CACHE_REFRESH_HOURS = 4
