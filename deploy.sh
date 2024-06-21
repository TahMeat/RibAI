#!/bin/bash

# build
npm run build

# copy build to site repo.
cp -r build/* ../tahmeat.github.io/ribai
