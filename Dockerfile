FROM mhart/alpine-node:6

MAINTAINER Matthew Dobson <mdobson@apigee.com>

ADD     . /app
WORKDIR /app
RUN     npm install

ENV    PORT 3000
EXPOSE 3000

CMD        ["index.js"]
ENTRYPOINT ["node"]
