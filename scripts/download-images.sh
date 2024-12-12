#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p public/images

# Function to download image with error checking
download_image() {
    local url=$1
    local output=$2
    echo "Downloading $output..."
    if curl -L --fail "$url" -o "$output"; then
        echo "✓ Successfully downloaded $output"
    else
        echo "✗ Failed to download $output"
        return 1
    fi
}

# Download placeholder images
download_image "https://source.unsplash.com/800x600/?technology,digital" "public/images/reddit-ipo.jpg"
download_image "https://source.unsplash.com/800x600/?business,retail" "public/images/shein-ipo.jpg"
download_image "https://source.unsplash.com/800x600/?finance,payment" "public/images/stripe-ipo.jpg"

# Check if all images exist
for img in reddit-ipo.jpg shein-ipo.jpg stripe-ipo.jpg; do
    if [ ! -f "public/images/$img" ]; then
        echo "Error: Failed to download $img"
        exit 1
    fi
done

echo "✓ All images downloaded successfully!" 
