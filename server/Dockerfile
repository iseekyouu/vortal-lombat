# Step 1: Build Stage - Use Node.js 20.17.0 with TypeScript
FROM node:20.17.0 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Step 2: Production Stage - Use a lighter Node.js version 20.17.0 for runtime
FROM node:20.17.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built files from the previous stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/.env ./.env

ENV NODE_ENV=production
# Expose the port the app runs on
EXPOSE 3092
# Set the default command to run the app
CMD ["node", "dist/index.js"]