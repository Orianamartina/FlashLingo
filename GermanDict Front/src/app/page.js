import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import 'regenerator-runtime/runtime'
export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Learn german fast!!</h1>
      <h2>A new and  easy way to learn</h2>
      <Link href={"login/"}>
        <button>Find out more</button>
      </Link>
      
      
    </main>
  )
}
