const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const z = require('zod');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

function ensureValidUrl(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'https://' + url;
  }
  return url;
}

app.get('/', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const ensuredUrl = ensureValidUrl(url);

  const { success } = z.url({
    hostname: z.regexes.domain
  }).safeParse(ensuredUrl);

  if (!success) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  try {
    // 发起HTTP请求获取目标网页内容
    const response = await axios.get(ensuredUrl);

    // 使用Cheerio解析HTML
    const $ = cheerio.load(response.data);
    const title = $('head > title').text().trim() || 'No Title';
    const desc = $('meta[name="description"]').attr('content') || '';

    // 返回JSON格式的数据
    res.json({
      title,
      desc,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch the URL' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
