'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { videos } from '../video/libs/videos'; // adjust path if needed

export default function VideoGallery() {
  useEffect(() => {
    Fancybox.bind('[data-fancybox="youtube"]', {});
    return () => Fancybox.destroy();
  }, []);

  // ONLY return the grid — no section, no container.
  return (
    <div className="video-grid">
      {videos.map(({ id, title }) => (
        <a
          key={id}
          data-fancybox="youtube"
          href={`https://www.youtube.com/watch?v=${id}`}
          className="gallery-container"
        >
          <div className="video-thumb-wrapper">
            <Image
              src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
              alt={title}
              width={480}
              height={360}
              className="img-responsive"
              style={{ objectFit: 'cover' }}
            />
            <div className="play-overlay">
              <div className="play-icon"></div>
            </div>
          </div>
          <p className="video-caption">{title}</p>
        </a>
      ))}
    </div>
  );
}