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
    conn = httplib.HTTPConnection("lrshit.herokuapp.com", 80)
    conn.request("POST", "/api/stalls",
                 params, headers)
    response = conn.getresponse()
    data = response.read()
    conn.close()

