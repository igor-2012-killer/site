import { useEffect } from 'react';
import { useRouter } from 'next/router';
import HeartGallery from '../components/HeartGallery';

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('accessGranted') !== 'true') {
      router.push('/');
    }
  }, []);

  const mediaItems = [
    { type: 'image', src: '/media/photo1.jpg' },
    { type: 'image', src: '/media/photo1.jpg' },
    { type: 'image', src: '/media/photo1.jpg' },
    { type: 'image', src: '/media/photo1.jpg' },
    { type: 'image', src: '/media/photo1.jpg' },
    { type: 'image', src: '/media/photo2.png' },
    { type: 'image', src: '/media/photo2.png' },
    { type: 'image', src: '/media/photo2.png' },
    { type: 'image', src: '/media/photo2.png' },
    { type: 'image', src: '/media/photo2.png' },
        { type: 'image', src: '/media/photo1.jpg' },
    { type: 'image', src: '/media/photo1.jpg' },
    { type: 'image', src: '/media/photo1.jpg' },
    { type: 'image', src: '/media/photo1.jpg' },
    { type: 'image', src: '/media/photo1.jpg' },
    { type: 'image', src: '/media/photo2.png' },
    { type: 'image', src: '/media/photo2.png' },
    { type: 'image', src: '/media/photo2.png' },
    { type: 'image', src: '/media/photo2.png' },
    { type: 'image', src: '/media/photo2.png' },
        { type: 'image', src: '/media/photo1.jpg' },
    { type: 'image', src: '/media/photo1.jpg' },
    { type: 'image', src: '/media/photo1.jpg' },
    { type: 'image', src: '/media/photo1.jpg' },
    { type: 'image', src: '/media/photo1.jpg' },
    { type: 'image', src: '/media/photo2.png' },
    { type: 'image', src: '/media/photo2.png' },
    { type: 'image', src: '/media/photo2.png' },
    { type: 'image', src: '/media/photo1.jpg' },
    { type: 'image', src: '/media/photo1.jpg' },
    { type: 'image', src: '/media/photo2.png' },
    { type: 'image', src: '/media/photo2.png' },
  ];

  return (
    <HeartGallery items={mediaItems} />
  );
}
