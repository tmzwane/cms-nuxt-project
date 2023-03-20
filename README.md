# Nuxt.js and Express.js Project

## Best Start

Use docker to run the all the apps in one go. I've prepared a makefile that works wonders on MacOS and Linux, but it doesn't run on Windows, but basically with one make command you can tricker a chain of commands that would otherwise be a hassle to type one by one on the CLI.

1. Makefile Commands

To run everything all at once in an isolated docker environment and network using `docker-compose` run:

```
make compose-local
```

To run mongodb database on docker run:

```
make run-mongo
```

To clean up after using docker run:

```
docker-clean-up
```

2. Using Concurrently

First npm install all dependencies for both `backend` and `frontend`:

```
cd frontend && npm i
cd backend && npm i
```

Then in the `backend` project, run:

```
npm run all
```

## Last word

The makefile has all the commands required to run the project successfully, and on MacOS and Linux, you can just run `make ...` then you're good to go.

The added advantage is that the commands are an easy to paste if you're not comfortable with `make`

The dockerfiles as well pretty much contain all the instruction on how to run the projects, so between `dockerfiles` and `makefile` you can never get lost or ever need to google search how to get started.
