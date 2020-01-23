FROM python:3.7-alpine
MAINTAINER Matt Bentley <mbentley@mbentley.net>

ENV NO_BROWSER=True

# temporarily install git, clone the repo, remove git, add a non-root user, install pipenv & websockets
RUN apk add --no-cache git &&\
  mkdir /data &&\
  cd /data &&\
  git clone --depth 1 https://github.com/Lyrebirds/cable-haunt-vulnerability-test.git &&\
  apk del git &&\
  adduser -h /home/user -s /bin/sh -D -u 1000 user &&\
  pip install pipenv websockets &&\
  chown -R user:user /data/cable-haunt-vulnerability-test

# set the default workdir to where the cloned code is
WORKDIR /data/cable-haunt-vulnerability-test

# set the default user to our non-root user
USER user

# execute pipenv install to set up the enviroment
RUN pipenv install

# set the default CMD at runtime
CMD ["pipenv","run","python","test.py"]
