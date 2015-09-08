## steam.html: an html-based game launcher for Steam

**steam.html** is a tiny html+js app that uses the [Steam browser protocol](https://developer.valvesoftware.com/wiki/Steam_browser_protocol) (the *steam://rungameid/\<id>* command) to run Steam games. It is **not related** in any shape or form to the official Steam client, or to Valve Software. *steam.html* is licensed under the MIT license.

To use *steam.html*, you need the following:

* A simple webserver (like [nginx](http://nginx.org/)).
* A Steam [Web API key](https://steamcommunity.com/dev).
* Some technical knowledge regarding web servers and editing [json](http://json.org/) files.

---

### Step-by-step guide
1. Places the project files:
 
 * index.html
 * scripts/jquery-2.1.4.min.js
 * scripts/games.js
 * styles/steam.html.css
 * data/steam-api.json
 * data/owned-games.json
 * data/categorized-games.json

 in a directory (say, *steam-html*) and configure nginx to point towards this directory.

2. Open the *data/steam-api.json* file in a text editor and replace:

 * *\<your-steam-api-key>* with the Steam Web API key.
 * *\<your-steam-id>* with your Steam profile id (755nnnn...).

3.  You should then be able to access the application in your browser at, say, *http://localhost/steam.html/*. Click on the *Generate Games List Link*. This creates a url that can be used to download a json file containing a list of your games (by clicking on *Download Games List*). Rename this downloaded file to *owned-games.json* and replace the dummy one provided with the application.

4. You can now see your games in the *UNCATEGORIZED* section. Modify the *categorized-games.json* file to create your own categories and put the appids within the required categories (which are comma-separated json arrays). Once saved, they will show up under the respective categories when the webpage is refreshed.

