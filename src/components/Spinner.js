import SpinnerGif from '../img/spinner.gif';

export default function Spinner() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <img src={SpinnerGif} alt="spinner" width={100} height={100} className="w-10 h-10" />
    </div>
  );
}
