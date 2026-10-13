import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { localizeUrl } from './content.js';
import { SmartImage, slug } from './ui.jsx';

export default function MarkdownContent({ children, className = '' }) {
  return <div className={`markdown-content ${className}`}><ReactMarkdown remarkPlugins={[remarkGfm]} components={{
    a: ({href, children}) => <a href={localizeUrl(href)}>{children}</a>,
    img: ({src, alt}) => <SmartImage src={src} alt={alt || 'HYtalent learning session'} />,
    h2: ({children}) => <h2 id={slug(children)}>{children}</h2>,
    h3: ({children}) => <h3 id={slug(children)}>{children}</h3>,
  }}>{children}</ReactMarkdown></div>;
}
