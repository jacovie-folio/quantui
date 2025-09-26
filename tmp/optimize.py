#!/usr/bin/env python3
"""
Music Analysis Pipeline: Source Separation + MIDI Transcription

This script takes an audio file, separates it into stems using Demucs,
then transcribes each stem to MIDI using audio-to-midi (Python 3.13 compatible).

Requirements:
pip install demucs audio-to-midi librosa soundfile

Usage:
python music_pipeline.py path/to/song.mp3
"""

import os
import sys
import argparse
from pathlib import Path
import librosa
import soundfile as sf
import subprocess
import tempfile
import shutil

try:
    from audio_to_midi.monophonic import wave_to_midi
    TRANSCRIPTION_METHOD = "audio_to_midi"
except ImportError:
    try:
        from basic_pitch.inference import predict
        TRANSCRIPTION_METHOD = "basic_pitch"
    except ImportError:
        print("Neither audio-to-midi nor basic-pitch available!")
        print("Install one of: pip install audio-to-midi OR pip install basic-pitch")
        sys.exit(1)


def separate_audio(input_file, output_dir):
    """
    Use Demucs to separate audio into stems.
    Returns dict with paths to separated stems.
    """
    print(f"Separating audio: {input_file}")

    # Run demucs command
    cmd = [
        "python", "-m", "demucs.separate",
        "--two-stems=vocals",  # This gives vocals + accompaniment
        "-o", str(output_dir),
        str(input_file)
    ]

    try:
        subprocess.run(cmd, check=True, capture_output=True, text=True)
    except subprocess.CalledProcessError as e:
        print(f"Demucs separation failed: {e}")
        print(f"Error output: {e.stderr}")
        raise

    # Find the output files
    # Demucs creates: output_dir/htdemucs/filename/vocals.wav and no_vocals.wav
    song_name = Path(input_file).stem
    stems_dir = output_dir / "htdemucs" / song_name

    stems = {}
    if (stems_dir / "vocals.wav").exists():
        stems["vocals"] = stems_dir / "vocals.wav"
    if (stems_dir / "no_vocals.wav").exists():
        stems["accompaniment"] = stems_dir / "no_vocals.wav"

    return stems


def separate_audio_4stems(input_file, output_dir):
    """
    Use Demucs to separate audio into 4 stems (vocals, drums, bass, other).
    Returns dict with paths to separated stems.
    """
    print(f"Separating audio into 4 stems: {input_file}")

    # Run demucs command for 4-stem separation
    cmd = [
        "python", "-m", "demucs.separate",
        "-o", str(output_dir),
        str(input_file)
    ]

    try:
        subprocess.run(cmd, check=True, capture_output=True, text=True)
    except subprocess.CalledProcessError as e:
        print(f"Demucs separation failed: {e}")
        print(f"Error output: {e.stderr}")
        raise

    # Find the output files
    # Demucs creates: output_dir/htdemucs/filename/{vocals,drums,bass,other}.wav
    song_name = Path(input_file).stem
    stems_dir = output_dir / "htdemucs" / song_name

    stems = {}
    for stem_name in ["vocals", "drums", "bass", "other"]:
        stem_path = stems_dir / f"{stem_name}.wav"
        if stem_path.exists():
            stems[stem_name] = stem_path

    return stems


def transcribe_to_midi(audio_file, output_dir):
    """
    Transcribe audio to MIDI using available library.
    Returns path to generated MIDI file.
    """
    print(f"Transcribing to MIDI using {TRANSCRIPTION_METHOD}: {audio_file}")

    try:
        stem_name = Path(audio_file).stem
        midi_path = output_dir / f"{stem_name}.mid"

        if TRANSCRIPTION_METHOD == "audio_to_midi":
            # Simple monophonic transcription
            wave_to_midi(str(audio_file), str(midi_path))

        elif TRANSCRIPTION_METHOD == "basic_pitch":
            # More advanced polyphonic transcription
            audio, sr = librosa.load(audio_file, sr=22050, mono=True)
            model_output, midi_data, note_events = predict(audio)
            midi_data.write(str(midi_path))

        print(f"MIDI saved: {midi_path}")
        return midi_path

    except Exception as e:
        print(f"MIDI transcription failed for {audio_file}: {e}")
        return None


def process_song(input_file, output_base_dir, use_4stems=True):
    """
    Complete pipeline: separate audio and transcribe each stem to MIDI.
    """
    input_path = Path(input_file)
    if not input_path.exists():
        raise FileNotFoundError(f"Input file not found: {input_file}")

    # Create output directory
    song_name = input_path.stem
    output_dir = Path(output_base_dir) / song_name
    output_dir.mkdir(parents=True, exist_ok=True)

    # Temporary directory for Demucs output
    with tempfile.TemporaryDirectory() as temp_dir:
        temp_path = Path(temp_dir)

        # Step 1: Separate audio
        if use_4stems:
            stems = separate_audio_4stems(input_file, temp_path)
        else:
            stems = separate_audio(input_file, temp_path)

        if not stems:
            print("No stems were generated!")
            return

        print(f"Generated {len(stems)} stems: {list(stems.keys())}")

        # Step 2: Copy stems to output directory
        stems_dir = output_dir / "stems"
        stems_dir.mkdir(exist_ok=True)

        final_stems = {}
        for stem_name, stem_path in stems.items():
            final_path = stems_dir / f"{stem_name}.wav"
            shutil.copy2(stem_path, final_path)
            final_stems[stem_name] = final_path

        # Step 3: Transcribe each stem to MIDI
        midi_dir = output_dir / "midi"
        midi_dir.mkdir(exist_ok=True)

        midi_files = {}
        for stem_name, stem_path in final_stems.items():
            midi_path = transcribe_to_midi(stem_path, midi_dir)
            if midi_path:
                midi_files[stem_name] = midi_path

        print(f"\nProcessing complete!")
        print(f"Output directory: {output_dir}")
        print(f"Stems: {list(final_stems.keys())}")
        print(f"MIDI files: {list(midi_files.keys())}")

        return {
            "output_dir": output_dir,
            "stems": final_stems,
            "midi_files": midi_files
        }


def main():
    parser = argparse.ArgumentParser(description="Music Analysis Pipeline")
    parser.add_argument("input_file", help="Path to input audio file")
    parser.add_argument("-o", "--output", default="./output",
                        help="Output directory (default: ./output)")
    parser.add_argument("--two-stems", action="store_true",
                        help="Use 2-stem separation (vocals/accompaniment) instead of 4-stem")

    args = parser.parse_args()

    try:
        result = process_song(
            args.input_file,
            args.output,
            use_4stems=not args.two_stems
        )

        if result:
            print(f"\nSuccess! Check {result['output_dir']} for results.")

    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
