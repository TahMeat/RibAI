#!/bin/sh
# for local testing, running an AWS Lambda Runtime Interface Emulator.

if [ -z "${AWS_LAMBDA_RUNTIME_API}"]; then
    exec /usr/bin/aws-lambda-rie /usr/local/bin/python -m awslambdaric "$@"
else
    exec /usr/local/bin/python -m awslambdaric "$@"
fi