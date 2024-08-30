import { createClient } from '@supabase/supabase-js';
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


// Initialize Supabase client
const supabaseUrl = 'https://ywbofunoxucgnaxxbaqo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3Ym9mdW5veHVjZ25heHhiYXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4ODUyODksImV4cCI6MjAyODQ2MTI4OX0.P4Pqc-d2rvXbDUW7djSfCrQDc4SkV9fsPCAPmzA_-5Q'; // Replace with your actual Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

const arrayLocation = [
    { id: 0, name: "AJJ FOOD HUB", image: ajjImage , page: "./ajj.html" },
    { id: 1, name: "LIL'S CAFETERIA", image: lilsImage , page: "./lils.html" },
    { id: 2, name: "BLYTH'S CANTEEN", image: blythsImage, page: "./blyths.html" },
    { id: 3, name: "CED CANTEEN", image: cedcanteenImage , page: "./cedcanteen.html" },
    { id: 4, name: "KOFES CANTEEN", image: kofesImage , page: "./kofes.html" },
    { id: 5, name: "GRAZZIA'S FOOD SERVICE", image: grazziasImage , page: "./grazzias.html" },
    { id: 6, name: "THE BREW CORP", image: brewcorpImage , page: "./brewcorp.html" },
    { id: 7, name: "CHIRPY SNACKS_HINANG", image: chirpyhinangImage, page: "./chirpyh.html" },
    { id: 8, name: "LEGENDARY TAKKOYAKI", image: legendaryImage , page: "./legendary.html" },
    { id: 9, name: "BRYAN'S LETCHON", image: bryansImage , page: "./bryans.html" },
    { id: 10, name: "TOILY'S BUBBLE TEA AND SHAWARMA", image: toilysImage, page: "./toilys.html" },
    { id: 11, name: "ZINNIA'S SIOMAI FOOD CORNER", image: zinniaImage, page: "./zinnia.html" },
    { id: 12, name: "KHOY'S FOODHUB", image: khoysImage, page: "./khoys.html" },
    { id: 13, name: "BOFFO FOOD HUB", image: boffoImage, page: "./boffo.html" },
    { id: 14, name: "ICT CAFE LIBRARY", image: ictImage, page: "./ict.html" },
    { id: 15, name: "HONESTY CORNER", image: honestyImage, page: "./honesty.html" },
    { id: 16, name: "SETH'S TREAT", image: sethImage, page: "./seths.html" },
    { id: 17, name: "TEAKOYAKEN", image: teakoyakenImage, page: "./teakoyaken.html" },
    { id: 18, name: "BXU BENTELOG", image: bentelogImage, page: "./bentelog.html" },
    { id: 19, name: "CHIRPY SNACKS_NSB", image: chirpynsbImage, page: "./chirpy.html" },
    { id: 20, name: "SGSG", image: sgsgImage, page: "./sgsg.html" },


    // ... add other locations
];

const displaySavedLocations = async () => {
    try {
        let { data: user_information, error: user_information_error } = await supabase
            .from('user_information')
            .select('*')
            .eq('user_id', localStorage.getItem("user_id"));

        if (user_information_error) throw new Error(`User information fetch error: ${user_information_error.message}`);
        if (!user_information || user_information.length === 0) {
            throw new Error("No user information found.");
        }

        const userInfoId = user_information[0].id;

        const { data: saved_locations, error: saved_locations_error } = await supabase
            .from('saved_location')
            .select('*')
            .eq('user_information_id', userInfoId);

        if (saved_locations_error) throw new Error(`Saved locations fetch error: ${saved_locations_error.message}`);
        if (!saved_locations || saved_locations.length === 0) {
            console.log("No saved locations found.");
            return;
        }

        const savedLocationsContainer = document.getElementById('savedLocationsContainer');
        if (!savedLocationsContainer) throw new Error("Saved locations container not found");

        savedLocationsContainer.innerHTML = ''; // Clear previous content

        saved_locations.forEach(location => {
            const stall = arrayLocation.find(item => item.id == location.stall_id);
            if (stall) {
                const locationDiv = document.createElement('div');
                locationDiv.classList.add('col-lg-4', 'col-md-6', 'col-12', 'mb-4', 'mb-lg-0');
                locationDiv.innerHTML = `
                <div class="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                <div class="card-2 shadow-lg">
                    <div class="card-body">
                        <div class="d-flex">
                            <h5 class="card-title mb-2">${stall.name}</h5>
                            <span class="badge bg-OLD_CAS rounded-pill ms-auto">${stall.id}</span>
                        </div>
                    </div>
                    <img src="${stall.image}" class="card-img-top-2 img-fluid" alt="${stall.name}">
                    <br>
                    <div class="card-body">
                        <a href="${stall.page}" class="btn bg-warning-subtle-2 ms-4 me-2">
                            <i class="fas fa-map-marker-alt me-1 red-icon"></i> Location
                        </a>
                        <button class="btn bg-warning-2 ms-2"  id="btn_unsave_${stall.id}" data-id="${stall.id}" style="margin-left: 10px;">
                            <i class="fas fa-heart me-1 red-icon"></i> Unsave
                        </button>
                    </div>
                </div>
            </div>

                `;
                savedLocationsContainer.appendChild(locationDiv);

                document.getElementById(`btn_unsave_${stall.id}`).addEventListener('click', async (event) => {
                    await unsaveLocation(stall.id);
                    locationDiv.remove();
                });
            } else {
                console.warn(`Stall with ID ${location.stall_id} not found in arrayLocation.`);
            }
        });
    } catch (error) {
        console.error('Error fetching/displaying saved locations:', error.message);
    }
};

const unsaveLocation = async (id) => {
    try {
        let { data: user_information, error: user_information_error } = await supabase
            .from('user_information')
            .select('*')
            .eq('user_id', localStorage.getItem("user_id"));

        if (user_information_error) throw new Error(`User information fetch error: ${user_information_error.message}`);
        if (!user_information || user_information.length === 0) {
            throw new Error("No user information found.");
        }

        const userInfoId = user_information[0].id;

        const { data, error } = await supabase
            .from('saved_location')
            .delete()
            .eq('stall_id', id)
            .eq('user_information_id', userInfoId);

        if (error) throw new Error(`Unsave location error: ${error.message}`);

        console.log(`Location ${id} unsaved.`);
    } catch (error) {
        console.error('Error unsaving location:', error.message);
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    await displaySavedLocations();
});