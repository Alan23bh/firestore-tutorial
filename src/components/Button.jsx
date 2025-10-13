export const CustomButton = (props) => {
  return (
    <button style={{ borderColor: props.borderColor }}>{props.label}</button>
  );
};
