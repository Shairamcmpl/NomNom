import { Geolocation } from '@capacitor/geolocation';
import cedImage from "/assets/images/buildings/CED.jpg";
import caaImage from "/assets/images/buildings/CAA.jpg";
import ccisImage from "/assets/images/buildings/CCIS.jpg";
import cegsImage from "/assets/images/buildings/CEGS.jpg";
import chassImage from "/assets/images/buildings/CHASS.jpg";
import cofesImage from "/assets/images/buildings/COFES.jpg";
import hallImage from "/assets/images/buildings/ECO-HALL.jpg";
import guidanceImage from "/assets/images/buildings/GUIDANCE.jpg";
import libraryImage from "/assets/images/buildings/LIBRARY.jpg";
import masawaImage from "/assets/images/buildings/MASAWA.jpg";
import nsbImage from "/assets/images/buildings/NSB.jpg";
import casImage from "/assets/images/buildings/OLD-CAS.jpg";
import registrarImage from "/assets/images/buildings/REGISTAR.jpg";
import adminImage from "/assets/images/buildings/ADMIN.jpg";
import bookImage from "/assets/images/buildings/BOOKSHOP.jpg";
import ajjImage from "/assets/images/maps/ajj.jpg";
import bentelogImage from "/assets/images/maps/bentelog.jpg";
import blythsImage from "/assets/images/maps/blyths.jpg";
import boffoImage from "/assets/images/maps/boffo.jpg";
import brewcorpImage from "/assets/images/maps/brewcorp.jpg";
import bryansImage from "/assets/images/maps/bryans.jpg";
import cedcanteenImage from "/assets/images/maps/ced.jpg";
import chirpyhinangImage from "/assets/images/maps/chirpyhinang.jpg";
import chirpynsbImage from "/assets/images/maps/chirpynsb.jpg";
import grazziasImage from "/assets/images/maps/grazzias.jpg";
import honestyImage from "/assets/images/maps/honesty.jpg";
import ictImage from "/assets/images/maps/ict.jpg";
import khoysImage from "/assets/images/maps/khoys.jpg";
import kofesImage from "/assets/images/maps/koefs.jpg";
import legendaryImage from "/assets/images/maps/legendary.jpg";
import lilsImage from "/assets/images/maps/lils.jpg";
import sethImage from "/assets/images/maps/seth.jpg";
import sgsgImage from "/assets/images/maps/sgsg.jpg";
import teakoyakenImage from "/assets/images/maps/teakoyaken.jpg";
import toilysImage from "/assets/images/maps/toilys.jpg";
import zinniaImage from "/assets/images/maps/zinnia.jpg";



