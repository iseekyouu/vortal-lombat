# Variables
APP_NAME = vortal-lombat
DOCKERFILE = Dockerfile
PORT = 8081

# Build the Docker image
build:
	docker build -t $(APP_NAME) -f $(DOCKERFILE) .

# Run the Docker container
run:
	docker run -d -p $(PORT):80 $(APP_NAME)

# Stop and remove the running container
stop:
	docker stop $(APP_NAME) || true
	docker rm $(APP_NAME) || true

# Clean up all Docker images and containers
clean:
	docker system prune -f
	docker rmi $(APP_NAME) || true

# Build and run the container
up: build run

# Stop, clean, build, and run
rebuild: stop clean up
