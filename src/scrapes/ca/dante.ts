import { scrape, Info, Selectors } from '../common'

import { Province, ItemType, IItemListing } from '../../graphql-types'
function work(type: String): Promise<IItemListing[]> {
  const info: Info = {
    link: 'dantesports.com',
    name: `Dante Sports`,
    provinces: [Province.QC],
  }

  const selectors: Selectors = {
    item: '.product-item-info',
    name: '.product-item-name',
    img: 'img',
    link: '.product-item-link',
    price: '.price-final_price',

    //nextPage: '.next',
    outOfStock: '.pages-item-next',
  }

  return scrape(
    (_) => `https://www.${info.link}/en/${type}/?product_list_limit=48&quantity_and_stock_status=1`,
    info,
    selectors
  )
}
export function dante(type: ItemType): Promise<IItemListing[]> {
  switch (type) {
    case ItemType.rimfire:
      return work('ammunition/rimfire')

    case ItemType.centerfire:
      return work('ammunition/centerfire')

    case ItemType.shotgun:
      return work('ammunition/shotshells')
    case ItemType.shot:
      return work('reloading/campro')
    case ItemType.powder:
    case ItemType.case:
    case ItemType.primer:
      return Promise.resolve(null)
    default:
      return Promise.reject(new Error('unknown type: ' + type))
  }
}
