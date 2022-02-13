export default function getImage(image: string, size: string = 'w500'): string {
  return `https://image.tmdb.org/t/p/${size}/${image}`;
}
