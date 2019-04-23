import * as helpers from '../helpers'
import { ItemType, IItemListing, Province } from '../graphql-types'
import { scrape, Info, Selectors } from './common'
import throat from 'throat'

export function theGunDealer(type: ItemType): Promise<IItemListing[]> {
  const info: Info = {
    site: 'thegundealer.net',
    vendor: `The Gun Dealer`,
    provinces: [Province.NB],
  }
  const selectors: Selectors = {
    item: '.product',
    name: '.woocommerce-loop-product__title',
    img: '.wp-post-image',
    link: 'a',
    price: '.price',

    nextPage: '.next',
  }
  const throttle = throat(1)

  const BASE = `https://www.${info.site}/product-category/ammunition/`
  switch (type) {
    case ItemType.centerfire:
      return Promise.all(
        ['handgun', 'rifle', 'bulk-ammunition'].map(t =>
          throttle(() => scrape(p => `${BASE}/${t}/page/${p}`, info, selectors))
        )
      )
        .then(helpers.combineResults)
        .then(helpers.classifyCenterfire)
    case ItemType.shotgun:
      return Promise.all(
        ['shotgun'].map(t =>
          throttle(() => scrape(p => `${BASE}/${t}/page/${p}`, info, selectors))
        )
      )
        .then(helpers.combineResults)
        .then(helpers.classifyShotgun)
    case ItemType.rimfire:
      return scrape(p => `${BASE}/rimfire/page/${p}`, info, selectors).then(
        helpers.classifyRimfire
      )

    default:
      return Promise.reject(new Error('unknown type: ' + type))
  }
}
