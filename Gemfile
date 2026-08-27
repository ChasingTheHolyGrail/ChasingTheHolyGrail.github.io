source "https://rubygems.org"

gem "jekyll", "~> 4.3"
gem "jekyll-feed", "~> 0.15"
gem "jekyll-sitemap", "~> 1.4"

# Ruby 3.4 no longer ships bigdecimal as a default gem.
gem "bigdecimal"

# Avoid sass-embedded/google-protobuf on Windows. WDAC blocks protobuf_c.so
# (error 4551), which prevents Jekyll from starting.
gem "jekyll-sass-converter", "~> 2.2"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance and authoring
# wdm gem removed - not compatible with Ruby 3.4, optional for Jekyll
# gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
