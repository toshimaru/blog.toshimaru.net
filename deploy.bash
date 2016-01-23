#!/bin/bash
if [[ $TRAVIS_BRANCH == "master" ]]; then
  bundle exec rake autodeploy
else
  echo 'no deploy'
fi
