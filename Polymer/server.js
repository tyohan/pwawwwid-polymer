const fetch = require('node-fetch');
compression = require('compression');
const express = require('express');
const fs = require('fs');
const NodeCache = require( 'node-cache' );
const dataCache = new NodeCache({stdTTL:43200});
const serveDir='dist';
const cheerio = require('cherio')


const getData= async () => {
  const dataKey='rssfeed';
  let data=null;
  try{
    console.log('get data from cache...');
    data=dataCache.get(dataKey);
    if(typeof data==='undefined'){
      console.log('fetching rss...');
      let rssFeed=await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid');
      data=await rssFeed.text();
      dataCache.set(dataKey,data);
    }
  } catch( err ){
      // ENOTFOUND: Key `not-existing-key` not found 
      console.log(err);
  }
  return Promise.resolve(data);
}
const app = express();
app.use(compression());


app.get('/', async (req, res,next) => {
  let html = fs.readFileSync(serveDir + '/index.html', 'utf8');
  let $ = cheerio.load(html);
  let data= await getData();
  let scriptNode = '<script>window.rssfeed='+data+'</script>';
  $('head').append(scriptNode);
  res.send($.html());
  res.end();
});

app.use(express.static(__dirname + '/'+serveDir));

app.use((err, req, res, next) => {
  console.error(err.stack);
});


app.listen(8080);