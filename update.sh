#!/bin/bash

# Lägg till alla filer
git add .
echo "Filer tillagda till staging"

# Commit ändringar
echo "Ange commit meddelande:"
read commit_msg
git commit -m "$commit_msg"
echo "$commit_msg committad"

# Pusha till GitHub
git push
echo "Kod pushad till GitHub"

echo "Klart! Dina ändringar är nu på GitHub"
echo "Tryck på Enter för att avsluta..."
read 