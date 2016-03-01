import RPi.GPIO as GPIO
import time
import signal
import sys

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)

def end_read(signal,frame):
    global continue_reading
    print "Ctrl+C captured, ending read."
    continue_reading = False
    GPIO.cleanup()

signal.signal(signal.SIGINT, end_read)

def firstRun(pin):
	GPIO.setup(pin,GPIO.OUT)
	return;

def enableTap(pin,delay):
	GPIO.output(pin, False)
	GPIO.output(pin, True)
	time.sleep(delay)
	GPIO.output(pin,False)
	return;

inputje = int(sys.argv[1])
timeoutje = int(sys.argv[2])
stopje = int(sys.argv[3])


firstRun(inputje)

if stopje == 1:
	GPIO.output(inputje, False)
else:
	enableTap(inputje, (timeoutje/1000))
