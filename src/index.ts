import { Hono } from 'hono'
import scraper from '@mradex77/google-play-scraper'
const app = new Hono()


type Result =  {
  code: number,
  message: string,
  data: any,
}

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.get('/scraper/play/list', (c) => {

  scraper.list({
    collection: scraper.collection.TOP_FREE,
    category: scraper.category.GAME,
    num: 5,
  }).then(result => {

    const results: Result = {
      code: 200,
      message: 'SUCCESS',
      data: result
    }
    return c.json(results)
  }).catch(err => {
    const result: Result = {
      code: 200,
      message: 'Response Error',
      data: 'error'
    }
    return c.json(result)
  })
})

export default app
