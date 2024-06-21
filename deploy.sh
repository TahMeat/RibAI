#!/bin/bash

# build
npm run build

# copy build to site repo.
cp -rf build/* ../tahmeat.github.io/ribai
