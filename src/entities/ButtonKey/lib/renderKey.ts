import classes from "../ui/styles.module.scss";

export function renderKey(setType: string) {
  function setDefaultStyle(setType: string){
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
      case "enter":
        return `${classes.sys_default} ${classes.enter}`;
      case "delete":
        return `${classes.sys_default} ${classes.delete}`;
      case "shift-left":
        return `${classes.sys_default} ${classes.shift}`;
      case "shift-right":
        return `${classes.sys_default} ${classes.shift}`;
      case "tab":
        return `${classes.sys_default} ${classes.tab} ${classes.sys_left}`;
      case "caps":
        return `${classes.sys_default} ${classes.caps} ${classes.sys_left}`;
      case "space":
        return `${classes.sys_default} ${classes.space}`;
      case "fn": 
        return `${classes.sys_default} ${classes.fn}`;
      case "command": 
        return `${classes.sys_default} ${classes.command}`;
      case "option":
        return `${classes.sys_default} ${classes.option}`;
      case "control":
        return `${classes.sys_default} ${classes.option}`;
      case "arrow-left":
        return `${classes.default} ${classes.arrow_full}`;
      case "arrow-right":
        return `${classes.default} ${classes.arrow_full}`;
      case "arrow-top": 
        return `${classes.default} ${classes.arrow_half}`;
      case "arrow-bottom": 
        return `${classes.default} ${classes.arrow_half}`;
      default: 
        return "";
    }
  }

  let style = setDefaultStyle(setType)

  return style
}
