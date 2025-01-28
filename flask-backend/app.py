import base64
import os
import cv2
import math
import numpy as np
from flask import Flask, request, jsonify
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import  Classifier

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '4'

app = Flask(__name__)

detector = HandDetector(maxHands=1)
classifier = Classifier("D:/08__CIS/04_Sem 04/4110/new clone/UnityBridge/CustomModel.h5", "D:/08__CIS/04_Sem 04/4110/new clone/UnityBridge/flask-backend/Model/labels.txt")
imgSize = 300
offset = 25
labels = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "]

@app.route("/" , methods=['GET'])
def sayHello():
    return "hello from flask backend"

@app.route('/process', methods=['POST'])
def process_image():
    data = request.get_json()
    image_data = data['image'].split(',')[1]
    np_img = np.frombuffer(base64.b64decode(image_data), np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    hands, img = detector.findHands(img)

    if hands:
        hand = hands[0]
        x, y, w, h = hand['bbox']
        imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255
        imgCrop = img[y - offset:y + h + offset, x - offset:x + w + offset]

        aspectRatio = h / w
        if aspectRatio > 1:
            k = imgSize / h
            wCal = math.ceil(k * w)
            imgResize = cv2.resize(imgCrop, (wCal, imgSize))
            wGap = math.ceil((imgSize - wCal) / 2)
            imgWhite[:, wGap:wCal + wGap] = imgResize
            prediction, index = classifier.getPrediction(imgWhite, draw=False)
        else:
            k = imgSize / w
            hCal = math.ceil(k * h)
            imgResize = cv2.resize(imgCrop, (imgSize, hCal))
            hGap = math.ceil((imgSize - hCal) / 2)
            imgWhite[hGap:hCal + hGap, :] = imgResize
            prediction, index = classifier.getPrediction(imgWhite, draw=False)

        return jsonify({'character': labels[index]})

    return jsonify({'character': ''})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)

