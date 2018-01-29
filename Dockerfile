FROM node:9.4.0-stretch
RUN apt-get update
RUN apt-get install lame -y
WORKDIR /mconv-src
COPY . /mconv-src
RUN chmod u+x -R /mconv-src
CMD node ./wav2mp3.js /mconv /mconv/mp3