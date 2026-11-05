import DOMPurify from 'dompurify';

// Every place that renders HTML (blog posts, admin-editable page text, chatbot)
// must go through this. It strips scripts, event handlers (onerror=...), javascript: URLs,
// iframes, forms, etc., so a compromised admin account or bad DB row can't run code in visitors' browsers.

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A') {
    if (node.getAttribute('target') === '_blank') node.setAttribute('rel', 'noopener noreferrer');
  }
});

const CONFIG = {
  USE_PROFILES: { html: true },
  FORBID_TAGS: ['style', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'textarea', 'select', 'link', 'meta', 'base'],
  FORBID_ATTR: ['srcdoc', 'formaction'],
  ADD_ATTR: ['target'],
};

export function sanitizeHtml(html) {
  return DOMPurify.sanitize(typeof html === 'string' ? html : '', CONFIG);
}
