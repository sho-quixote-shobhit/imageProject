Dependencies

    React: For building the user interface.
    Chakra UI: Provides ready-made components and responsive design tools.
    Axios: For making HTTP requests to the backend.
    react-avatar-editor: Used for applying transformations (scaling, rotation) to the uploaded image.
    react-icons: Provides icon components used in buttons and UI elements.
    react-router-dom: Used for navigation to other pages like the gallery.

Functional Overview

    Upload an Image: Users can select an image file (JPEG/PNG).
    Remove Background: The selected image’s background is removed via an API call.
    Image Transformations: Users can rotate and scale the image.
    Preset Filters and Custom Prompts: Users can apply preset filters or input custom prompts.
    Download Image: Users can download the final processed image.
    Navigation to Gallery: Users can navigate to a gallery to view saved images.

State Variables

    loading: Tracks if the background removal process is ongoing.
    applyloading: Tracks if the preset application is in progress.
    selectedImage: Stores the uploaded image file.
    removedBgImage: Stores the image with the background removed (base64 format).
    rotationAngle: Stores the current rotation angle of the image.
    scale: Tracks the scaling factor of the image.
    preset: Stores the selected filter preset.
    custompreset: Stores a custom prompt input by the user.
    finalimage: Stores the generated image after applying the preset.
    themes: Stores the list of available themes fetched from the backend.

Functions

    getthemes
    Fetches the list of themes/presets from the backend API.

    handleButtonClick
    Opens the file input dialog to select an image.

    handleRemoveBackground
    Sends the selected image to the backend to remove its background.
    API Endpoint: POST /image/remove-background

    handleFileChange
    Stores the uploaded image in state (selectedImage).

    handleScaleChange
    Updates the scaling value as the user adjusts the range slider.

    handleRotateLeft / handleRotateRight
    Adjusts the rotation angle by 90 degrees left or right.

    handlePresetApply
    Applies a preset filter or custom prompt to the image using the backend API.
    API Endpoint: POST /image/apply-preset

    handleThemeSet
    Updates the selected preset theme.

    downloadImage
    Downloads the generated image using the given image URL.

Effects

    useEffect(getthemes): Fetches the themes when the component mounts.
    useEffect(handleRemoveBackground): Automatically removes the background if a new image is selected.

How to Use

    Upload Image
        Click on the "Browse Image" button or drop an image in the designated area.

    Remove Background
        Background removal is triggered automatically when an image is selected.

    Transform Image
        Use the rotate buttons to rotate the image.
        Adjust the scale slider to zoom in/out of the image.

    Apply Preset or Custom Prompt
        Choose a preset filter from the sidebar, or enter a custom prompt in the text area.
        Click "Generate Image" to apply the filter.

    Download or Navigate to Gallery
        Download the final image or navigate to the gallery page.