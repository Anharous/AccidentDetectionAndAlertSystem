import cv2
import numpy as np
from tensorflow.keras.models import load_model
import time
import requests


model = load_model("backend/ai_detection/traffic_model.h5")
LABELS = ["No Accident", "Accident"]

cap = cv2.VideoCapture(0)

recording = False
record_start_time = None
video_writer = None
video_filename = ""

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    img = cv2.resize(frame, (224, 224))
    img = img / 255.0
    img = np.expand_dims(img, axis=0).astype(np.float32)

    prediction = model.predict(img)
    label = LABELS[int(prediction[0] > 0.5)]
    print("Detected:", label)

    cv2.putText(frame, label, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    
    if label == "Accident" and not recording:
        print("🚑 Accident detected! Recording started.")
        video_filename = f"accident_{int(time.time())}.avi"
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        video_writer = cv2.VideoWriter(video_filename, fourcc, 20.0, (frame.shape[1], frame.shape[0]))
        recording = True
        record_start_time = time.time()

    if recording:
        video_writer.write(frame)
        elapsed_time = time.time() - record_start_time

       
        if elapsed_time >= 30:
            recording = False
            video_writer.release()
            print(f"✅ Accident video saved as {video_filename}")

            
            with open(video_filename, 'rb') as f:
                files = {'video': f}
                try:
                    response = requests.post('http://localhost:5000/api/alert', files=files)
                    print("✅ Video sent to backend. Response:", response.json())
                except Exception as e:
                    print("❌ Failed to send video:", e)

    cv2.imshow("Traffic Detection", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
if video_writer:
    video_writer.release()
cv2.destroyAllWindows()
