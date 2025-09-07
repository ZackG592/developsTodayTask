FROM node:20

WORKDIR /app

RUN apt-get update \
  && apt-get install -y postgresql-client \
  && rm -rf /var/lib/apt/lists/*
COPY package*.json ./

RUN npm install

COPY ./entrypoint.sh ./

RUN chmod +x ./entrypoint.sh


COPY . .


ENTRYPOINT ["./entrypoint.sh"]