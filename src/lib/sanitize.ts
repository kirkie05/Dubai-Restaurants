import DOMPurify from 'isomorphic-dompurify';

export function sanitize(htmlOrText: string): string {
  return DOMPurify.sanitize(htmlOrText, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
}
