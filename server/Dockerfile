# Use the official Node.js image as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./
# If using Yarn, use the following line instead:
# COPY yarn.lock ./

# Install dependencies
RUN yarn install
# If using Yarn, use the following line instead:
# RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application (if applicable)
RUN yarn build
# If using Yarn, use the following line instead:
# RUN yarn build

EXPOSE ${PORT}

# Define the command to run the application
CMD ["yarn", "start:prod"]
# If using Yarn, use the following line instead:
# CMD ["yarn", "start:prod"]
