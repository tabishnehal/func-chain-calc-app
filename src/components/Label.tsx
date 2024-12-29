interface LabelProps {
  labelText: string;
  className?: string;
}

const Label = ({ labelText, className }: LabelProps) => {
  return (
    <label className={`flex justify-center items-center ${className}`}>
      {labelText}
    </label>
  );
};

export default Label;
