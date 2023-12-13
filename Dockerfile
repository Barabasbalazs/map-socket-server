# Use an official Node.js runtime as the base image
FROM node:20

# Install Yarn globally
RUN npm install -g yarn --force

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install application dependencies using Yarn
RUN yarn install

# Copy all application files to the working directory
COPY . .

# Expose a port that the app will listen on
EXPOSE 3000

# Define the command to run the application
CMD ["yarn", "dev"]
