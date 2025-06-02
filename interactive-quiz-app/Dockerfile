FROM openjdk:17-jdk-slim
VOLUME /tmp
COPY target/quiz-app.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
# Expose the port the app runs on
EXPOSE 8080
# Health check to ensure the application is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/actuator/health || exit 1
# Set the working directory
WORKDIR /app
# Add a non-root user to run the application
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser
# Change ownership of the application files
RUN chown -R appuser:appgroup /app.jar
# Switch to the non-root user
USER appuser