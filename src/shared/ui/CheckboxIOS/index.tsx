import styles from "./styles.module.scss";

interface ICheckboxProps {
  checked: boolean;
  onClick: React.MouseEventHandler<HTMLInputElement>;
}

const Checkbox = ({ checked, onClick }: ICheckboxProps) => {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onClick={onClick}
      />
      <span className={styles.label}></span>
    </label>
  );
};

export default Checkbox;
