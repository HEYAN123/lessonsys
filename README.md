# 1. 课程教学质量评测反馈系统

<!-- TOC -->

- [1. 课程教学质量评测反馈系统](#1-课程教学质量评测反馈系统)
  - [1.1. 登录与个人信息](#11-登录与个人信息)
    - [1.1.1 正常登录](#111-正常登录)
    - [1.1.2 首次登录补全信息](#112-首次登录补全信息)
    - [1.1.3 获取个人信息](#113-获取个人信息)
    - [1.1.4 修改个人信息](#114-修改个人信息)
    - [1.1.5 修改密码](#115-修改密码)
  - [1.3. 学生端](#13-学生端)
    - [1.3.1 获取投票列表](#131-获取投票列表)
    - [1.3.2 获取投票/评价系统状态](#132-获取投票评价系统状态)
    - [1.3.3 获取投票题目](#133-获取投票题目)
    - [1.3.4 投票动作](#134-投票动作)
    - [1.3.5 评价动作](#135-评价动作)

<!-- /TOC -->

## 1.1. 登录与个人信息

### 1.1.1 正常登录

- POST /lesson/login
- 后台查询到信息已补全才允许正常登录进去
- payload:

```json
{
  "userId": "123456",
  "password": "222222",
}
```

- return:
- type: T = 教师端 | S = 学生端 | M = 管理端 | L = 浏览端
- message: ok = 信息完整正常登录 | fail = 信息不完整需要补全(仍需要传type，以选择信息表单)

```json
{
    "code": 0,
    "data": {
        "userName": "贺老师",
        "type": "T",
        "message": "",
        "userId": "123456"
    }
}
```

---

### 1.1.2 首次登录补全信息

- POST /lesson/signin/{userId}
- payload:

- 老师信息：

```json
{
  "userName": "贺老师",
  "sex": "女",
  "birthday": "2018-12-12",
  "education": "博士",
  "address": "林大",
  "collage": "北大"
}
```

- 学生信息：
  
```json
{
  "userName": "heyan",
  "sex": "女",
  "birthday": "2016-10-10",
  "phone": "1234567890",
  "tip": "备注备注"
}
```

- return:
  
```json
{
  "code":0
}
```

---

### 1.1.3 获取个人信息

- GET /lesson/info/{userId}
- return:
  
- 老师信息：
  
```json
{
  "code": 0,
  "data": {
    "userId": "123456",
    "userName": "贺老师",
    "email": "123456@qq.com",
    "phone": "123445678",
    "sex": "女",
    "birthday": "1998-09-16",
    "education": "博士",
    "collage": "林大",
    "address": "林大行政楼"
  }
}
```

- 学生信息：
  
```json
{
  "code": 0,
  "data": {
    "userId": "123456",
    "className": "2016-6",
    "major": "计科",
    "years": "4年",
    "education": "本科",
    "userName":"贺妍",
    "sex": "女",
    "birthday": "1998-9-16",
    "phone": "1234567890",
    "tip": "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
  }
}
```

---

### 1.1.4 修改个人信息

- PUT /lesson/info
- payload:

```json
{
  "userId": "123456",
  "userName": "贺妍的新名字"
}
```

- return:

```json
{
  "code": 0
}
```

### 1.1.5 修改密码

- PUT /lesson/info
- payload:  需要验证旧密码是否正确

```json
{
  "userId": "123456",
  "oldPs": "123456",
  "newPs": "654321"
}
```

- return:

```json
{
  "code": 1,
  "message": "旧密码填写错误！"
}
```

---

## 1.3. 学生端

### 1.3.1 获取投票列表

- GET /lesson/tList/{userId}
- userId：学生学号

- return: 返回教这个学生的所有教师
- vState: 0 = 未投票 | 1 = 已投票

```json
{
  "code": 0,
  "data": [
    {
      "userId": "1234",
      "userName": "何老师",
      "lessonName": "编译原理",
      "vState": 0
    },
    {
      "userId": "1234",
      "userName": "何老师",
      "lessonName": "编译原理",
      "vState": 0
    },
    {
      "userId": "1234",
      "userName": "何老师",
      "lessonName": "编译原理",
      "vState": 0
    }
  ]
}
```

---

### 1.3.2 获取投票/评价系统状态

- GET /lesson/sysState

- return:
- voteState: 投票系统状态 0 = 未开放 | 1 = 已开放
- commentState: 评价系统状态 0 = 未开放 | 1 = 已开放

```json
{
  "code": 0,
  "data": {
    "voteState": 0,
    "commentState": 0
  }
}
```

---

### 1.3.3 获取投票题目

- GET /lesson/question
  
- return:

```json
{
  "code":0,
  "data": [
    {
      "questionId": "123",
      "questionContent": "他教的好吗"
    },
    {
      "questionId": "123",
      "questionContent": "他教的好吗"
    },
    {
      "questionId": "123",
      "questionContent": "他教的好吗"
    },
  ]
}
```

---

### 1.3.4 投票动作

- POST /lesson/vote?from=123&to=321
- rank4: 优
- rank3: 良
- rank2: 中
- rank1: 差
- payload:

```json
[
  {
    "questionId": "123",
    "rank": "rank4"
  },
  {
    "questionId": "123",
    "rank": "rank4"
  },
  {
    "questionId": "123",
    "rank": "rank4"
  },
]
```

- return:

```json
{
  "code": 0
}
```

---

### 1.3.5 评价动作

- POST /lesson/comment?to=321
- 只需记录是给哪个老师的即可
- payload:

```json
{
  "comment":"老师很幽默"
}
```

- return:

```json
{
  "code": 0
}
```

---
