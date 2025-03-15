ML https://www.kaggle.com/datasets/reevald/geometric-shapes-mathematics
NL https://www.kaggle.com/datasets/alessiocorrado99/animals10
#IS PROJECT

docker build -t is_server_image .
docker run -d --name is_server_container -p 8000:8000 is_server_image
