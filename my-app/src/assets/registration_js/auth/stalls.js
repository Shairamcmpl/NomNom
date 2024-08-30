import { createClient } from '@supabase/supabase-js';
// import { successNotification, errorNotification } from './sign-in'; // Adjust the path as needed


const arrayLocation = [
    { id: 0, name: "AJ Food Hub", image: "./assets/images/stalls/ajj.jpg", page: "./ajj.html" },
    { id: 1, name: "Lil's Cafeteria", image: "./assets/images/stalls/lils.jpg", page: "./lils.html" },
    { id: 2, name: "Blyth's Canteen", image: "./assets/images/stalls/blyths.jpg", page: "./blyths.html" },
    // ... add other locations
];

document.querySelectorAll('#btn_save').forEach(item => {
    item.addEventListener('click', (event) => {
        const button = event.target;
        saveLocation(button.getAttribute('data-id'), button);
    });
});

const saveLocation = async (id, button) => {
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

        let { data: saved_location, error: saved_location_error } = await supabase
            .from('saved_location')
            .select('*')
            .eq('stall_id', id)
            .eq('user_information_id', userInfoId);

        if (saved_location_error) throw new Error(`Saved location fetch error: ${saved_location_error.message}`);

        if (saved_location.length === 0) {
            const { data, error } = await supabase
                .from('saved_location')
                .insert([{ stall_id: id, user_information_id: userInfoId }])
                .select();

            if (error) throw new Error(`Save location error: ${error.message}`);

            button.textContent = 'Unsave';
            console.log(`Location ${id} saved.`);
        } else {
            const { data, error } = await supabase
                .from('saved_location')
                .delete()
                .eq('stall_id', id)
                .eq('user_information_id', userInfoId);

            if (error) throw new Error(`Unsave location error: ${error.message}`);

            button.textContent = 'Save';
            console.log(`Location ${id} unsaved.`);
        }
    } catch (error) {
        console.error('Error saving/unsaving location:', error.message);
    }
};

// const arrayLocation = [
//     "AJ Food Hub",
//     "Lil's Cafeteria",
//     "Blyth's Canteen",
//     "CED Canteen",
//     "Kofes Canteen",
//     "Grazzia's Food Services",
//     "The Brew Corp",
//     "Chirpy Snacks_hinang",
//     "Legendary TakkoYaki",
//     "Bryan's Letchon",
//     "Toily's Bubble Tea and Shawarma",
//     "Zinnia's Siomai Food Corner",
//     "Khoy's FoodHub",
//     "Boffo Food Hub",
//     "ICT Cafe Library",
//     "Honesty Corner",
//     "Seth's Treat",
//     "Teakoyaken",
//     "BXU Bentelog",
//     "Chirpy Snacks_nsb",
//     "SgSg"


// ]

// document.querySelectorAll('#btn_save').forEach(item => {
//     item.addEventListener('click', () => {
//         saveLocation(item.getAttribute('data-id'))
//     })
// })

// const saveLocation = async (id) => {
//     // Get user information id
//     let { data: user_information, error: user_information_error } = await supabase
//     .from('user_information')
//     .select('*')
//     .eq('user_id', localStorage.getItem("user_id"));

//     // Check if the saved location is already in table
//     let { data: saved_location, error: saved_location_error } = await supabase
//     .from('saved_location')
//     .select('*')
//     .eq('stall_id', id)
//     .eq('user_information_id', user_information[0].id);

//     if(saved_location.length == 0) {
//         // Supabase Insert
//         const { data, error } = await supabase
//             .from('saved_location')
//             .upsert(
//                 [{ stall_id: id, user_information_id: user_information[0].id }]
//             )
//             .select();
//     }
// }



const supabaseUrl = 'https://ywbofunoxucgnaxxbaqo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3Ym9mdW5veHVjZ25heHhiYXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4ODUyODksImV4cCI6MjAyODQ2MTI4OX0.P4Pqc-d2rvXbDUW7djSfCrQDc4SkV9fsPCAPmzA_-5Q';
const supabase = createClient(supabaseUrl, supabaseKey);

// // Function to fetch and display saved stalls
// const displaySavedStalls = async () => {
//     try {
//         // Fetch saved stalls from Supabase
//         const { data, error } = await supabase.from('saved_location').select('*');
//         if (error) {
//             throw error;
//         }

//         // Display saved stalls on the page
//         console.log(data); // For debugging, replace with actual display logic
//     } catch (error) {
//         console.error('Error fetching saved stalls:', error.message);
//     }
// };

// // Define handleSaveClick function
// const handleSaveClick = (event) => {
//     event.preventDefault();
//     const stallId = event.target.dataset.stallId;
//     const message = `Stall ${stallId} saved!`;
//     alert(message);
//     localStorage.setItem('savedMessage', message);
// };

// // Event listener for the "Save" button click
// document.addEventListener('click', async (event) => {
//     if (event.target.classList.contains('save-btn')) {
//         // Get the stall ID from the data attribute
//         const stallId = event.target.dataset.stallId;

//         // Perform action when "Save" button is clicked
//         // For example, save the stall ID to localStorage
//         localStorage.setItem('savedStallId', stallId);

//         // Fetch and display saved stalls
//         await displaySavedStalls();
//     }
// });

