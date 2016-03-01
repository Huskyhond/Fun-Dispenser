
#!/usr/bin/env python
# -*- coding: utf8 -*-

import sys
import RPi.GPIO as GPIO
import MFRC522
import signal
import time
import threading
import json
from json import JSONEncoder

continue_reading = True

# Capture SIGINT for cleanup when the script is aborted
def end_read(signal,frame):
    global continue_reading
    print "Ctrl+C captured, ending read."
    continue_reading = False
    GPIO.cleanup()

# Hook the SIGINT
signal.signal(signal.SIGINT, end_read)

# Create an object of the class MFRC522
MIFAREReader = MFRC522.MFRC522()


#values
defaultOutput = JSONEncoder().encode({"status":"idle", 'tagId':'None'})
output = defaultOutput
check = 0
timerIsOn = False
timer = None
done = False

def timeOut():
	print defaultOutput
	global done
	global timerIsOn
	global timer
	done = True
	timer = None
	timerIsOn = False
	
# This loop keeps checking for chips. If one is near it will get the UID and authenticate
while continue_reading:
	# Scan for cards    
    	(status,TagType) = MIFAREReader.MFRC522_Request(MIFAREReader.PICC_REQIDL)
	
   	# Get the UID of the card
	(status,uid) = MIFAREReader.MFRC522_Anticoll()
	
	#check is used to read the card alternately
	if check == 0:
		#if card is detected
		if status == MIFAREReader.MI_OK:
			try:	
				sector0 = MIFAREReader.MFRC522_Read(0)[0:3] +MIFAREReader.MFRC522_Read(0)[4:8]
				GUID = str(bytearray(sector0)).encode('hex')
				output = JSONEncoder().encode({"status":"Card detected", "tagId":GUID})
				print output
			except TypeError:
				output = defaultOutput
				print output
			MIFAREReader.MFRC522_StopCrypto1()
			check = 1
		else:
			print defaultOutput
						
	else:
		check = 0
	
	sys.stdout.flush()
