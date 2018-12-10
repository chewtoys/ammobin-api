const RedisSMQ = require('rsmq')
const cron = require('node-cron')

const rsmq = new RedisSMQ({ host: 'redis' })

const logger = require('../logger').managerLogger

const { CACHE_REFRESH_HOURS, SOURCES, QUEUE_NAME } = require('../constants')

async function doWork() {
  function queueUpCacheRefresh(type) {
    return Promise.all(
      SOURCES.map(
        source =>
          new Promise((resolve, reject) =>
            rsmq.sendMessage(
              { qname: QUEUE_NAME, message: JSON.stringify({ source, type }) },
              (err, res) => (err ? reject(err) : resolve(res))
            )
          )
      )
    )
  }

  function deleteBestPricesCache(type) {
    // delete "cache:bestPrices:${type}"
    return Promise.resolve(type)
  }

  try {
    await new Promise((resolve, reject) => {
      rsmq.listQueues((err, queues) => {
        if (err) {
          logger.error({
            type: 'failed-to-list-rsmq-queues',
            error: err.toString(),
          })
          return reject(err)
        }
        if (queues.indexOf(QUEUE_NAME) === -1) {
          rsmq.createQueue({ qname: QUEUE_NAME }, function(err, resp) {
            if (err) {
              logger.error({
                type: 'failed-to-create-rsmq-queues',
                error: err.toString(),
              })
              return reject(err)
            }
            if (resp === 1) {
              logger.info({ type: 'rsmq-queue-created' })
            }
            return resolve()
          })
        } else {
          resolve()
        }
      })
    })

    await ['centerfire', 'rimfire', 'shotgun'].reduce(async (p, type) => {
      await p
      await queueUpCacheRefresh(type)
      return deleteBestPricesCache(type)
    }, Promise.resolve())

    logger.info({ type: 'cache-refresh-initd' })
  } catch (e) {
    logger.error({ type: 'failed-to-refresh-cache', e })
  }
}

// detect if we have something in the cache, if not, do some work
//if (false) {
// doWork()
//}

cron.schedule(`0 */${CACHE_REFRESH_HOURS} * * *`, doWork)
logger.info({ type: 'started manager' })