let map;
let infoWindow;

    const getLocationAndInitMap = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      // console.log('Current position:', coordinates);
      console.log('Latitude:', coordinates.coords.latitude);
      console.log('Longitude:', coordinates.coords.longitude);

      alert(coordinates.coords.latitude + " " + coordinates.coords.longitude);
      initMap(8.95539705297076, 125.59768263296517);

      // initMap(coordinates.coords.latitude, coordinates.coords.longitude);
    };

    getLocationAndInitMap();

    const btn_oncurrent = document.getElementById("btn_oncurrent");

    if(btn_oncurrent){
      btn_oncurrent.onclick = getLocationAndInitMap();
    }

    const initMap = (lat, long) => {
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: long },
        zoom: 16,
      });
      infoWindow = new google.maps.InfoWindow(); 

      infoWindow.setContent("You are here.");
      infoWindow.setPosition({ lat: lat, lng: long });
      infoWindow.open(map);

  const markerPositions = [
    { lat: 8.958976745605469, lng: 125.59546661376953, title: "College of Agriculture and Agri-Industries", image: caaImage, description: "College of Agriculture and Agri-Industries"  } ,
    { lat: 8.9592866897583, lng: 125.59711456298828, title: "Iwag Hall", image: cedImage, description: "College of Education"  },
    { lat: 8.957560539245605, lng: 125.59640502929688, title: "CSU Library", image: libraryImage, description: "Hero Learning Commons"  },
    { lat: 8.957778930664062, lng: 125.59700775146484, title: "Batok Hall", image: nsbImage, description: "New Science Building" },
    { lat: 8.956928253173828, lng: 125.59569549560547, title: "CSU Bookshop", image: bookImage, description: "Bookshop" },
    { lat: 8.957171440124512, lng: 125.59751892089844, title: "New Admin", image: adminImage, description: "Admin"  },
    { lat: 8.956154823303223, lng: 125.59794616699219, title: "Kinaadman Hall", image: chassImage, description: "College of Humanities and Social Sciences"  },
    { lat: 8.955302238464355, lng: 125.59757232666016, title: "Hiraya Hall", image: ccisImage, description: "College of Computing and Information Sciences"  },
    { lat: 8.95484733581543, lng: 125.59774017333984, title: "Hinang Hall", image: cegsImage, description: "College of Engineering and GeoSciences"  },
    { lat: 8.955534934997559, lng: 125.59906005859375, title: "Masawa Hall", image: masawaImage, description: "College of Engineering and Information Technology"  },
    { lat: 8.955619812011719, lng: 125.59699249267578, title: "Old CAS", image: casImage, description: "Old College of Arts and Science"  },
    { lat: 8.953186988830566, lng: 125.59734344482422, title: "Villares Hall", image: cofesImage, description: "College of Forestry and Environmental Science"  },
    { lat: 8.955039024353027, lng: 125.5970687866211, title: "Eco Hall", image: hallImage, description: "Eco Hall"  },
    { lat: 8.95694475449111, lng: 125.59746379881811, title: "CSU Registar", image: registrarImage, description: "Registrar"  },
    { lat: 8.95678335032543, lng: 125.59720508788416, title: "CSU Guidance", image: guidanceImage, description: "Guidance"  }
  ];

  const markerIcon = {
    url: "https://cdn-icons-png.flaticon.com/128/562/562511.png",
    scaledSize: new google.maps.Size(25, 23)
  };

  markerPositions.forEach((position) => {
    const marker = new google.maps.Marker({
      position: { lat: position.lat, lng: position.lng },
      map: map,
      title: position.title,
      icon: markerIcon
    });

    marker.addListener("click", () => {
      const contentString = `
        <div style="text-align: center;">
          <h2>${position.title}</h2>
          <img src="${position.image}" alt="${position.title}" style="max-width: 200px;">
            <p>${position.description}</p>
        </div>
      `;
      infoWindow.setContent(contentString);
      infoWindow.open(map, marker);
    });
  });

  const buildingMarkers = [
    { lat: 8.955988031396709, lng: 125.59805905615487, title: "Khoy's FoodHub", image: khoysImage,
      description: "Fueling students with flavor! Discover a variety of delicious meals to satisfy your hunger cravings." },
    { lat: 8.956311131012157, lng: 125.59800635156314, title: "Zinnia's Siomai Food Corner", image: zinniaImage ,
      description: "Your flavorful feast awaits! From savory siomai to sweet bananaque and refreshing buko juice, indulge in a variety of mouthwatering meals and treats." },
    { lat: 8.955646485637354, lng: 125.5971348511563, title: "Lil's Cafeteria", image: lilsImage ,
      description: "Fueling students with flavorful meals throughout the day. Enjoy a diverse selection of hearty options at affordable prices, perfect for busy schedules and hungry appetites." },
    { lat: 8.955800933058754, lng: 125.59755849500951, title: "Bryan's Lechon", image: bryansImage ,
      description: "Your student dining destination! Indulge in hearty meals and cool off with our delightful ice cream selection."},
    { lat: 8.954940521616026, lng: 125.59822931215355, title: "Grazzias Food Service", image: grazziasImage ,
      description: "Welcome to Grazzia's Food Services! Grab student favorites like siomai and sisig, plus refreshing beverages. Perfect for a quick bite or a study fuel-up!" },
    { lat: 8.954950069296764, lng: 125.59824139401958, title: "The Brew Corp", image: brewcorpImage ,
      description: "Step into The Brew Corp for a caffeine fix like no other! Indulge in our signature Caramel Macchiato, intense Espresso, or creamy Lattes. Your perfect coffee awaits!"},
    { lat: 8.954847920003807, lng: 125.59823638106609, title: "Chirpy Snacks (Hinang Branch)", image: chirpyhinangImage ,
      description: "Where every bite bursts with flavor! From zesty chicken to succulent burger steak and crispy fishballs, paired perfectly with our signature milk teas and zesty lemonades. Taste the difference!"},
    { lat: 8.954854592477998, lng: 125.5981689028233, title: "Legendary TakkoYaki", image: legendaryImage ,
      description: "Bite-sized balls of perfection with a variety of sauces. Taste the legend!" },
    { lat: 8.956304347171367, lng: 125.59746193098884, title: "Toily's Bubble Tea and Shawarma", image: toilysImage ,
      description: "A taste adventure awaits! Delight in our diverse menu featuring coffees, savory shawarmas, and an array of culinary delights."},
    { lat: 8.952889442443848, lng: 125.59721374511719, title: "Kofes Canteen", image: kofesImage ,
      description: "Your friendly neighborhood stop for snacks and essentials."},
    { lat: 8.95851214342837, lng: 125.59717456575079, title: "Seth's Treat", image: sethImage ,
      description: "Your student meal hotspot! Enjoy a range of satisfying meals tailored to fuel your day."},
    { lat: 8.958512731660406, lng: 125.5971860537777, title: "Teakoyaken", image: teakoyakenImage ,
      description: "Your student fuel stop! Dive into a variety of coffees, milk teas, and our signature takoyaki for a tasty study break."},
    { lat: 8.958513745391679, lng: 125.59719939502924, title: "BXU Bentelog", image: bentelogImage ,
      description: "Your student's go-to spot! Feast on hearty meals like chicken mami and pater, paired with a variety of coffee options to keep you energized."},
    { lat: 8.958513745391679, lng: 125.5972137625309, title: "Chirpy Snacks (NSB Branch)", image: chirpynsbImage ,
      description: "Where every bite bursts with flavor! From zesty chicken to succulent burger steak and crispy fishballs, paired perfectly with our signature milk teas and zesty lemonades. Taste the difference!"},
    { lat: 8.958516786585472, lng: 125.59722607753233, title: "SgSg", image: sgsgImage ,
      description: "Your one-stop hunger solution! From satisfying meals to a plethora of snacks, we've got your cravings covered." },
    { lat: 8.95872974395752, lng: 125.59683990478516, title: "Blyths Canteen", image: blythsImage ,
      description: "Serving up student favorites! Enjoy a variety of delicious meals tailored to keep you fueled throughout the day."},
    { lat: 8.959453582763672, lng: 125.59725952148438, title: "CED Canteen", image: cedcanteenImage ,
      description: "Where students find everything they need! From quick snacks to satisfying meals and essential supplies, we've got you covered."},
    { lat: 8.959097862243652, lng: 125.59589385986328, title: "AJJ Food Hub", image: ajjImage ,
      description: "Where students find their fuel! Dive into our selection of meals, snacks, and beverages for a satisfying study break."},
    { lat: 8.957365215203394, lng: 125.59570295588527, title: "Boffo Food Hub", image: boffoImage ,
      description: "Student's delight! Discover a variety of delicious meals and snacks perfect for a quick bite or satisfying meal."},
    { lat: 8.958122253417969, lng: 125.59657287597656, title: "ICT Cafe Library", image: ictImage ,
      description: "Your study fuel station! Enjoy a variety of snacks to keep you energized while hitting the computer."},
    { lat: 8.95824909210205, lng: 125.59654998779297, title: "Honesty Corner", image: honestyImage ,
      description: "Library snacks at your service! Explore our selection of snacks conveniently situated within the library for a quick study break."},
  ];
  
    
    const customIcon = {
      url: "https://cdn-icons-png.flaticon.com/128/15458/15458850.png", 
      scaledSize: new google.maps.Size(28, 27)
    };
    
  
    buildingMarkers.forEach((position) => {
      const marker = new google.maps.Marker({
        position: { lat: position.lat, lng: position.lng },
        map: map,
        title: position.title,
        icon: customIcon
      });
    
      marker.addListener("click", () => {
        const contentString = `
          <div style="text-align: center;">
            <h2>${position.title}</h2>
            <img src="${position.image}" alt="${position.title}" style="max-width: 200px;">
            <p>${position.description}</p>
          </div>
        `;
        infoWindow.setContent(contentString);
        infoWindow.setOptions({maxWidth: 300});
        infoWindow.open(map, marker);
      });
    });
   
    
    // const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
    //   infoWindow.setPosition(pos);
    //   infoWindow.setContent(
    //     browserHasGeolocation
    //       ? "Error: The Geolocation service failed."
    //       : "Error: Your browser doesn't support geolocation."
    //   );
    //   infoWindow.open(map);
    // };
  }
  