// Simple event-based toast for the test
export const toast = ({ title, description, variant }: { title: string; description: string; variant?: 'destructive' | 'default' }) => {
  const event = new CustomEvent('toast', { detail: { title, description, variant } });
  window.dispatchEvent(event);
};