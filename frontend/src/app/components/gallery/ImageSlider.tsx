"use client";

interface Props {
  onPrev: () => void;
  onNext: () => void;
  disablePrev: boolean;
  disableNext: boolean;
}

export default function ImageSlider({
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}: Props) {
  return (
    <>
      <button
        onClick={onPrev}
        disabled={disablePrev}
        className="absolute left-6 text-white text-4xl disabled:opacity-30 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer"
      >
        ❮
      </button>

      <button
        onClick={onNext}
        disabled={disableNext}
        className="absolute right-6 text-white text-4xl disabled:opacity-30 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer"
      >
        ❯
      </button>
    </>
  );
}
