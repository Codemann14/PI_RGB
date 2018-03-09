from websocket_server import WebsocketServer
import json
from neopixel import *


LED_COUNT = 60 # Set to the number of LEDs on the light strip
LED_BRIGHTNESS = 255 # Brightness of the LED strip
LEDArr = [{}] * LED_COUNT # Used to remember last settings even if the client disconnects
strip = None # Holds the Adafruit_NeoPixel object


## Inits / sets the Adafruit_NeoPixel object
def set_strip():
	global LED_COUNT
	global LED_BRIGHTNESS
	global strip
	strip = Adafruit_NeoPixel(LED_COUNT, 18, 800000, 5, False, LED_BRIGHTNESS)
	strip.begin()


## Sets a specific LED
## param: pos = The LED position
## param: r = The R color
## param: b = The B color
## param: g = The G color
def set_LED(pos, r, b, g):
	LED = {}
	LED["LEDPosition"] = pos
	LED["R"] = r
	LED["G"] = g
	LED["B"] = b

	LEDArr[pos - 1] = LED


## Called for every client connecting (after handshake)
## Sends the current LEDArr to all the clients
def new_client(client, server):
	global LED_BRIGHTNESS
	print("New client connected and was given id %d" % client['id'])
	obj = {}
	obj["LEDs"] = LEDArr
	obj["Brightness"] = LED_BRIGHTNESS
	server.send_message_to_all(json.dumps(obj))


## Called for every client disconnecting
def client_left(client, server):
	print("Client(%d) disconnected" % client['id'])


## Called when a client sends a message
## Updates the LED_BRIGHTNESS if changed
## Updates the LEDArr to the sent data
## Updates the strip to use the sent data 
def message_received(client, server, message):
	global LED_COUNT
	global LED_BRIGHTNESS
	response = json.loads(message)	

	# Check for a brightness change
	# If it has changed re-init the strip
	if (response["Data"]["Brightness"] != LED_BRIGHTNESS):
		LED_BRIGHTNESS = response["Data"]["Brightness"]
		set_strip()

	# Loop through each LED object
	for LED in response["Data"]["LEDs"]:
		# Update the LED array
		set_LED(LED["LEDPosition"], LED["R"], LED["G"], LED["B"])
		# Print the Data and set the LED color
		print "Position: " + str(LED["LEDPosition"]) + "\tR: " + str(LED["R"]) + "\tG: " + str(LED["G"]) + "\tB: " + str(LED["B"])
		strip.setPixelColorRGB(LED["LEDPosition"], LED["G"], LED["R"], LED["B"])

	# Apply the new colors
	strip.show()



## Init the LEDArr
for i in range(1, LED_COUNT + 1):
	set_LED(i, 255, 255, 255)

set_strip()

server = WebsocketServer(9001, "0.0.0.0")
server.set_fn_new_client(new_client)
server.set_fn_client_left(client_left)
server.set_fn_message_received(message_received)
server.run_forever()