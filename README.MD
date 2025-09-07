# .env example for root folder

- SERVER_PORT=4000

- POSTGRES_USER=myuser
- POSTGRES_PASSWORD=mypassword
- POSTGRES_DB=mydatabase
- POSTGRES_PORT=5432

# .env example for client folder

- API_BASE_URL=http://localhost:4000

docker-compose up --build -> Main root (OR you can use extension to up it without any command)

DB will be setup by docker
Server too

To setup client ->

- cd ./client
- npm run install
- npm run dev

Be sure u've setted .env vars and that provided ports are free
to check that provided ports are free use

sudo lsof -i :port (For linux/MacOS only)

How to test app

1. Create account (Only name needs)
2. Sign into account (Only name needs)
3. You will be redirected to /quizzes
4. You need to go to create (Header)
5. There you will be able to create proper quiz, or even several
6. To delete it, go back to /quizzes there you'll be to remove
   p.s Be sure that .ENV in client & root folders are sync, because it won't be able to fetch if provided ports will be differentf
