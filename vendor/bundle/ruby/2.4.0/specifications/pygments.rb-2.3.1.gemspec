# -*- encoding: utf-8 -*-
# stub: pygments.rb 2.3.1 ruby lib

Gem::Specification.new do |s|
  s.name = "pygments.rb".freeze
  s.version = "2.3.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "bug_tracker_uri" => "https://github.com/pygments/pygments.rb/issues", "changelog_uri" => "https://github.com/pygments/pygments.rb/blob/master/CHANGELOG.adoc", "documentation_uri" => "https://www.rubydoc.info/gems/pygments.rb", "homepage_uri" => "https://github.com/pygments/pygments.rb", "source_code_uri" => "https://github.com/pygments/pygments.rb" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Aman Gupta".freeze, "Ted Nyman".freeze, "Marat Radchenko".freeze]
  s.date = "2022-12-04"
  s.description = "pygments.rb is a Ruby wrapper for Pygments syntax highlighter".freeze
  s.email = ["marat@slonopotamus.org".freeze]
  s.homepage = "https://github.com/pygments/pygments.rb".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.3.0".freeze)
  s.rubygems_version = "2.7.11".freeze
  s.summary = "pygments wrapper for ruby".freeze

  s.installed_by_version = "2.7.11" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<rake>.freeze, ["~> 13.0.0"])
      s.add_development_dependency(%q<rubocop>.freeze, ["~> 0.81.0"])
      s.add_development_dependency(%q<test-unit>.freeze, ["~> 3.5.0"])
    else
      s.add_dependency(%q<rake>.freeze, ["~> 13.0.0"])
      s.add_dependency(%q<rubocop>.freeze, ["~> 0.81.0"])
      s.add_dependency(%q<test-unit>.freeze, ["~> 3.5.0"])
    end
  else
    s.add_dependency(%q<rake>.freeze, ["~> 13.0.0"])
    s.add_dependency(%q<rubocop>.freeze, ["~> 0.81.0"])
    s.add_dependency(%q<test-unit>.freeze, ["~> 3.5.0"])
  end
end
