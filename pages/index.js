import { Head } from '../components/Head'

import Link from 'next/link'

export default function Home() {
  const games = [1,2,3,4,5]

  return (
    <div className="bg-dungeon bg-cover from-gray-400 to-black h-screen p-8 h-screen w-full flex justify-center">
      <Head />
      <div className='self-center h-69 w-69 bg-white p-10 text-black text-2xl'>
        <ul>
        {games.map((a, i)=> {
            return <li key={i}><Link href={`/games/${a}`}>game {a}</Link></li>
          })}
        </ul>
      </div>
    </div>
  )
}