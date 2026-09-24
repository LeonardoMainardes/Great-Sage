interface ResponseProps {
  text: string;
}

const Response = ({ text }: ResponseProps) => {
  return <div>{text}</div>;
};

export default Response;
