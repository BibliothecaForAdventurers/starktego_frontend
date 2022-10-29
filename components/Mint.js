import { useContract, useStarknetExecute, useAccount, useConnectors } from "@starknet-react/core"
import { useMemo } from "react"
import { toFelt } from "starknet/utils/number"
import LisbonCrown from "../abi/LisbonCrown.json"


export function Mint() {
  const { connect, connectors } = useConnectors()
  const { contract } = useContract({
    address: process.env.NEXT_PUBLIC_MINT,
    abi: LisbonCrown
  })

  const { address } = useAccount()

  const calls = useMemo(() => {
    const tx = {
      contractAddress: contract.address,
      entrypoint: 'mint',
      calldata: [0]
    }
    return Array(1).fill(tx)
  }, [address, contract.address])

  const { execute, loading } = useStarknetExecute({ calls })

  return <div className=" flex w-full py-10 justify-center">
    {loading ?? <div>Minting...</div>}
    {address && <button className="uppercase px-4 py-2 rounded bg-cta-100 hover:bg-red-700 shadow-lg border-b-2 border-l border-yellow-700 text-yellow-100 active:border-transparent" onClick={execute}>claim the lost crown</button>}
    {!loading && !address && <div>Connect first to claim</div>}

  </div>
}