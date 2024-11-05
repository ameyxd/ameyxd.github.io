export default function Page() {
    return null;
  }

export function generateStaticParams() {
  return [
    { params: [] },
    { params: [''] },
    { params: ['collection', 'posts'] },
    { params: ['collection', 'posts', 'create'] }
  ];
}