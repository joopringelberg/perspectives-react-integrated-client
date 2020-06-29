#!/usr/bin/env bash

npm run build
npm run release
cp ~/temp/minio-data/latest-mac.yml ~/temp/minio-data/test-update/latest-mac.yml
