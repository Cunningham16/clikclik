import classes from "../ui/styles.module.scss";

export function renderDefault(setType: string) {
  switch (setType) {
    case "1":
      return classes.default;
    case "1.1":
      return classes.default;
    case "3":
      return classes.default;
    case "4":
      return classes.default;
    case "5":
      return classes.default;
    case "sys enter":
      return `${classes.sys_default} ${classes.enter}`;
    case "sys backspace":
      return `${classes.sys_default} ${classes.backspace}`;
    case "sys shift":
      return `${classes.sys_default} ${classes.shift}`;
    case "sys tab":
      return `${classes.sys_default} ${classes.tab} ${classes.sys_left}`;
    case "sys caps":
      return `${classes.sys_default} ${classes.caps} ${classes.sys_left}`;
    case "sys space":
      return `${classes.sys_default} ${classes.space}`;
    default: 
      return "";
  }
}
