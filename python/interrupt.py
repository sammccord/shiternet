#!/usr/bin/env python2.7

import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)

GPIO.setup(5, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)


def Callback(self):
    if GPIO.input(5):
        print "RISING Edge Detected"
    else:
	print "FALLING Edge Detected"


GPIO.add_event_detect(5, GPIO.BOTH, callback=Callback, bouncetime=100)

try:
    while True:
        pass
except KeyboardInterrupt:
    GPIO.cleanup()

GPIO.cleanup()
