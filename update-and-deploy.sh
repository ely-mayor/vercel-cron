#!/bin/bash


# Set the URL of your API endpoint
API_URL="https://r2-api.mayor.workers.dev/working.txt"

# Generate random text
random_text=$(generate_random_text)


if [ -z "$MY_KEY" ]; then
  echo "Error: MY_KEY is empty"
  exit 1
fi

set -e

# Function to generate random text
generate_random_text() {
    # Define characters for generating random text
    characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    
    # Initialize an empty string to store the random text
    random_text=''
    
    # Generate random text of length 32
    for i in {1..32}; do
        # Select a random character from the defined characters
        random_character=${characters:$((RANDOM % ${#characters})):1}
        # Append the random character to the random text
        random_text+=$random_character
    done
    
    # Print the generated random text
    echo "$random_text"
}


# Save random text to a file in /tmp directory
echo "$random_text" > /tmp/working.txt

# Perform the curl request to upload the random text
curl -X PUT \
     -H "X-Custom-Auth-Key: $MY_KEY" \
     --data-binary "@/tmp/working.txt" \
     "$API_URL"

# Cleanup: Remove the temporary file
rm /tmp/working.txt
