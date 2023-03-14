# -*- encoding: utf-8 -*-
# stub: jekyll-multiple-languages-plugin 1.8.0 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-multiple-languages-plugin".freeze
  s.version = "1.8.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Martin Kurtsson".freeze, "Yonatan Miller".freeze]
  s.date = "2022-01-20"
  s.description = "Plugin for Jekyll 2.x and 3.x that adds support for translated keys, templates and posts.".freeze
  s.email = ["martin.kurtsson@daresay.co".freeze, "yonatan@shushugah.com".freeze]
  s.extra_rdoc_files = ["README.md".freeze, "LICENSE.txt".freeze]
  s.files = ["LICENSE.txt".freeze, "README.md".freeze]
  s.homepage = "https://github.com/kurtsson/jekyll-multiple-languages-plugin/".freeze
  s.licenses = ["MIT".freeze]
  s.rdoc_options = ["--charset=UTF-8".freeze]
  s.rubygems_version = "2.7.11".freeze
  s.summary = "I18n plugin for Jekyll".freeze

  s.installed_by_version = "2.7.11" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<html-proofer>.freeze, [">= 0"])
      s.add_development_dependency(%q<rake>.freeze, [">= 12.3.3"])
      s.add_runtime_dependency(%q<jekyll>.freeze, [">= 2.0", "< 5.0"])
    else
      s.add_dependency(%q<html-proofer>.freeze, [">= 0"])
      s.add_dependency(%q<rake>.freeze, [">= 12.3.3"])
      s.add_dependency(%q<jekyll>.freeze, [">= 2.0", "< 5.0"])
    end
  else
    s.add_dependency(%q<html-proofer>.freeze, [">= 0"])
    s.add_dependency(%q<rake>.freeze, [">= 12.3.3"])
    s.add_dependency(%q<jekyll>.freeze, [">= 2.0", "< 5.0"])
  end
end
