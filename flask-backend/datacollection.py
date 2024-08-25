import math
import cv2
from cvzone.HandTrackingModule import HandDetector
import numpy as np
import time

cap =  cv2.VideoCapture(0)
detector = HandDetector(maxHands=1) #meken krnne maximum hands kiyak detect krgnna puluwanda kiyna eka denwa code ekn

offset = 25
imgSize = 300

folder = "F:/intern projecrts/tensorflow + node-express api backend practice project/backend/models/data/space"
counter = 0

while True:
    success, img = cap.read()
    hands, img = detector.findHands(img)
    if hands:
        hand = hands[0]
        x, y, w, h =  hand['bbox']

        imgWhite = np.ones((imgSize, imgSize,3), np.uint8)*255
        imgCrop = img[y-offset:y+h+offset, x-offset:x+w+offset]

        imgCropShape = imgCrop.shape

        aspectRatio = h/w

        if aspectRatio > 1:
            k = imgSize/h
            wCal = math.ceil(k*w)
            imgResize = cv2.resize(imgCrop, (wCal, imgSize))
            imgResizeShape = imgResize.shape
            wGap = math.ceil((imgSize-wCal)/2)
            imgWhite[:, wGap:wCal+wGap] = imgResize

        else:
            k = imgSize / w
            hCal = math.ceil(k * h)
            imgResize = cv2.resize(imgCrop, (imgSize, hCal))
            imgResizeShape = imgResize.shape
            hGap = math.ceil((imgSize - hCal) / 2)
            imgWhite[hGap:hCal+hGap, :] = imgResize

            #elagat width eka height ekat wada loku wenwkota kallata code eka ghnna thiynne 30:47n nwattuwe

        cv2.imshow("imagecrop" , imgCrop)
        cv2.imshow("imageWite" , imgWhite)

    cv2.imshow("Image" ,  img)
    key = cv2.waitKey(1)

    if key == ord("s"):
        counter += 1
        cv2.imwrite(f'{folder}/Image_{time.time()}.jpg' , imgWhite)
        print(counter)
