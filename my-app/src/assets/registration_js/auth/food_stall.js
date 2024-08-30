import { supabase, successNotification, errorNotification } from "../sign-in";

const userId = 'your-user-id'; // Replace this with the actual user ID from your authentication logic

async function saveLocation(locationId, locationName, locationDescription) {
    const { data, error } = await supabase
        .from('saved_location')
        .insert([
            {
                name: locationName,
                description: locationDescription,
                saved_by_user: userId,
                id: locationId
            }
        ]);

    if (error) {
        console.error('Error saving location:', error);
        alert('Failed to save location!');
        return;
    }

    alert('Location saved successfully!');
}

// Add event listeners to your save buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-save-location').forEach(button => {
        button.addEventListener('click', () => {
            const locationId = button.dataset.locationId;
            const locationName = button.dataset.locationName;
            const locationDescription = button.dataset.locationDescription;
            saveLocation(locationId, locationName, locationDescription);
        });
    });
});