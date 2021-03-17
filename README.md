# JS fullstack app

It started as my first spa application on vue. I added express server for api calls emulation, moved client and server app to different containers and mongodb container to store some entities.  

Client part is built using webpack and vue-cli and published to nginx server as static content.
Server part uses nodejs + express server and mongoclient (without mongoose).

## Scenarios

 Server app requires running mongo container, and client app requires server app. 

All these apps use configured .env file, which is not stored in this repo. To run this app you must create .env file like this

```
MONGO_PORT=27017
MONGO_DB=<db name>
SERVER_PORT=8087
SERVER_OUT_PORT=<Public accessible port for api endpoint>
MONGO_INITDB_ROOT_USERNAME=<db user>
MONGO_INITDB_ROOT_PASSWORD=<db password>
MONGO_HOSTNAME=calendariodb
SERVER_HOST=127.0.0.1
```

To build images run:  
>docker-compose build

   and to start this app
>docker-compose up

Meanwhile webclient should be accessible at http://localhost:80/

## Entities

Server app provides fake api to these listed entities:

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
| #dates$type=reccurenceDate| - | hasTime,<br/>rrules | |
| #dates$type=continuousReccurenceDate | - | start, end,<br/>hasTime,<br/> | |
| occurence | /dates/from/:start/till/:end | [eventId](#eventId),<br/> dateTime.value,<br/> dateTime.hasTime,<br/> dateTime.belonging<sup>[nullable]</sup>, status<sup>[nullable]</sup> | |

These entities are randomly generated when server app starts.

## Cheatsheet

- npm install -g vue-cli
- vue init webpack-simple vue-spa
- npm install --save-dev css-loader@1.0.1 (fixing high vulnerability in js.yaml)
- npm install --save-dev webpack-dev-server@2.11.4
- docker run -p:27017:27017 -d --env-file ../.env mongo:4.1.8-xenial
