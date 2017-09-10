const Influx = require('influx');

const influxClicksDb = new Influx.InfluxDB({
  host: 'influx',
  database: 'clicks',
  schema: [
    {
      measurement: 'click',
      fields: {
        url: Influx.FieldType.STRING,
        cost: Influx.FieldType.FLOAT,
        unitCost: Influx.FieldType.FLOAT,
        count: Influx.FieldType.INTEGER,
        name: Influx.FieldType.STRING,
      },
      tags: [
        'userAgent',
        'vendor',
        'province',
        'brand',
        'calibre',
      ]
    }
  ]
});

const prom = influxClicksDb.getDatabaseNames()
  .then(names => {
    if (!names.includes('clicks')) {
      return influxClicksDb.createDatabase('clicks');
    }
  })
  .catch(e => {
    console.error('FAILED to connect to influx', e);
    throw e;
  });


module.exports = {
  logClick(url, userAgent, item) {
    return prom
      .then(() =>
        influxClicksDb.writePoints([
          {
            measurement: 'clicks',
            tags: {
              userAgent,
              vendor: item.vendor,
              province: item.province,
              brand: item.brand,
              calibre: item.calibre
            },
            fields: {
              url,
              price: item.price || 0,
              unitCost: item.unitCost || 0,
              count: item.count || 0,
              name: item.name,
            }
          }
        ])
      )
  },
  // tmp. remove once redis no longer sole db
  influxClicksDb
}