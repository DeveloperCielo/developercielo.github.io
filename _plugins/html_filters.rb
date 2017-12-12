module Jekyll
    class CleanHtmlConverter < Converter
      priority :high

      def matches(ext)
        ext.downcase == ".md"
      end

      def convert(content)
        content.gsub(/\n(<br>){1,}/i, '').gsub(/(<br>){1,}/i, '<br>').gsub(/<(?!(\/?(span|aside|br)))[^>]*>/, "")
      end

      def output_ext(ext)
          ".html"
      end
    end
end
