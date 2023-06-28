import styles from "./styles.module.scss"

type Props = {
    placeholder: string,
    children: React.ReactNode
}

export const ConfigSection = (props: Props) => {
    return(
        <div className={styles.settings_section}>
            <p>{props.placeholder}</p>
            {props.children}
        </div>
    )
}