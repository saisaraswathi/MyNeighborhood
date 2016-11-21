# Project: Neighborhood Map

This is the final project of the Udacity FEND Nanodegree. The challenge is to build a functional neighborhood map, using Google Map API, plus another API of my choice. For this project I chose to use Flickr API to attach images to the selected locations on the map.
My map is a guide to find a place where you can meet and catch up with friends over coffee, or grab delicious finds a some amazing brunch spots in Los Angeles. Click on one of the markers on the map for a sneak peak of what to find at these locations.
 ## Getting Started
 Here is a live [demo]()

#### APIs Used:
1. [Google Maps](https://developers.google.com/maps/?authuser=1)
2. [Flickr](https://www.flickr.com/services/api/)


## How to Use this App
 * The page will first load with a map of India , with several markers placed in the area.

 * Clicking on a marker will display an info window that shows an image related to the selected location, and the location name.

 * You can also filter locations by name using the Search box. Clicking on the `Show All` button will render all the markers back on the map, and all locations will be listed.

## Building the app
1. Download the Knockout framework. Knockout is used to handle the list, filter, and any other information on the page that is subject to changing state. Things that should not be handled by Knockout: anything the Maps API is used for, creating markers, tracking click events on markers, making the map, refreshing the map. Note 1: Tracking click events on list items should be handled with Knockout. Note 2: Creating your markers as a part of your ViewModel is allowed (and recommended). Creating them as Knockout observables is not.
2. Asynchrony and Error Handling. All data APIs used in the project  load asynchronously and errors are handled gracefully.
3.  Added the code required to add a full-screen map to your page using the Google Maps API. For sake of efficiency, the map API should be called only once.
4. Added the code required to display map markers identifying 6 location interested in within neighborhood. App displays those locations by default when the page is loaded.
5. Provided a filter option that uses an input field to filter both the list view and the map markers displayed by default on load. The list view and the markers are updated accordingly in real time. This filter can be a text input or a dropdown menu.
6. Added functionality to animate a map marker when either the list item associated with it or   the map marker itself is selected.
 Added functionality to open an infoWindow with the information specified, when either a location is selected from the list view or its map marker is selected directly.

## Resources
A list of some helpful resources:

http://stackoverflow.com/questions/8228281/what-is-the-function-construct-in-javascript
http://stackoverflow.com/questions/5815757/why-is-this-function-wrapped-in-parentheses-followed-by-parentheses
http://benalman.com/news/2010/11/immediately-invoked-function-expression/
https://developers.google.com/maps/documentation/javascript/examples/event-closure
http://stackoverflow.com/questions/5868903/marker-content-infowindow-google-maps
