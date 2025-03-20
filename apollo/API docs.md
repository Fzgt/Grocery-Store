## 登陆注册

## POST /register

请求参数：email, password

数据格式: json

## POST /login

请求参数：username, email, password

数据格式: json



## User Dashboard API

> 推荐测试userId = 2

### GET   /users/:userId

> 取到user个人信息，加入过的俱乐部，对应俱乐部发布过的posts。

- 请求参数：userId 拼到url

### PUT   /users/:userId

> 更新个人信息

- 必须参数：userId 拼到url 
- 可选参数：Username, FirstName, LastName, Gender, DateOfBirth, PhoneNumber, Address, Email,  AccountType
- 数据格式：JSON

### GET   /organizations

> 用于查看全部俱乐部

- 请求参数： 无

### POST /memberships

> User加入某个俱乐部

- 请求参数：请求体里 userId, role, organizationId

- 数据格式json

### GET   /rsvps/:userId

> 列出User所有rsvp过的活动。自己过滤一下俱乐部。

- 请求参数：userId频道url

### POST /rsvps

> 回复某个Event的rsvp

- 请求参数：eventId  userId  rsvpStatus  rsvpDate

- 数据格式：json





## Manager Dashboard API：

### GET /memberships/:organizationId

> 拿organizationId拉某个club所有Member

- 请求参数：organizationId拼url上

### GET  /posts/:organizationId

> 拉某个organization的所有posts

- 请求参数：organizationId拼url上

### POST  /posts

> 创建一条Post

- 请求参数：organizationId, postedByUserId, content, visibility, postDate
- 数据格式：json

### PUT   /posts

> 更新一条Post

- 请求参数：organizationId, postId, content, visibility, postDate
- 数据格式：json

### DELETE  /posts/:postId

> 删除一条Post

- 请求参数：postId拼到url上

### GET   /events/:organizationId

> 拿organizationId拉所有Event

- 请求参数：organizationId拼到url上

### POST  /events

> 创建一条Event

- 请求参数：organizationId, title, description, eventDate
- 数据格式：json

### PUT  /events

> 更新一条event

- 请求参数：eventId, organizationId, title, description, eventDate 
- 数据格式：json

### DELETE   /events/:eventId

> 删除一条event

- 请求参数：postId拼到url上

### GET  /rsvps/users/:eventId

> 拿eventId得到所有回复rsvp的人

- 请求参数：eventId拼到url上





## Admin Dashboard API

### GET  /users

> 拉所有User

- 请求参数：无

### 不在Admin dashboard创建User 这个button删一下

只更新用户信息和删除用户，注册普通用户走注册模块。

### PUT   /users/:userId

> 更新个人信息

- 必须参数：userId 拼到url 
- 可选参数：Username, FirstName, LastName, Gender, DateOfBirth, PhoneNumber, Address, Email,  AccountType
- 数据格式：JSON

### DELETE   /users/:userId

> 删除用户

- 请求参数：拼userId到url

### GET   /organizations

> 拿所有俱乐部

- 请求参数：无

### POST  /organizations

> 创建俱乐部

- 请求参数：organizationName，description，adminUserId
- 数据格式：JSON

### PUT  /organizations

> 更新organization

- 请求参数：organizationName，description，organizationId
- 数据格式：JSON

### DELETE  /organizations/:organizationId

> 删除某个organization

- 请求参数：拼organizationId到url



