#!/usr/bin/env python2.7
import httplib, urllib
import RPi.GPIO as GPIO
import time
import logging
from post import stallPost
GPIO.setmode(GPIO.BCM)

logging.basicConfig(filename='/var/log/lr.log',
                    level=logging.DEBUG,
                    format='%(asctime)s %(message)s')

handicapped_stall = 24
little_stall = 4

GPIO.setup(handicapped_stall, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(little_stall, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

def Callback(self):
    if GPIO.input(handicapped_stall):
	logging.info('Handicapped stall door closed')
	stallPost(1, True, True)
    else:
	logging.info('Handicapped stall door open')
	stallPost(1, False, True)

def Callback2(self):
    if GPIO.input(little_stall):
	logging.info('Little stall door closed')
	stallPost(2, True, False)
    else:
	logging.info('Little stall door open')
	stallPost(2, False, False)

GPIO.add_event_detect(handicapped_stall, GPIO.BOTH, callback=Callback)
GPIO.add_event_detect(little_stall, GPIO.BOTH, callback=Callback2)
try:
    while True:
        time.sleep(10)

except KeyboardInterrupt:
    GPIO.cleanup()

GPIO.cleanup()









