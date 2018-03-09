# PI_RGB #

This is an application that allows you to control a LED strip connected to a Raspberry Pi, 
through a web tool. Which allows any device connected to the network the capability to control 
the LED strip. It uses a React Js UI and a Python Web Socket to send the necessary data to the 
[WS281X Library](https://github.com/jgarff/rpi_ws281x), allowing the LEDs to change color.


## Installation ##

### Python ###

To use the python code, update the *LED_COUNT* variable to match the count on the LED strip.

```python
LED_COUNT = 60
```

### UI ###

TDB



## History ##

### 1.0.0 ###

* Coming Soon


## Notices ##

[Raspberry PI LED setup tutorial](https://dordnung.de/raspberrypi-ledstrip/ws2812)

[WS281X Library](https://github.com/jgarff/rpi_ws281x)

[Python Websocket Server](https://github.com/Pithikos/python-websocket-server)
