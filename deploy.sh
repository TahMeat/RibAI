#!/bin/bash

# build
npm run build

# remove all files.
rm -r ../tahmeat.github.io/ribai/*

# copy build to site repo.
cp -rf build/* ../tahmeat.github.io/ribai
