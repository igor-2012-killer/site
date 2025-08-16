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
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
        { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
        { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
    { type: 'video', src: '/media/ну всё тик ток отключил.mp4' },
  ];

  return (
    <HeartGallery items={mediaItems} />
  );
}
