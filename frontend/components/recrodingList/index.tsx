import tw from "twin.macro";
import useRecordingsList from "../../hooks/use-recordings-list";
import { RecordingsListProps } from "../../types/recorder";
import { Wave } from "@foobar404/wave";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function RecordingsList({
  recordings,
}: {
  recordings: any;
}) {

  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const recording = recordings.length > 0 ? recordings[0] : null;

  useEffect(() => {
    if (audioRef.current && canvasRef.current) {
      let wave = new Wave(audioRef.current, canvasRef.current);
      wave.addAnimation(new wave.animations.Wave());
    }
  }, [recording]);

  return (
    <div tw="flex flex-col space-y-2">
      {recording && <h1>Your recordings</h1>}
      {recording && <audio controls src={recording.audio} ref={audioRef} />}
      {recording && <canvas ref={canvasRef}></canvas>}
      {!recording && <div tw="">You don't have records</div>}
    </div>
  );
}
