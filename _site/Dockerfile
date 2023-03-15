FROM ruby:latest

# Install required packages
RUN apt-get update && \
    apt-get install -y --force-yes build-essential nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

COPY Gemfile ./
RUN gem update --system 3.3.3 && \
    gem install bundler -v 2.2.28 && \
    bundle config build.nokogiri --use-system-libraries && \
    bundle install --jobs $(nproc) --retry 3

# Expose port 4000
EXPOSE 4000

# Start the application
CMD ["bundle", "exec", "jekyll", "serve", "--host=0.0.0.0"]