import styles from "./styles.module.scss"

type Props = {
    placeholder: string,
    children: React.ReactNode
}

export const ConfigList = (props: Props) => {
    return(
        <div className={styles.settings_container}>
            <div className={styles.settings_header}>
              <h3>{props.placeholder}</h3>
            </div>
            {props.children}
        </div>
    )
}