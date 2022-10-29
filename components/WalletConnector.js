import { useConnectors, useAccount } from "@starknet-react/core"

export function Walletconnector() {
  const { connect, connectors } = useConnectors()
  const { address } = useAccount()

  return (
    <div className="w-full flex content-center">
      <ul className="flex">
        {address ? address : connectors?.map((connector) => (
          <li key={connector.id()}>
            <button className="bg-cta-100 px-4 py-2 rounded uppercase mr-2 text-xs" onClick={() => connect(connector)}>
              {connector.id()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
