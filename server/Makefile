# Variables
APP_NAME = vortal-lombat-api
DOCKERFILE = Dockerfile
PORT = 3092

# Build the Docker image
build:
	docker build -t $(APP_NAME) -f $(DOCKERFILE) .

# Run the Docker container
run:
	docker run -d -p $(PORT):3092 --name $(APP_NAME) $(APP_NAME)

# Stop and remove the running container
stop:
	docker stop $(APP_NAME) || true
	docker rm $(APP_NAME) || true

# Clean up all Docker images and containers
clean:
	docker system prune -f
	docker rmi $(APP_NAME) || true

# Build and run the container
up: stop build run

# Tag the image for pushing to the remote registry
tag:
	docker tag $(APP_NAME) $(REGISTRY)

# Rebuild the container (clean, build, and run)
rebuild: stop clean up