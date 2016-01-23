#!/bin/bash
if [[ $TRAVIS_BRANCH == "master" ]]; then
  echo "Deploy to Github Page ($TRAVIS_BRANCH)"
  bundle exec rake autodeploy
else
  echo "No deploy ($TRAVIS_BRANCH)"
fi
