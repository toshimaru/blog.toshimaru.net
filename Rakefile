desc 'Clone blog repository to _deploy directory and checkout gh-pages branch'
task :setup do
  sh 'rm -rf  _deploy'
  sh 'git clone git@github.com:toshimaru/blog.toshimaru.net.git _deploy'
  cd '_deploy' do
    sh 'git checkout gh-pages'
  end
end

desc 'deploy static pages to gh-pages'
task :deploy do
  sh 'bundle exec jekyll build'
  sh 'rm -rf _deploy/*'
  sh 'cp -R _site/* _deploy'
  cd '_deploy' do
    sh 'git add -A'
    sh 'git commit -v'
    sh 'git push origin gh-pages'
  end
end

desc 'deploy static pages to gh-pages automatically via Travis-CI'
task :autodeploy do
  sh 'bundle exec jekyll build'
  sh 'rm -rf _deploy/*'
  sh 'cp -R _site/* _deploy'
  cd '_deploy' do
    sh 'git add -A'
    sh 'git commit -m "Update"'
    # sh 'git push origin gh-pages'
    sh 'git push --quiet https://$GH_TOKEN@github.com/toshimaru/blog.toshimaru.net.git gh-pages 2> /dev/null'
  end
end

desc 'create new post'
task :post do
  require 'date'
  content = <<EOF
---
layout: post
title:
published: true
image: /images/posts/
description:
tags:
---
EOF
  print 'title: '
  title = STDIN.gets.strip

  if title.empty?
    puts 'The title is empty!'
    return
  end

  filepath = "_posts/#{Date.today.to_s}-#{title}.md"

  raise "#{filepath} is exists" if File.exist?(filepath)

  File.write(filepath, content)
  puts "create #{filepath}"
end

desc 'run dev server'
task :serve do
  sh 'bundle exec jekyll serve --watch'
end

def alias_task(tasks)
  tasks.each do |new_name, old_name|
    task new_name, [*Rake.application[old_name].arg_names] => [old_name]
  end
end

alias_task [
  [:new, :post],
  [:server, :serve]
]
