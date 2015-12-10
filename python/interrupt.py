#!/usr/bin/env python2.7
import httplib, urllib
import RPi.GPIO as GPIO
import time
from post import stallPost

GPIO.setmode(GPIO.BCM)

handicapped_stall = 19
little_stall = 4

GPIO.setup(handicapped_stall, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(little_stall, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)


def Callback(self):
    if GPIO.input(handicapped_stall):
        print "1: RISING Edge Detected"
	#stallPost(1, True, False)
    else:
	print "1: FALLING Edge Detected"
	#stallPost(1, False, False)

def Callback2(self):
    if GPIO.input(little_stall):
        print "2: RISING Edge Detected"
	#stallPost(2, True, True)
    else:
	print "2: FALLING Edge Detected"
	#stallPost(2, False, True)


#GPIO.add_event_detect(handicapped_stall, GPIO.BOTH, callback=Callback, bouncetime=100)
#GPIO.add_event_detect(little_stall, GPIO.BOTH, callback=Callback2, bouncetime=100)

GPIO.add_event_detect(handicapped_stall, GPIO.BOTH, callback=Callback)
GPIO.add_event_detect(little_stall, GPIO.BOTH, callback=Callback2)
try:
    #while True:
    #    pass

    while True:
        time.sleep(10)





except KeyboardInterrupt:
    GPIO.cleanup()

GPIO.cleanup()









