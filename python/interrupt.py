#!/usr/bin/env python2.7
import httplib, urllib
import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)

def stallPost(id, active):
    params = urllib.urlencode({
        'stallId' : id,
        'active' : active
        })
    headers = {"Content-type": "application/x-www-form-urlencoded",
               "Accept": "text/plain"}
    conn = httplib.HTTPConnection("192.168.208.241:9000")
    conn.request("POST", "/api/stalls",
                 params, headers)
    response = conn.getresponse()
    print response.status, response.reason
    data = response.read()
    conn.close()

door_1 = 19
door_2 = 4


GPIO.setup(door_1, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(door_2, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)


def Callback(self):
    if GPIO.input(door_1):
        print "1: RISING Edge Detected"
	stallPost(1, True)
    else:
	print "1: FALLING Edge Detected"
	stallPost(1, False)

def Callback2(self):
    if GPIO.input(door_2):
        print "2: RISING Edge Detected"
	stallPost(2, True)
    else:
	print "2: FALLING Edge Detected"
	stallPost(2, False)


#GPIO.add_event_detect(door_1, GPIO.BOTH, callback=Callback, bouncetime=100)
#GPIO.add_event_detect(door_2, GPIO.BOTH, callback=Callback2, bouncetime=100)

GPIO.add_event_detect(door_1, GPIO.BOTH, callback=Callback)
GPIO.add_event_detect(door_2, GPIO.BOTH, callback=Callback2)
try:
    #while True:
    #    pass

    while True:
        time.sleep(10)





except KeyboardInterrupt:
    GPIO.cleanup()

GPIO.cleanup()









