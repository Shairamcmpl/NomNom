let map;
let infoWindow;
let directionsService;
let directionsRenderer;
let destinationMarker;

const getLocationAndInitMap = () => {
  if (navigator.permissions) {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        getCurrentPosition();
      } else if (result.state === 'prompt') {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            initMap(lat, long);
          },
          () => {
            alert("Error: Failed to retrieve your location.");
          }
        );
      } else if (result.state === 'denied') {
        alert("Error: Geolocation permission denied.");
      }
    });
  } else {
    alert("Error: Geolocation is not supported by this browser.");
  }
};

const getCurrentPosition = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      initMap(lat, long);
    },
    () => {
      alert("Error: Failed to retrieve your location.");
    }
  );
};

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

  calculateAndDisplayRoute(currentPos);
};

function calculateAndDisplayRoute(currentPos) {
  const destination = { lat: 8.954847920003807, lng: 125.59823638106609 };
  const selectedMode = "WALKING"; // or "DRIVING"
  const request = {
    origin: currentPos,
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
          title: "Chirpy Snacks (Hinang Branch)",
          icon: {
            url: 'https://cdn-icons-png.flaticon.com/128/819/819814.png',
            size: new google.maps.Size(45, 45),
            scaledSize: new google.maps.Size(45, 45),
          }
        });

        destinationMarker.addListener('click', () => {
          const content = `
          <div style="text-align: center;">
            <h3>Chirpy Snacks (Hinang Branch)</h3>
            <img src='assets/images/maps/chirpyhinang.jpg' width='380' height='400'>
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
      bounds.extend(currentPos);
      bounds.extend(destinationLocation);
      map.fitBounds(bounds);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

window.onload = getLocationAndInitMap;
