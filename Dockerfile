# Base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install --production

# Copy the rest of the application code
COPY . .

# Expose the port that the NestJS application will run on
EXPOSE 4001

# Start the NestJS application
CMD ["yarn", "start:prod"]
