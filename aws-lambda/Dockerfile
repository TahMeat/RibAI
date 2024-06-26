FROM python:3.11 AS build-image

ARG FUNCTION_DIR="/home/function/"
ARG RUNTIME_VERSION="3.11"

# create directory
RUN mkdir -p ${FUNCTION_DIR}
COPY function/ ${FUNCTION_DIR}

# dependencies
RUN python${RUNTIME_VERSION} -m pip install --no-cache-dir transformers torch flask gunicorn --target ${FUNCTION_DIR}

# install the lambda runtime, required.
RUN python${RUNTIME_VERSION} -m pip install --no-cache-dir awslambdaric --target ${FUNCTION_DIR}

# create slim for model.
FROM python:3.11-slim

ARG FUNCTION_DIR="/home/function/"

WORKDIR ${FUNCTION_DIR}

# copy in the built dependencies
COPY --from=build-image ${FUNCTION_DIR} ${FUNCTION_DIR}

# add the lambda runtime.
ADD https://github.com/aws/aws-lambda-runtime-interface-emulator/releases/latest/download/aws-lambda-rie /usr/bin/aws-lambda-rie
COPY entry.sh /
RUN chmod 755 /usr/bin/aws-lambda-rie /entry.sh

# use the entry script as the container's entry point
ENTRYPOINT [ "/entry.sh" ]
CMD [ "lambda_function.handler" ]
