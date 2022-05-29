FROM node:16-slim
RUN apt update
RUN apt install -y \
     libcairo2-dev \
     libjpeg62-turbo-dev \
     libpango1.0-dev \
     libgif-dev\
     build-essential\
     g++ \
     git
