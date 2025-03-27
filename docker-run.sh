docker buildx build -t insurancebot .
docker run -p 3000:3000 --name=insurancebot insurancebot
