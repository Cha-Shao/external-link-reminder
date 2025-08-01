# External Link Reminder

Pass in a URL to retrieve the meta information of the target website. The purpose of this API is to provide a reminder when redirecting to unfamiliar websites, helping to prevent the exposure of the source site's IP address.

This library is designed for use with Alibaba Cloud Function Compute (FC). It has a 3-second execution timeout; if exceeded, a 502 status will be returned.

## Input

`/?url=${example.com}`

## Output(json)

**success 200**
```ts
{
  title: string
  desc: string
}
```

**other error 500**
```ts
{
  error: string
}
```
