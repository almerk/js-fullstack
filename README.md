# hello-vue-spa

> My first spa application on vue
## Cheatsheet

- At first, you need to install node.js
- npm install -g vue-cli
- vue init webpack-simple vue-spa
  - npm install (installs everything from package.json)
  - npm run dev
  - npm install --save-dev axios
  - npm install --save-dev vue-router
  - npm install --save vue-scrollto
  - npm install --save vuex
  - npm install --save-dev css-loader@1.0.1 (fixing high vulnerability in js.yaml)

## Commands for db.json, required for [fake endpoint](https://my-json-server.typicode.com/)
## Fake endpoint dto
> Run ./db-create.js to create file with fake entities. Push this file to master(main) branch and entities will be available through endpoint

### Relations domain
| Entity | Urls | Fields | Comments |
| ------------- | ------------- | ----------------------------------------- | --------------- |
| #relations | /relations?subjectId?=:&objectId?=: | [subjectId](#subjects), [objectId](#objects),<br/><hr/> canRead,<br/> canUpdate,<br/> canDelete,<br/> canCreateOf,<br/> characteristics<sup>'owner','perfomer',''acceptor', _etc._</sup>

### Subjects domain

| Entity | Urls | Fields | Comments |
| ------------- | ------------- | ----------------------------------------- | --------------- |
| #subjects | /subjects/:id? | **id**,<br/> $type <sup>('user' \| 'group')</sup> |_both groups and users together_|
| #users | /users/:id?, /users/:login?  | [id](#subjects),<br/><hr/> login,<br/> name,<br/> surname,<br/> patronymic,<br/> [groupId](#2) |
| #groups | /groups/:id? | [id](#subjects),<br/><hr/> name, [parentId](#groups)<sup>[nullable]</sup> |


### Calendario objects domain
| Entity | Urls | Fields | Comments |
| ------------- | ------------- | ------------------------------------------ | --------------- |
| #calendarTypes | /calendarTypes/:id? | [id](#objects),<br/><hr/> name | 
| #calendars<sup>extensible</sup> | /calendars/:id? | [id](#objects), <br/><hr/> [typeId](#calendarTypes), <br/> name,<br>**...** | _typeId determines calendar type._, _This entity can be extended._|
| #calendarEvents<sup>extensible</sup> | /calendarEvents/:id? | [id](#objects),<hr/>[calendarId](#calendars),<br/>name, <br/> description, **...** | _this entity can be extended._ _The [calendar type](#calendarTypes) determines the type of event._ |

### Calendario event date domain
| Entity | Urls | Fields | Comments |
| ------------- | ------------- | ------------------------------------------ | --------------- |
| #dates<sup>extensible</sup>| /dates |[eventId](#eventId),<br/> $type,<br/>isExcept,<br/> **...** |  |
| #dates$type=simpleDate | - | dateTime,<br/> hasTime <br/> | |
| #dates$type=continuousDate| - | start, end,<br/>hasTime| |
| #dates$type=reccurenceDate| - | start,<br/> hasTime,<br/>rrules | |
| #dates$type=continuousReccurenceDate | - | start, end,<br/>hasTime,<br/> | |
| occurence | /occurencies | [eventId](#eventId),<br/> dateTime.value,<br/> dateTime.hasTime,<br/> dateTime.belonging<sup>[nullable]</sup>, status | |



