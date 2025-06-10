import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from 'prismjs';
import "prismjs/components/prism-jsx";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import './App.css';
import Markdown from 'react-markdown';

function App() {
  const [code, setCode] = useState([]);
  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post('https://codesage-backend-o6g2.onrender.com/ai/get-review', { code });
    setReview(response.data);
  }

  return (
    <>
      <header className="app-header">
        <h1>🧙‍♂️ Code Sage</h1>
        <p>Your AI-Powered Code Reviewer</p>
      </header>
      <main>
        <div className="left">
          <div className="code-editor-wrapper">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={12}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                minHeight: "100%",
                outline: "none"
              }}
            />
          </div>
          <button onClick={reviewCode} className="review-btn">💡 Review Code</button>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
