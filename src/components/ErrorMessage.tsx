interface Props {
  errorMessage: string;
}

export default function ErrorMessage(props: Props) {
  return (
    <p className="text-center my-10 text-red-500">{props.errorMessage}</p>
  );
}
