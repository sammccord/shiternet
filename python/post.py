#!/usr/bin/env python2.7
import httplib, urllib
import time

def stallPost(id, active, handicapped):
    params = urllib.urlencode({
        'stallId' : id,
        'active' : active,
        'handicapped' : handicapped
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

