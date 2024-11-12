FROM node:16

# Install nodemon globally
RUN npm install -g nodemon

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

ENV MINIO_ENDPOINT="minio"
ENV MINIO_ACCESS_KEY="minio"
ENV MINIO_SECRET_KEY="minio123"
ENV MINIO_BUCKET="images"
ENV MINIO_PORT="9000"

# Start the app
CMD ["nodemon", "index.js"]
