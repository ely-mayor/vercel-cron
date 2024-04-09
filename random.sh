#!/bin/bash

# Define characters for generating random text
characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

# Function to generate random text
generate_random_text() {
    # Initialize an empty string to store the random text
    random_text=''

    # Generate random text of length 32
    for i in {1..32}; do
        # Select a random character from the defined characters
        characters_length=${#characters}
        random_index=$((RANDOM % characters_length))
        random_character=${characters:$random_index:1}
        # Append the random character to the random text
        random_text+=$random_character
    done
    
    # Print the generated random text
    echo "$random_text"
}

# Call the function to generate random text
generate_random_text
