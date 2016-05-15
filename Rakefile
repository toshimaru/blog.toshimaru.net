REPOSITORY =
  if ENV['GH_TOKEN']
    'https://$GH_TOKEN@github.com/toshimaru/blog.toshimaru.net.git'
  else
    'git@github.com:toshimaru/blog.toshimaru.net.git'
  end

define_method(:build_jekyll_pages) { sh 'bundle exec jekyll build' }
define_method(:cleanup_deploy_dir) { sh 'rm -rf _deploy/*' }
define_method(:put_pages_into_deploy_dir) { sh 'cp -R _site/* _deploy' }

desc 'Clone blog repository to _deploy directory and checkout gh-pages branch'
task :setup do
  sh 'rm -rf  _deploy'
  sh "git clone #{REPOSITORY} _deploy"
  cd('_deploy') { sh 'git checkout gh-pages' }
end

desc 'deploy static pages to gh-pages'
task :deploy do
  cd('_deploy') { sh 'git pull origin gh-pages' }

  build_jekyll_pages
  cleanup_deploy_dir
  put_pages_into_deploy_dir
  cd '_deploy' do
    sh 'git add -A'
    sh 'git commit -v'
    sh 'git push origin gh-pages'
  end
end

desc 'deploy static pages to gh-pages automatically via Travis-CI'
task :autodeploy do
  build_jekyll_pages
  cleanup_deploy_dir
  put_pages_into_deploy_dir
  cd '_deploy' do
    sh 'git add -A'
    sh 'git commit -m "Update via Travis"'
    sh "git push --quiet #{REPOSITORY} gh-pages 2> /dev/null"
  end
end
