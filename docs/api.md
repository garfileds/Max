## /api/envelope 

### 说明：用户点击领红包时发送该请求，以确定后续交互

### `request` `[POST]` `[JSON]`
```json
{
    "user_id": "007",
    "tid": "110"
}
```

### `response` `[JSON]`
#### 说明：如果能领，code为ok，附上要跳转的url，message为''。如果不能领，code为error，在message里附上不能领的原因，url为''
```json
{
    "code": "ok/error",
    "message": "你已领取多次",
    "url": "http://要跳转的活动页"
}
```

## /api/envelopes

### 说明：获取需要展示的红包列表

### `request` `[GET]`

### `response` `[JSON]`
```json
[
{
    "tid": "001",
    "company": "ele",
    "bonus": 7,
    "number": 1001, /* 红包编号 */
    "progress": 4 /* 已领几个 */
},
{
    "tid": "002",
    "company": "mt",
    "bonus": 7,
    "number": 1002,
    "progress": 4 /* 已领几个 */
}
]
```

## /api/userId

### 说明：获取用户的unionId

### `request` `[GET]`
```json
{
  "code": "xxx"
}
```

### `response` `[JSON]`
```json
{
    "id": "xxx" /* 实际就是unionId */
}
```
