import React, { useRef } from 'react';

const Sound = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div>
      <button>Sound</button>
      <audio
        src="./sounds/高雄發大財.mp3"
        preload="metadata"
        controls={true}
        ref={audioRef}
        onDurationChange={function() {
          if (audioRef.current) {
            console.log('duration:' + audioRef.current.duration);
          }
        }}
        onTimeUpdate={function() {
          if (audioRef.current) {
            console.log('time:' + audioRef.current.currentTime);
          }
        }}
      />
    </div>
  );
};

export default Sound;
