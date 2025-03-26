import cv2
import numpy as np
from tensorflow.keras.models import load_model
import time
model = load_model("backend/ai_detection/traffic_model.h5")

LABELS = ["No Accident", "Accident"]

cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    img = cv2.resize(frame, (224, 224))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)

    prediction = model.predict(img)

    label = LABELS[int(prediction[0] > 0.5)]
    print("Detected:", label)

    cv2.putText(frame, label, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.imshow("Traffic Detection", frame)

    if label == "Accident":
        filename = f"accident_{int(time.time())}.jpg"
        cv2.imwrite(filename, frame)
        print(f"🚑 Accident detected! Image saved: {filename}")

    if cv2.waitKey(10) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
