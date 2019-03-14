# Play Studios - Quest API
Express/Node Quest API PlayStudios

# PRE-REQUISITE
Backend: NodeJs

Database: Postgres

REST client: To send GET/POST requests

# Setup

Pull repository and install all packages

```
npm install
```

Create `.env` file at root directory and add following content

```
NODE_ENV=development
PORT=8080
```

At this point have database `quest_development` created in postgres (Can use Postico postgres client, attached a screenshot below)

[![postgress.png](https://i.postimg.cc/Dzfg3rPF/postgress.png)](https://postimg.cc/4YMtzh0F)

Run migrations that sets up sample data ()

```
npm run db:migrate
```


Start server

```
npm start
```

Use postman or your favorite rest client to send following request:

POST Quest prgress request -
```
URL: http://localhost:8080/api/progress
METHOD: POST
Body: {
	"playerId": "1",
	"playerLevel": "1",
  	"chipAmountBet": "100"
}

```

Expected response - 
```
{
  "QuestPointsEarned": 1230.2,
  "TotalQuestPercentCompleted": 20,
  "MilestonesCompleted": [
    {
      "MilestoneIndex": 1,
      "ChipsAwarded": 0
    }
  ]
}
```

GET Quest state request
```
URL: http://localhost:8080/api/state/1
METHOD: GET
```

GET Quest state response
```
{
  "TotalQuestPercentCompleted": "20.0",
  "LastMilestoneIndexCompleted": 1
}

```


# Tests

To run test suit

```
npm test
```

# Sequence diagrams

### GET Quest State
[![GETendpoint-Sequence.png](https://i.postimg.cc/j5j9hWgq/GETendpoint-Sequence.png)](https://postimg.cc/v1p3YmwC)

### POST Quest progress
[![quest-POST.png](https://i.postimg.cc/g2WGHDvY/quest-POST.png)](https://postimg.cc/56scx87G)


