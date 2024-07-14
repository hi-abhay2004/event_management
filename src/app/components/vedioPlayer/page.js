// components/VideoPlayer.js
import React from 'react';
import styles from './vedioPlayer.module.css';
// import event from '@/app/videos/event.mp4'

const VideoPlayer = () => {
    return (
        <>
        <div className={styles.videoContainer}>
          <video className={styles.video} autoPlay loop muted >
            <source src="/videos/CEvents.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* <div>
            <iframe width="560" height="315" 
            src="https://www.youtube.com/embed/f_ZxgQQ74Lc?si=g4roDahUIZ5yluRs"
             title="YouTube video player" 
             frameborder="0" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
             referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen></iframe>
        </div> */}
        </>
    );
};

export default VideoPlayer;
