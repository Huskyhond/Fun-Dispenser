import sys
import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)

button1 = 17
button2 = 27
button3 = 22
button4 = 18

GPIO.setup(button1,GPIO.IN,pull_up_down=GPIO.PUD_UP)
GPIO.setup(button2,GPIO.IN,pull_up_down=GPIO.PUD_UP)
GPIO.setup(button3,GPIO.IN,pull_up_down=GPIO.PUD_UP)
GPIO.setup(button4,GPIO.IN,pull_up_down=GPIO.PUD_UP)


while True:
	print("Start while")
	if GPIO.input(button1) == False:
		print("button1")
		time.sleep(0.5)
	if GPIO.input(button2) == False:
		print("button2")
		time.sleep(0.5)
	if GPIO.input(button3) == False:
		print("button3")
		time.sleep(0.5)
	if GPIO.input(button4) == False:
		print("button4")
		time.sleep(0.5)
	sys.stdout.flush()
