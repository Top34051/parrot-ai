import { useState, useEffect } from "react";
import { deleteAudio, clearAudio } from "../handlers/recordings-list";
import { Audio } from "../types/recorder";
import { v4 as uuid } from "uuid";

export default function useRecordingsList(audio: string | null) {
  const [recordings, setRecordings] = useState<Audio[]>([]);

  useEffect(() => {
    if (audio)
      setRecordings((prevState: Audio[]) => {
        return [...prevState, { key: uuid(), audio }];
      });
  }, [audio]);

  return {
    recordings,
    deleteAudio: (audioKey: string) => deleteAudio(audioKey, setRecordings),
    clearAudio: () => clearAudio(setRecordings),
  };
}
