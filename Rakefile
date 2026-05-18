require 'fileutils'

ROOT = __dir__
BUILD = File.join(ROOT, 'build')

# Paths synced from build/ to repo root for GitHub Pages
PUBLISH_PATHS = %w[
  index.html
  app
  stylesheets
  javascripts
  images
  google07b2ea5a3ff58635.html
  first-contributions
].freeze

desc 'Build the Middleman site'
task :build do
  sh 'bundle exec middleman build'
end

desc 'Build and copy static output to repository root (GitHub Pages)'
task publish: :build do
  PUBLISH_PATHS.each do |item|
    src = File.join(BUILD, item)
    dest = File.join(ROOT, item)

    unless File.exist?(src)
      warn "skip (not in build): #{item}"
      next
    end

    FileUtils.rm_rf(dest)
    if File.directory?(src)
      FileUtils.cp_r(src, dest)
    else
      FileUtils.mkdir_p(File.dirname(dest))
      FileUtils.cp(src, dest)
    end
  end

  # Legacy paths from the old setup
  FileUtils.rm_rf(File.join(ROOT, 'javascripts'))
  FileUtils.rm_rf(File.join(ROOT, 'google07b2ea5a3ff58635'))
end
