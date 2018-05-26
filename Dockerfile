FROM node:9.4.0-stretch
RUN apt-get update
RUN apt-get install lame ffmpeg -y
COPY . /mconv-src
RUN chmod u+x -R /mconv-src
ENV PATH $PATH:/mconv-src
WORKDIR /mconv
ENTRYPOINT ["convertTomp3.js", "/mconv", "/mconv/mp3"]
