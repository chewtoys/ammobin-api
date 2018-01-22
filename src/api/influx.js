const Influx = require('influx');

const influxClicksDb = new Influx.InfluxDB({
  host: 'influx',
  database: 'clicks', // doh, should have been something more generic
  schema: [
    {
      measurement: 'click',
      fields: { v: Influx.FieldType.BOOLEAN },
      tags: [
        'userAgent',
        'vendor',
        'province',
        'brand',
        'calibre',
        'url',
        'cost',
        'unitCost',
        'count',
        'name',
      ]
    },
  ]
})
const influxViewsDb = new Influx.InfluxDB({
  host: 'influx',
  database: 'views',
  schema: [
    {
      measurement: 'view',
      fields: { v: Influx.FieldType.BOOLEAN },
      tags: [
        'userAgent',
        'brand',
        'calibre',
      ]
    },
  ]
})
const influxItemsDb = new Influx.InfluxDB({
  host: 'influx',
  database: 'items',
  schema: [
    {
      measurement: 'item',
      fields: { v: Influx.FieldType.BOOLEAN },
      tags: [
        'vendor',
        'province',
        'brand',
        'calibre',
        'name',
        'price',
        'unitCost',
      ]
    }
  ]
})
const influxScrapesDb = new Influx.InfluxDB({
  host: 'influx',
  database: 'scrapes',
  schema: [
    {
      measurement: 'scrape',
      fields: { v: Influx.FieldType.BOOLEAN },
      tags: [
        'results',
        'time',
        'vendor',
        'type',
      ]
    },
    {
      measurement: 'scrape-failure',
      fields: { v: Influx.FieldType.BOOLEAN },
      tags: [
        'time',
        'error',
        'vendor',
        'type',
      ]
    }
  ]
});

const retention = '7d'
const prom = Promise.all([
  [influxClicksDb, 'clicks'],
  [influxViewsDb, 'views'],
  [influxScrapesDb, 'scrapes'],
  [influxItemsDb, 'items'],
].map(async k => {
  // get dbs, and create if not found
  const names = await k[0].getDatabaseNames()
  if (!names.includes(k[1])) {
    await k[0].createDatabase(k[1])
  }

  // get policies, if not found create, else update
  const policies = (await k[0].showRetentionPolicies(k[1])).map(p => p.name)
  if (!policies.includes(retention)) {
    await k[0].createRetentionPolicy(retention, { duration: retention, replication: 1 })
  } else {
    await k[0].alterRetentionPolicy(retention, {
      duration: retention,
      replication: 1,
      default: true
    })
  }

}))

module.exports = {
  async logClick(url, userAgent, item) {
    await prom
    await influxClicksDb.writePoints([
      {
        measurement: 'clicks',
        tags: {
          userAgent,
          vendor: item.vendor,
          province: item.province,
          brand: item.brand,
          calibre: item.calibre,
          url,
          price: item.price || 0,
          unitCost: item.unitCost || 0,
          count: item.count || 0,
          name: item.name,
        },
        fields: { v: true }
      }
    ])

  },
  async logView(userAgent, brand, calibre) {
    await prom
    await influxViewsDb.writePoints([
      {
        measurement: 'view',
        tags: {
          userAgent,
          brand,
          calibre
        },
        fields: { v: true }
      }
    ])

  },
  async logItem(item) {
    await prom
    await influxItemsDb.writePoints([
      {
        measurement: 'item',
        tags: {
          vendor: item.vendor,
          province: item.province,
          brand: item.brand,
          calibre: item.calibre,
          price: item.price || 0,
          unitCost: item.unitCost || null,
          name: item.name,
        },
        fields: { v: true }
      }
    ])

  },
  async logScrapeResult(type, vendor, results, time) {
    await prom
    await influxScrapesDb.writePoints([
      {
        measurement: 'scrape',
        tags: {
          vendor,
          type,
          results,
          time
        },
        fields: { v: true }
      }
    ])

  },
  async logScrapeFail(type, vendor, time, error) {
    await prom
    await influxScrapesDb.writePoints([
      {
        measurement: 'scrape-failure',
        tags: {
          vendor,
          type,
          time,
          error
        },
        fields: { v: true }
      }
    ])

  }
}