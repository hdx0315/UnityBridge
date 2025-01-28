import tensorflow as tf

from tensorflow.keras.preprocessing.image import ImageDataGenerator 
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout, BatchNormalization
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
import os

train_data_dir = "H:/projects-backups/capstone-dataset/data"

train_datagen = ImageDataGenerator(

    rescale=1.0/255.0,
    rotation_range=30,
    width_shift_range=0.3,
    height_shift_range=0.3,
    shear_range=0.3,
    zoom_range=0.3,
    horizontal_flip=True,
    brightness_range=[0.8, 1.2],
    fill_mode='nearest',
    validation_split=0.2
)

train_generator = train_datagen.flow_from_directory(
    train_data_dir,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

validation_generator = train_datagen.flow_from_directory(
    train_data_dir,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)

model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    BatchNormalization(),
    MaxPooling2D(pool_size=(2, 2)),

    Conv2D(64, (3, 3), activation='relu'),
    BatchNormalization(),
    MaxPooling2D(pool_size=(2, 2)),

    Conv2D(128, (3, 3), activation='relu'),
    BatchNormalization(),
    MaxPooling2D(pool_size=(2, 2)),

    Conv2D(256, (3, 3), activation='relu'),
    BatchNormalization(),
    MaxPooling2D(pool_size=(2, 2)),

    Flatten(),
    Dense(256, activation='relu'),
    Dropout(0.5), 

    Dense(128, activation='relu'),
    Dropout(0.5),  

    Dense(27, activation='softmax')
])

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.0005),   #stability ek thiygnna rate ek lower krnwa 
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# early_stopping = EarlyStopping(
#     monitor='val_loss',  # Monitor validation loss
#     patience=5,  # Stop training if no improvement for 5 epochs
#     restore_best_weights=True  # Restore the weights of the best epoch
# )

# model_checkpoint = ModelCheckpoint(
#     "best_model.h5",  # Save the best model during training
#     monitor='val_loss',
#     save_best_only=True,
#     verbose=1
# )

history= model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // train_generator.batch_size,
    epochs=50,
    validation_data=validation_generator,
    validation_steps=validation_generator.samples // validation_generator.batch_size,
    #callbacks=[early_stopping, model_checkpoint]
)

val_loss, val_accuracy = model.evaluate(validation_generator)
print(f"validation Accuracy : {val_accuracy * 100:.2f}%")

model.save("CustomModel.h5")
print("model saved")
print(train_generator.class_indices)