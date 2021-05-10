import express from 'express'

const CUSTOM_HEADERS = {
  "Content-Security-Policy": "script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self';"
}

start({port: 4001})

async function start ({port, configDir, domain}) {
  let app = express()

  const staticDir = (path) => (
    express.static(path, {
      setHeaders: (res) => {
        for (let k in CUSTOM_HEADERS) {
          res.setHeader(k, CUSTOM_HEADERS[k])
        }
      }
    })
  )
  const staticFile = (path, opts) => (req, res) => {
    for (let k in CUSTOM_HEADERS) {
      res.setHeader(k, CUSTOM_HEADERS[k])
    }
    res.sendFile(path, {root: process.cwd(), cacheControl: opts?.cacheControl})
  }

  app.get('/build.js', staticFile('./dist/index.es.js'))
  app.use('/css', staticDir('css'))
  app.use('/', staticDir('demo'))

  app.use((req, res) => {
    res.status(404).send('404 Page not found')
  })

  app.listen(port, async () => {
    console.log(`Demo server listening at http://localhost:${port}`)
  })
}