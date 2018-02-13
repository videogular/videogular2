# Credits of this bash script: https://github.com/steveklabnik/automatically_update_github_pages_with_travis_example
#!/usr/bin/env bash

set -o errexit -o nounset

if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master! No deploy!"
  exit 0
fi

rev=$(git rev-parse --short HEAD)

cd docs
mv _book dist/docs
cd dist

git init
git config user.name "Raul Jimenez"
git config user.email "elecash@gmail.com"

git remote add upstream "https://$GH_TOKEN@github.com/videogular/videogular2.git"
git fetch upstream
git reset upstream/gh-pages

# echo "your-custom-domain.com" > CNAME

touch .

git add -A .
git commit -m "ci(GH-Pages): Rebuild pages at ${rev}"
git push -q upstream HEAD:gh-pages
