# Sten, sax, påse - Hemuppgift - REST API
## Problembeskrivning
***
Skapa ett enkelt HTTP-API som låter utvecklare lösa sina meningsskiljaktigheter med hjälp av spelet Sten, sax, påse. Reglerna är enkla, bäst av 1 match vinner. Vi rekommenderar er att följa principerna för REST men avsteg kan göras om man kan motivera det på ett bra sätt.
(Jag har använt mig utav node.js och Express)

## Installera
***
Om du står i kodtest-cygni så måste du ta dig vidare med 
>cd backend

sedan kan du köra 
>npm install

## Användning
***
#### Vi använder dessa API endpoints: 
POST /api/games \
POST /api/games/{id}/join \
POST /api/games/{id}/move \
GET /api/games/{id} 

>POST /api/games

Skapar ett nytt spel. Ange spelarnamn i request-body.

>POST /api/games/{id}/join


Ansluter till ett spel med givet ID. Ange spelarnamn i request-body

>POST /api/games/{id}/move

Gör ett drag. Ange namn och drag (Känner bara igen om man kör stora bokstäver på Rock, Paper, Scissor) i request-body: \
"name" : "Daniel" \
"move" : "Rock"

>GET /api/games/{id}

Hämtar ut vem som har vunnit, om någon spelare inte har gjort sitt drag kommer den att skriva ut vilken spelare man väntar på. 

## Spela
*** 
Först så startar vi igång servern med npm start. Sedan så startar vi upp Postman. Det är där vi skickar med namn och move i JSON request body.



