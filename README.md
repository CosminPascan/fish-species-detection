# Fish species detection 
This is a web application designed to detect fish species and estimate their size in real-time using a yolov8 custom trained model.

Available species: blue-tang, butterflyfish, clownfish, moorish-idol, neon-tetra, ribboned-sweetlips, yellow-tang

## Features
- **fish species detection**: use your webcam to detect fish species in real-time 
- **fish size estimation**: estimate the length and height of detected fish
- **user authentication**: secure user resources with JWT and Refresh Token
- **session monitoring**: track best metrics for a fish species over a session
- **habitats management**: save detected species information to one of your habitats

## Credentials
- **email** - user@user
- **password** - user

## Installation

```bash
git clone https://github.com/CosminPascan/fish-species-detection.git
cd client
npm install
```

## Run

In server directory

```bash
dotnet run
```

In client directory

```bash
npm run dev
```

## Detect Page

![alt text](images/image_1.png)

## Habitats Page

![alt text](images/image_2.png)