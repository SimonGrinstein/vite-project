import { NavLink } from "react-router-dom";
import styles from './header.module.css'

export default function Header() {

  return (
    <header className={styles.header}>
      <NavLink className={({ isActive }) => (isActive ? styles.linkActive : '')} to={"/"}>Home</NavLink>
      <NavLink className={({ isActive }) => (isActive ? styles.linkActive : '')} to={"weather"}>Weather</NavLink>
    </header >
  )
}
