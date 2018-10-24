# koa2

### 1. koa2的request对象的属性值
+ 请求地址为`http://localhost:4399/user/list?page=1&key=mark`
```json
{
  "url": "/user/list?page=1&key=mark",
  "query": {
    "page": "1",
    "key": "mark"
  },
  "querystring": "page=1&key=mark",
  "header": {
    "host": "localhost:4399",
    "connection": "keep-alive",
    "cache-control": "max-age=0",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    "cookie": "random=285840407433; Webstorm-3b4604bb=0003b1c5-894c-48fa-9d7e-da54932154e4"
  },
  "origin": "http://localhost:4399",
  "originalUrl": "/user/list?page=1&key=mark",
  "href": "http://localhost:4399/user/list?page=1&key=mark",
  "path": "/user/list",
  "search": "?page=1&key=mark",
  "host": "localhost:4399",
  "hostname": "localhost",
  "URL": "http://localhost:4399/user/list?page=1&key=mark",
  "type": "",
  "state": {},
  "protocol": "http",
  "secure": false,
  "ip": "::ffff:127.0.0.1",
  "ips": [],
  "subdomains": []
}
```