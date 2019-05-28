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
  - [1.4 教师端](#14-教师端)
    - [1.4.1 获取课程-班级列表](#141-获取课程-班级列表)
    - [1.4.2 获取某班选某课学生列表](#142-获取某班选某课学生列表)
    - [1.4.3 添加班级](#143-添加班级)
    - [1.4.4 查看投票结果](#144-查看投票结果)
    - [1.4.5 查看评价列表](#145-查看评价列表)
    - [1.4.6 删除班级](#146-删除班级)
  - [1.5. 浏览端](#15-浏览端)
    - [1.5.1 投票统计](#151-投票统计)
    - [1.5.2 获取教师名单](#152-获取教师名单)
    - [1.5.3 评价列表](#153-评价列表)
    - [1.5.4 投票结果导出](#154-投票结果导出)
  - [1.6 管理端](#16-管理端)
    - [1.6.1 开关投票/评价系统](#161-开关投票评价系统)
    - [1.6.2 教学管理](#162-教学管理)
      - [1.6.2.1 获取教学列表](#1621-获取教学列表)
      - [1.6.2.2 新增教师](#1622-新增教师)
      - [1.6.2.3 新增课程](#1623-新增课程)
      - [1.6.2.4 获取教师列表](#1624-获取教师列表)
      - [1.6.2.5 获取班级列表](#1625-获取班级列表)
      - [1.6.2.6 删除教学记录](#1626-删除教学记录)
      - [1.6.2.7 修改教学记录](#1627-修改教学记录)
    - [1.6.3 投票题目管理](#163-投票题目管理)
      - [1.6.3.1 获取题目列表](#1631-获取题目列表)
      - [1.6.3.2 新增题目](#1632-新增题目)
      - [1.6.3.3 修改题目](#1633-修改题目)
      - [1.6.3.4 删除题目](#1634-删除题目)
    - [1.6.4 学生管理](#164-学生管理)
      - [1.6.4.1 获取学生列表](#1641-获取学生列表)
      - [1.6.4.2 新增学生](#1642-新增学生)
      - [1.6.4.3 删除学生](#1643-删除学生)
      - [1.6.4.4 修改学生](#1644-修改学生)

<!-- /TOC -->

## 1.1. 登录与个人信息

### 1.1.1. 正常登录

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
        "name": "贺老师",
        "type": "T",
        "message": "ok",
        "userId": "123456"
    }
}
```

---

### 1.1.2. 首次登录补全信息

- POST /lesson/signin/{userId}
- payload:

- 老师信息：

```json
{
   "name": "贺老师",
    "phone": "123445678",
    "sex": "女",
    "birthday": "1998-09-16",
    "education": "博士",
    "college": "林大",
    "address": "林大行政楼"
}
```

- 学生信息：
  
```json
{
   "gradeClass": "2016-6",
    "major": "计科",
    "education": "本科",
    "name":"贺妍",
    "sex": "女",
    "birthday": "1998-9-16",
    "phone": "1234567890",
    "tip": "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
}
```

- return:
  
```json
{
  "code":0
}
```

---

### 1.1.3. 获取个人信息

- GET /lesson/info/{userId}
- return:
  
- 老师信息：
  
```json
{
  "code": 0,
  "data": {
    "userId": "123456",
    "name": "贺老师",
    "phone": "123445678",
    "sex": "女",
    "birthday": "1998-09-16",
    "education": "博士",
    "college": "林大",
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
    "gradeClass": "2016-6",
    "major": "计科",
    "education": "本科",
    "name":"贺妍",
    "sex": "女",
    "birthday": "1998-9-16",
    "phone": "1234567890",
    "tip": "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
  }
}
```

---

### 1.1.4. 修改个人信息

- PUT /lesson/info
- payload:

```json
{
  "userId": "123456",
  "name": "贺妍的新名字"
}
```

- return:

```json
{
  "code": 0
}
```

### 1.1.5. 修改密码

- PUT /lesson/password
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
  "data": "旧密码填写错误！"
}
```

---

## 1.2. 学生端

### 1.2.1. 获取投票列表

- GET /lesson/tList/{userId}
- userId：学生学号

- return: 返回教这个学生的所有教师
- score: 0 = 未投票 | 1 = 已投票

```json
{
  "code": 0,
  "data": [
    {
      "userId": "1234",
      "teacherName": "何老师",
      "teacherLesson": "编译原理",
      "score": 0
    },
    {
      "userId": "1234",
      "teacherName": "何老师",
      "teacherLesson": "编译原理",
      "score": 0
    },
    {
      "userId": "1234",
      "teacherName": "何老师",
      "teacherLesson": "编译原理",
      "score": 0
    }
  ]
}
```

---

### 1.2.2. 获取投票/评价系统状态

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

### 1.2.3. 获取投票题目

- GET /lesson/question
  
- return:

```json
{
  "code":0,
  "data": [
    {
      "questionId": 1,
      "questionContent": "他教的好吗",
      "ranlk4": 5,
      "ranlk3": 3,
      "ranlk2": 2,
      "ranlk1": 0,
    },
    {
      "questionId": 2,
      "questionContent": "他教的好吗",
      "ranlk4": 5,
      "ranlk3": 3,
      "ranlk2": 2,
      "ranlk1": 0,
    },
    {
      "questionId": 3,
      "questionContent": "他教的好吗",
      "ranlk4": 5,
      "ranlk3": 3,
      "ranlk2": 2,
      "ranlk1": 0,
    },
  ]
}
```

---

### 1.2.4. 投票动作

- POST /lesson/vote?from=123&to=321
- rank4: 优
- rank3: 良
- rank2: 中
- rank1: 差
- payload:

```json
[
  {
    "questionId": 1,
    "rank": "rank4"
  },
  {
    "questionId": 2,
    "rank": "rank4"
  }
]
```

- return:

```json
{
  "code": 0
}
```

---

### 1.2.5. 评价动作

- POST /lesson/comment
- 只需记录是给哪个老师的即可
- payload:

```json
{
  "comment":"老师很幽默",
  "userId":"2016214152"
}
```

- return:

```json
{
  "code": 0
}
```

---

## 1.3. 教师端

### 1.3.1. 获取课程-班级列表

- GET /lesson/class/{userId}

- return: 返回这个老师教的班级和这个老师给这个班教的学科

```json
{
  "code": 0,
  "data": [
    {
      "gradeClass": "2016-01",
      "teacherLesson": "编译原理"
    },
    {
      "gradeClass": "2016-02",
      "teacherLesson": "编译原理"
    },
    {
      "gradeClass": "2016-03",
      "teacherLesson": "编译原理"
    }
  ]
}
```

---

### 1.3.2. 获取某班选某课学生列表

- GET /lesson/sList?userId=&gradeClass=&teacherLesson=&nowPage=
- 老师&班级&课程&页码
- return:

```json
{
  "code": 0,
  "data": {
    "sList": [
    {
      "userId": "123",
      "userName": "贺妍",
      "sex": "女",
      "major": "计科",
      "gradeClass": "",
      "phone": "1234556",
      "birthday": "",
      "years": "",
      "education": "本科",
      "tip": "备注",
    },
    {
      "userId": "123",
      "userName": "贺妍",
      "sex": "女",
      "major": "计科",
      "gradeClass": "",
      "phone": "1234556",
      "birthday": "",
      "years": "",
      "education": "本科",
      "tip": "备注",
    }],
    "page": {
      "totalSize": 25,
      "totalPage": 10,
      "eachPage": 5,
      "nowPage": 1
    }
  }
}
```

---

### 1.3.3. 添加班级

- POST /lesson/sList

```json
{
  "gradeCLass": "2016-01",
  "teacherLesson": "数据结构",
  "userId":"2016214153"
}
```

- return:

```json
{
  "code": 0
}
```

---

### 1.3.4. 查看投票结果

- GET /lesson/vResult/{userId}
- return: rank4 3 2 1 = 优 良 中 差

```json
{
  "code": 0,
  "data": {
    "rank4": 30,
    "rank3": 20,
    "rank2": 10,
    "rank1": 5,
    "score": 87
  }
}
```

### 1.3.5. 查看评价列表

- GET /lesson/cList?userId=&nowPage=
- return:

```json
{
  "code": 0,
  "data": {
    "cList": [
      {
        "commentId": 1,
        "comment": "有趣"
      },
      {
        "commentId": 1,
        "comment": "有趣"
      },
      {
        "commentId": 1,
        "comment": "有趣"
      }
    ],
    "page": {
      "totalSize": 25,
      "totalPage": 10,
      "eachPage": 5,
      "nowPage": 1
    }
  }
}
```

---

### 1.3.6. 删除班级

- DELETE /lesson/sList
- payload: 删掉老师教的这个班级的联系，班级不受影响

```json
{
  "teacherLesson": "数据结构",
  "userId": "2016214153",
  "gradeClass":"2016-01"
}
```

- return:

```json
{
  "code": 0
}
```

---

## 1.4. 浏览端

### 1.4.1. 投票统计

- GET /lesson/analyse?way=
- way: class = 按班级 | lesson = 按学科 | grade = 按年级

- return:

- 按班级：
- 每个老师名下把全校所有班级列出来，没有投的传0，否则这个表不好整

```json
{
  "code": 0,
  "data": {
    "vList": [
      {
        "userId": "123",
        "userName": "贺老师",
        "vResult": [
          {
            "className": "2016-06",
            "score": 80
          },
          {
            "className": "2016-06",
            "score": 80
          },
          {
            "className": "2016-06",
            "score": 0
          }
        ]
      },
      {
        "userId": "123",
        "userName": "贺老师",
        "vResult": [
          {
            "className": "2016-06",
            "score": 80
          },
          {
            "className": "2016-06",
            "score": 80
          },
          {
            "className": "2016-06",
            "score": 0
          }
        ]
      },
      {
        "userId": "123",
        "userName": "贺老师",
        "vResult": [
          {
            "className": "2016-06",
            "score": 80
          },
          {
            "className": "2016-06",
            "score": 80
          },
          {
            "className": "2016-06",
            "score": 0
          }
        ]
      }
    ],
    "page": {
      "totalSize": 25,
      "totalPage": 10,
      "eachPage": 5,
      "nowPage": 1
    }
  }
}
```

- 按学科：全部学科

```json
{
  "code": 0,
  "data": {
    "vList": [
      {
        "userId": "123",
        "userName": "贺老师",
        "vResult": [
          {
            "lessonName": "2016-06",
            "score": 80
          },
          {
            "lessonName": "2016-06",
            "score": 80
          },
          {
            "lessonName": "2016-06",
            "score": 0
          }
        ]
      },
      {
        "userId": "123",
        "userName": "贺老师",
        "vResult": [
          {
            "lessonName": "2016-06",
            "score": 80
          },
          {
            "lessonName": "2016-06",
            "score": 80
          },
          {
            "lessonName": "2016-06",
            "score": 0
          }
        ]
      },
      {
        "userId": "123",
        "userName": "贺老师",
        "vResult": [
          {
            "lessonName": "2016-06",
            "score": 80
          },
          {
            "lessonName": "2016-06",
            "score": 80
          },
          {
            "lessonName": "2016-06",
            "score": 0
          }
        ]
      },
    ],
    "page": {
      "totalSize": 25,
      "totalPage": 10,
      "eachPage": 5,
      "nowPage": 1
    }
  }
}
```

- 按年级：全部年级

```json
{
  "code": 0,
  "data": {
    "vList": [
      {
        "userId": "123",
        "userName": "贺老师",
        "vResult": [
          {
            "grade": "2016",
            "score": 80
          },
          {
            "grade": "2016",
            "score": 80
          },
          {
            "grade": "2016",
            "score": 0
          }
        ]
      },
      {
        "userId": "123",
        "userName": "贺老师",
        "vResult": [
          {
            "grade": "2016",
            "score": 80
          },
          {
            "grade": "2016",
            "score": 80
          },
          {
            "grade": "2016",
            "score": 0
          }
        ]
      },
      {
        "userId": "123",
        "userName": "贺老师",
        "vResult": [
          {
            "grade": "2016",
            "score": 80
          },
          {
            "grade": "2016",
            "score": 80
          },
          {
            "grade": "2016",
            "score": 0
          }
        ]
      },
    ],
    "page": {
      "totalSize": 25,
      "totalPage": 10,
      "eachPage": 5,
      "nowPage": 1
    }
  }
}
```

---

### 1.4.2. 获取教师名单

- GET /lesson/tList
- return:

```json
{
  "code": 0,
  "data": [
    {
      "userId": "123",
      "userName": "贺妍"
    },
    {
      "userId": "123",
      "userName": "贺妍"
    },
    {
      "userId": "123",
      "userName": "贺妍"
    }
  ]
}
```

---

### 1.4.3. 评价列表

- GET /lesson/cList?userId=&page=

### 1.4.4. 投票结果导出

- GET /lesson/download  具体怎么实现？

---

## 1.5. 管理端

### 1.5.1. 开关投票/评价系统

- PUT /lesson/sysState
- payload: voteState 投票系统 | commentState 评价系统

```json
{
  "voteState": 1
}
```

```json
{
  "code": 0
}
```

---

### 1.5.2. 教学管理

#### 1.5.2.1. 获取教学列表

- GET /lesson/teachList

- return:

```json
{
  "code": 0,
  "data": {
    "teachList": [
      {
        "userId": "123",
        "userName": "贺老师",
        "email": "123456@qq.com",
        "phone": "123445678",
        "sex": "女",
        "birthday": "1998-09-16",
        "education": "博士",
        "collage": "林大",
        "address": "林大行政楼",
        "lessonId": "123",
        "lessonName": "编译原理",
        "lessonScore": 2,
        "lessonTime": 12,
        "lessonType": "必修",
        "classId": "123",
        "className": "2016-06",
      },
      {
        "userId": "123",
        "userName": "贺老师",
        "email": "123456@qq.com",
        "phone": "123445678",
        "sex": "女",
        "birthday": "1998-09-16",
        "education": "博士",
        "collage": "林大",
        "address": "林大行政楼",
        "lessonId": "123",
        "lessonName": "编译原理",
        "lessonScore": 2,
        "lessonTime": 12,
        "lessonType": "必修",
        "classId": "123",
        "className": "2016-06",
      },
      {
        "userId": "123",
        "userName": "贺老师",
        "email": "123456@qq.com",
        "phone": "123445678",
        "sex": "女",
        "birthday": "1998-09-16",
        "education": "博士",
        "collage": "林大",
        "address": "林大行政楼",
        "lessonId": "123",
        "lessonName": "编译原理",
        "lessonScore": 2,
        "lessonTime": 12,
        "lessonType": "必修",
        "classId": "123",
        "className": "2016-06",
      },
    ],
    "page": {
      "totalSize": 25,
      "totalPage": 10,
      "eachPage": 5,
      "nowPage": 1
    }
  }
}
```

---

#### 1.6.2.2 新增教师

- POST /lesson/addT
- payload:

```json
{
  "userId": "123",
  "password": "123456",
  "name": "何老师",
  "email": "123@qq.com"
}
```

- return:

```json
{
  "code": 0
}
```

---

#### 1.6.2.3 新增课程

- POST /lesson/addL
- payload: 这里的课程是指一条综合教学记录，老师\*班级\*课程确定一条信息

```json
{
  "teacherLesson": "编译原理",
  "lessonScore": "2",
  "lessonTime": "12",
  "lessonType": "必修",
  "userId": "123这里是教师id//哪个老师教",
  "gradeClass": "2016-06//教哪个班"
}
```

- return: code: 0

---

#### 1.6.2.4 获取教师列表

- GET /lesson/tList 前面写了

#### 1.6.2.5 获取班级列表

- GET /lesson/gList

- return:

```json
{
  "code": 0,
  "data": [{
    "gradeClass": "2016-06"
  },
  {
     "gradeClass": "2016-06"
  },
  {
     "gradeClass": "2016-06"
  }]
}
```

---

#### 1.6.2.6 删除教学记录

- DELETE /lesson/teachList
- payload: 只删除三者联系，不删除老师，课程，班级

```json
{
  "userId": "何老师",
  "teacherLesson": "编译原理",
  "gradeClass": "2016-06"
}
```

- return: code: 0

---

#### 1.6.2.7 修改教学记录

- PUT /lesson/teachList
- 只可修改课程信息"lessonScore": "2",
  "lessonTime": "12",
  "lessonType": "必修",，修改班级，修改老师
- payload:

```json
{
  "userId": "何老师",
  "teacherLesson": "编译原理",
  "gradeClass": "2016-06"
}
```

---

### 1.6.3 投票题目管理

#### 1.6.3.1 获取题目列表

- 和1.2.3. 获取投票题目一样，但是修改一下，增加每个题目的四个分值，两个共用一个接口
- GET /lesson/question
  
- return:

```json
{
  "code":0,
  "data": [
    {
      "questionId": 1,
      "questionContent": "他教的好吗",
      "ranlk4": 5,
      "ranlk3": 3,
      "ranlk2": 2,
      "ranlk1": 0,
    },
    {
      "questionId": 2,
      "questionContent": "他教的好吗",
      "ranlk4": 5,
      "ranlk3": 3,
      "ranlk2": 2,
      "ranlk1": 0,
    },
    {
      "questionId": 3,
      "questionContent": "他教的好吗",
      "ranlk4": 5,
      "ranlk3": 3,
      "ranlk2": 2,
      "ranlk1": 0,
    },
  ]
}
```

---

#### 1.6.3.2 新增题目

- POST /lesson/question
- payload:

```json
{
  "content": "他教的好吗",
  "rank4": 5,
  "ranlk3": 3,
  "ranlk2": 2,
  "ranlk1": 0,
}
```

- return : code: 0

---

#### 1.6.3.3 修改题目

- PUT /lesson/question
- payload:

```json
{
  "questionId": "123",
  "content": "教的好吗",
  "rank4": 5,
  "ranlk3": 3,
  "ranlk2": 2,
  "ranlk1": 0
}
```

- return: code: 0

---

#### 1.6.3.4 删除题目

- DELETE /lesson/question/{questionId}

- return: code: 0

---

### 1.6.4 学生管理

#### 1.6.4.1 获取学生列表

- GET /lesson/sList?gradeClass=2016-06 已有接口 按班级查询

- return:

```json
{
  "code": 0,
  "data": {
    "sList": [
    {
      "userId": "123",
      "userName": "贺妍",
      "sex": "女",
      "major": "计科",
      "gradeClass": "",
      "phone": "1234556",
      "birthday": "",
      "years": "",
      "education": "本科",
      "tip": "备注",
      

    }],
    "page": {
      "totalSize": 25,
      "totalPage": 10,
      "eachPage": 5,
      "nowPage": 1
    }
  }
}
```

#### 1.6.4.2 新增学生

- POST /lesson/sList
- payload:

```json
{
  "userId": "123",
  "password": "123456",
  "gradeClass": "2016-06",
  "major": "计科",
  "years": "4年",
  "education": "本科"
}
```

- return: code: 0

#### 1.6.4.3 删除学生

- DELETE /lesson/sList/{userId}

- return: code: 0

---

#### 1.6.4.4 修改学生

- PUT /lesson/sList
- payload: 改哪项传哪项

```json
{
  "userId": "123",
  "major": "计科"
}
```

- return: code: 0
