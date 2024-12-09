#!/bin/bash

# Initiera git repository om det inte redan finns
if [ ! -d .git ]; then
    git init
    echo "Git repository initierat"
fi

# Lägg till alla filer
git add .
echo "Filer tillagda till staging"

# Commit ändringar
echo "Ange commit meddelande:"
read commit_url
git commit -m "$commit_url"
echo "$commit_url committad"

# Byt till main branch
git branch -M main
echo "Bytt till main branch"

# Fråga efter GitHub repo URL
echo "Ange din GitHub repository URL (t.ex. https://github.com/användarnamn/repo.git):"
read repo_url

# Lägg till remote
git remote add origin $repo_url
echo "Remote origin tillagd"

# Pusha till GitHub
git push -u origin main
echo "Kod pushad till GitHub"

echo "Klart! Din kod är nu på GitHub" 