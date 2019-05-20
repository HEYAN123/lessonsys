# 1. 扫雪工作管理系统

<!-- TOC -->

- [1. 扫雪工作管理](#1-扫雪工作管理)
  - [1.1. 登录](#11-登录)
    - [1.1.1 正常登录](#112-正常登录)
  - [1.2. 荣誉墙](#12-荣誉墙)
    - [1.2.1 获取荣誉墙](#121-获取荣誉墙)
    - [1.2.2 投票动作](#122-投票动作)
    - [1.2.3 获取投票人状态](#123-获取投票人状态)
    - [1.2.4 获取投票系统状态](#124-获取投票系统状态)
  - [1.3. 雪情论坛](#13-雪情论坛)
    - [1.3.1 获取雪情列表](#131-获取雪情列表)
    - [1.3.2 查看雪情内容](#132-查看雪情内容)
    - [1.3.3 发表雪情](#133-发表雪情)
    - [1.3.4 发表评论](#134-发表评论)
    - [1.3.5 获取评论](#135-获取评论)
  - [1.4. 绩效考察](#14-绩效考察)
    - [1.4.1 获取绩效列表](#141-获取绩效列表)
  - [1.5. 员工端](#15-员工端)
    - [1.5.1 个人信息登记](#151-个人信息登记)
    - [1.5.2 个人状态更新](#152-个人状态更新)
        - [1.5.2.1 工作打卡](#1521-工作打卡)
        - [1.5.2.2 获取当前工作状态](#1522-获取当前工作状态)
    - [1.5.3 获取任务](#153-获取任务)
    - [1.5.4 获取总工时](#154-获取总工时)
  - [1.6. 组长端](#16-组长端)
    - [1.6.1 查询任务](#161-查询任务)
    - [1.6.3 借调](#163-借调)
    - [1.6.4 更新组员工作进度](#164-更新组员工作进度)
    - [1.6.5 显示系统记录](#165-显示系统记录)
    - [1.6.6 对组员打分](#166-对组员打分)
    - [1.6.7 分配组员任务](#167-分配组员任务)
    - [1.6.9 更新工具状态](#169-更新工具状态)
    - [1.6.11 更新车辆状态](#1611-更新车辆状态)
  - [1.7. 审批端](#17-审批端)
    - [1.7.1 查看列表](#171-查看列表)
      - [1.7.1.1 获取员工列表](#1711-获取员工列表)
      - [1.7.1.2 获取小组列表](#1712-获取小组列表)
      - [1.7.1.3 获取车辆列表](#1712-获取车辆列表)
      - [1.7.1.4 获取工具列表](#1714-获取工具列表)
      - [1.7.1.5 获取申请列表](#1715-获取申请列表)
    - [1.7.2 新增](#172-新增)
      - [1.7.2.1 新增工具](#1721-新增工具)
      - [1.7.2.2 新增车辆](#1722-新增车辆)
    - [1.7.3 调配](#173-调配)
      - [1.7.3.1 调配员工](#1731-调配员工)
      - [1.7.3.2 调配车辆](#1732-调配车辆)
      - [1.7.3.3 调配工具](#1733-调配工具)
      - [1.7.3.4 调配任务](#1734-调配任务)
    - [1.7.4 处理申请](#174-处理申请)
    - [1.7.5 管理打分系统](#175-管理打分系统)
    - [1.7.6 对小组打分](#176-对小组打分)
    - [1.7.7 管理投票系统](#177-管理投票系统)


<!-- /TOC -->

## 1.1. 登录

### 1.1.1 正常登录

- POST /snow/login
- payload :

```json
{
    "userId": "160023",
    "passWord" : "abcdefg123"
}
```

- return :
  - type: A = 普通组员 | B = 组长 | C = 管理员

```json
{
    "code" : 0,
    "type" : "A",
    "token" : "s24gj3h4g53j4f5kh3f"
}
```

---

## 1.2. 荣誉墙

### 1.2.1 获取荣誉墙

- GET /snow/honor

- return :
- 按所得票数vote由大到小排序返回

```json
{
  "code" : 0,
  "data" : {
    "honorList": [
      {
        "userId": "123",
        "userName":"贺妍",
        "vote": 23
      },
      {
        "userId": "321",
        "userName":"小李",
        "vote": 22
      },
      {
        "userId": "222",
        "userName":"小张",
        "vote": 20
      }
    ],
    "page":{
      "totalSize": 25,
      "totalPage": 10,
      "eachPage": 5,
      "nowPage": 1
    }
  }
}
```

---

### 1.2.2 投票动作

- GET /match/vote?from=&to=
- from: 谁投的
- to: 给谁投的

- return :

```json
{
    "code" : 0
}
```

---

### 1.2.3 获取投票人状态

- GET /snow/voteState/{userId}

- return :
  - state: 0 = 未投票 | 1 = 已投票

```json
{
    "code" : 0,
    "state" : 0
}
```

---

### 1.2.4 获取投票系统状态

- GET /snow/voteSysState

- return :
  - state: 0 = 未开放 | 1 = 已开放

```json
{
    "code" : 0,
    "state" : 0
}
```

---

## 1.3. 雪情论坛

### 1.3.1 获取雪情列表

- GET /snow/snowList
  - page = 1 当前第几页
  - 按时间先后顺序排序（越接近现在的越排前）

- return :

```json
{
  "code": 0,
  "data": {
    "snowList":[
      {
        "snowId": 123,
        "title": "和兴路重大雪灾",
        "content": "严重严重严重",
        "time": "2019/4/4 9:00:23",
        "author": "贺妍",
      },
      {
        "snowId": 123,
        "title": "和兴路重大雪灾",
        "content": "严重严重严重",
        "time": "2019/4/4 9:00:23",
        "author": "贺妍",
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

### 1.3.2 查看雪情内容

- GET /snow/snowContent?snowId=

- return :

```json
{
  "code": 0,
  "data": {
    "snowId": 123,
    "title": "重大事件",
    "content" : "严重严重严重",
    "time" : "2019/4/4 12:00:00",
    "author": "贺妍"
    }
  }
}
```

---

### 1.3.3 发表雪情

- POST /snow/newSnow
- payload:

```json
{
    "userId": "234232342",
    "title": "重大事件",
    "content": "林大来水了",
}
```

- return :
- 后台生成时间并存入数据库

```json
{
    "code" : 0
}
```

---

### 1.3.4 发表评论

- POST /snow/newComment
- payload:

```json
{
    "userId": "1322132432",
    "snowId" : "1",  加了这个
    "content": "hhhhhhhhhhhhhhh"
}
```

- return :

```json
{
    "code": 0
}
```

---

### 1.3.5 获取评论

- GET /snow/comments?snowId=&page=

- return:

```json
{
  "code": 0,
  "data": {
      "commentList": [
        {
          "commentId": "123",
          "content": "已上报",
          "time" : "2019/4/4 12:00:00",
          "author": "小李"
        },
        {
          "commentId": "123",
          "content": "已上报",
          "time" : "2019/4/4 12:00:00",
          "author": "小李"
        },
        {
          "commentId": "123",
          "content": "已上报",
          "time" : "2019/4/4 12:00:00",
          "author": "小李"
        },
      ],
    "page":{
      "totalSize": 25,
      "totalPage": 10,
      "eachPage": 5,
      "nowPage": 1
    }
  }
}
```

---

## 1.4. 绩效考察

### 1.4.1 获取绩效列表
- GET /snow/work

- return :
- 按score由大到小排序返回,前百分之30‘reward’字段为“有奖金”，其余为空或者不传

```json
{
  "code" : 0,
  "data" : {
    "workList": [
      {
        "userId": "123",
        "userName":"贺妍",
        "score": 23,
        "reward": "有奖金"
      },
      {
        "userId": "321",
        "userName":"小李",
        "score": 22,
        "reward": "有奖金"
      },
      {
        "userId": "222",
        "userName":"小张",
        "score": 20
      }
    ],
    "page":{
      "totalSize": 25,
      "totalPage": 10,
      "eachPage": 5,
      "nowPage": 1
    }
  }
}
```

---

## 1.5. 员工端

### 1.5.1 个人信息登记

- POST /snow/signin
- payload:

```json
{
  "name": "tony",
  "sex": "男",
  "userId": "123454199809160023",  id改为userId
  "workAge": "两年",
  "address": "和兴路26号",
  "password": "123456"
}
```

- return :

```json
{
  "code": 0
}
```
---

### 1.5.2 个人状态更新

#### 1.5.2.1 工作打卡

- GET /snow/clock?state=0&userId=160023    此处加一个userId=？
- state : 0 = 开始工作（切换为工作中状态） | 1 = 结束工作（切换为待工作状态） | -1 = 请假

- return:
- 后台计算“开始工作”请求和“结束”请求的时间间隔，累计在1.5.2.2中返回总共工时

```json
{
  "code": 0
}
```
---

#### 1.5.2.2 获取当前工作状态

- GET /snow/clock/status/{userId}  此处加一个userId

- return: 
- 0 = 工作中 | 1 = 待工作 | -1 = 请假

```json
{
  "code": 0,
  "data": {
    "workTime": "1小时28分",
    "state": -1,
    "task": "和兴路重灾区",
    "teamId": "123455"
  }
}
```
---

## 1.5.3 获取任务

- GET /snow/task/{userId}

- return:

```json
{
  "code": 0,
  "data": {
    "content": "xxxxxx任务，请在三天内完成",
    "time": "2019/10/10 12:00:00"
  }
}
```
---

## 1.5.4 获取总工时

- GET /snow/workTime/{userId}

- return:

```json
{
  "code": 0,
  "data": "12小时"
}
```

---

## 1.6. 组长端

### 1.6.1 查询任务

- GET /snow/teamTask/{teamId}

- return:

```json
{
  "code": 0,
  "data": {
    "content": "非常紧急，请在三日内完成",
    "time": "2019/4/4 20:00:00"
  }
}
```

- [1.6. 组长端](#16-组长端)
  - [1.6.1 查询任务](#161-查询任务)
  
  
  - [1.6.3 借调](#163-借调)
        post /snow/needs
- payload
```json
{
  "teamId" : 1,
  "applyContent" : "五个扫帚"
}
```

- return
```json
{
  "code": 0,
  "data": {
    "teamId": "123",
    "content": "五个扫帚"
  }
}
```

- [1.6.4 更新组员工作进度](#164-更新组员工作进度)


- GET /snow/progress?userId=123&num=20    123号员工进度更新为20%
- return  
```json
{
  "code": 0
}
```

- [1.6.5 显示系统记录](#165-显示系统记录)
- GET /snow/progress/{teamId}   
  <br>返回组长端的组员表那些字段（数组）还有该组的平均进度<br>（区别于数组的新属性，别也塞到数组里）
- return 
 ```json
{
        "code": 0,
            "data": [
        {
            "systemId": 1,
                "userToken": "fbdb045408c84b3e90c57c40b8d76c2b",
                "userType": "A",
                "userVoteNum": 0,
                "cstate": 1,
                "userScore": 6,
                "userReward": null,
                "userStartTime": 1557742697751,
                "userEndTime": 1557752881973,
                "userWorkTime": "2小时49分",
                "userTask": null,
                "userTeamId": null,
                "userTaskTime": "2019-05-14T03:43:06.000+0000",
                "num": 20,
                "astate": 0,
                "userId": "160023",
                "name": "tony",
                "password": "123456",
                "vstate": 1,
                "workAge": "两年",
                "address": "和兴路23号",
                "sex": "男"
        },
        {
            "systemId": 2,
                "userToken": "a378303acef143a3b9483d7f59ca5e9f",
                "userType": "A",
                "userVoteNum": 1,
                "cstate": 1,
                "userScore": 5,
                "userReward": null,
                "userStartTime": 0,
                "userEndTime": 0,
                "userWorkTime": "0",
                "userTask": null,
                "userTeamId": null,
                "userTaskTime": "2019-05-14T03:43:07.000+0000",
                "num": 0,
                "astate": 0,
                "userId": "160024",
                "name": "贺妍",
                "password": "123456",
                "vstate": 0,
                "workAge": "一年",
                "address": "和兴路24号",
                "sex": "女"
        }
    ],
        "averageProgress": 2
    }
```


- [1.6.6 对组员打分](#166-对组员打分)
- 打分之前需要获取一下系统有没有开放  
- GET /snow/performSysState   0未开放，1开放了
- return 
```json
{
    
"state": 0
}
```

      
- 打分
- GET /snow/perform?userId=123&score=22  给123号组员打分22
- return 
```json
{
    
"code": 0
}
```

- [1.6.7 分配组员任务](#167-分配组员任务)
- post /snow/task
- payload:

```json
{
    "userId": "160023",
    "userTask": "非常紧急，请在三日内完成",  后台生成时间存进去
}
```

- return 
```json
{
    
"code": 0

}
```
    

- [1.6.9 更新工具状态](#169-更新工具状态)
- 先获取 get /snow/select/tools 返回工具表，多一个名字的字段 工具名字 name
- return 
```json
{
        "code": 0,
            "data": [
        {
            "toolId": 1,
                "toolName": "a",
                "state": "使用中",
                "teamId": "1"
        },
        {
            "toolId": 2,
                "toolName": "b",
                "state": "使用中",
                "teamId": "1"
        },
        {
            "toolId": 3,
                "toolName": "c",
                "state": "使用中",
                "teamId": "2"
        }
    ]
    }
```


- 更新 get /snow/update/tools?toolId=123&state=使用中
- return 
```json
{
"code":0
}
```

- [1.6.11 更新车辆状态](#1611-更新车辆状态)

- 先获取 get /snow/select/cars 返回车辆表

```json
{
        "code": 0,
            "data": [
        {
            "carId": 1,
                "state": "使用中",
                "num": "0",
                "teamId": "1"
        },
        {
            "carId": 2,
                "state": "使用中",
                "num": "0",
                "teamId": "1"
        },
        {
            "carId": 3,
                "state": "使用中",
                "num": "0",
                "teamId": "2"
        }
    ]
    }
```

- 更新 get /snow/update/cars?carId=123&state=使用中

```json
{
"code":0
}
```
- [1.7. 审批端](#17-审批端)
  - [1.7.1 查看列表](#171-查看列表)
    - [1.7.1.1 获取员工列表](#1711-获取员工列表)
    
```json
{
        "code": 0,
            "data": [
        
        {
            "systemId": 2,
                "userToken": "a378303acef143a3b9483d7f59ca5e9f",
                "userType": "A",
                "userVoteNum": 1,
                "cstate": 1,
                "userScore": 0,
                "userReward": null,
                "userStartTime": 0,
                "userEndTime": 0,
                "userWorkTime": "0",
                "userTask": null,
                "userTeamId": null,
                "userTaskTime": "2019-05-13T15:01:33.000+0000",
                "num": 0,
                "astate": 0,
                "userId": "160024",
                "name": "贺妍",
                "password": "123456",
                "vstate": 0,
                "workAge": "一年",
                "address": "和兴路24号",
                "sex": "女"
        },
        {
            "systemId": 5,
                "userToken": "6dbe06dcb5d74126af995fb0fbd88dab",
                "userType": "A",
                "userVoteNum": 0,
                "cstate": 1,
                "userScore": 0,
                "userReward": null,
                "userStartTime": 0,
                "userEndTime": 0,
                "userWorkTime": "0",
                "userTask": null,
                "userTeamId": null,
                "userTaskTime": "2019-05-14T03:54:13.000+0000",
                "num": 0,
                "astate": 0,
                "userId": "160027",
                "name": "小孟",
                "password": "123456",
                "vstate": 0,
                "workAge": "一年",
                "address": "和兴路27号",
                "sex": "男"
        }
    ]
    }
```


  - [1.7.1.2 获取小组列表](#1712-获取小组列表)
```json
 {
        "code": 0,
            "data": [
        {
            "systemId": null,
                "teamId": "1",
                "teamName": "a",
                "score": null,
                "astate": null,
                "applyContent": null,
                "password": null,
                "taskTitle": null,
                "taskContent": null,
                "publishTime": null
        }
    ]
    }
```


  - [1.7.1.3 获取车辆列表](#1712-获取车辆列表)
  
     GET : /snow/select/cars

```json
{
  在上面
}
```


  - [1.7.1.4 获取工具列表](#1714-获取工具列表)
  
    -  get  : /snow/select/tools

```json
{
  在上面
}
```

   - [1.7.1.5 获取申请列表](#1715-获取申请列表)
   
   - 多一个申请状态state，表示该申请的处理结果  1表示调配完成，0表示未处理

   - GET　/snow/applications

```json
{
        "code": 0,
            "data": {
        "teamId": "1",
                "teamName": "a",
                "state": 0
    }
    }
```


- [1.7.2 新增](#172-新增)
  - [1.7.2.1 新增工具](#1721-新增工具)
  - post /snow/tools 


```json
{
  "toolName" : "aaa"
}
``` 
      

- return 
```json
{
  "code" : 0
}
```

- [1.7.2.2 新增车辆](#1722-新增车辆)
 - post /snow/cars   ｎum 车牌号
 ```json
{
"num": "aaa"
}
```

- return 

```json
{
"code": 0
}
```

- put请求　　:x-www-form-urlencoded
    - [1.7.3 调配](#173-调配)
      - [1.7.3.1 调配员工](#1731-调配员工)
      
 - put  /snow/changeTeam?userId=160023&teamId=5
        
      - [1.7.3.2 调配车辆](#1732-调配车辆)
         - put /snow/changeCars?carId=1&teamId=5
         
      - [1.7.3.3 调配工具](#1733-调配工具)
 - put/snow/changeTools?toolId=1&teamId=5
         
         
- [1.7.3.4 调配任务](#1734-调配任务)

 - post /snow/teamTask
      - teamId: 123
      - content: xxxxxxx
- [1.7.4 处理申请](#174-处理申请)

- get /snow/apply?teamId=123&apply=1  1表示调配完成 -1表示忽略，从数据库中删除该条记录
- 上面４个正确返回


```json
{
"code": 0
}
```


- [1.7.5 管理打分系统](#175-管理打分系统)
- 先获取  get /snow/performSysState 0未开放 1开放
- return 
```json
{
"state": 0
}
```




- put /snow/managePerformState?state=1


- [1.7.6 对小组打分](#176-对小组打分)


- 打分之前需要获取一下系统有没有开放 
 - get /snow/performSysState   0未开放，1开放了
 
```json
{
"state": 0
}
```

- 打分： 

- get　/snow/perform/team?teamId=1&score=22
   - 给123组打分22

- [1.7.7 管理投票系统](#177-管理投票系统)
- 先获取  
- get /snow/voteSysState 0未开放 1开放

- put /snow/manageVoteState?state=1


新建小组

post /snow/newTeam

{
  teamId:2,
  password:123456
}
