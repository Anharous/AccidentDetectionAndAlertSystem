Accident Detection and Alert System 🚑
This project is an AI-powered real-time traffic accident detection and alert system. It uses TensorFlow for accident detection and Node.js with Express for backend alerts.

🔹 Key Features:
✔ Detects accidents in live video using AI (CNN model).
✔ Automatically records video when an accident occurs.
✔ Sends SMS alerts to police and ambulances.
✔ Stores accident data in a MongoDB database.

🔹 Tech Stack:

- AI Model: TensorFlow (CNN)

- Backend: Node.js, Express, MongoDB

- Notifications: Twilio (SMS), Nodemailer (Email)

- Live Video Processing: OpenCV (Python)

  🔹 How to use This Project:
  
- step 1: clone the repo - git clone repoLink

- step 2: instal node pagckage modules - npm i

- step 3: run train.py file it will generate traffic_model.h5 file inside backend folder.

- step 4: run detect.py file it open your webCamera and start detecting accident. if any accident detected in will store it as viedo in your db.
 
  
  
  
