export GH_TOKEN=b597aaeba76d28365863f87b7c7aff11c9b06208
electron-builder build -p always

## Overriding configuration for local testing:
#export AWS_ACCESS_KEY_ID=minioadmin
#export AWS_SECRET_ACCESS_KEY=minioadmin
#electron-builder build -p always --config.publish.provider=s3 --config.publish.endpoint=http://127.0.0.1:9000 --config.publish.bucket=test-update -c.compression=store
