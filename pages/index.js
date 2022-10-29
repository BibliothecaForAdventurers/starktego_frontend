import { Head } from '../components/Head'
import { Lobby } from '../components/Lobby'

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-black h-screen p-8">
      <Head />
      <div class="grid grid-rows-2 grid-flow-col gap-4 h-full">
        <div class="border-2"><Lobby/></div>
        <div class="border-2">other</div>
        <div class="row-span-2 col-span-2 border-2">battlefield</div>
      </div>
    </div>
  )
}