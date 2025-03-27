docker build --tag 'Insurancebot'
docker run --detach 'Insurancebot'
docker run -p 3000:3000 --name=Insurancebot 'Insurancebot'
