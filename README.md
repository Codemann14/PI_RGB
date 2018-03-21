# PI_RGB #

This is an application that allows you to control a LED strip connected to a Raspberry Pi, 
through a web tool. Which allows any device connected to the network the capability to control 
the LED strip. It uses a React Js UI and a Python Web Socket to send the necessary data to the 
[WS281X Library](https://github.com/jgarff/rpi_ws281x), allowing the LEDs to change color.


## Installation ##

### Python ###

To use the python code:

1. Update the *LED_COUNT* variable to match the count on the LED strip.

```python
LED_COUNT = 60
```

2. Make sure you have installed the [WS281X Library](https://github.com/jgarff/rpi_ws281x) 
on your Raspberry PI.
3. Copy the *python* directory from this repo onto the Raspberry PI.
4. Run: `sudo python main.py`.

### UI ###

To use the React UI:

1. Update the *this.socket* variable to point to the ip address of your Raspberry PI.

```js
this.socket = new WebSocket("ws://192.168.1.202:9001/")
```

2. Run `npm build` in the *pi-rgb-ui* directory. This will make a built version of the React UI.
3. Put the built React UI on a web server, it should be in the *build* folder.


## History ##

### 1.0.0 ###

* Allows brightness changing of the LED strip
* Allows each individual LED's color to be changed
* Allows all LED's colors to be changed at once


## Notices ##

[Raspberry PI LED setup tutorial](https://dordnung.de/raspberrypi-ledstrip/ws2812)

[WS281X Library](https://github.com/jgarff/rpi_ws281x)

[Python Websocket Server](https://github.com/Pithikos/python-websocket-server)
