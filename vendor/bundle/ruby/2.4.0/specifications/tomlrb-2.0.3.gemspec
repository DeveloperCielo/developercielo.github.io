# -*- encoding: utf-8 -*-
# stub: tomlrb 2.0.3 ruby lib

Gem::Specification.new do |s|
  s.name = "tomlrb".freeze
  s.version = "2.0.3"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Francois Bernier".freeze]
  s.date = "2022-05-28"
  s.description = "A racc based toml parser".freeze
  s.email = ["frankbernier@gmail.com".freeze]
  s.homepage = "https://github.com/fbernier/tomlrb".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0".freeze)
  s.rubygems_version = "2.7.11".freeze
  s.summary = "A racc based toml parser".freeze

  s.installed_by_version = "2.7.11" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<psych>.freeze, ["~> 4"])
    else
      s.add_dependency(%q<psych>.freeze, ["~> 4"])
    end
  else
    s.add_dependency(%q<psych>.freeze, ["~> 4"])
  end
end
