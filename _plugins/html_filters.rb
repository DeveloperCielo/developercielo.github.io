module Jekyll
    class CleanHtmlConverter < Converter
      priority :high

      def matches(ext)
        ext.downcase == ".md"
      end

      def convert(content)
        content.gsub(/<(?!(\/?(span|aside)))[^>]*>/, "")
      end

      def output_ext(ext)
          ".html"
      end
    end
end
