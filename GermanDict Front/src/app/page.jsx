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
      <div>
        <h1>How does it work?</h1>
        <h2>Each flash card presents a target word to translate in a timely manner. By flipping through the cards, you engage in active recall, reinforcing your memory retention. </h2>
          <h2>FlashLingo intelligently adapts to your progress, 
          prioritizing words you find challenging. With this personalized approach, LinguaFlash guides you through a systematic and efficient vocabulary acquisition journey, empowering you to confidently communicate in your target language.</h2>
        <h2>Flash-Lingo extensive word database includes meticulously curated lists of the top 1000 most commonly used words in your target language. These words have been carefully selected to provide you with the essential building blocks of communication.</h2>
        <h2>By familiarizing yourself with these common words, you can swiftly establish a strong language base.</h2>
      </div>
      <div>
        <h1>Are you ready?</h1>
      </div>
      <Link href={"login/"}>
          <button>Start now!</button>
        </Link>
      
      
      
    </main>
  )
}
