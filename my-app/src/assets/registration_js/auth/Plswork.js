import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://ywbofunoxucgnaxxbaqo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3Ym9mdW5veHVjZ25heHhiYXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4ODUyODksImV4cCI6MjAyODQ2MTI4OX0.P4Pqc-d2rvXbDUW7djSfCrQDc4SkV9fsPCAPmzA_-5Q';
const supabase = createClient(supabaseUrl, supabaseKey);

function saveLocation(stallId) {
    // Check if local storage is supported by the browser
    if (typeof Storage !== 'undefined') {
        // Get the existing saved locations from local storage
        let savedLocations = localStorage.getItem('savedLocations');
        savedLocations = savedLocations ? JSON.parse(savedLocations) : [];

        // Add the new stall ID to the saved locations array if it's not already saved
        if (!savedLocations.includes(stallId)) {
            savedLocations.push(stallId);

            // Update the saved locations in local storage
            localStorage.setItem('savedLocations', JSON.stringify(savedLocations));

            console.log('Location saved successfully:', stallId);
            // Optionally, you can update the UI to indicate that the location was saved
        } else {
            console.log('Location already saved:', stallId);
            // Optionally, display a message or UI indicating that the location is already saved
        }
    } else {
        console.error('Local storage is not supported');
        // Optionally, handle the case where local storage is not supported by the browser
    }
}
