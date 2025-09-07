#!/bin/bash

isDbReady=1

for i in {0..5}
do
    if pg_isready -h postgres -p 5432 -U "${POSTGRES_USER}" > /dev/null 2>&1; then
        isDbReady=0
        break
    else
        echo "Waiting for DB to be ready... ($i)"
        sleep 2
    fi
done

if [ $isDbReady -eq 1 ]; then
    echo "DB isn't up"
    exit 1
fi

npx prisma generate --schema ./prisma/schema.prisma
npx prisma migrate dev --name init --schema ./prisma/schema.prisma

npm run start:dev

isServerReady=2

for i in {0..5}
do 
    if curl -f http://localhost:4000 > /dev/null 2>&1; then
        isServerReady=0
        break
    else
        echo "Waiting for server to be ready... ($i)"
        sleep 2
    fi
done

if [ $isServerReady -eq 2 ]; then
    echo "Server isn't up"
    exit 2
fi

exit 0