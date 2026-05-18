###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

# This will remove extentions like .html
activate :directory_indexes

# Google Search Console expects this exact .html path
page '/google07b2ea5a3ff58635.html', layout: false, directory_index: false

ignore '/code/*'

# Livereload removed — eventmachine does not build cleanly on Ruby 3.4.
# Use `middleman server` and refresh the browser manually in development.

###
# Helpers
###

helpers do
  def highlight_code(source, lexer: 'javascript')
    require 'rouge'
    lexer_class = Rouge::Lexer.find_fancy(lexer) || Rouge::Lexers::Javascript
    inner = Rouge::Formatters::HTML.new
    formatter = Rouge::Formatters::HTMLTable.new(inner, table_class: 'rouge-table')
    formatter.format(lexer_class.lex(source)).html_safe
  end

  def read_code(filename)
    path = File.join(app.root, 'source', 'code', filename)
    File.read(path)
  end
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript
end
