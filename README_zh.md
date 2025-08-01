# External Link Reminder

传入一个url然后获得改网站的meta信息，存在的意义是有网站拥有跳转陌生网址提示，此api可以防止暴露源站ip。

这个库是写来给阿里云函数计算FC使用的，设置了3秒运行时间，超时将返回502状态。

## 输入

`/?url=${example.com}`

## 输出(json)

**成功 200**
```ts
{
  title: string
  desc: string
}
```

**其他错误 500**
```ts
{
  error: string
}
```
