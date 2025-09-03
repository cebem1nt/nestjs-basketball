## Description

Simple extensible backend written with nest.js 
For now db is not finished and it simply has teams and players table. 

## Usage 

By default development server will be running on `localhost:3000`. 

### Example of request urls: 
- `http://localhost:3000/teams/`
- `http://localhost:3000/players/`
Returns an array of all stored teams/players

- `http://localhost:3000/teams/<id>`
- `http://localhost:3000/players/<id>`
Returns team with given id

### Post/Delete
By default POST and DELETE requests pass through `api_key.guard.ts` but it has no key verification implementation (i might do that later)

```bash
curl -X POST http://localhost:3000/players/new \
-H "Content-Type: application/json" \
-d '{
    "name": "Nikola Jokić",
    "draft_year": 2014,
    "draft_round": 2,
    "draft_number": 41
}'
```

```bash
curl -X POST http://localhost:3000/teams/new \
-H "Content-Type: application/json" \
-d '{
    "name": "Boston Celtics",
    "city": "Boston",
    "year_founded": 1946
}'
```

```bash
# Delete exmples
$ curl -i -X DELETE http://localhost:3000/players/delete/2
HTTP/1.1 200 OK
$ curl -i -X DELETE http://localhost:3000/teams/delete/2
HTTP/1.1 200 OK
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
