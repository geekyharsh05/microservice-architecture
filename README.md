# Microservice Architecture

## auth-microservices

This is a simple authentication microservice that uses JWT for authentication. It has endpoints for registering a new user, logging in, refreshing the access token, getting the current user, changing the password, and logging out.
It uses `MongoDB` for storing user data.

## post-microservices

This is a simple post microservice that uses JWT for authorization. It has endpoints for creating a new post, getting all posts.
It uses `PostgreSQL` for storing post data.
