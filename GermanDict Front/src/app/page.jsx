import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import 'regenerator-runtime/runtime'
export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>
           FLASH-LINGO
        </h1>
         <Link href={"login/"}>
            <button>Start now!</button>
          </Link>
      </div>
      <div>
        <h1>What is Flash-Lingo?</h1>
        <h2>Embarking on a journey to learn a new language can be an exciting but daunting task. </h2>
        <h2>Flash-Lingo revolutionizes the way you learn by employing the tried-and-true flash card study method, a technique renowned for its effectiveness in vocabulary acquisition</h2>
      </div>
     
      
      
      
    </main>
  )
}
