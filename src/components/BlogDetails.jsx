import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export function BlogDetails() {
  let { section_name, blog_title } = useParams();
  const [blogContent, setBlogContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`/page/blogs/${section_name}/${blog_title}.md`); // Updated path
        if (!response.ok) {
          setErrorMessage('Sorry, this blog post does not exist.');
          setBlogContent('');
          return;
        }
        const data = await response.text();
        if (data[0] === '<') {
          setErrorMessage('Sorry, this blog post does not exist.');
          setBlogContent('');
          return;
        }
  
        const htmlContent = marked(data, {
          renderer: new marked.Renderer(),
          highlight: function(code, lang) {
            return SyntaxHighlighter.highlight(code, lang);
          }
        });
        setBlogContent(htmlContent);
        setErrorMessage('');
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      }
    };
  
    fetchBlogData();
  }, [section_name, blog_title]);

  return (
    <div className="container container-blog m-4 m-lg-5">
      {errorMessage ? (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: blogContent }} />
      )}
    </div>
  );
}
