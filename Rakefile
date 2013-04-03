desc 'create new post'
task :post do
  require 'date'
  content = <<EOF
---
layout: posts
title: 
published: true
tags: 
---
EOF
  print 'title: '
  title = STDIN.gets.strip

  filepath = "_posts/#{Date.today.to_s}-#{title}.md"

  raise "#{filepath} is exists" if File.exist?(filepath)

  File.write(filepath, content)
  puts "create #{filepath}"
end
