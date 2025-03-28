import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { marked } from "marked";
import katex from "katex";
import "katex/dist/katex.min.css";

export function BlogDetails() {
  const { language, section_name, sub_section, blog_title } = useParams();
  const [blogContent, setBlogContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(
          `/page/blogs/${language}/${section_name}/${sub_section}/${blog_title}.md`
        );
        if (!response.ok) {
          setErrorMessage("Sorry, this blog post does not exist.");
          setBlogContent("");
          return;
        }

        let data = await response.text();
        if (data[0] === "<") {
          setErrorMessage("Sorry, this blog post does not exist.");
          setBlogContent("");
          return;
        }

        // Convert Markdown to HTML
        let htmlContent = marked.parse(data);
        
        // Process image paths
        htmlContent = htmlContent.replace(
          /<img src="([^"]*)"/g, 
          `<img src="/page/blogs/${language}/${section_name}/${sub_section}/$1"`
        );
        
        setBlogContent(htmlContent);
        setErrorMessage("");
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      }
    };

    fetchBlogData();
  }, [language, section_name, sub_section, blog_title]);

  useEffect(() => {
    if (blogContent) {
      // Use MutationObserver to handle dynamic content changes
      const observer = new MutationObserver(() => {
        renderMath();
      });

      if (contentRef.current) {
        observer.observe(contentRef.current, {
          childList: true,
          subtree: true
        });
        
        // Initial render
        renderMath();
      }

      return () => observer.disconnect();
    }
  }, [blogContent]);

  // Function to render math expressions
  const renderMath = () => {
    if (!contentRef.current) return;

    const contentElement = contentRef.current;

    // Process block equations ($$...$$)
    const paragraphs = contentElement.querySelectorAll("p");
    paragraphs.forEach((block) => {
      const text = block.textContent || block.innerText;
      const blockMatch = text.match(/^\$\$(.*?)\$\$$/s);
      if (blockMatch) {
        try {
          const html = katex.renderToString(blockMatch[1], {
            throwOnError: false,
            displayMode: true,
          });
          block.innerHTML = html;
        } catch (err) {
          console.error("KaTeX block error:", err);
        }
      }
    });

    // Process inline equations ($...$)
    const inlineElements = contentElement.querySelectorAll("p, span, li, h1, h2, h3, h4, h5, h6");
    inlineElements.forEach((el) => {
      const text = el.textContent || el.innerText;
      if (text.includes("$")) {
        try {
          el.innerHTML = text.replace(/\$(.*?)\$/g, (_, equation) => {
            try {
              return katex.renderToString(equation, {
                throwOnError: false,
                displayMode: false,
              });
            } catch (err) {
              console.error("KaTeX inline error:", err);
              return `$${equation}$`;
            }
          });
        } catch (err) {
          console.error("KaTeX processing error:", err);
        }
      }
    });
  };

  return (
    <div className="container container-blog m-4 m-lg-5">
      {errorMessage ? (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      ) : (
        <div ref={contentRef} dangerouslySetInnerHTML={{ __html: blogContent }} />
      )}
    </div>
  );
}