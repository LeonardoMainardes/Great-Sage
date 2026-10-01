import { invoke } from "@tauri-apps/api/core";
import { AudioDataTypes } from "./audio-data";

export class CompletedAudioProcessor {
  async process(completedChunk: AudioDataTypes) {
    let uint8Array = new Uint8Array(
      completedChunk.data.buffer,
      completedChunk.data.byteOffset,
      completedChunk.data.byteLength,
    );

    const audioPayload = {
      sample_rate: completedChunk.sample_rate,
      channels: completedChunk.channels,
      data: uint8Array,
    };

    const response = await invoke("receive_audio", { payload: audioPayload });

    return response;
  }
}
