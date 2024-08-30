import { Geolocation } from '@capacitor/geolocation';
import bryansImage from "/assets/images/maps/bryans.jpg";


let map;
let infoWindow;
let directionsService;
let directionsRenderer;
let destinationMarker;

const getLocationAndInitMap = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  console.log('Latitude:', coordinates.coords.latitude);
  console.log('Longitude:', coordinates.coords.longitude);
  initMap(8.95539705297076, 125.59768263296517); // Set the origin coordinates here

  alert(coordinates.coords.latitude + " " + coordinates.coords.longitude);
  initMap(8.95539705297076, 125.59768263296517); // Call initMap with the origin coordinates
};

getLocationAndInitMap(); // Call the function directly without waiting for a button click

const initMap = (lat, long) => {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: long },
    zoom: 18,
  });
  infoWindow = new google.maps.InfoWindow();

  const currentPos = { lat: lat, lng: long };
  const content = "You are here.";
  const infoWindowOptions = { position: currentPos, content: content };
  const currentLocationInfoWindow = new google.maps.InfoWindow(infoWindowOptions);
  currentLocationInfoWindow.open(map);

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

  const destination = { lat: 8.955800933058754, lng: 125.59755849500951 }; // Destination coordinates
  calculateAndDisplayRoute(currentPos, destination);
};

const calculateAndDisplayRoute = (origin, destination) => {
  const selectedMode = "WALKING"; // or "DRIVING"
  const request = {
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode[selectedMode]
  };
  directionsService.route(request, (response, status) => {
    if (status === 'OK') {
      directionsRenderer.setDirections(response);

      const destinationLocation = request.destination;
      if (!destinationMarker) {
        destinationMarker = new google.maps.Marker({
          position: destinationLocation,
          map: map,
          title: "Bryan's Letchon",
          icon: {
            url: 'https://cdn-icons-png.flaticon.com/128/819/819814.png',
            size: new google.maps.Size(45, 45),
            scaledSize: new google.maps.Size(45, 45),
          }
        });

        destinationMarker.addListener('click', () => {
          const content = `
            <div style="text-align: center;">
              <h3>Bryan's Letchon</h3>
              <img src= '${bryansImage}' width='380' height='400'>
              <br>
              <br>
              <button onclick="window.location.href='stalls.html'" style="background-color: FF9B50;">View More</button>
            </div>
          `;
          infoWindow.setContent(content);
          infoWindow.open(map, destinationMarker);
        });
      } else {
        destinationMarker.setPosition(destinationLocation);
      }

      const bounds = new google.maps.LatLngBounds();
      bounds.extend(origin);
      bounds.extend(destinationLocation);
      map.fitBounds(bounds);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
};