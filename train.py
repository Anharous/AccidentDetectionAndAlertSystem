import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Define CNN Model
model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(224, 224, 3)),
    MaxPooling2D(2,2),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(1, activation='sigmoid')  # Binary classification (Accident/No Accident)
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train Data Preprocessing
train_datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)

train_generator = train_datagen.flow_from_directory(
    'dataset', target_size=(224,224), batch_size=32, class_mode='binary', subset='training')

val_generator = train_datagen.flow_from_directory(
    'dataset', target_size=(224,224), batch_size=32, class_mode='binary', subset='validation')

# Train the Model
model.fit(train_generator, validation_data=val_generator, epochs=10)

# Save the Model
model.save("backend/ai_detection/traffic_model.h5")

print("✅ Model training complete and saved as traffic_model.h5")
